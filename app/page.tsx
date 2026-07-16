import { Hero } from "@/features/home/Hero";
import { BrandStrip } from "@/features/home/BrandStrip";
import { FeaturedCollection } from "@/features/home/FeaturedCollection";
import { FeaturedBoots } from "@/features/home/FeaturedBoots";
import { ShopBySurface } from "@/features/home/ShopBySurface";
import { TechnologyShowcase } from "@/features/home/TechnologyShowcase";
import { WhyEliteCleats } from "@/features/home/WhyEliteCleats";
import { Newsletter } from "@/features/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <FeaturedCollection />
      <FeaturedBoots />
      <ShopBySurface />
      <TechnologyShowcase />
      <WhyEliteCleats />
      <Newsletter />
    </>
  );
}
