"use client";

import { Container } from "@/components/ui/Container";

export function Newsletter() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/5 via-transparent to-accent/5 px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />

          <div className="relative z-10 mx-auto max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary-text sm:text-4xl">
              Stay in the Loop
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text sm:text-base">
              Be the first to know about new drops, exclusive offers, and
              limited releases.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 rounded-lg border border-border bg-card-bg px-4 py-3 text-sm text-primary-text placeholder-secondary-text outline-none transition-colors duration-200 focus:border-accent/50"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary-bg transition-all duration-200 hover:bg-accent/90"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-xs text-secondary-text">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
