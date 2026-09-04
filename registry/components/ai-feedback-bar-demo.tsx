"use client";

import React from "react";
import { AiFeedbackBar } from "@/registry/components/ai-feedback-bar";

export function AiFeedbackBarDemo() {
  const handleLike = async () => {
    console.log("Response liked");
  };

  const handleDislike = async () => {
    console.log("Response disliked");
  };

  const handleSubmitFeedback = async (text: string) => {
    // Simulate backend network latency
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Submitted detailed feedback:", text);
  };

  return (
    <div className="flex w-full items-start justify-center p-6 sm:p-12 min-h-[220px]">
      <AiFeedbackBar
        title="Was this response helpful?"
        showFeedbackFormOnDislike={true}
        onLike={handleLike}
        onDislike={handleDislike}
        onSubmitFeedback={handleSubmitFeedback}
        onClose={() => console.log("Feedback bar dismissed")}
      />
    </div>
  );
}
