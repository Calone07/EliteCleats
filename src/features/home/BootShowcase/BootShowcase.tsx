"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useShowcaseAnimation } from "@/motion";

import {
  showcaseBoot,
  showcaseFeatures,
  performanceMetrics,
  type ShowcaseFeature,
  type PerformanceMetric,
} from "@/data/bootShowcase";

function IndicatorDot({ feature }: { feature: ShowcaseFeature }) {
  return (
    <span
      data-sc-dot
      className="absolute z-20 h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(212,175,55,0.6)]"
      style={{
        top: `${feature.indicatorY}%`,
        left: `${feature.indicatorX}%`,
        opacity: 0,
        scale: 0,
      }}
    />
  );
}

function ConnectorLine() {
  return (
    <svg
      data-sc-line
      className="absolute h-full w-full opacity-0"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke="rgba(212,175,55,0.25)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
    </svg>
  );
}

function TechnologyCallout({
  feature,
  index,
}: {
  feature: ShowcaseFeature;
  index: number;
}) {
  return (
    <div
      data-sc-callout
      className="hidden flex-col gap-3"
      style={{ display: index === 0 ? "flex" : "none" }}
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
        Technology
      </p>
      <h3 className="text-2xl font-bold text-primary-text sm:text-3xl">
        {feature.title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-secondary-text sm:text-base">
        {feature.description}
      </p>
    </div>
  );
}

function PerformanceRatings({ metrics }: { metrics: PerformanceMetric[] }) {
  return (
    <div
      data-sc-ratings
      className="hidden w-full max-w-md"
    >
      <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
        Performance
      </p>
      <div className="flex flex-col gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-3">
            <span className="w-20 text-sm font-medium text-primary-text sm:w-24">
              {metric.label}
            </span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-border">
              <div
                data-sc-rating-bar
                className="h-full rounded-full bg-accent"
                style={{
                  width: `${(metric.value / 10) * 100}%`,
                }}
              />
            </div>
            <span
              data-sc-rating-value
              className="w-8 text-right text-sm font-medium text-secondary-text"
              style={{ opacity: 0 }}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BootShowcase() {
  const containerRef = useShowcaseAnimation();

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <p
          data-sc-headline
          className="text-accent mb-3 text-center text-xs font-medium uppercase tracking-[0.25em]"
        >
          {showcaseBoot.tagline}
        </p>
        <h2
          data-sc-headline
          className="text-primary-text mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {showcaseBoot.name}
        </h2>

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex items-center justify-center">
            <div
              data-sc-boot
              className="relative z-10 aspect-[3/4] w-full max-w-sm"
            >
              <div
                data-sc-boot-float
                className="relative h-full w-full"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/[0.06] via-card-bg to-primary-bg shadow-2xl shadow-accent/5">
                  <Image
                    src={showcaseBoot.image}
                    alt={showcaseBoot.alt}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 640px) 320px, 448px"
                    priority
                  />
                </div>

                {showcaseFeatures.map((feature) => (
                  <IndicatorDot key={feature.id} feature={feature} />
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-8">
            <div className="relative min-h-[280px] lg:min-h-[200px]">
              <div className="absolute inset-0 flex flex-col justify-center">
                {showcaseFeatures.map((feature, index) => (
                  <TechnologyCallout
                    key={feature.id}
                    feature={feature}
                    index={index}
                  />
                ))}
              </div>

              <ConnectorLine />
            </div>

            <PerformanceRatings metrics={performanceMetrics} />

            <div data-sc-cta className="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg">
                <a href="/shop">Explore the Collection</a>
              </Button>
              <Button variant="outline" size="lg">
                <a href="/collections/nike-mercurial">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
