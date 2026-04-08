"use client";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolved from "@/components/ProblemSolved";
import Footer from "@/components/Footer";

const Main = () => {
  return (
    <main className="relative flex flex-col w-full">
      <Header />
      <Hero />
      <ProblemSolved />


      <div id="compatibility" className="w-full py-20 px-6 bg-slate-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            What it works with
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["React 16+", "Next.js", "Vite", "Remix"].map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Main;
