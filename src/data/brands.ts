export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
}

export const brands: Brand[] = [
  {
    id: "brand-amd",
    name: "AMD",
    slug: "amd",
    description: "High-performance processors and graphics cards.",
    logo: "/brands/amd.svg",
  },
  {
    id: "brand-intel",
    name: "Intel",
    slug: "intel",
    description: "Processors and computing technologies.",
    logo: "/brands/intel.svg",
  },
  {
    id: "brand-nvidia",
    name: "NVIDIA",
    slug: "nvidia",
    description: "Powerful graphics and accelerated computing.",
    logo: "/brands/nvidia.svg",
  },
  {
    id: "brand-asus",
    name: "ASUS",
    slug: "asus",
    description: "PC hardware, components, and gaming products.",
    logo: "/brands/asus.svg",
  },
  {
    id: "brand-msi",
    name: "MSI",
    slug: "msi",
    description: "Gaming hardware and PC components.",
    logo: "/brands/msi.svg",
  },
  {
    id: "brand-gigabyte",
    name: "Gigabyte",
    slug: "gigabyte",
    description: "Motherboards, graphics cards, and PC hardware.",
    logo: "/brands/gigabyte.svg",
  },
];
