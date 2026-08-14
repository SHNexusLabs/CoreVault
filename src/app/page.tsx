import { Hero } from "../components/home/Hero";
import { TrustBenefits } from "../components/home/TrustBenefits";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { PopularProducts } from "../components/home/PopularProducts";
import { DealsSection } from "../components/home/DealsSection";
import { FeaturedBrands } from "../components/home/FeaturedBrands";
import { PCBuilderBanner } from "../components/home/PCBuilderBanner";
import { WhyCoreVault } from "../components/home/WhyCoreVault";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBenefits />
      <CategoryGrid />
      <PopularProducts />
      <DealsSection />
      <PCBuilderBanner />
      <WhyCoreVault />
      <FeaturedBrands />
    </main>
  );
}
