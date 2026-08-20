"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Price } from "@/components/ui/price";
import { Heading, Text } from "@/components/ui/typography";
import { cartItemKey, useCart } from "@/features/cart";
import { useStagger } from "@/motion";

export default function CartPage() {
  const { items, count, subtotal, updateQuantity, removeItem } = useCart();
  const staggerRef = useStagger<HTMLDivElement>();

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
        <Heading as="h1">Your Cart</Heading>
        <EmptyState
          icon={<ShoppingBag className="h-12 w-12" />}
          title="Your cart is empty"
          description="Browse the collection and add a pair of elite boots."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-primary-bg transition-colors hover:bg-accent/90"
            >
              Shop All Boots
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
      <Heading as="h1">Your Cart</Heading>
      <Text variant="body" color="secondary" className="mt-2">
        {count} {count === 1 ? "item" : "items"} ready for checkout.
      </Text>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div ref={staggerRef} className="divide-y divide-border rounded-2xl border border-border bg-card-bg">
          {items.map((item) => {
            const key = cartItemKey(item);
            const image = item.product.images[0];
            return (
              <div key={key} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent/[0.06] to-card-bg"
                >
                  {image && (
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-contain p-1.5"
                      sizes="96px"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" size="sm">
                      US {item.size}
                    </Badge>
                    <Text variant="caption" color="secondary">
                      {item.product.surface}
                    </Text>
                  </div>
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="text-base font-semibold text-primary-text transition-colors hover:text-accent"
                  >
                    {item.product.name}
                  </Link>
                  <Text variant="caption" color="secondary">
                    {item.product.brand}
                  </Text>
                </div>

                <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => updateQuantity(key, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center text-secondary-text transition-colors hover:text-accent"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-primary-text">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(key, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center text-secondary-text transition-colors hover:text-accent"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Price amount={item.product.price * item.quantity} size="md" />
                    <button
                      onClick={() => removeItem(key)}
                      aria-label={`Remove ${item.product.name} from cart`}
                      className="text-secondary-text transition-colors hover:text-error"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card-bg p-6">
          <Text variant="overline" color="accent">
            Order Summary
          </Text>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-secondary-text">Subtotal</dt>
              <dd className="font-semibold text-primary-text">${subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-secondary-text">Shipping</dt>
              <dd className="font-semibold text-success">Free</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-medium text-primary-text">Total</dt>
              <dd className="font-bold text-primary-text">${subtotal}</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-secondary-bg px-4 py-3">
            <X className="h-4 w-4 shrink-0 text-secondary-text" />
            <Text variant="caption" color="secondary">
              Secure checkout arrives with payments in Phase 4.
            </Text>
          </div>

          <Button variant="primary" size="lg" fullWidth className="mt-4" disabled>
            Proceed to Checkout
          </Button>
          <Link
            href="/shop"
            className="mt-3 block text-center text-sm font-medium text-secondary-text transition-colors hover:text-accent"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
