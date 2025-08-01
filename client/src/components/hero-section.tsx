import { Button } from "@/components/ui/button";
import InstantPricingForm from "./instant-pricing-form";
import videoSrc from "@assets/13346173_3840_2160_25fps_1753936308649.mp4";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Optional: Disable video on mobile to save bandwidth
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-900 bg-cover bg-center" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))'}}>
      {/* Video Background with Fallback */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
          console.log('Video failed to load, using fallback background');
          e.currentTarget.style.display = 'none';
        }}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Add WebM source if available for better compression */}
        {/* <source src={webmVideoSrc} type="video/webm" /> */}
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-5"></div>
      
      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
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
        <div className="relative z-20">
          <InstantPricingForm isFloating={true} />
        </div>
      </div>
    </section>
  );
}
