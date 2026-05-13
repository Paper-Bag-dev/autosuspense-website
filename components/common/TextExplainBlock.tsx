"use client";

import React from "react";
import { motion } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check } from "lucide-react";
import { AutoSuspense, Suspend } from "autosuspense";
import { TitleSkeleton, TextSkeleton, CodeSkeleton } from "./Skeletons";

// Global cache for demo purposes
const demoCache = new Map<string, Promise<void>>();

const DataFetcher = ({ id, delay, children }: { id: string; delay: number; children: React.ReactNode }) => {
  if (!demoCache.has(id)) {
    const p = new Promise<void>((resolve) => {
      setTimeout(() => {
        (p as any).resolved = true;
        resolve();
      }, delay);
    });
    demoCache.set(id, p);
    throw p;
  }

  const p = demoCache.get(id)!;
  if (!(p as any).resolved) {
    throw p;
  }

  return <>{children}</>;
};

// DelayedWrapper is now a suspended component!
// It takes a delay and an id, and will show a skeleton until it's ready.
const DelayedWrapper = Suspend(
  DataFetcher,
  <div className="w-full py-2"><TextSkeleton lines={2} /></div>
);

const CodeWindowContent = ({ code }: { code: string }) => {
  return (
    <div className="w-full rounded-xl overflow-hidden glass border border-white/10 shadow-2xl">
      <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-bottom border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-4 text-xs text-zinc-500 font-mono">Component.tsx</div>
      </div>
      
      <div className="p-6 text-sm md:text-base bg-black/40 backdrop-blur-sm">
        <SyntaxHighlighter
          language="tsx"
          style={oneDark}
          customStyle={{ background: "transparent", margin: 0, padding: 0, fontSize: "inherit" }}
          codeTagProps={{ style: { fontFamily: "var(--font-geist-mono), monospace" } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const SuspendedCodeWindow = Suspend(CodeWindowContent, <CodeSkeleton />);

const Line = ({ text }: { text: string }) => {
  return (
    <p className="text-lg text-zinc-400 leading-relaxed">
      {text}
    </p>
  );
};

const SuspendedLine = Suspend(Line, <div className="py-2"><TextSkeleton lines={1} /></div>);

const TextContent = ({ title, desc, ind }: { title: string; desc: string[]; ind: number }) => {
  return (
    <div className="flex-1 space-y-6">
      {/* Level 1: Title */}
      <DelayedWrapper id={`title-${ind}`} delay={600 + Math.random() * 400}>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </DelayedWrapper>
      
      <div className="space-y-4">
        {desc.map((d, i) => (
          /* Level 2: Individual Lines suspending independently to form a tree */
          <DelayedWrapper key={i} id={`desc-line-${ind}-${i}`} delay={1000 + i * 300 + Math.random() * 500}>
            <SuspendedLine text={d} />
          </DelayedWrapper>
        ))}
      </div>

      {/* Level 3: Nested Features */}
      <div className="flex flex-wrap gap-4 pt-4">
        <DelayedWrapper id={`features-container-${ind}`} delay={1800 + Math.random() * 500}>
          <div className="flex flex-wrap gap-4">
            <DelayedWrapper id={`badge-1-${ind}`} delay={2400 + Math.random() * 400}>
              <div className="flex items-center gap-2 text-sm text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Check className="w-4 h-4 text-accent" />
                <span>Automatic composition</span>
              </div>
            </DelayedWrapper>
            
            <DelayedWrapper id={`badge-2-${ind}`} delay={2800 + Math.random() * 400}>
              <div className="flex items-center gap-2 text-sm text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Check className="w-4 h-4 text-accent" />
                <span>Zero boilerplate</span>
              </div>
            </DelayedWrapper>
          </div>
        </DelayedWrapper>
      </div>
    </div>
  );
};

interface TextExplainBlockProps {
  title: string;
  desc: string[];
  code: string[];
  ind: number;
}

const TextExplainBlock = ({ title, desc, code, ind }: TextExplainBlockProps) => {
  const isEven = ind % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: ind * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="py-16 md:py-24 w-full"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-6`}>
        {/* The entire block is wrapped in AutoSuspense, which will catch all nested DelayedWrappers */}
        <AutoSuspense>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center w-full">
             <div className="flex-1 w-full space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent border border-accent/30 font-bold text-xl">
                    {ind + 1}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                </div>
                
                {/* Text section with internal nesting */}
                <TextContent title={title} desc={desc} ind={ind} />
              </div>

              {/* Code section with staggered deep nesting */}
              <div className="flex-1 w-full max-w-2xl">
                <DelayedWrapper id={`code-container-${ind}`} delay={1500}>
                  <div className="space-y-6">
                    {code.map((c, i) => (
                      <DelayedWrapper key={i} id={`code-item-${ind}-${i}`} delay={2000 + i * 500}>
                        <SuspendedCodeWindow code={c} />
                      </DelayedWrapper>
                    ))}
                  </div>
                </DelayedWrapper>
              </div>
          </div>
        </AutoSuspense>
      </div>
    </motion.div>
  );
};

export default TextExplainBlock;
