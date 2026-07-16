import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";

const features = [
  {
    icon: "shield",
    title: "Authentic Products",
    description:
      "Every boot is sourced directly from official manufacturers. We guarantee 100% authenticity on every order.",
  },
  {
    icon: "truck",
    title: "Fast Shipping",
    description:
      "Free express shipping on all orders. Track your package in real-time from our warehouse to your doorstep.",
  },
  {
    icon: "message-circle",
    title: "Expert Recommendations",
    description:
      "Not sure which boot fits your game? Our team of football specialists will help you find the perfect pair.",
  },
];

export function WhyEliteCleats() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Why ELITE CLEATS"
          subtitle="Built for performance. Backed by trust."
        />

        <Grid cols={{ default: 1, md: 3 }} gap={6}>
          {features.map((feature) => (
            <Card
              key={feature.title}
              hover
              padding="lg"
              as="article"
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon name={feature.icon} className="h-7 w-7" />
              </div>
              <Heading as="h3">
                {feature.title}
              </Heading>
              <Text
                variant="body"
                color="secondary"
                className="mt-4 leading-relaxed"
              >
                {feature.description}
              </Text>
            </Card>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
