import { useState } from "react";
import { Phone, Menu, X, Facebook, Instagram, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToQuote = () => {
    const element = document.getElementById("quote");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <header className="sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-2 md:py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-green-400" />
            <a 
              href="tel:9402055484" 
              className="font-semibold hover:text-green-400 transition-colors duration-200"
            >
              (940) 205-5484
            </a>
          </div>
          <div className="hidden sm:flex items-center space-x-3">
            <Facebook className="h-4 w-4 cursor-pointer hover:text-blue-400 hover:scale-110 transition-all duration-200" />
            <Instagram className="h-4 w-4 cursor-pointer hover:text-pink-400 hover:scale-110 transition-all duration-200" />
            <div className="h-4 w-4 bg-red-600 rounded-full cursor-pointer hover:bg-red-500 hover:scale-110 transition-all duration-200 shadow-sm"></div>
            <div className="h-4 w-4 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500 hover:scale-110 transition-all duration-200 shadow-sm"></div>
            <div className="h-4 w-4 bg-green-600 rounded-full cursor-pointer hover:bg-green-500 hover:scale-110 transition-all duration-200 shadow-sm"></div>
            <div className="h-4 w-4 bg-black rounded-full cursor-pointer hover:bg-gray-700 hover:scale-110 transition-all duration-200 shadow-sm"></div>
          </div>
          {/* Mobile-only contact info */}
          <div className="sm:hidden text-xs text-gray-300">
            Call Now
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-lg backdrop-blur-sm bg-white/95 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-green-800 uppercase tracking-wide">WELCOME HOME</h1>
                  <p className="text-sm text-green-600 uppercase tracking-wider">LANDSCAPING & POWER WASHING</p>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group"
              >
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
              <button 
                onClick={scrollToAbout} 
                className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group"
              >
                About
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
              <button 
                onClick={scrollToServices} 
                className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group"
              >
                Services
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
              <button className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group">
                Gallery
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
              <button className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group">
                Testimonials
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
              <button className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group">
                Careers
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
              <button className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group">
                Areas
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
              <button 
                onClick={scrollToContact} 
                className="relative px-4 py-2 text-gray-700 hover:text-green-800 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 group"
              >
                Contact
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </button>
            </nav>

            {/* Apply Today Button */}
            <div className="hidden md:block">
              <Button 
                onClick={scrollToQuote}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-bold uppercase tracking-wide rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  GET FREE QUOTE
                </span>
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden relative p-2 text-gray-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="relative">
                <Menu className={`h-6 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 px-4 py-6">
              <div className="space-y-1">
                <button 
                  onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Home
                  </span>
                </button>
                <button 
                  onClick={() => { scrollToAbout(); setIsMobileMenuOpen(false); }} 
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About
                  </span>
                </button>
                <button 
                  onClick={() => { scrollToServices(); setIsMobileMenuOpen(false); }} 
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Services
                  </span>
                </button>
                <button className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Gallery
                  </span>
                </button>
                <button className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Testimonials
                  </span>
                </button>
                <button className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Careers
                  </span>
                </button>
                <button className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Areas
                  </span>
                </button>
                <button 
                  onClick={() => { scrollToContact(); setIsMobileMenuOpen(false); }} 
                  className="block w-full text-left py-3 px-4 text-gray-700 font-medium hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:translate-x-1"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact
                  </span>
                </button>
                
                {/* Mobile CTA Button */}
                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      scrollToQuote();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 font-bold uppercase tracking-wide rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <span className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      GET FREE QUOTE
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
