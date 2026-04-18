'use client';
import React, { useEffect, useRef } from 'react';

const BAYER_4x4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const BAYER_8x8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];


function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function luminance(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function parseHex(color: string): [number, number, number] {
  const hex = color.replace('#', '');
  if (hex.length === 3) {
    return [
      parseInt(hex[0] + hex[0], 16),
      parseInt(hex[1] + hex[1], 16),
      parseInt(hex[2] + hex[2], 16),
    ];
  }
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

interface ProcessOptions {
  colorMode: 'grayscale' | 'duotone' | 'original' | 'custom';
  primaryColor: [number, number, number];
  secondaryColor: [number, number, number];
  customPalette: [number, number, number][];
  brightness: number;
  contrast: number;
  invert: boolean;
  gridSize: number;
  threshold: number;
}

function resolveColor(
  isDark: boolean,
  opts: ProcessOptions,
): [number, number, number] {
  switch (opts.colorMode) {
    case 'duotone': return isDark ? opts.primaryColor : opts.secondaryColor;
    case 'custom': return isDark ? opts.customPalette[0] : opts.customPalette[opts.customPalette.length - 1];
    default: return isDark ? [0, 0, 0] : [255, 255, 255];
  }
}

/**
 * Write one pixel given a normalised threshold in 0..1.
 * Works for both luminance-based and original-color modes.
 */
function writePixel(
  d: Uint8ClampedArray,
  i: number,
  rawThreshold: number,
  opts: ProcessOptions,
): void {

  const t = rawThreshold * (1 - opts.threshold) + opts.threshold * 0.5;

  if (opts.colorMode === 'original') {
    const adj = (v: number) =>
      clamp((v - 128) * opts.contrast + 128 + opts.brightness * 255, 0, 255);

    const r = adj(d[i]);
    const g = adj(d[i + 1]);
    const b = adj(d[i + 2]);

    const levels = 4;
    const q = (v: number) =>
      clamp(Math.round((v / 255 + (t - 0.5) * 0.5) * levels) / levels * 255, 0, 255);

    let [or, og, ob] = [q(r), q(g), q(b)];
    if (opts.invert) { or = 255 - or; og = 255 - og; ob = 255 - ob; }
    d[i] = or; d[i + 1] = og; d[i + 2] = ob;
  } else {
    const r = clamp((d[i] - 128) * opts.contrast + 128 + opts.brightness * 255, 0, 255);
    const g = clamp((d[i + 1] - 128) * opts.contrast + 128 + opts.brightness * 255, 0, 255);
    const b = clamp((d[i + 2] - 128) * opts.contrast + 128 + opts.brightness * 255, 0, 255);
    const lum = luminance(r, g, b) / 255;

    let [or, og, ob] = resolveColor(lum < t, opts);
    if (opts.invert) { or = 255 - or; og = 255 - og; ob = 255 - ob; }
    d[i] = or; d[i + 1] = og; d[i + 2] = ob;
  }
}


function applyBayer(
  src: Uint8ClampedArray,
  w: number,
  h: number,
  opts: ProcessOptions,
  matrixSize: 4 | 8 = 4,
): Uint8ClampedArray {
  const d = new Uint8ClampedArray(src);
  const matrix = matrixSize === 8 ? BAYER_8x8 : BAYER_4x4;
  const scale = matrixSize === 8 ? 64 : 16;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      writePixel(d, (y * w + x) * 4, matrix[y % matrixSize][x % matrixSize] / scale, opts);
    }
  }
  return d;
}

function applyHalftone(
  src: Uint8ClampedArray,
  w: number,
  h: number,
  opts: ProcessOptions,
): Uint8ClampedArray {
  const d = new Uint8ClampedArray(src);
  const freq = Math.PI * 2 / (opts.gridSize * 2);
  const ang = Math.PI / 4;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const rx = x * Math.cos(ang) + y * Math.sin(ang);
      const ry = -x * Math.sin(ang) + y * Math.cos(ang);
      const t = (Math.sin(rx * freq) + Math.sin(ry * freq) + 2) / 4;
      writePixel(d, (y * w + x) * 4, t, opts);
    }
  }
  return d;
}

function applyNoise(
  src: Uint8ClampedArray,
  w: number,
  h: number,
  opts: ProcessOptions,
  time: number,
): Uint8ClampedArray {
  const d = new Uint8ClampedArray(src);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = Math.sin(x * 12.9898 + y * 78.233 + time * 100) * 43758.5453;
      writePixel(d, (y * w + x) * 4, n - Math.floor(n), opts);
    }
  }
  return d;
}

