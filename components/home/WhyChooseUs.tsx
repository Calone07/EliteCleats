import { Shield, Truck, Lock, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const features = [
  {
    icon: Shield,
    title: "Premium Quality",
    description:
      "Every boot is sourced directly from official manufacturers and rigorously inspected for authenticity and performance.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Free express shipping on all orders. Track your package in real-time from our warehouse to your doorstep.",
  },
  {
    icon: Lock,
    title: "Secure Shopping",
    description:
      "Your privacy and security matter. All transactions are encrypted and protected by industry-standard security.",
  },
  {
    icon: Users,
    title: "Trusted by Players",
    description:
      "Join thousands of athletes who trust ELITE CLEATS for their game-day footwear. Rated 4.8 out of 5 by customers.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Why Choose ELITE CLEATS"
          subtitle="Built for performance. Backed by quality."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card-bg p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-8"
            >
              <feature.icon className="h-8 w-8 text-accent transition-all duration-300 group-hover:scale-110" />
              <h3 className="mt-5 text-lg font-semibold text-primary-text sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
