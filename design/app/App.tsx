import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { TrendingDestinations } from "./components/trending-destinations";
import { CommunitySafety } from "./components/community-safety";
import { Testimonials } from "./components/testimonials";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <TrendingDestinations />
      <CommunitySafety />
      <Testimonials />
      <Footer />
    </div>
  );
}
