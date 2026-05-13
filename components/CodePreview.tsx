"use client";

import React, { useState } from "react";
import { cn } from "./common/utils";
import { FileCode, Braces } from "lucide-react";
import { CodeSkeleton } from "./common/Skeletons";

// 🔥 Syntax highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Suspend } from "autosuspense";

const CodePreviewContent = () => {
  const [activeTab, setActiveTab] = useState<"parent" | "child">("parent");

  const parentCode = `import { AutoSuspense } from "autosuspense";
import MyChild from "./MyChild";

export default function Parent() {
  return (
    <AutoSuspense>
      <MyChild />
    </AutoSuspense>
  );
}`;

  const childCode = `import { Suspend } from "autosuspense";

const MyChild = () => {
  const data = fetchData();
  return (
    <div>
      <h1>{data} loaded</h1>
    </div>
    );
  };
    
// Automatically attaches to nearest AutoSuspense!
export default Suspend(MyChild, <div>Loading...</div>);`;

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
      {/* Tab Header */}
      <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/50">
        <button
          onClick={() => setActiveTab("parent")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 hover:cursor-pointer",
            activeTab === "parent"
              ? "text-primary border-accent"
              : "text-secondary border-transparent hover:text-primary",
          )}
        >
          <FileCode className="w-4 h-4" />
          Parent.tsx
        </button>

        <button
          onClick={() => setActiveTab("child")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 hover:cursor-pointer",
            activeTab === "child"
              ? "text-primary border-accent"
              : "text-secondary border-transparent hover:text-primary",
          )}
        >
          <Braces className="w-4 h-4" />
          Child.tsx
        </button>

        {/* Fake window buttons */}
        <div className="ml-auto flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Code Area */}
      <div className="p-6 overflow-auto max-h-100 text-sm">
        <SyntaxHighlighter
          language="tsx"
          style={oneDark}
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: 0,
            fontSize: "0.875rem",
          }}
          codeTagProps={{
            style: {
              fontFamily: "monospace",
            },
          }}
        >
          {activeTab === "parent" ? parentCode : childCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// Stable promise cache for CodePreview
const previewPromiseCache = new Map<string, Promise<void>>();

// We create a wrapper that triggers the actual suspension
const DelayedCodePreview = ({ delay }: { delay: number }) => {
  const id = "hero-preview";
  
  if (!previewPromiseCache.has(id)) {
    const p = new Promise<void>((resolve) => {
      setTimeout(() => {
        (p as any).resolved = true;
        resolve();
      }, delay);
    });
    previewPromiseCache.set(id, p);
    throw p;
  }

  const promise = previewPromiseCache.get(id)!;
  if (!(promise as any).resolved) {
    promise.then(() => { (promise as any).resolved = true; });
    throw promise;
  }

  return <CodePreviewContent />;
};

export default Suspend(DelayedCodePreview, <CodeSkeleton />);
