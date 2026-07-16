import { brands } from "@/constants/brands";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";

export function BrandStrip() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Trusted Brands"
          subtitle="The world's leading football boot manufacturers."
        />

        <Flex
          gap={8}
          align="center"
          justify="center"
          wrap
          className="overflow-x-auto pb-2"
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
        </Flex>
      </Container>
    </section>
  );
}
