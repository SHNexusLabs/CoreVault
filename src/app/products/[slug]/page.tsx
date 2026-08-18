import { notFound } from "next/navigation";

import { productService } from "@/services/productService";
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

  const product = productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = productService.getRelated(
    product.id,
    product.category,
  );

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
