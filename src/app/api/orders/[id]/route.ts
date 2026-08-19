import { orderService } from "@/services/orderService";

interface OrderRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: OrderRouteProps,
) {
  const { id } = await params;

  const order = orderService.getById(id);

  if (!order) {
    return Response.json(
      { error: "Order not found." },
      { status: 404 },
    );
  }

  return Response.json({ order });
}