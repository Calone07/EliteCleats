import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { SignOutButton } from "@/features/account";

export const metadata: Metadata = {
  title: "My Account | ELITE CLEATS",
  description: "Manage your ELITE CLEATS account.",
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <Heading as="h1">My Account</Heading>
      <Text variant="body" color="secondary" className="mt-2">
        Welcome back, {session.user.name}.
      </Text>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card padding="lg">
          <Text variant="overline" color="accent">
            Profile
          </Text>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-secondary-text">
                Name
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-primary-text">
                {session.user.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-secondary-text">
                Email
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-primary-text">
                {session.user.email}
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </Card>

        <Card padding="lg">
          <Text variant="overline" color="accent">
            Orders
          </Text>
          <Text variant="body" color="secondary" className="mt-4">
            No orders yet. Checkout is coming in the next phase — your cart is
            ready when it arrives.
          </Text>
        </Card>
      </div>
    </div>
  );
}
