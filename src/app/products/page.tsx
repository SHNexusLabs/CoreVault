import { Container } from "@/components/ui";
import { ProductListing, ProductListingHeader } from "@/components/products";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main>
      <Container>
        <div className="py-10 sm:py-12">
          <ProductListingHeader
            title="All Products"
            description="Explore our collection of PC components, peripherals, and technology products."
            productCount={products.length}
          />

          <ProductListing />
        </div>
      </Container>
    </main>
  );
}
