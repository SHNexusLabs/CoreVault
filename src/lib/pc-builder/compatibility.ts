import type { Product } from "@/types/product";
import type { PCBuild, PCComponentType } from "@/types/pc-builder";

function getSpec(product: Product, key: string): string {
  return product.specifications?.[key]?.toString().toLowerCase() ?? "";
}

function getPower(product: Product): number {
  const power = getSpec(product, "Power");
  const match = power.match(/(\d+)\s*w/);

  return match ? Number(match[1]) : 0;
}

function socketsMatch(first: Product, second: Product): boolean {
  const firstSocket = getSpec(first, "Socket");
  const secondSocket = getSpec(second, "Socket");

  if (!firstSocket || !secondSocket) {
    return true;
  }

  return firstSocket === secondSocket;
}

function memoryMatches(motherboard: Product, ram: Product): boolean {
  const motherboardMemory = getSpec(motherboard, "Memory");
  const ramType = getSpec(ram, "Type");

  if (!motherboardMemory || !ramType) {
    return true;
  }

  return motherboardMemory === ramType;
}

function isPsuEnough(psu: Product, build: PCBuild): boolean {
  const psuPower = getPower(psu);

  if (!psuPower) {
    return true;
  }

  const cpuPower = build.cpu ? getPower(build.cpu) : 0;
  const gpuPower = build.gpu ? getPower(build.gpu) : 0;

  const estimatedSystemPower = cpuPower + gpuPower + 150;
  const requiredPower = Math.ceil(estimatedSystemPower * 1.25);

  return psuPower >= requiredPower;
}

export function isCompatible(
  type: PCComponentType,
  product: Product,
  build: PCBuild,
): boolean {
  if (type === "motherboard" && build.cpu) {
    return socketsMatch(product, build.cpu);
  }

  if (type === "cpu" && build.motherboard) {
    return socketsMatch(product, build.motherboard);
  }

  if (type === "ram" && build.motherboard) {
    return memoryMatches(build.motherboard, product);
  }

  if (type === "motherboard" && build.ram) {
    return memoryMatches(product, build.ram);
  }

  if (type === "psu") {
    return isPsuEnough(product, build);
  }

  return true;
}
