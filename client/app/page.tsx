import { HelpCircle } from "lucide-react";
import Hero from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { TrendingDestinations } from "../components/TrendingDestinations";
import { CommunitySafety } from "../components/CommunitySafety";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans">
      <Hero />
      <HowItWorks />
      <TrendingDestinations />
      <CommunitySafety />
      <Testimonials />
      <Footer />

      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-[#0a1628] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-cyan-600 transition-all duration-300 border border-white/10"
          aria-label="Help Center"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}