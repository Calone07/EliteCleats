import Link from "next/link";
import { Container } from "@/components/ui/container";
import { brands } from "@/data/brands";
import { collections } from "@/data/collections";

const shopLinks = [
  { label: "All Boots", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=new" },
  { label: "Best Sellers", href: "/shop?sort=popular" },
  { label: "Sale", href: "/shop?sort=sale" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "Size Guide", href: "/size-guide" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:py-20">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider text-primary-text"
            >
              ELITE<span className="text-accent">CLEATS</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text">
              Premium football boots engineered for speed, designed for
              champions.
            </p>
            <p className="mt-4 text-xs text-secondary-text">
              Join the newsletter for exclusive drops.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              Shop
            </h4>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              Brands
            </h4>
            <ul className="mt-5 space-y-3">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/shop?brand=${brand.id}`}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-accent"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              Collections
            </h4>
            <ul className="mt-5 space-y-3">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-accent"
                  >
                    {collection.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              Support
            </h4>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-secondary-text transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-secondary-text transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-xs text-secondary-text">
              &copy; {new Date().getFullYear()} ELITE CLEATS
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
