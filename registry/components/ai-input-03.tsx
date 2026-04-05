"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Wand2, Image as ImageIcon, Video, Mic, ArrowUp, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface FilePreview {
  id: string;
  file: File;
  type: string;
  url?: string;
}

export function AiInput03() {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [activeTab, setActiveTab] = useState<"image" | "video">("video");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [value]);

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
      if (removed?.url && !removed.url.startsWith("http")) URL.revokeObjectURL(removed.url);
      return prev.filter(f => f.id !== id);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 py-12">
      <div className="relative flex flex-col rounded-3xl bg-white p-2 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-neutral-100">
        
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between p-3 pb-1">
                <button 
                  onClick={() => setFiles([])}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100/80 text-neutral-600 transition-colors hover:bg-neutral-200"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-neutral-800 pr-2">Drafts</span>
              </div>
              
              <div className="flex flex-wrap gap-3 p-3 pt-2">
                {files.map((f) => (
                  <motion.div
                    key={f.id}
                    layoutId={f.id}
                    className="group relative h-24 w-24 overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5"
                  >
                    {f.url ? (
                      <img src={f.url} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full">
                        <span className="text-[10px] font-bold text-neutral-400">
                          {f.file.name.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(f.id)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input */}
        <div className="px-5 py-4 pb-6">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What do you want to create?"
            rows={2}
            className="w-full resize-none bg-transparent text-lg text-neutral-800 outline-none placeholder:text-neutral-400"
          />
        </div>

        {/* Bottom Toolbar */}
        <div className="mt-auto flex items-center justify-between rounded-2xl bg-[#f4f4f5] p-2 mx-1 mb-1">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="group flex h-11 w-11 items-center justify-center rounded-[14px] bg-white text-neutral-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:bg-neutral-50 active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />

            {/* Segmented Control */}
            <div className="ml-1 flex items-center rounded-[14px] bg-transparent p-1">
              <button
                onClick={() => setActiveTab("image")}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                  activeTab === "image" 
                    ? "text-neutral-800" 
                    : "text-neutral-500 hover:text-neutral-700 hover:bg-[#e4e4e7]/50"
                )}
              >
                {activeTab === "image" && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-xl bg-[#e4e4e7] shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </span>
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                  activeTab === "video" 
                    ? "text-neutral-800" 
                    : "text-neutral-500 hover:text-neutral-700 hover:bg-[#e4e4e7]/50"
                )}
              >
                {activeTab === "video" && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-xl bg-[#e4e4e7] shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pr-1">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-neutral-800">
              <Mic className="h-5 w-5" />
            </button>
            <button className="flex h-11 w-12 items-center justify-center rounded-2xl bg-[#18181b] text-white shadow-2xl transition-all hover:bg-black active:scale-95">
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
