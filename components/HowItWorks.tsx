"use client";

import { motion } from "motion/react";
import TextExplainBlock from "./common/TextExplainBlock";
import { steps } from "@/data/textData";
import { AutoSuspense } from "autosuspense";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative w-full py-20 bg-transparent text-white">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            How it works.
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Think in terms of the nearest suspense boundary.
            Build reusable fallback blocks that automatically compose themselves
            based on your React tree structure.
          </p>
        </motion.div>
      </div>

      {/* Steps Content */}
      <div className="relative z-10 w-full pb-32">
        <div className="max-w-7xl mx-auto">
          {steps.map((step, ind) => (
            <TextExplainBlock
              key={ind}
              ind={ind}
              title={step.title}
              desc={step.desc}
              code={step.code}
            />
          ))}
        </div>

        {/* Final CTA/Footer space */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center px-6 text-center"
        >
          <div className="h-px w-24 bg-blue-500/30 mb-12" />
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to automate your suspense?</h3>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all transform hover:scale-105">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
