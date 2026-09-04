"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ThumbsUp, ThumbsDown, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AiFeedbackBarProps {
  /**
   * Question or prompt text shown in the feedback bar.
   * @default "Was this response helpful?"
   */
  title?: string;
  /**
   * Placeholder text for the detailed feedback textarea.
   * @default "What went wrong with this response or how could it be improved?"
   */
  textareaPlaceholder?: string;
  /**
   * Label for the submit button.
   * @default "Submit"
   */
  submitButtonText?: string;
  /**
   * Whether clicking dislike opens the detailed feedback form textarea.
   * If false, dislike is recorded directly without opening the text card.
   * @default true
   */
  showFeedbackFormOnDislike?: boolean;
  /**
   * Callback fired when user likes the response.
   */
  onLike?: () => void | Promise<void>;
  /**
   * Callback fired when user dislikes the response (before or without submitting text).
   */
  onDislike?: () => void | Promise<void>;
  /**
   * Callback fired when user submits the detailed feedback text.
   */
  onSubmitFeedback?: (feedbackText: string) => void | Promise<void>;
  /**
   * Callback fired when user dismisses / closes the feedback bar.
   */
  onClose?: () => void;
  /**
   * Additional CSS class name for outer container.
   */
  className?: string;
}

export function AiFeedbackBar({
  title = "Was this response helpful?",
  textareaPlaceholder = "What went wrong with this response or how could it be improved?",
  submitButtonText = "Submit",
  showFeedbackFormOnDislike = true,
  onLike,
  onDislike,
  onSubmitFeedback,
  onClose,
  className,
}: AiFeedbackBarProps) {
  const [status, setStatus] = useState<"idle" | "form" | "submitted" | "closed">("idle");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVote, setSelectedVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = async () => {
    setSelectedVote("like");
    if (onLike) {
      await onLike();
    }
  };

  const handleDislike = async () => {
    setSelectedVote("dislike");
    if (onDislike) {
      await onDislike();
    }
    if (showFeedbackFormOnDislike) {
      setStatus("form");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (onSubmitFeedback) {
        await onSubmitFeedback(feedbackText);
      }
      setStatus("submitted");
    } catch (err) {
      console.error("Failed to submit feedback:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStatus("closed");
    if (onClose) {
      onClose();
    }
  };

  if (status === "closed") {
    return null;
  }

  return (
    <motion.div
      layout
      transition={{
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{ originX: 0, originY: 0 }}
      className={cn(
        "relative w-full max-w-[400px] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] text-neutral-800 dark:text-neutral-200 shadow-md dark:shadow-xl",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {status === "idle" && (
          <motion.div
            key="bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between pl-3 pr-0 py-1"
          >
            {/* Left Info + Title */}
            <div className="flex items-center gap-2.5 py-1.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-neutral-500 dark:text-neutral-400">
                <Info className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 select-none">
                {title}
              </span>
            </div>

            {/* Actions: Thumbs Up / Down / Close */}
            <div className="flex items-center self-stretch">
              <button
                type="button"
                onClick={handleLike}
                className="flex h-7 w-7 items-center justify-center text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-all active:scale-95"
                title="Helpful"
                aria-label="Helpful"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleDislike}
                className="flex h-7 w-7 items-center justify-center text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-all active:scale-95 ml-1 mr-2"
                title="Not helpful"
                aria-label="Not helpful"
              >
                <ThumbsDown className="h-4 w-4" />
              </button>

              {/* Full height enclosed border separator touching top and bottom */}
              <div className="w-px self-stretch bg-neutral-200 dark:bg-neutral-800" />

              <button
                type="button"
                onClick={handleClose}
                className="flex w-9 self-stretch items-center justify-center text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-all active:scale-95"
                title="Dismiss"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {status === "form" && (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="flex flex-col p-3.5 sm:p-4 gap-3"
          >
            {/* Inner Textbox Container */}
            <div className="relative w-full rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50 dark:bg-neutral-900/90 p-3 transition-colors focus-within:border-neutral-400 dark:focus-within:border-neutral-600 focus-within:ring-1 focus-within:ring-neutral-400 dark:focus-within:ring-neutral-600">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder={textareaPlaceholder}
                rows={3}
                autoFocus
                className="w-full resize-none bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none"
              />
            </div>

            {/* Bottom Row: Close/Cancel & Submit */}
            <div className="flex items-center justify-between pt-0.5">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-xs text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors px-1 py-1"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !feedbackText.trim()}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all",
                  "hover:bg-blue-500 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>{submitButtonText}</span>
                )}
              </button>
            </div>
          </motion.form>
        )}

        {status === "submitted" && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between px-3 py-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
          >
            <span>Thank you for your feedback!</span>
            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
