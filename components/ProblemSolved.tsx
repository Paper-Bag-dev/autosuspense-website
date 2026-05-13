"use client";

import React, { useState } from "react";
import AutoLogo from "./common/AutoLogo";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Zap,
  Shield,
  Layers,
  FileCode,
  Braces,
} from "lucide-react";
import { cn } from "./common/utils";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { AutoSuspense, Suspend } from "autosuspense";
import { CodeSkeleton, TitleSkeleton, TextSkeleton, CodeContentSkeleton } from "./common/Skeletons";

// Global cache for demo purposes
const highlighterCache = new Map<string, Promise<void>>();

const SuspendedHighlighter = Suspend(
  ({ code, active }: { code: string; active: number }) => {
    const id = `highlighter-${active}-${code.length}`;
    
    if (!highlighterCache.has(id)) {
      const p = new Promise<void>((resolve) => {
        // More randomized delay for organic feel
        const delay = 400 + Math.random() * 1200;
        setTimeout(() => {
          (p as any).resolved = true;
          resolve();
        }, delay);
      });
      highlighterCache.set(id, p);
      throw p;
    }

    const p = highlighterCache.get(id)!;
    if (!(p as any).resolved) throw p;

    return (
      <SyntaxHighlighter
        language="tsx"
        style={oneDark}
        customStyle={{ background: "transparent", margin: 0, padding: 0, fontSize: "0.875rem" }}
        codeTagProps={{ style: { fontFamily: "monospace" } }}
      >
        {code}
      </SyntaxHighlighter>
    );
  },
  "code", // Use a KEY instead of a hardcoded component!
);

// Stable cache for problems data
const sectionsData = [
  { id: 1, title: "1. Fallback Hell", desc: "Currently fallback logic tied to parent usage. Which makes it difficult to adapt. By using Suspend() we are able to provide fallback per component level and merge them later." },
  { id: 2, title: "2. Fragile Declarations", desc: "Today app structure changes break suspense fallback logic. To prevent that the entire fallback tree is collected and prebuilt so it always matches your app structure." },
  { id: 3, title: "3. Fallback Mapping", desc: "Per AutoSuspense Component Centralized fallback system with keys for easier maintainability." }
];

// Header (now static and always visible)
const ProblemsHeader = () => {
  return (
    <div className="text-center mb-24">
      <div className="text-4xl md:text-6xl flex flex-col justify-center w-full font-bold text-white">
        <div>The problems</div>
        <div className="flex justify-center py-4">
          <AutoLogo />
        </div>
        <div>solves.</div>
      </div>
    </div>
  );
};

// Interactive part
const ProblemsContent = () => {
  return <ProblemSolvedInteractive sections={sectionsData} />;
};

const SuspendedContent = Suspend(ProblemsContent, (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full opacity-50">
    <div className="space-y-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/5 space-y-4">
          <div className="h-6 bg-white/10 rounded w-1/3" />
          <div className="h-4 bg-white/10 rounded w-full" />
        </div>
      ))}
    </div>
    <div className="space-y-12">
      <CodeSkeleton />
      <div className="pt-4">
        <CodeSkeleton />
      </div>
    </div>
  </div>
));

// A wrapper that DETERMINISTICALLY decides to be a boundary or not!
const OrganicBoundary = ({ children, active, tab }: { children: React.ReactNode; active: any; tab: any }) => {
  // Use the ID to pick a stable mode (odd = boundary, even = bubble)
  const idValue = (active || 0) + (tab === "parent" ? 1 : 0);
  const shouldBeBoundary = idValue % 2 === 0;

  if (shouldBeBoundary) {
    // LOCAL BOUNDARY: Uses a skeleton that fits INSIDE the existing box
    return (
      <AutoSuspense fallbacks={{ code: <CodeContentSkeleton /> }}>
        {children}
      </AutoSuspense>
    );
  }
  return <>{children}</>;
};

