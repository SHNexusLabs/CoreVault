import { brandService } from "@/services/brandService";

export async function GET() {
  return Response.json({
    brands: brandService.getAll(),
  });
}
