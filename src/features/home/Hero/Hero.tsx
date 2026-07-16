"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const heroImage = "/images/boots/hero-boot.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden lg:min-h-[calc(100vh-5rem)]">
      <div className="mx-auto flex flex-col lg:min-h-[calc(100vh-5rem)] lg:flex-row">
        <div className="flex flex-col justify-center px-4 pt-12 pb-12 sm:px-6 lg:w-1/2 lg:px-12 lg:pb-0 lg:pt-0">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent mb-5 text-sm font-medium uppercase tracking-[0.25em]"
          >
            Elite Performance Footwear
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Engineered For
            <br />
            <span className="text-accent">The Beautiful Game.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-secondary-text mt-6 max-w-md text-base leading-relaxed sm:text-lg"
          >
            Discover premium football boots trusted by professionals around the
            world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button variant="primary" size="lg">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg">
              Explore Brands
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex min-h-[50vh] items-center justify-center overflow-hidden lg:w-1/2 lg:min-h-[calc(100vh-5rem)]"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_60%)]" />

          <div className="relative z-10 h-64 w-64 animate-float sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-accent/10 via-card-bg to-primary-bg border border-border">
              <Image
                src={heroImage}
                alt="Premium football boot showcase"
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                priority
              />
            </div>
          </div>

          <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full border border-accent/10" />
          <div className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full border border-accent/5" />
        </motion.div>
      </div>
    </section>
  );
}
