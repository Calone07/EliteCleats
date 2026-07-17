import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { Text } from "@/components/ui/typography";

const collectionImage = "/images/collections/nike-mercurial.webp";

export function FeaturedCollection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card-bg">
            <Image
              src={collectionImage}
              alt="Nike Mercurial featured collection"
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <Text
              variant="overline"
              color="accent"
              className="mb-4"
            >
              Featured Collection
            </Text>
            <Heading as="h2">
              Nike Mercurial
            </Heading>
            <Text
              variant="body"
              color="secondary"
              className="mt-6 max-w-lg leading-relaxed"
            >
              Engineered for explosive speed. The Mercurial series has been
              trusted by the world&apos;s fastest players for over two decades.
              Precision, acceleration, and a barefoot feel — redefined.
            </Text>
            <div className="mt-8">
              <Button variant="outline" size="lg">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
