import { Suspense } from "react";

import { Container } from "@/components/ui";
import { ProductListing } from "@/components/products";

function ProductListingFallback() {
  return <div className="py-10 text-center">Loading products...</div>;
}

export default function ProductsPage() {
  return (
    <main>
      <Container>
        <div className="py-10 sm:py-12">
          <Suspense fallback={<ProductListingFallback />}>
            <ProductListing />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