function applyCrosshatch(
  src: Uint8ClampedArray,
  w: number,
  h: number,
  opts: ProcessOptions,
): Uint8ClampedArray {
  const d = new Uint8ClampedArray(src);
  const step = opts.gridSize;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const l1 = (x + y) % (step * 2) < step ? 1 : 0;
      const l2 = (x - y + step * 4) % (step * 2) < step ? 1 : 0;
      writePixel(d, (y * w + x) * 4, (l1 + l2) / 2, opts);
    }
  }
  return d;
}

function applyFloydSteinberg(
  src: Uint8ClampedArray,
  w: number,
  h: number,
  opts: ProcessOptions,
): Uint8ClampedArray {
  const d = new Float32Array(src);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;

      if (opts.colorMode === 'original') {
        for (let c = 0; c < 3; c++) {
          const old = d[i + c];
          const neu = old < 128 ? 0 : 255;
          const err = old - neu;
          d[i + c] = neu;
          if (x + 1 < w) d[i + 4 + c] += err * 7 / 16;
          if (x > 0 && y + 1 < h) d[i + w * 4 - 4 + c] += err * 3 / 16;
          if (y + 1 < h) d[i + w * 4 + c] += err * 5 / 16;
          if (x + 1 < w && y + 1 < h) d[i + w * 4 + 4 + c] += err * 1 / 16;
        }
      } else {
        const r = clamp((d[i] - 128) * opts.contrast + 128 + opts.brightness * 255, 0, 255);
        const g = clamp((d[i + 1] - 128) * opts.contrast + 128 + opts.brightness * 255, 0, 255);
        const b = clamp((d[i + 2] - 128) * opts.contrast + 128 + opts.brightness * 255, 0, 255);
        const lum = luminance(r, g, b) / 255;
        const neu = lum < 0.5 ? 0 : 255;
        const err = lum * 255 - neu;

        let [or, og, ob] = resolveColor(neu < 128, opts);
        if (opts.invert) { or = 255 - or; og = 255 - og; ob = 255 - ob; }
        d[i] = or; d[i + 1] = og; d[i + 2] = ob;

        const spread = (offset: number, weight: number) => {
          const j = i + offset;
          if (j < 0 || j + 2 >= d.length) return;
          d[j] += err * weight / 16;
          d[j + 1] += err * weight / 16;
          d[j + 2] += err * weight / 16;
        };
        if (x + 1 < w) spread(4, 7);
        if (x > 0 && y + 1 < h) spread(w * 4 - 4, 3);
        if (y + 1 < h) spread(w * 4, 5);
        if (x + 1 < w && y + 1 < h) spread(w * 4 + 4, 1);
      }
    }
  }
  return Uint8ClampedArray.from(d);
}

export type DitheringMode = 'bayer' | 'bayer8' | 'floyd' | 'halftone' | 'noise' | 'crosshatch';
export type ColorMode = 'grayscale' | 'duotone' | 'original' | 'custom';

export interface DitherImageProps {
  src: string;
  alt?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  className?: string;
  style?: React.CSSProperties;

  /**
   * Grid cell size in pixels — sets the visible grain of the dither.
   * Higher = chunkier. Default: 4
   */
  gridSize?: number;
  /** Dithering algorithm. Default: 'bayer' */
  ditherMode?: DitheringMode;
  /** Threshold bias 0–1 (0.5 = neutral). Default: 0.5 */
  threshold?: number;

  /** Color output mode. Default: 'grayscale' */
  colorMode?: ColorMode;
  /** Dark output color for duotone / custom modes (hex). Default: '#000000' */
  primaryColor?: string;
  /** Light output color for duotone / custom modes (hex). Default: '#ffffff' */
  secondaryColor?: string;
  /**
   * Ordered hex palette for 'custom' mode.
   * First = darkest tones, last = lightest tones.
   */
  customPalette?: string[];
  /** Invert output colors. Default: false */
  invert?: boolean;

  /** Brightness offset, -1 to 1. Default: 0 */
  brightness?: number;
  /** Contrast multiplier, 0 to 2. Default: 1 */
  contrast?: number;
  /** Animate the dither pattern (best with ditherMode='noise'). Default: false */
  animated?: boolean;
  /** Time increment per animation frame. Default: 0.02 */
  animationSpeed?: number;
}


