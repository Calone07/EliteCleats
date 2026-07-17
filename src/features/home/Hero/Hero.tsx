import Image from "next/image";
import { Button } from "@/components/ui/button";

const heroImage = "/images/boots/nike/kevinfooty_-hero.webp";

export function Hero() {
  return (
    <section className="relative overflow-hidden lg:min-h-[calc(100vh-5rem)]">
      <div className="mx-auto flex flex-col lg:min-h-[calc(100vh-5rem)] lg:flex-row">
        <div className="flex flex-col justify-center px-4 pt-12 pb-12 sm:px-6 lg:w-1/2 lg:px-12 lg:pb-0 lg:pt-0">
          <p
            style={{ animationDelay: "0s" }}
            className="animate-fade-in text-accent mb-5 text-sm font-medium uppercase tracking-[0.25em]"
          >
            Elite Performance Footwear
          </p>
          <h1
            style={{ animationDelay: "0.1s" }}
            className="animate-fade-in text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Engineered For
            <br />
            <span className="text-accent">The Beautiful Game.</span>
          </h1>
          <p
            style={{ animationDelay: "0.2s" }}
            className="animate-fade-in text-secondary-text mt-6 max-w-md text-base leading-relaxed sm:text-lg"
          >
            Discover premium football boots trusted by professionals around the
            world.
          </p>
          <div
            style={{ animationDelay: "0.3s" }}
            className="animate-fade-in mt-10 flex flex-wrap gap-4"
          >
            <Button variant="primary" size="lg">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg">
              Explore Brands
            </Button>
          </div>
        </div>

        <div
          style={{ animationDelay: "0.3s", animationDuration: "0.8s" }}
          className="animate-fade-in relative flex min-h-[50vh] items-center justify-center overflow-hidden lg:w-1/2 lg:min-h-[calc(100vh-5rem)]"
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
        </div>
      </div>
    </section>
  );
}
