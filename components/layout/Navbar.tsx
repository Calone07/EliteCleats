"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { navLinks } from "@/constants/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-bg/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <div className="flex items-center gap-8 lg:gap-12">
          <a href="/" className="text-xl sm:text-2xl font-bold tracking-wider text-primary-text">
            ELITE<span className="text-accent">CLEATS</span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-secondary-text transition-colors duration-200 hover:text-primary-text relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-secondary-text transition-colors duration-200 hover:text-primary-text"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Wishlist"
            className="text-secondary-text transition-colors duration-200 hover:text-primary-text hidden sm:block"
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            aria-label="Cart"
            className="text-secondary-text transition-colors duration-200 hover:text-primary-text relative"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary-text ml-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col border-t border-border bg-primary-bg/95 backdrop-blur-md px-4 pb-6 pt-4 space-y-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 text-base font-medium text-secondary-text transition-colors duration-200 hover:text-primary-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="sm:hidden pt-2 border-t border-border">
            <button
              aria-label="Wishlist"
              className="flex items-center gap-3 py-2 text-base font-medium text-secondary-text transition-colors duration-200 hover:text-primary-text"
            >
              <Heart className="h-5 w-5" />
              Wishlist
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
