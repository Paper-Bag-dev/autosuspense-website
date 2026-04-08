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

const ProblemSolved = () => {
  const [active, setActive] = useState<1 | 2 | 3>(1);
  const [fileTab, setFileTab] = useState<"parent" | "child">("parent");

  const codeMap = {
    1: {
      before: `// Before (React Suspense)
<Suspense fallback={<ProfileSkeleton />}>
  <Profile />
</Suspense>

<Suspense fallback={<FeedSkeleton />}>
  <Feed />
</Suspense>`,
      after: {
        parent: `// Parent.tsx
<AutoSuspense>
  <Profile />
</AutoSuspense>
<AutoSuspense>
  <Feed />
</AutoSuspense>`,
        child: `// Profile.tsx
import { Suspend } from "autosuspense";
export default Suspend(Profile, <ProfileSkeleton />);

// Feed.tsx
export default Suspend(Feed, <FeedSkeleton />);`,
      },
    },

    2: {
      before: `// Before (structure dependent)
<Suspense fallback={<Loader />}>
  <Layout>
    <Nested>
      <Component />
    </Nested>
  </Layout>
</Suspense>`,
      after: {
        parent: `// Parent.tsx
<AutoSuspense>
  <Layout>
    <Nested>
      <Component />
    </Nested>
  </Layout>
</AutoSuspense>`,
        child: `// Layout.tsx
import { Suspend } from "autosuspense";

const Layout = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Suspend(Layout, <LayoutLoader />);


// Nested.tsx
import { Suspend } from "autosuspense";

const Nested = ({ children }) => {
  return <div className="nested">{children}</div>;
};

export default Suspend(Nested, <NestedLoader />);


// Component.tsx
import { Suspend } from "autosuspense";

const Component = () => {
  return <div>Data</div>;
};

export default Suspend(Component, <ComponentLoader />);`,
      },
    },

    3: {
      after: {
        parent: `// Parent.tsx
<AutoSuspense
  fallbacks={{
    profile: <ProfileSkeleton />,
  }}
>
  <Child />
</AutoSuspense>`,
        child: `// Child.tsx
import { Suspend } from "autosuspense";

const MyChild = () => {
  return (
    <div className="content">
      <h1>Data loaded</h1>
    </div>
  );
};

export default Suspend(MyChild, "profile");`,
      },
    },
  };

  return (
    <div id="usage" className="w-full py-32 px-6 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="text-4xl md:text-6xl flex flex-col justify-center w-full font-bold text-white">
            <div>The problems</div>

            <div className="flex justify-center py-4">
              <AutoLogo />
            </div>

            <div>solves.</div>
          </div>
        </motion.div>
        <div className="w-full flex justify-center pb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-md font-medium mb-6">
            <Zap className="w-4 h-4" />
            The Solution
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          {/* LEFT */}
          <div className="flex-1 max-w-xl space-y-12">
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                onClick={() => setActive(num as 1 | 2 | 3)}
                className={cn(
                  "p-8 rounded-2xl border cursor-pointer transition",
                  active === num
                    ? "bg-blue-500/10 border-blue-500/40"
                    : "bg-slate-800/20 border-slate-800 hover:border-blue-500/30",
                )}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {num === 1 && "1. Fallback Hell"}
                  {num === 2 && "2. Fragile Declarations"}
                  {num === 3 && "3. Fallback Mapping"}
                </h3>
                <p className="text-slate-400">
                  {num === 1 &&
                    "Currently fallback logic tied to parent usage. Which makes it difficult to adapt. By using Suspend() we are able to provide fallback per component level and merge them later."}
                  {num === 2 &&
                    "Today app structure changes break suspense fallback logic. To prevent that the entire fallback tree is collected and prebuilt so it always matches your app structure."}
                  {num === 3 &&
                    "Per AutoSuspense Component Centralized fallback system with keys for easier maintainability."}
                </p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex-1 space-y-6">
            {/* BEFORE BLOCK (only for 1 & 2) */}
            {active !== 3 && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">
                  Before
                </div>

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
                    style: { fontFamily: "monospace" },
                  }}
                >
                  {codeMap[active].before}
                </SyntaxHighlighter>
              </div>
            )}

            {/* AFTER BLOCK */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden">
              {/* FILE TABS */}
              <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/50">
                <button
                  onClick={() => setFileTab("parent")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm border-b-2",
                    fileTab === "parent"
                      ? "text-primary border-accent"
                      : "text-secondary border-transparent",
                  )}
                >
                  <FileCode className="w-4 h-4" />
                  Parent.tsx
                </button>

                <button
                  onClick={() => setFileTab("child")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm border-b-2",
                    fileTab === "child"
                      ? "text-primary border-accent"
                      : "text-secondary border-transparent",
                  )}
                >
                  <Braces className="w-4 h-4" />
                  Child.tsx
                </button>

                <div className="ml-auto flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
              </div>

              {/* CODE */}
              <div className="p-6 text-sm">
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
                    style: { fontFamily: "monospace" },
                  }}
                >
                  {codeMap[active].after[fileTab]}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolved;
