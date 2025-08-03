import { Button } from "@/components/ui/button";
import InstantPricingForm from "./instant-pricing-form";
import { AdaptiveVideo } from "./adaptive-video";

// Optimized video sources for different connection speeds
const videoSources = [
  {
    src: "/videos/hero-background-1080p.mp4",
    quality: "high" as const,
    resolution: "1920x1080",
    size: "~2MB"
  },
  {
    src: "/videos/hero-background-720p.mp4", 
    quality: "medium" as const,
    resolution: "1280x720",
    size: "~1MB"
  },
  {
    src: "/videos/hero-background-480p.mp4",
    quality: "low" as const,
    resolution: "854x480", 
    size: "~500KB"
  }
];

const videoPoster = "/videos/hero-background-poster.jpg";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Simple Video Background for debugging */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
        onLoadStart={() => console.log('Simple video loading started')}
        onCanPlay={() => console.log('Simple video ready to play')}
        onError={(error) => console.error('Simple video error:', error)}
        onPlay={() => console.log('Simple video playing')}
        onPause={() => console.log('Simple video paused')}
      >
        <source src="/videos/hero-background-1080p.mp4" type="video/mp4" />
        <source src="/videos/hero-background-720p.mp4" type="video/mp4" />
        <source src="/videos/hero-background-480p.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Debug overlay */}
      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs p-2 rounded z-50">
        DEBUG: Simple Video Element
      </div>


      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" style={{ zIndex: 2 }}></div>
      
      <div className="container mx-auto px-4 relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20" style={{ zIndex: 3 }}>
        {/* Left Side - Hero Content */}
        <div className="text-left text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-shadow-lg">
            Complete Landscaping &<br />
            Power Washing Services in<br />
            <span className="text-green-400">Aubrey, Celina,</span><br />
            <span className="text-green-400">Prosper</span> & <span className="text-green-400">Frisco Tx</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-200 font-light leading-relaxed">
            Professional mowing, fence repair, irrigation, tree trimming, herbicide treatment, 
            and pressure washing services in Celina, Aubrey, Prosper, Frisco, Oak Point, 
            Cross Roads, Krugerville, Little Elm, Savannah, Providence Village TX and 
            surrounding areas. <span className="font-semibold">Financing available for jobs over $500!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToServices}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-base font-bold uppercase tracking-wide rounded-none shadow-lg transition-all min-w-[160px]"
            >
              OUR SERVICES
            </Button>
            <Button 
              onClick={scrollToContact}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-base font-bold uppercase tracking-wide rounded-none min-w-[160px] transition-all"
            >
              CONTACT US
            </Button>
          </div>
        </div>

        {/* Right Side - Floating Pricing Form */}
        <div className="relative" style={{ zIndex: 4 }}>
          <InstantPricingForm isFloating={true} />
        </div>
      </div>
    </section>
  );
}
