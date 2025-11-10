import { Header } from "@/components/homepage/Header";
import { HeroSection } from "@/components/homepage/HeroSection";
import { FeaturesSection } from "@/components/homepage/FeaturesSection";
import { AIReadinessSection } from "@/components/homepage/AIReadinessSection";
import { FooterSection } from "@/components/homepage/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#efefef]">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AIReadinessSection />
        <FooterSection />
      </main>
    </div>
  );
}
