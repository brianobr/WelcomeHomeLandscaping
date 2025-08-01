import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InstantPricingFormProps {
  isFloating?: boolean;
}

export default function InstantPricingForm({ isFloating = false }: InstantPricingFormProps) {
  const [formData, setFormData] = useState({
    zipCode: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    hearAbout: ''
  });

  const zipCodes = [
    '76227', '75068', '76258', '75009', '75078', '75071', '75034', '75035'
  ];

  const hearAboutOptions = [
    'Company Truck', 'Customer Referral', 'Facebook', 'Flyer (Direct Mail)', 
    'Flyer (Door Hanger)', 'Google', 'Yard Sign', 'Other'
  ];

  const isOutOfServiceArea = formData.zipCode === 'other';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  if (isFloating) {
    return (
      <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="text-center">
            <div className="inline-block bg-yellow-400 text-red-900 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3 rounded-sm">
              Free Estimate
            </div>
            <CardTitle className="text-2xl">
              <span className="font-bold uppercase tracking-wide">Get Instant<br />Pricing</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="zipCode" className="text-sm font-bold text-gray-800 uppercase">Zip Code*</Label>
              <Select value={formData.zipCode} onValueChange={(value) => setFormData({...formData, zipCode: value})}>
                <SelectTrigger className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600">
                  <SelectValue placeholder="Select Zip Code" />
                </SelectTrigger>
                <SelectContent>
                  {zipCodes.map(zip => (
                    <SelectItem key={zip} value={zip} className="text-base py-2">{zip}</SelectItem>
                  ))}
                  <SelectItem value="other" className="text-base py-2">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isOutOfServiceArea && (
              <div className="bg-red-50 border-2 border-red-200 p-3 rounded-lg">
                <p className="text-red-700 font-bold text-xs">
                  Outside Service Area - Call{' '}
                  <a href="tel:9402055484" className="underline">
                    (940) 205-5484
                  </a>
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="name" className="text-sm font-bold text-gray-800 uppercase">Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-bold text-gray-800 uppercase">Phone*</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                placeholder="(940) 555-0123"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-bold text-gray-800 uppercase">Email*</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-sm font-bold text-gray-800 uppercase">Street Address*</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div>
              <Label htmlFor="city" className="text-sm font-bold text-gray-800 uppercase">City*</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                placeholder="Aubrey"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-base font-bold uppercase tracking-wide rounded-none shadow-lg"
              disabled={isOutOfServiceArea}
            >
              Get My Free Estimate
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <section id="quote" className="py-24 bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white mb-16">
          <div className="inline-block bg-red-600 text-white px-6 py-2 text-sm font-bold uppercase tracking-widest mb-6 rounded-none">
            Free Estimate
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tight leading-tight">
            Get <span className="text-yellow-400">Instant</span><br />
            <span className="text-yellow-400">Pricing</span>
          </h2>
          <p className="text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Professional lawn care services with military precision.<br />
            <span className="text-green-300">Get your customized quote in minutes.</span>
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
            <CardTitle className="text-3xl text-center">
              <span className="font-bold uppercase tracking-wide">Request Your Quote</span>
            </CardTitle>
            <p className="text-center text-red-100 mt-2">Fill out the form below for your free estimate</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="zipCode" className="text-base font-bold text-gray-800 uppercase tracking-wide">Zip Code*</Label>
                <Select value={formData.zipCode} onValueChange={(value) => setFormData({...formData, zipCode: value})}>
                  <SelectTrigger className="mt-2 h-12 text-lg border-2 border-gray-300 focus:border-green-600">
                    <SelectValue placeholder="Select Your Zip Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {zipCodes.map(zip => (
                      <SelectItem key={zip} value={zip} className="text-lg py-3">{zip}</SelectItem>
                    ))}
                    <SelectItem value="other" className="text-lg py-3">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isOutOfServiceArea && (
                <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                  <p className="text-red-700 font-bold text-base">
                    Outside Service Area - Please call{' '}
                    <a href="tel:9402055484" className="underline hover:text-red-800">
                      (940) 205-5484
                    </a>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-base font-bold text-gray-800 uppercase tracking-wide">Name*</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-2 h-12 text-lg border-2 border-gray-300 focus:border-green-600"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-bold text-gray-800 uppercase tracking-wide">Phone*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-2 h-12 text-lg border-2 border-gray-300 focus:border-green-600"
                    placeholder="(940) 555-0123"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-bold text-gray-800 uppercase tracking-wide">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-2 h-12 text-lg border-2 border-gray-300 focus:border-green-600"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="address" className="text-base font-bold text-gray-800 uppercase tracking-wide">Address*</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="mt-2 h-12 text-lg border-2 border-gray-300 focus:border-green-600"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-base font-bold text-gray-800 uppercase tracking-wide">City*</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="mt-2 h-12 text-lg border-2 border-gray-300 focus:border-green-600"
                    placeholder="Aubrey"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hearAbout" className="text-base font-bold text-gray-800 uppercase tracking-wide">How did you hear about us?</Label>
                <Select value={formData.hearAbout} onValueChange={(value) => setFormData({...formData, hearAbout: value})}>
                  <SelectTrigger className="mt-2 h-12 text-lg border-2 border-gray-300 focus:border-green-600">
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {hearAboutOptions.map(option => (
                      <SelectItem key={option} value={option} className="text-lg py-3">{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  By submitting this form, you agree to allow Welcome Home Landscaping & Power Washing to contact you regarding your service request.
                </p>
              </div>

              <Button 
                type="submit"
                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-bold uppercase tracking-wide rounded-none shadow-lg"
                disabled={isOutOfServiceArea}
              >
                Get My Free Estimate
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}