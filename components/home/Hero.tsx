"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const bootPath =
  "M48,150 L48,125 Q33,115 33,75 Q33,40 68,40 L123,40 Q148,40 148,65 L148,100 Q148,115 133,115 L118,115 L118,140 L48,140 Z";

const studs = [
  { cx: 53, cy: 150 },
  { cx: 70, cy: 150 },
  { cx: 90, cy: 150 },
  { cx: 107, cy: 150 },
  { cx: 122, cy: 150 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden lg:min-h-screen">
      <div className="mx-auto flex flex-col lg:min-h-screen lg:flex-row">
        <div className="flex flex-col justify-center px-4 pt-28 pb-12 sm:px-6 lg:w-1/2 lg:px-8 lg:pb-0 lg:pt-0">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent mb-5 text-sm font-medium uppercase tracking-[0.25em]"
          >
            Premium Football Boots
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Play Beyond
            <br />
            <span className="text-accent">Limits.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-secondary-text mt-6 max-w-md text-base leading-relaxed sm:text-lg"
          >
            Engineered for speed. Designed for champions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button variant="primary" size="lg">
              Shop Now
            </Button>
            <Button variant="outline" size="lg">
              Explore Collection
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex min-h-[50vh] items-center justify-center overflow-hidden lg:w-1/2 lg:min-h-screen"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_60%)]" />

          <div className="relative z-10 h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                d={bootPath}
                fill="currentColor"
                className="text-accent/30"
              />
              {studs.map((stud) => (
                <circle
                  key={stud.cx}
                  cx={stud.cx}
                  cy={stud.cy}
                  r="4"
                  fill="currentColor"
                  className="text-accent/30"
                />
              ))}
            </svg>
          </div>

          <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full border border-accent/10" />
          <div className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full border border-accent/5" />
        </motion.div>
      </div>
    </section>
  );
}
