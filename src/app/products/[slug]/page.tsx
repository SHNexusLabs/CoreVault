import { notFound } from "next/navigation";

import { products } from "@/data/products";
import {
  ProductBreadcrumbs,
  ProductDescription,
  ProductGallery,
  ProductInfo,
  ProductPurchase,
  ProductSpecifications,
  RelatedProducts,
  ProductTrust,
  ProductServiceInfo,
  ProductReviews,
} from "@/components/products";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductBreadcrumbs product={product} />

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div>
            <ProductInfo product={product} />
            <ProductPurchase product={product} />
            <ProductServiceInfo product={product} />
          </div>
        </div>

        <ProductTrust />

        <ProductDescription product={product} />

        <ProductSpecifications product={product} />

        <ProductReviews product={product} />

        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
