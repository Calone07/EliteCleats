import type { Brand } from "@/types";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";

interface BrandCardProps {
  brand: Brand;
}

/**
 * Brand showcase card displaying the brand name with hover effect.
 *
 * @example
 * <BrandCard brand={{ id: "nike", name: "Nike", logo: "/images/brands/nike.svg" }} />
 */
export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Card
      hover
      padding="lg"
      as="article"
      className="flex items-center justify-center"
    >
      <Text
        variant="body"
        color="secondary"
        weight="semibold"
        className="text-center text-lg transition-colors duration-300 hover:text-accent sm:text-xl"
      >
        {brand.name}
      </Text>
    </Card>
  );
}
