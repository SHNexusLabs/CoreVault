import { Container, SectionHeading } from "@/components/ui";

import {
  SiAmd,
  SiIntel,
  SiNvidia,
  SiAsus,
  SiMsi,
  SiCorsair,
  SiSamsung,
  SiNzxt,
  SiCoolermaster,
  SiDeepcool,
} from "react-icons/si";

const brands = [
  { name: "AMD", icon: SiAmd },
  { name: "Intel", icon: SiIntel },
  { name: "NVIDIA", icon: SiNvidia },
  { name: "ASUS", icon: SiAsus },
  { name: "MSI", icon: SiMsi },
  { name: "Corsair", icon: SiCorsair },
  { name: "Samsung", icon: SiSamsung },
  { name: "NZXT", icon: SiNzxt },
  { name: "Cooler Master", icon: SiCoolermaster },
  { name: "DeepCool", icon: SiDeepcool },
];

function BrandRow() {
  return (
    <div className="flex shrink-0 items-center gap-12 px-6 sm:gap-16 sm:px-8">
      {brands.map((brand) => {
        const BrandIcon = brand.icon;

        return (
          <div
            key={brand.name}
            className="flex shrink-0 items-center gap-2.5 text-(--foreground-secondary) opacity-70 transition-opacity hover:opacity-100"
          >
            <BrandIcon aria-hidden="true" className="h-6 w-6 shrink-0" />

            {/* <span className="text-sm font-semibold tracking-wide">
              {brand.name}
            </span> */}
          </div>
        );
      })}
    </div>
  );
}

export function FeaturedBrands() {
  return (
    <section className="overflow-hidden border-y border-(--border) bg-(--background-secondary) py-10 sm:py-12">
      <Container>
        <SectionHeading
          title="Featured Brands"
          description="Shop products from brands you trust."
        />
      </Container>

      <div className="relative mt-2 overflow-hidden">
        {/* Left fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-(--background-secondary) to-transparent sm:w-24"
        />

        {/* Right fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-(--background-secondary) to-transparent sm:w-24"
        />

        <div className="flex w-max animate-[brand-marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
          <BrandRow />
          <BrandRow />
        </div>
      </div>
    </section>
  );
}
