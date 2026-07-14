import { boots } from "@/constants/boots";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedBoots() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Featured Boots"
          subtitle="Engineered for every style of play."
        />

        <ProductGrid>
          {boots.map((boot, index) => (
            <ProductCard key={boot.id} boot={boot} index={index} />
          ))}
        </ProductGrid>
      </Container>
    </section>
  );
}
