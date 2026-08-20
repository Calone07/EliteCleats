"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Heart, ShoppingBag, Menu, X, LogIn, User } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { announcements } from "@/data/announcements";
import { CartDrawer, useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

gsap.registerPlugin(ScrollTrigger);

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-primary-bg">
      {count}
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { count: cartCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const isHome = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/shop" && pathname.startsWith("/products")) return true;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (!isHome || initialized.current || isReducedMotion()) return;
    initialized.current = true;

    const navBg = navBgRef.current;
    if (!navBg) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top -40px",
        end: "top -41px",
        onEnter: () => {
          gsap.to(navBg, {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            duration: duration.fast,
            ease: easing.standard,
          });
        },
        onLeaveBack: () => {
          gsap.to(navBg, {
            backgroundColor: "rgba(10, 10, 10, 0)",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            borderBottom: "0px solid rgba(255, 255, 255, 0)",
            duration: duration.fast,
            ease: easing.standard,
          });
        },
      });
    }, navBg);

    return () => ctx.revert();
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHome]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const announcementHeight = "h-10";
  const navHeight = "h-16 sm:h-20";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {isHome && (
        <div
          role="banner"
          aria-live="polite"
          className={`relative w-full overflow-hidden bg-primary-text text-primary-bg ${announcementHeight}`}
        >
          <div className="flex h-full items-center justify-center px-4">
            <p
              key={announcementIndex}
              className="animate-fade-in text-xs font-medium tracking-wider sm:text-sm"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {announcements[announcementIndex].text}
            </p>
          </div>
        </div>
      )}

      <div
        ref={navBgRef}
        className={`will-change-[background-color,box-shadow] backdrop-blur-xl ${
          isHome ? announcementHeight : ""
        }`}
        style={{
          backgroundColor: isHome ? "rgba(10,10,10,0)" : "rgba(10,10,10,0.9)",
          borderBottom: isHome ? "0px solid rgba(255,255,255,0)" : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <nav
          className={`mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 ${navHeight}`}
        >
          <div className="flex items-center gap-6 lg:gap-10">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold tracking-wider text-primary-text"
            >
              ELITE<span className="text-accent">CLEATS</span>
            </Link>

            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${
                        active
                          ? "text-primary-text after:w-full"
                          : "text-secondary-text hover:text-primary-text after:w-0 hover:after:w-full"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="text-secondary-text transition-colors duration-200 hover:text-primary-text"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlistCount ? ` (${wishlistCount} items)` : ""}`}
              className="relative hidden text-secondary-text transition-colors duration-200 hover:text-primary-text sm:block"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
            </Link>

            <button
              onClick={openCart}
              aria-label={`Open cart${cartCount ? ` (${cartCount} items)` : ""}`}
              className="relative text-secondary-text transition-colors duration-200 hover:text-primary-text"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <CountBadge count={cartCount} />}
            </button>

            {session?.user ? (
              <Link
                href="/account"
                aria-label="My account"
                className="text-secondary-text transition-colors duration-200 hover:text-primary-text"
              >
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/login"
                aria-label="Sign in"
                className="text-secondary-text transition-colors duration-200 hover:text-primary-text"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            )}

            <div className="hidden lg:block">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-primary-bg transition-colors duration-200 hover:bg-accent/90"
              >
                Shop Now
              </Link>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-primary-text"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-primary-bg/95 backdrop-blur-xl border-l border-border shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          <span className="text-lg font-bold tracking-wider text-primary-text">
            Menu
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-primary-text"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block py-3 text-base font-medium transition-colors duration-200 ${
                    active ? "text-accent" : "text-secondary-text hover:text-primary-text"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-border px-4 py-6">
          <Link
            href="/shop"
            className="block w-full rounded-lg bg-accent px-6 py-3 text-center text-base font-medium text-primary-bg transition-colors hover:bg-accent/90"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop Now
          </Link>
        </div>

        <div className="border-t border-border px-4 py-6">
          <Link
            href="/wishlist"
            aria-label={`Wishlist${wishlistCount ? ` (${wishlistCount} items)` : ""}`}
            className="flex items-center gap-3 py-2 text-base font-medium text-secondary-text transition-colors duration-200 hover:text-primary-text"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Heart className="h-5 w-5" />
            Wishlist
            {wishlistCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-primary-bg">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <CartDrawer />
    </header>
  );
}
