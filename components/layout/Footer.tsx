import { Container } from "@/components/ui/Container";

const shopLinks = [
  { label: "All Boots", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Players", href: "/players" },
  { label: "New Arrivals", href: "/shop?sort=new" },
];

const supportLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/about" },
  { label: "FAQs", href: "/about" },
  { label: "Shipping & Returns", href: "/about" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Facebook", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
          <div>
            <a
              href="/"
              className="text-xl font-bold tracking-wider text-primary-text"
            >
              ELITE<span className="text-accent">CLEATS</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text">
              Premium football boots engineered for speed, designed for
              champions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              Shop
            </h4>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              Social
            </h4>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 text-center text-xs text-secondary-text">
          &copy; {new Date().getFullYear()} ELITE CLEATS. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
