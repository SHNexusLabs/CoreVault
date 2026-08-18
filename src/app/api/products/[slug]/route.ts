import { productService } from "@/services/productService";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;

  const product = productService.getBySlug(slug);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
