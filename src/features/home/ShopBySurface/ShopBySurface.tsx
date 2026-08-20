"use client";

import { surfaces } from "@/data/surfaces";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Text } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import { useStagger } from "@/motion";

export function ShopBySurface() {
  const staggerRef = useStagger<HTMLDivElement>();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Shop by Surface"
          subtitle="Every pitch is different. Find the right boot for your ground."
        />

        <div
          ref={staggerRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {surfaces.map((surface) => (
            <Card
              key={surface.id}
              hover
              padding="lg"
              as="article"
              className="group text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-primary-bg">
                <Icon name={surface.icon} className="h-6 w-6" />
              </div>
              <Heading as="h3">
                {surface.title}
              </Heading>
              <Text
                variant="small"
                color="accent"
                weight="semibold"
                className="mb-3 mt-1 block"
              >
                {surface.label}
              </Text>
              <Text variant="caption" color="secondary">
                {surface.description}
              </Text>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
