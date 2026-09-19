import { notFound, permanentRedirect } from "next/navigation";

import { mockProducts } from "@/entities/product/model/mock-data";

interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    woodType?: string | string[];
  }>;
}

// Старый URL → новый URL по slug
export default async function ProductRedirectPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  // Ищем товар по старому ID
  const product = mockProducts.find((product) => product.id === id);

  if (!product) {
    notFound();
  }

  // Сохраняем выбранную породу
  const woodType =
    typeof resolvedSearchParams.woodType === "string"
      ? resolvedSearchParams.woodType
      : undefined;

  const url = woodType
    ? `/catalog/${product.slug}?woodType=${woodType}`
    : `/catalog/${product.slug}`;

  permanentRedirect(url);
}
