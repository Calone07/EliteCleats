"use client";

import { brands } from "@/data/brands";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section";
import { Text } from "@/components/ui/typography";
import { useStagger } from "@/motion";

export function BrandStrip() {
  const staggerRef = useStagger<HTMLDivElement>();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Trusted Brands"
          subtitle="The world's leading football boot manufacturers."
        />

        <div
          ref={staggerRef}
          className="flex flex-wrap items-center justify-center gap-8 overflow-x-auto pb-2"
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex shrink-0 items-center justify-center px-4 py-6"
            >
              <Text
                variant="body"
                color="secondary"
                weight="bold"
                className="text-lg transition-all duration-300 hover:text-accent sm:text-2xl lg:text-3xl"
              >
                {brand.name}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
