import { Container } from "@/components/ui";
import {
  ProductFilters,
  ProductGrid,
  ProductListingHeader,
} from "@/components/products";

export default function ProductsPage() {
  return (
    <main>
      <Container>
        <div className="py-10 sm:py-12">
          <ProductListingHeader
            title="All Products"
            description="Explore our collection of PC components, peripherals, and technology products."
            productCount={128}
          />

          <div className="mt-8 flex gap-6">
            <ProductFilters />

            <div className="min-w-0 flex-1">
              <ProductGrid />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}