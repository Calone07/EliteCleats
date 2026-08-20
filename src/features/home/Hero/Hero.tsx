"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { useHeroAnimation } from "@/motion";

export function Hero() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const heroRef = useHeroAnimation(loaderComplete);

  return (
    <>
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}

      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden -mt-[104px] sm:-mt-[120px] pt-[104px] sm:pt-[120px]"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-primary-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,175,55,0.04)_0%,transparent_50%)]" />

        <div className="absolute top-1/4 left-[15%] h-64 w-64 rounded-full border border-accent/[0.04]" />
        <div className="absolute bottom-1/3 right-[10%] h-96 w-96 rounded-full border border-accent/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/[0.02] blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-screen flex-col lg:flex-row">
          <div className="flex flex-col justify-center px-4 pt-24 pb-12 sm:px-6 lg:w-1/2 lg:px-12 lg:pb-0 lg:pt-0">
            <p
              data-hero-label
              className="text-accent mb-5 text-sm font-medium uppercase tracking-[0.25em]"
            >
              Elite Performance Footwear
            </p>

            <h1
              data-hero-headline
              className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Engineered For
              <br />
              <span className="text-accent">The Beautiful Game.</span>
            </h1>

            <p
              data-hero-subtitle
              className="text-secondary-text mt-6 max-w-md text-base leading-relaxed sm:text-lg"
            >
              Discover premium football boots trusted by professionals around the
              world.
            </p>

            <div
              data-hero-cta
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                className="transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
              >
                Shop Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="transition-all duration-300 hover:shadow-lg hover:shadow-white/5 hover:-translate-y-0.5"
              >
                Explore Brands
              </Button>
            </div>
          </div>

          <div
            data-hero-image
            className="relative flex min-h-[40vh] items-center justify-center overflow-hidden lg:w-1/2 lg:min-h-screen"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent" />

            <div className="relative z-10 h-64 w-64 sm:h-80 sm:w-80 lg:h-[28rem] lg:w-[28rem]">
              <div
                data-hero-image-inner
                className="relative h-full w-full"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-accent/[0.08] via-card-bg to-primary-bg border border-border shadow-2xl shadow-accent/5">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src="/videos/nikefootball-20260724-0001.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 right-1/3 h-24 w-24 rounded-full border border-accent/[0.06]" />
            <div className="absolute bottom-1/4 left-1/4 h-32 w-32 rounded-full border border-accent/[0.04]" />
          </div>
        </div>

        <div data-hero-scroll>
          <ScrollIndicator delay={3.5} />
        </div>
      </section>
    </>
  );
}
