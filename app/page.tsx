import { Hero } from "@/components/home/Hero";
import { FeaturedBrands } from "@/components/home/FeaturedBrands";
import { FeaturedBoots } from "@/components/home/FeaturedBoots";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Collections } from "@/components/home/Collections";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBrands />
      <FeaturedBoots />
      <WhyChooseUs />
      <Collections />
      <Newsletter />
    </>
  );
}
