import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";

const serviceAreas = [
  "Aubrey, TX",
  "Celina, TX", 
  "Prosper, TX",
  "Frisco, TX",
  "Little Elm, TX",
  "Providence Village, TX",
  "Oak Point, TX",
  "Cross Roads, TX"
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-wide">WELCOME HOME</h3>
                <p className="text-gray-300 uppercase tracking-wider text-sm">LANDSCAPING & POWER WASHING</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Family-owned landscaping and power washing company serving North Texas with professional service and dedication. 
              Complete lawn care, fence repair, irrigation, tree trimming, and pressure washing services.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-pink-400 transition-colors" />
              <div className="h-5 w-5 bg-red-600 rounded-full cursor-pointer hover:bg-red-500 transition-colors"></div>
              <div className="h-5 w-5 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500 transition-colors"></div>
              <div className="h-5 w-5 bg-green-600 rounded-full cursor-pointer hover:bg-green-500 transition-colors"></div>
              <div className="h-5 w-5 bg-black rounded-full cursor-pointer hover:bg-gray-600 transition-colors"></div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wide">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-green-400 h-5 w-5 mt-1" />
                <div>
                  <p className="font-semibold">Service Area</p>
                  <p className="text-gray-300">Aubrey, Celina, Prosper<br />Frisco & Surrounding Areas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-green-400 h-5 w-5" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a 
                    href="tel:9724096288" 
                    className="text-gray-300 hover:text-white transition-colors font-bold"
                  >
                    (972) 409-6288
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="text-green-400 h-5 w-5 mt-1" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Email</p>
                  <a 
                    href="mailto:welcomehomelandscapingllc@gmail.com" 
                    className="text-gray-300 hover:text-white transition-colors text-sm break-all leading-relaxed"
                  >
                    welcomehomelandscaping<br />llc@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wide">Service Areas</h4>
            <ul className="space-y-2 text-gray-300">
              {serviceAreas.map((area, index) => (
                <li key={index} className="border-l-2 border-green-600 pl-3 py-1">{area}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 Welcome Home Landscaping & Power Washing. All rights reserved. | Family Owned & Operated
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
