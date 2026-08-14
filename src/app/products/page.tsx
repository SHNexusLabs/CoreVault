import { Container } from "@/components/ui";
import { ProductListing } from "@/components/products";

export default function ProductsPage() {
  return (
    <main>
      <Container>
        <div className="py-10 sm:py-12">
          <ProductListing />
        </div>
      </Container>
    </main>
  );
}
