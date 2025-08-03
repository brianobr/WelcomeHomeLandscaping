import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InstantPricingFormProps {
  isFloating?: boolean;
}

export default function InstantPricingForm({ isFloating = false }: InstantPricingFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Aubrey',
    zip: '',
    services: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Lawn Mowing & Maintenance',
    'Fence Repair',
    'Irrigation Installation',
    'Tree & Bush Trimming',
    'Herbicide & Pesticide Treatment',
    'Pressure Washing',
    'French Drainage Systems',
    'Minor Sprinkler Repair'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.services) {
      alert('Please select a service');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: 'TX',
          zip: formData.zip,
          services: [formData.services],
          description: formData.description
        })
      });

      if (response.ok) {
        alert('Quote request submitted successfully! We will contact you within 24 hours.');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          address: '',
          city: 'Aubrey',
          zip: '',
          services: '',
          description: ''
        });
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isFloating) {
    return (
      <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="text-center">
            <div className="inline-block bg-yellow-400 text-red-900 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3 rounded-sm">
              Free Estimate
            </div>
            <CardTitle className="text-xl">
              <span className="font-bold uppercase tracking-wide">Get Your Free Quote</span>
            </CardTitle>
            <p className="text-sm text-gray-100 mt-2">Instant pricing for your project</p>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">Full Name *</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="First"
                  className="h-10 text-base border-2 border-gray-300 focus:border-green-600"
                  required
                />
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Last"
                  className="h-10 text-base border-2 border-gray-300 focus:border-green-600"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                type="tel"
                placeholder="(940) 555-0123"
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address *</Label>
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
                placeholder="your.email@example.com"
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                required
              />
            </div>

            {/* Street Address */}
            <div>
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Street Address *</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street"
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                required
              />
            </div>

            {/* City and Zip Code */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Aubrey"
                  className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                  required
                />
              </div>
              <div>
                <Label htmlFor="zip" className="text-sm font-semibold text-gray-700">Zip Code *</Label>
                <Input
                  value={formData.zip}
                  onChange={(e) => handleInputChange('zip', e.target.value)}
                  placeholder="76227"
                  className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                  required
                />
              </div>
            </div>

            {/* Services Needed */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">Services Needed *</Label>
              <Select value={formData.services} onValueChange={(value) => handleInputChange('services', value)}>
                <SelectTrigger className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service} className="text-base py-2">
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Project Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Briefly describe your project..."
                className="mt-1 text-base border-2 border-gray-300 focus:border-green-600 min-h-[80px]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-base font-bold uppercase tracking-wide transition-all"
            >
              {isSubmitting ? "Submitting..." : "GET FREE QUOTE"}
            </Button>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By submitting this form, you consent to Welcome Home Landscaping & Power Washing contacting you via phone, email, or text to discuss your project.
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Add non-floating form content if needed */}
      </form>
    </div>
  );
}