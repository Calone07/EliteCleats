"use client";

import Image from "next/image";
import { technologies } from "@/data/technologies";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { Text } from "@/components/ui/typography";
import { useTechAnimation } from "@/motion";

const techImage = "/images/tech/placeholder.jpg";

export function TechnologyShowcase() {
  const sectionRef = useTechAnimation();

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-secondary-bg">
      <Container>
        <SectionTitle
          title="Built for Performance"
          subtitle="Every detail engineered to elevate your game."
          light
        />

        <div className="space-y-20 sm:space-y-28">
          {technologies.map((tech, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={tech.id}
                data-tech-row
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  data-tech-image
                  className={`relative aspect-video overflow-hidden rounded-xl border border-border bg-card-bg ${
                    isReversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={techImage}
                    alt={tech.title}
                    fill
                    className="object-contain p-4 opacity-60"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div
                  data-tech-content
                  className={isReversed ? "lg:order-1" : ""}
                >
                  <Text
                    variant="overline"
                    color="accent"
                    className="mb-3"
                  >
                    Technology
                  </Text>
                  <Heading as="h3">
                    {tech.title}
                  </Heading>
                  <Text
                    variant="body"
                    color="secondary"
                    className="mt-6 leading-relaxed"
                  >
                    {tech.description}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
