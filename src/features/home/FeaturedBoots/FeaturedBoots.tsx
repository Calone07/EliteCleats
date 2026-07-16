import { boots } from "@/data/boots";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section";
import { Grid } from "@/components/ui/grid";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";

const featuredBoots = boots.slice(0, 6);

export function FeaturedBoots() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Featured Boots"
          subtitle="Engineered for every style of play."
        />

        <Grid cols={{ default: 1, sm: 2, lg: 3 }} gap={6}>
          {featuredBoots.map((boot, index) => (
            <div key={boot.id} className="relative">
              {boot.surface && (
                <div className="absolute right-3 top-3 z-20">
                  <Badge variant="default" size="sm">
                    {boot.surface}
                  </Badge>
                </div>
              )}
              <ProductCard boot={boot} index={index} />
            </div>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
