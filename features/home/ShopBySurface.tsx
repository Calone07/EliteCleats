import { surfaces } from "@/constants/surfaces";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";

export function ShopBySurface() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Shop by Surface"
          subtitle="Every pitch is different. Find the right boot for your ground."
        />

        <Grid cols={{ default: 1, sm: 2, md: 3, lg: 5 }} gap={4}>
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
        </Grid>
      </Container>
    </section>
  );
}
