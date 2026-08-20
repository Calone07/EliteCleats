"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Heading, Text } from "@/components/ui/typography";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      await signIn("credentials", { email, password, redirect: false });
      router.push("/account");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Card padding="lg" className="w-full max-w-md">
        <Heading as="h1" className="text-3xl">
          Create Account
        </Heading>
        <Text variant="body" color="secondary" className="mt-2">
          Join ELITE CLEATS to track orders and save your favorites.
        </Text>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </div>

          {error && (
            <Text variant="caption" className="text-error">
              {error}
            </Text>
          )}

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <Text variant="caption" color="secondary" className="mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent hover:text-accent/80">
            Sign in
          </Link>
        </Text>
      </Card>
    </div>
  );
}
