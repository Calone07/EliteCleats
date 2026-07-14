import { brands } from "@/constants/brands";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function FeaturedBrands() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Featured Brands"
          subtitle="The world's leading football boot manufacturers."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group flex items-center justify-center rounded-xl border border-border bg-card-bg px-6 py-10 transition-all duration-300 hover:scale-[1.02] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="text-lg font-semibold text-secondary-text transition-colors duration-300 group-hover:text-accent sm:text-xl">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
