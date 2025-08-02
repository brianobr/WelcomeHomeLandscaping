import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Clock } from "lucide-react";
import aboutImage from "@assets/AdobeStock_110038306_1753936308650.jpeg";

const values = [
  {
    icon: Shield,
    title: "Professional Excellence",
    description: "We bring professional expertise and attention to detail to every job."
  },
  {
    icon: Award,
    title: "Quality Service",
    description: "Complete landscaping and power washing with uncompromising standards."
  },
  {
    icon: Users,
    title: "Family Owned",
    description: "Founded and operated by a family that understands commitment to community."
  },
  {
    icon: Clock,
    title: "Reliable",
    description: "On-time service you can count on, with flexible financing available."
  }
];

export default function AboutSection() {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToQuote = () => {
    const element = document.getElementById("quote");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
            About Welcome Home Landscaping & Power Washing
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <h3 className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Family-owned landscaping and power washing business serving Aubrey, Celina, Prosper, Frisco and surrounding North Texas areas 
            with professional excellence and dedication to quality.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                At Welcome Home Landscaping & Power Washing, we have been providing top-quality landscaping services to our customers for over 10 years. Our team of experienced professionals is committed to ensuring that your outdoor spaces look their best with complete lawn care and pressure washing services.
              </p>
              
              <p>
                As a family-owned and operated business, we understand the value of hard work, reliability, and attention to detail. We treat every property with the same respect and care we would give our own, ensuring that your landscape receives the professional attention it deserves.
              </p>
              
              <p>
                From fence repair and irrigation installation to tree trimming and pressure washing, we use proven techniques and quality equipment to deliver exceptional results. We offer comprehensive services including herbicide treatments, French drainage systems, and flexible mowing schedules.
              </p>
              
              <p>
                Choose Welcome Home Landscaping & Power Washing for reliable, professional service that makes your property shine. We offer financing for jobs over $500 and stand behind our work with complete customer satisfaction.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToServices}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-base font-bold uppercase tracking-wide rounded-none"
              >
                VIEW SERVICES
              </Button>
              <Button 
                onClick={scrollToQuote}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-bold uppercase tracking-wide rounded-none"
              >
                GET ESTIMATE
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="text-center">
              <img 
                src={aboutImage}
                alt="Welcome Home Landscaping & Power Washing Team"
                className="w-64 h-64 rounded-lg object-cover mx-auto mb-6 border-4 border-green-700"
              />
              <div className="bg-green-700 text-white py-2 px-4 rounded uppercase font-bold tracking-wide">
                Family Owned & Operated
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6 border border-gray-200 hover:border-green-600 transition-colors duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="text-white h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}