const ProblemSolvedInteractive = ({ sections }: { sections: any[] }) => {
  const [active, setActive] = useState<number>(1);
  const [fileTab, setFileTab] = useState<"parent" | "child">("parent");

  const codeMap: any = {
    1: {
      before: `// Before (React Suspense)\n<Suspense fallback={<ProfileSkeleton />}>\n  <Profile />\n</Suspense>\n\n<Suspense fallback={<FeedSkeleton />}>\n  <Feed />\n</Suspense>`,
      after: {
        parent: `// Parent.tsx\n<AutoSuspense>\n  <Profile />\n</AutoSuspense>\n<AutoSuspense>\n  <Feed />\n</AutoSuspense>`,
        child: `// Profile.tsx\nimport { Suspend } from "autosuspense";\nexport default Suspend(Profile, <ProfileSkeleton />);\n\n// Feed.tsx\nexport default Suspend(Feed, <FeedSkeleton />);`,
      },
    },
    2: {
      before: `// Before (structure dependent)\n<Suspense fallback={<Loader />}>\n  <Layout>\n    <Nested>\n      <Component />\n    </Nested>\n  </Layout>\n</Suspense>`,
      after: {
        parent: `// Parent.tsx\n<AutoSuspense>\n  <Layout>\n    <Nested>\n      <Component />\n    </Nested>\n  </Layout>\n</AutoSuspense>`,
        child: `// Layout.tsx\nimport { Suspend } from "autosuspense";\nconst Layout = ({ children }) => { ... };\nexport default Suspend(Layout, <LayoutLoader />);`,
      },
    },
    3: {
      after: {
        parent: `// Parent.tsx\n<AutoSuspense fallbacks={{ profile: <ProfileSkeleton /> }}>\n  <Child />\n</AutoSuspense>`,
        child: `// Child.tsx\nimport { Suspend } from "autosuspense";\nexport default Suspend(MyChild, "profile");`,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-16">
      <div className="flex-1 max-w-xl space-y-12">
        {sections.map((sec) => (
          <motion.div
            key={sec.id}
            onClick={() => setActive(sec.id)}
            className={cn(
              "p-8 rounded-2xl border cursor-pointer transition",
              active === sec.id
                ? "bg-blue-500/10 border-blue-500/40"
                : "bg-slate-800/20 border-slate-800 hover:border-blue-500/30",
            )}
          >
            <h3 className="text-2xl font-bold text-white mb-2">{sec.title}</h3>
            <p className="text-slate-400">{sec.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 space-y-6">
        {active !== 3 && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 min-h-[200px]">
            <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">Before</div>
            <OrganicBoundary active={active} tab="before">
              <SuspendedHighlighter code={codeMap[active].before || ""} active={active} />
            </OrganicBoundary>
          </div>
        )}

        <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden min-h-[300px]">
          <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/50">
            <button onClick={() => setFileTab("parent")} className={cn("flex items-center gap-2 px-4 py-3 text-sm border-b-2", fileTab === "parent" ? "text-primary border-accent" : "text-secondary border-transparent")}>
              <FileCode className="w-4 h-4" /> Parent.tsx
            </button>
            <button onClick={() => setFileTab("child")} className={cn("flex items-center gap-2 px-4 py-3 text-sm border-b-2", fileTab === "child" ? "text-primary border-accent" : "text-secondary border-transparent")}>
              <Braces className="w-4 h-4" /> Child.tsx
            </button>
          </div>
          <div className="p-6 text-sm">
            <OrganicBoundary active={active} tab={fileTab}>
              <SuspendedHighlighter code={codeMap[active].after[fileTab]} active={active} />
            </OrganicBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemSolved = () => {
  return (
    <div id="usage" className="w-full py-32 px-6 border-y border-slate-800/50 min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex justify-center pb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-md font-medium mb-6">
            <Zap className="w-4 h-4" />
            The Solution
          </div>
        </div>

        <ProblemsHeader />

        <div className="min-h-[500px]">
          <AutoSuspense fallbacks={{ code: <CodeSkeleton /> }}>
            <SuspendedContent />
          </AutoSuspense>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolved;
