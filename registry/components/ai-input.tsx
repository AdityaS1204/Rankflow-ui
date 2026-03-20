"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { RxGlobe, RxLink2, RxChevronDown, RxCross2, RxArrowUp } from "react-icons/rx";
import { SiOpenai } from "react-icons/si";
import { HiMiniMicrophone } from "react-icons/hi2";

const models = [
  { id: "gpt-5", label: "GPT 5.4" },
  { id: "gpt-4o", label: "GPT 5.4 Nano" },
  { id: "gpt-4o-mini", label: "GPT 5.4 Mini" },
];

export function AiInput() {
  const [value, setValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  const resizeTextarea = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
  }, []);

  useEffect(() => resizeTextarea(), [value, resizeTextarea, files]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-[520px] rounded-[24px] bg-white border border-neutral-200 p-4 pb-3 flex flex-col gap-3 font-sans shadow-md">
      {/* ── File Badges ──────────────────────────── */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200 text-[12px] text-black font-medium transition-all"
            >
              <span className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="flex items-center justify-center w-4 h-4 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors border-none p-0.5 cursor-pointer text-neutral-600"
              >
                <RxCross2 className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Text area ──────────────────────────────── */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Can you create folders in Google Docs"
        rows={1}
        className="w-full border-none outline-none resize-none text-[16px] leading-normal text-neutral-900 bg-transparent p-0 font-sans placeholder:text-neutral-500"
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        hidden
      />

      {/* ── Bottom toolbar ─────────────────────────── */}
      <div className="flex items-center justify-between">
        {/* Left icon group */}
        <div className="flex items-center gap-1">
          {/* Attach */}
          <button
            type="button"
            aria-label="Attach file"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 bg-transparent text-neutral-600 hover:bg-neutral-50 hover:text-black transition-all cursor-pointer"
          >
            <RxLink2 className="w-4 h-4" />
          </button>

          {/* Globe */}
          <button
            type="button"
            aria-label="Search web"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 bg-transparent text-neutral-600 hover:bg-neutral-50 hover:text-black transition-all cursor-pointer"
          >
            <RxGlobe className="w-4 h-4" />
          </button>

          {/* Model selector */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-label="Select model"
              onClick={() => setDropdownOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-neutral-200 bg-transparent text-neutral-600 text-[13px] font-medium hover:bg-neutral-50 hover:text-black transition-all cursor-pointer"
            >
              <SiOpenai size={14} />
              <span>{selectedModel.label}</span>
              <RxChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            {/* Dropdown menu */}
            <div
              className={`absolute bottom-[calc(100%+6px)] left-0 min-w-[160px] rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden transition-all duration-200 z-50 ${
                dropdownOpen 
                ? "opacity-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 translate-y-1.5 pointer-events-none"
              }`}
            >
              {models.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    setSelectedModel(model);
                    setDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-3.5 py-2.5 border-none text-left text-[13px] transition-colors cursor-pointer ${
                    selectedModel.id === model.id 
                    ? "bg-neutral-100 text-black font-semibold" 
                    : "bg-transparent text-neutral-700 font-normal hover:bg-neutral-100"
                  }`}
                >
                  <SiOpenai size={18} />
                  <span>{model.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action button (Voice or Send) */}
        <button
          type="button"
          aria-label={value.trim() ? "Send message" : "Voice input"}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition-all text-center border-none cursor-pointer"
        >
          {value.trim() ? (
            <RxArrowUp size={20} />
          ) : (
            <HiMiniMicrophone size={18} />
          )}
        </button>
      </div>
    </div>
  );
}
