import { productService } from "@/services/productService";
import { parseProductQuery } from "@/lib/productQuery";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = parseProductQuery(searchParams);

  const result = productService.search(query);

  return Response.json(result);
}