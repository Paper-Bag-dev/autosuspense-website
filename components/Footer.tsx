"use client";

import { Mail, Globe, Code2, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const  Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 px-6 py-16 text-slate-400">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}
        <div className="flex flex-wrap justify-between gap-12 mb-16">
          {/* BRAND */}
          <div className="flex-1 min-w-[260px] max-w-md">
            <h3 className="text-white text-xl font-bold mb-4 tracking-tight">
              autosuspense
            </h3>

            <p className="text-sm leading-relaxed mb-6">
              A better way to manage React Suspense. Declare loading where it
              belongs and let the tree build itself.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4">
              <a
                href="https://github.com/Paper-Bag-dev"
                target="_blank"
                className="p-2 rounded-md bg-slate-900 hover:bg-slate-800 transition"
              >
                <FaGithub className="w-4 h-4 text-slate-300 hover:text-white" />
              </a>

              <a
                href="https://www.linkedin.com/in/vikalp-sharma-/"
                target="_blank"
                className="p-2 rounded-md bg-slate-900 hover:bg-slate-800 transition"
              >
                <FaLinkedin className="w-4 h-4 text-slate-300 hover:text-white" />
              </a>

              <a
                href="mailto:vikalpsh1234@gmail.com"
                className="p-2 rounded-md bg-slate-900 hover:bg-slate-800 transition"
              >
                <Mail className="w-4 h-4 text-slate-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* RESOURCES */}
          <div className="min-w-[160px]">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.npmjs.com/package/autosuspense"
                  className="hover:text-white transition"
                >
                  NPM Package
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/Paper-Bag-dev/autosuspense"
                  className="hover:text-white transition"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Examples
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* YOU */}
          <div className="min-w-[160px]">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Me
            </h4>

            <ul className="space-y-3 text-sm">
              {/* <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Globe className="w-4 h-4" />
                  Portfolio
                </a>
              </li> */}

              <li>
                <a
                  href="https://leetcode.com/u/vikalp_sh_/"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Code2 className="w-4 h-4" />
                  LeetCode
                </a>
              </li>

              <li>
                <a
                  href="https://drive.google.com/file/d/1AyZ4TO-9kDU1GOpj8FMv_JjPYhle4pao/view?usp=sharing"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} autosuspense</p>

          <p>Built for devs who hate rewiring fallbacks.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
