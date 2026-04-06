"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  X, 
  FileText, 
  Image as ImageIcon, 
  File as FileIcon,
  Trash2,
  FileSpreadsheet,
  FileBox
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileWithMetadata {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
}

export function FileUpload({ className }: { className?: string }) {
  const [files, setFiles] = useState<FileWithMetadata[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <div className="bg-red-500 p-2 rounded-lg text-white font-bold text-[10px]">PDF</div>;
    if (type.includes("word") || type.includes("officedocument.wordprocessingml")) return <div className="bg-blue-500 p-2 rounded-lg text-white font-bold text-[10px]">WORD</div>;
    if (type.includes("excel") || type.includes("spreadsheet") || type.includes("csv")) return <div className="bg-green-600 p-2 rounded-lg text-white font-bold text-[10px]">EXCEL</div>;
    if (type.includes("image")) return <div className="bg-orange-500 p-2 rounded-lg text-white"><ImageIcon size={14} /></div>;
    return <div className="bg-gray-500 p-2 rounded-lg text-white"><FileIcon size={14} /></div>;
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const processedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    }));
    setFiles(prev => [...prev, ...processedFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
      <div className={cn("w-full max-w-md bg-white border border-neutral-100 shadow-2xl rounded-[40px] p-8", className)}>
        <h2 className="text-center font-bold text-neutral-800 mb-6">Upload Files</h2>
        
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "relative border-2 border-dashed rounded-[32px] p-12 transition-all cursor-pointer flex flex-col items-center justify-center bg-neutral-50/50",
            isDragging ? "border-blue-500 bg-blue-50/50" : "border-neutral-200 hover:border-neutral-300"
          )}
        >
          <input 
            type="file" 
            multiple 
            ref={fileInputRef} 
            className="hidden" 
            onChange={onFileChange}
          />
          <div className="text-center">
            <p className="text-neutral-600 font-medium text-lg">Drop file here or browse</p>
            <p className="text-neutral-400 text-sm mt-1 uppercase tracking-wider">PDF, WORD up to 1GB</p>
          </div>
        </motion.div>

        <div className="mt-8 space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="group flex flex-row items-center gap-4 p-4 rounded-[22px] border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all bg-white"
              >
                <div className="shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-800 truncate">{file.name}</p>
                  <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest">{file.size}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, color: "#ef4444" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFile(file.id)}
                  className="p-2 text-neutral-400 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-8 bg-neutral-900 text-white font-bold py-5 rounded-full hover:bg-neutral-800 transition-all shadow-sm shadow-neutral-900/40"
        >
          Upload
        </motion.button>
      </div>
  );
}
