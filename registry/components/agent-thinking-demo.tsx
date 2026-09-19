"use client";

import React, { useState } from "react";
import { AgentThinking } from "./agent-thinking";
import { RotateCw } from "lucide-react";

export function AgentThinkingDemo() {
  const [replayKey, setReplayKey] = useState(0);

  const sampleThought =
    "The user is requesting an analysis of the dependency graph across microservices to isolate circular references. Looking into the session lifecycle and token rotation pipeline, the AuthSession holds a reference to ActiveWorkspace while TokenProvider requests token rotation on invalidation. Refactoring this into a decoupled SharedAuthContext will eliminate the circular loop while maintaining seamless concurrency and thread safety.";

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3 p-6 min-h-[220px] justify-center select-none">
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={() => setReplayKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
        >
          <RotateCw className="w-3 h-3" />
          <span>Replay</span>
        </button>
      </div>

      <AgentThinking
        key={replayKey}
        thought={sampleThought}
        streamSpeed={20}
        defaultOpen={true}
      />
    </div>
  );
}

export default AgentThinkingDemo;
