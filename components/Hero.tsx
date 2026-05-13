"use client";

import CodePreview from "./CodePreview";
import CopyCommand from "./common/CopyCommand";
import { motion } from "framer-motion";
import { AutoSuspense } from "autosuspense";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side: Content */}
        <div className="flex-1 text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Manage React Skeletons <br />
              <span className="text-blue-500">with Ease.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
              Stop manually wiring fallbacks. AutoSuspense handles your complex
              component trees, letting you focus on building features, not
              skeletons.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="#problem"
                className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all shadow-xl shadow-white/10"
              >
                Get Started
              </a>
              <a
                href="https://www.npmjs.com/package/autosuspense"
                target="_blank"
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full border border-slate-800 hover:border-slate-700 transition-all"
              >
                View on NPM
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Code Preview */}
        <div className="flex-1 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AutoSuspense>
              <CodePreview delay={2000} />
            </AutoSuspense>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 w-full max-w-4xl z-20"
      >
        <div className="text-center mb-2 ">
          <p className="text-lg font-mono text-secondary uppercase tracking-widest">
            Install
          </p>
        </div>
        <CopyCommand />
      </motion.div>
    </section>
  );
};

export default Hero;
