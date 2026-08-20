import {
  CinematicHero,
  BootShowcase,
  BrandStrip,
  FeaturedCollection,
  FeaturedBoots,
  ShopBySurface,
  TechnologyShowcase,
  WhyEliteCleats,
  Newsletter,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <BootShowcase />
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