export default function DitherImage({
  src = "https://plus.unsplash.com/premium_photo-1700124162812-1d5d29087b81?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt = '',
  fit = 'cover',
  className,
  style,
  gridSize = 4,
  ditherMode = 'bayer8',
  threshold = 0.5,
  colorMode = 'grayscale',
  primaryColor = '#000000',
  secondaryColor = '#ffffff',
  customPalette = ['#000000', '#ffffff'],
  invert = false,
  brightness = 0,
  contrast = 1,
  animated = false,
  animationSpeed = 0.02,
}: DitherImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let cancelled = false;

    if (!src) return;

    const opts: ProcessOptions = {
      colorMode: colorMode as ProcessOptions['colorMode'],
      primaryColor: parseHex(primaryColor),
      secondaryColor: parseHex(secondaryColor),
      customPalette: customPalette.map(parseHex),
      brightness,
      contrast,
      invert,
      gridSize: Math.max(1, gridSize),
      threshold: clamp(threshold, 0, 1),
    };

    const sampleImage = (img: HTMLImageElement): ImageData | null => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const cw = parent ? parent.clientWidth : img.naturalWidth;
      const ch = parent ? parent.clientHeight : img.naturalHeight;
      if (cw === 0 || ch === 0) return null;

      const pw = Math.floor(cw * dpr);
      const ph = Math.floor(ch * dpr);

      canvas.width = pw;
      canvas.height = ph;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;

      const iw = img.naturalWidth || cw;
      const ih = img.naturalHeight || ch;
      let dw = pw, dh = ph, dx = 0, dy = 0;

      if (fit === 'cover') {
        const r = Math.max(pw / iw, ph / ih);
        dw = Math.ceil(iw * r); dh = Math.ceil(ih * r);
        dx = Math.floor((pw - dw) / 2);
        dy = Math.floor((ph - dh) / 2);
      } else if (fit === 'contain') {
        const r = Math.min(pw / iw, ph / ih);
        dw = Math.ceil(iw * r); dh = Math.ceil(ih * r);
        dx = Math.floor((pw - dw) / 2);
        dy = Math.floor((ph - dh) / 2);
      } else if (fit === 'none') {
        dw = iw; dh = ih;
        dx = Math.floor((pw - dw) / 2);
        dy = Math.floor((ph - dh) / 2);
      }

      const off = document.createElement('canvas');
      off.width = pw;
      off.height = ph;
      const offCtx = off.getContext('2d');
      if (!offCtx) return null;
      offCtx.drawImage(img, dx, dy, dw, dh);

      try {
        return offCtx.getImageData(0, 0, pw, ph);
      } catch {
        console.error('DitherImage: cannot read pixels — check CORS headers on the image URL.');
        return null;
      }
    };

    const render = (imageData: ImageData, time: number) => {
      if (cancelled) return;
      const { data, width: w, height: h } = imageData;

      const out = (() => {
        switch (ditherMode) {
          case 'bayer8': return applyBayer(data, w, h, opts, 8);
          case 'floyd': return applyFloydSteinberg(data, w, h, opts);
          case 'halftone': return applyHalftone(data, w, h, opts);
          case 'noise': return applyNoise(data, w, h, opts, time);
          case 'crosshatch': return applyCrosshatch(data, w, h, opts);
          case 'bayer':
          default: return applyBayer(data, w, h, opts, 4);
        }
      })();

      ctx.putImageData(new ImageData(new Uint8ClampedArray(out), w, h), 0, 0);
    };

    const start = (img: HTMLImageElement) => {
      if (cancelled) return;

      const source = sampleImage(img);
      if (!source) return;

      render(source, 0);

      if (animated) {
        const tick = () => {
          if (cancelled) return;
          timeRef.current += animationSpeed;
          const fresh = sampleImage(img);
          if (fresh) render(fresh, timeRef.current);
          animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
      } else {
        const ro = new ResizeObserver(() => {
          const fresh = sampleImage(img);
          if (fresh) render(fresh, timeRef.current);
        });
        if (canvas.parentElement) ro.observe(canvas.parentElement);
        (canvas as any).__ditherRO = ro;
      }
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { if (!cancelled) start(img); };
    img.onerror = () => console.error(`DitherImage: failed to load "${src}"`);
    img.src = src;

    return () => {
      cancelled = true;
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      const ro = (canvas as any).__ditherRO as ResizeObserver | undefined;
      if (ro) {
        ro.disconnect();
        delete (canvas as any).__ditherRO;
      }
    };
  }, [
    src, fit, gridSize, ditherMode, threshold,
    colorMode, primaryColor, secondaryColor, customPalette,
    invert, brightness, contrast, animated, animationSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      className={className}
      style={{ imageRendering: 'pixelated', display: 'block',minHeight: 400, ...style }}
    />
  );
}