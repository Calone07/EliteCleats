"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Price } from "@/components/ui/price";
import { Text } from "@/components/ui/typography";
import { cartItemKey, useCart } from "./CartContext";

export function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, removeItem, updateQuantity } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-primary-bg/95 backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-primary-text">
              Cart{count > 0 && <span className="ml-2 text-sm font-normal text-secondary-text">({count})</span>}
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-secondary-text transition-colors hover:bg-white/5 hover:text-primary-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-secondary-text/50" />
            <Text variant="body" color="secondary">
              Your cart is empty.
            </Text>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-primary-bg transition-colors hover:bg-accent/90"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((item) => {
                const key = cartItemKey(item);
                const image = item.product.images[0];
                return (
                  <li key={key} className="flex gap-4 py-5">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-accent/[0.06] to-card-bg">
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-contain p-1"
                          sizes="80px"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Text variant="overline" color="secondary">
                            {item.product.brand}
                          </Text>
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="mt-0.5 line-clamp-2 text-sm font-semibold text-primary-text transition-colors hover:text-accent"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(key)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="text-secondary-text transition-colors hover:text-error"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center text-secondary-text transition-colors hover:text-accent"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-primary-text">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center text-secondary-text transition-colors hover:text-accent"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <Text variant="caption" color="secondary">
                            US {item.size}
                          </Text>
                          <Price amount={item.product.price * item.quantity} size="sm" />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-border px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <Text variant="body" color="secondary">
                  Subtotal
                </Text>
                <Price amount={subtotal} size="md" />
              </div>
              <Text variant="caption" color="secondary" className="mb-4">
                Shipping and taxes calculated at checkout.
              </Text>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full rounded-lg bg-accent px-6 py-3.5 text-center text-base font-medium text-primary-bg transition-colors hover:bg-accent/90"
              >
                View Cart & Checkout
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full rounded-lg px-6 py-3 text-sm font-medium text-secondary-text transition-colors hover:text-primary-text"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
