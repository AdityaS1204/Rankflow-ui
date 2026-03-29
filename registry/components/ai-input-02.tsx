"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiPaperclip, FiMic, FiSend, FiX, FiChevronDown } from "react-icons/fi";
import { SiGmail, SiGoogledrive, SiGoogledocs, SiGooglesheets, SiGooglecalendar } from "react-icons/si";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";


interface FilePreview {
  id: string;
  file: File;
  type: string;
  url?: string;
}

const INTEGRATIONS = [
  { id: "gmail", name: "Gmail", icon: <SiGmail className="text-[#EA4335]" /> },
  { id: "drive", name: "Drive", icon: <SiGoogledrive className="text-[#34A853]" /> },
  { id: "docs", name: "Docs", icon: <SiGoogledocs className="text-[#4285F4]" /> },
  { id: "sheets", name: "Sheets", icon: <SiGooglesheets className="text-[#34A853]" /> },
  { id: "calendar", name: "Calendar", icon: <SiGooglecalendar className="text-[#4285F4]" /> },
];

export function AiInput02() {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [connectedApps, setConnectedApps] = useState<string[]>(["gmail", "drive"]);
  
  // Audio state
  const [audioVolumes, setAudioVolumes] = useState<number[]>([0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [value]);

  // Click outside close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsConnectOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Audio recording logic
  const startRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;
      
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 32;
      analyserRef.current = analyser;
      
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const update = () => {
        if (!analyserRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        const volumes = Array.from({ length: 6 }).map((_, i) => {
          const val = dataArray[i * 2] || 0;
          return Math.max(0.1, val / 255);
        });
        setAudioVolumes(volumes);
        animationFrameRef.current = requestAnimationFrame(update);
      };
      update();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    setAudioVolumes([0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        id: Math.random().toString(36).substr(2, 9),
        file: f,
        type: f.type,
        url: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined
      }));
      setFiles(prev => [...prev, ...newFiles]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const removed = prev.find(f => f.id === id);
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return prev.filter(f => f.id !== id);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 py-24" ref={containerRef}>
      <div className="relative flex flex-col pt-4">
        
        <div className="relative z-20 flex flex-col rounded-[28px] bg-[#1a1a1a] p-4 shadow-2xl ring-1 ring-white/10">
          
          <AnimatePresence mode="popLayout">
            {files.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-wrap gap-2.5 mb-3"
              >
                {files.map((f) => (
                  <motion.div
                    key={f.id}
                    layoutId={f.id}
                    className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10"
                  >
                    {f.url ? (
                      <img src={f.url} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full">
                        <span className="text-[9px] font-bold text-neutral-400">
                          {f.file.name.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(f.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <FiX className="text-white" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Area Row */}
          <div className="flex items-start gap-3 px-1">
            <span className="mt-1 h-6 w-[2px] bg-neutral-700 shrink-0" />
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tell Rankflow What You Want"
              rows={1}
              className="w-full resize-none border-none bg-transparent py-1 text-lg text-neutral-100 outline-none placeholder:text-neutral-600 font-light max-h-[160px]"
            />
          </div>

          {/* Actions Row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FiPaperclip className="text-xl" />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleRecording}
                animate={{ width: isRecording ? 100 : 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "relative flex h-10 overflow-hidden items-center justify-center rounded-2xl transition-colors",
                  isRecording ? "bg-red-500/10 text-red-500 ring-1 ring-red-500/50" : "bg-white/5 text-neutral-400 hover:bg-white/10"
                )}
              >
                {!isRecording ? (
                  <FiMic className="text-xl" />
                ) : (
                  <div className="flex items-center justify-center gap-[4px] px-2 h-full">
                    {audioVolumes.map((vol, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: `${vol * 28}px` }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        className="w-[3px] rounded-full bg-red-500"
                        style={{ transformOrigin: "center" }}
                      />
                    ))}
                  </div>
                )}
              </motion.button>

              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900 transition-all hover:scale-105 active:scale-95">
                <FiSend className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative -mt-6 z-10 w-full rounded-b-[28px] bg-[#1a1a1e] pb-6 pt-10 px-4 ring-1 ring-white/5">
          <div className="flex items-center justify-between">
            <div className="relative">
              <button 
                onClick={() => setIsConnectOpen(!isConnectOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-blue-400/80 transition-colors hover:text-blue-400"
              >
                Connect your tools to Rankflow
                <FiChevronDown className={cn("transition-transform", isConnectOpen && "rotate-180")} />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isConnectOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 12 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 top-full z-50 mt-2 w-56 rounded-2xl bg-[#222] p-2 shadow-2xl ring-1 ring-white/10"
                  >
                    <div className="mb-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      Integrations
                    </div>
                    {INTEGRATIONS.map((app) => (
                      <div key={app.id} className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{app.icon}</span>
                          <span className="text-xs font-semibold text-neutral-300">{app.name}</span>
                        </div>
                        <button 
                          onClick={() => setConnectedApps(p => p.includes(app.id) ? p.filter(x => x !== app.id) : [...p, app.id])}
                          className={cn(
                            "h-4 w-7 rounded-full transition-colors relative",
                            connectedApps.includes(app.id) ? "bg-blue-600" : "bg-neutral-700"
                          )}
                        >
                          <motion.div 
                            animate={{ x: connectedApps.includes(app.id) ? 14 : 2 }}
                            className="absolute top-[2px] h-3 w-3 rounded-full bg-white"
                          />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2.5">
              {INTEGRATIONS.map((app) => (
                <div 
                  key={app.id} 
                  className={cn(
                    "flex h-5 w-5 items-center justify-center text-lg transition-all duration-300",
                    connectedApps.includes(app.id) ? "opacity-100 scale-100" : "opacity-20 scale-90 grayscale"
                  )}
                >
                  {app.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
