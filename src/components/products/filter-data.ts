export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export const filterGroups: FilterGroup[] = [
  {
    id: "brand",
    label: "Brand",
    options: [
      { label: "AMD", value: "amd", count: 18 },
      { label: "Intel", value: "intel", count: 15 },
      { label: "NVIDIA", value: "nvidia", count: 22 },
      { label: "ASUS", value: "asus", count: 17 },
      { label: "MSI", value: "msi", count: 14 },
      { label: "Corsair", value: "corsair", count: 12 },
    ],
  },
  {
    id: "category",
    label: "Category",
    options: [
      { label: "Processors", value: "processors", count: 24 },
      { label: "Graphics Cards", value: "graphics-cards", count: 28 },
      { label: "Motherboards", value: "motherboards", count: 19 },
      { label: "Memory", value: "memory", count: 16 },
      { label: "Storage", value: "storage", count: 21 },
      { label: "Cooling", value: "cooling", count: 12 },
    ],
  },
  {
    id: "availability",
    label: "Availability",
    options: [
      { label: "In Stock", value: "in-stock", count: 104 },
      { label: "Out of Stock", value: "out-of-stock", count: 24 },
    ],
  },
  {
    id: "rating",
    label: "Rating",
    options: [
      { label: "4★ & above", value: "4", count: 76 },
      { label: "3★ & above", value: "3", count: 109 },
    ],
  },
];
