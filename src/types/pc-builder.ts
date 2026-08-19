import type { Product } from "@/types/product";

export type PCComponentType =
  | "cpu"
  | "motherboard"
  | "ram"
  | "gpu"
  | "storage"
  | "psu"
  | "case";

export interface PCBuild {
  cpu?: Product;
  motherboard?: Product;
  ram?: Product;
  gpu?: Product;
  storage?: Product;
  psu?: Product;
  case?: Product;
}

export const pcComponentLabels: Record<PCComponentType, string> = {
  cpu: "CPU",
  motherboard: "Motherboard",
  ram: "RAM",
  gpu: "Graphics Card",
  storage: "Storage",
  psu: "Power Supply",
  case: "PC Case",
};
