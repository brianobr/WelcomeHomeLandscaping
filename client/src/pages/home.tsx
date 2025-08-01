import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import InstantPricingForm from "@/components/instant-pricing-form";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section-new";
import ReviewsSection from "@/components/reviews-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
