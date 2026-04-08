"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useSpring } from "framer-motion";
import Main from "./Main";

export default function Home() {
  const { scrollY } = useScroll();

  const gridY = useTransform(scrollY, [0, 1000], [0, 250]);
  const smoothGridY = useSpring(gridY, { stiffness: 80, damping: 20 });

  const orb1Y = useTransform(scrollY, [0, 1000], [0, 400]);
  const orb2Y = useTransform(scrollY, [0, 1000], [0, 500]);
  const orb3Y = useTransform(scrollY, [0, 1000], [0, 600]);

  const orb1X = useTransform(scrollY, [0, 1000], [0, 40]);
  const orb2X = useTransform(scrollY, [0, 1000], [0, -60]);
  const orb3X = useTransform(scrollY, [0, 1000], [0, 30]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <div className="space-bg">
        <motion.div style={{ y: smoothGridY }} className="grid" />

        <div className="orbs">
          <motion.div style={{ y: orb1Y, x: orb1X }} className="orb orb1" />
          <motion.div style={{ y: orb2Y, x: orb2X }} className="orb orb2" />
          <motion.div style={{ y: orb3Y, x: orb3X }} className="orb orb3" />
        </div>
      </div>

      <div className="relative z-10">
        <Main />
      </div>
    </div>
  );
}
