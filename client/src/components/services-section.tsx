import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import grassImage from "@assets/pexels-fox-58267-212324_1753936308650.jpg";
import fenceRepairImage from "@assets/IMG_9740_1754014114739.jpg";
import irrigationImage from "@assets/pexels-joerg-hartmann-626385254-29090712_1754014456099.jpg";
import gardeningImage from "@assets/IMG_9720_1754014114739.jpg";
import electricalImage from "@assets/pexels-akashni-weimers-3904954-13785838_1754014456099.jpg";
import pressureWashingImage from "@assets/AdobeStock_357864219_1753936308650.jpeg";
import treeTrimmingImage from "@assets/AdobeStock_357688722_1753936308650.jpeg";

const services = [
  {
    title: "Lawn Mowing",
    description: "Weekly or every 10 days professional mowing services. We offer mowing packages with herbicide treatment for a complete lawn care solution.",
    image: grassImage,
    alt: "Professional Lawn Mowing Service"
  },
  {
    title: "Fence Repair",
    description: "Professional fence repair services including fixing leaning fences and structural issues to restore your property's security and appearance.",
    image: fenceRepairImage,
    alt: "Welcome Home Landscaping Fence Repair Work"
  },
  {
    title: "Irrigation & Drainage",
    description: "Expert irrigation installation, French drainage systems, and minor sprinkler repairs to keep your landscape properly watered.",
    image: irrigationImage,
    alt: "Professional irrigation pump and drainage system installation"
  },
  {
    title: "Tree & Bush Trimming",
    description: "Professional tree and bush trimming services. Available as individual service or as part of our convenient package deals.",
    image: treeTrimmingImage,
    alt: "Welcome Home Landscaping Tree and Bush Trimming Services"
  },
  {
    title: "Herbicides & Pesticides",
    description: "Professional herbicide and pesticide treatments to keep your lawn healthy and pest-free. Available with mowing packages.",
    image: gardeningImage,
    alt: "Welcome Home Landscaping Herbicide and Pesticide Treatment"
  },
  {
    title: "Pressure Washing",
    description: "Complete pressure washing services for driveways, sidewalks, decks, and exterior surfaces to restore your property's appearance.",
    image: pressureWashingImage,
    alt: "Welcome Home Landscaping Pressure Washing Services"
  }
];

export default function ServicesSection() {
  const scrollToQuote = () => {
    const element = document.getElementById("quote");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete landscaping and power washing services including fence repair, irrigation, tree trimming, 
            herbicide treatment, pressure washing, and more in Aubrey, Celina, Prosper, Frisco and surrounding areas.
            <span className="block mt-2 font-semibold text-green-600">Financing available for jobs over $500!</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <Button 
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package Deals Section */}
        <div className="bg-green-50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-6 uppercase tracking-wide">
            Popular Package Deals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Mowing + Herbicide Package</h4>
              <p className="text-gray-600">Complete lawn care solution combining weekly/10-day mowing with professional herbicide treatment for a healthy, weed-free lawn.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Tree & Bush Trimming Package</h4>
              <p className="text-gray-600">Comprehensive trimming services for all your trees and bushes to maintain beautiful, healthy landscape features.</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-lg font-semibold text-green-700 mb-2">💰 Financing Available</p>
            <p className="text-gray-600">For any job over $500, we offer flexible financing options to make your landscaping dreams affordable.</p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={scrollToQuote}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold uppercase tracking-wide rounded-none shadow-lg transition-all duration-300"
          >
            Get Your Free Estimate
          </Button>
        </div>
      </div>
    </section>
  );
}
