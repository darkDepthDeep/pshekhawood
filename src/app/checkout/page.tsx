import type { Metadata } from "next";

import { CheckoutForm } from "@/features/checkout/ui/CheckoutForm";

export const metadata: Metadata = {
  // SEO страницы оформления заказа
  title: "Оформление заказа",
  description: "Оформление заказа на изделия PshekhaWood.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Оформление заказа
        </h1>

        <p className="mt-2 text-muted-foreground">
          Укажите контактные данные и информацию для доставки.
        </p>
      </div>

      <CheckoutForm />
    </main>
  );
}
