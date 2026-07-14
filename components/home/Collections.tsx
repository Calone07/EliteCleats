import { collections } from "@/constants/collections";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const gradients = [
  "from-amber-900/60 via-red-950/40 to-primary-bg",
  "from-blue-900/60 via-teal-950/40 to-primary-bg",
  "from-violet-900/60 via-accent/10 to-primary-bg",
];

export function Collections() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Featured Collections"
          subtitle="Curated for every style of play."
        />

        <div className="space-y-6 sm:space-y-8">
          {collections.map((collection, index) => (
            <a
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className={`group relative flex min-h-[300px] items-end overflow-hidden rounded-xl bg-gradient-to-br ${gradients[index]} sm:min-h-[350px] lg:min-h-[400px]`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary-bg/80 via-primary-bg/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              <div className="relative z-10 w-full p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-primary-text sm:text-3xl lg:text-4xl">
                  {collection.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-secondary-text sm:text-base">
                  {collection.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-300 group-hover:gap-3">
                  Explore Collection
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M3 8H13M13 8L8 3M13 8L8 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
