"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "./utils";

const CopyCommand = () => {
  const [copied, setCopied] = useState(false);
  const command = "npm install autosuspense";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="w-full flex justify-center pt-2 pb-8">
      <div
        onClick={handleCopy}
        className={cn(
          "group relative flex items-center gap-4 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300",
          "bg-slate-900/50 border border-slate-800 hover:border-gray-500/50 hover:bg-slate-900/80",
          "backdrop-blur-sm",
        )}
      >
        <code className="text-secondary group-hover:text-primary transition-colors font-mono tracking-tight">
          <span className="text-accent">$</span> {command}
        </code>

        <div className="flex items-center justify-center ml-2 border-l border-slate-800 pl-4">
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in duration-300" />
          ) : (
            <Copy className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
          )}
        </div>

        {/* Floating tooltip */}
        <div
          className={cn(
            "absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-accent text-white text-xs font-medium transition-all duration-300 pointer-events-none",
            copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          Copied!
        </div>
      </div>
    </div>
  );
};

export default CopyCommand;
