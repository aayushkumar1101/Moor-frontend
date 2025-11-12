import { Header } from "@/components/homepage/Header";
import { HeroSection } from "@/components/homepage/HeroSection";
import { WebsiteAIInsights } from "@/components/homepage/WebsiteAIInsights";
import { AIReadyActions } from "@/components/homepage/AIReadyActions";
import { FooterSection } from "@/components/homepage/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="space-y-6 px-6 py-6">
        <div className="mx-auto w-full max-w-8xl">
          <HeroSection />
        </div>
        <div className="mx-auto w-full max-w-8xl">
          <WebsiteAIInsights />
        </div>
        <div className="mx-auto w-full max-w-8xl">
          <AIReadyActions />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
