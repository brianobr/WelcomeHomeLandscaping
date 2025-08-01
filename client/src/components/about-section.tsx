import { Home, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImage from "@assets/AdobeStock_110038306_1753936308650.jpeg";

const features = [
  "Family Owned",
  "11+ Years Experience", 
  "Licensed & Insured",
  "Free Estimates"
];

export default function AboutSection() {
  const scrollToQuote = () => {
    const element = document.getElementById("quote");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={aboutImage}
              alt="Professional landscaping and lawn care service"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div>
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Home className="text-white h-8 w-8" />
            </div>
            <h2 className="text-4xl font-bold text-warm-gray mb-6">About Welcome Home Landscaping & Power Washing</h2>
            <p className="text-lg text-gray-600 mb-6">
              Welcome Home Landscaping & Power Washing is a trusted provider of lawn care and maintenance services. With a focus on quality, affordability, and customer satisfaction, we take pride in our family-owned business.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Since 2014, we've been providing comprehensive landscaping and power washing services including fence repair, irrigation installation, tree trimming, herbicide treatment, and pressure washing to families across Aubrey, Celina, Prosper, Frisco, and surrounding areas. We offer flexible payment plans and financing for jobs over $500.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span className="font-semibold">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={scrollToQuote}
              className="bg-gradient-to-r from-primary to-forest-green text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Get Your Free Quote Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
