import { dealService } from "@/services/dealService";

export async function GET() {
  return Response.json({
    deals: dealService.getAll(),
  });
}
