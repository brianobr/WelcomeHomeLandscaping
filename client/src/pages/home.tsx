import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import InstantPricingForm from "@/components/instant-pricing-form";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section-new";
import ReviewsSection from "@/components/reviews-section";
import Footer from "@/components/footer";
import { VideoPreloader } from "@/components/video-preloader";

// Preload hero video sources for better performance
const heroVideoSources = [
  {
    src: "/videos/hero-background-1080p.mp4",
    quality: "high" as const
  },
  {
    src: "/videos/hero-background-720p.mp4", 
    quality: "medium" as const
  },
  {
    src: "/videos/hero-background-480p.mp4",
    quality: "low" as const
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Preload hero video for better performance */}
      <VideoPreloader 
        sources={heroVideoSources} 
        priority="high" 
        preloadAmount="metadata" 
      />
      
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
