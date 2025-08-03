import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertQuoteRequestSchema, type InsertQuoteRequest } from "@shared/schema";

interface InstantPricingFormProps {
  isFloating?: boolean;
}

export default function InstantPricingForm({ isFloating = false }: InstantPricingFormProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema),
    defaultValues: {
      city: "Aubrey",
      state: "TX"
    }
  });

  const services = [
    { id: 'lawn-mowing', label: 'Lawn Mowing & Maintenance' },
    { id: 'fence-repair', label: 'Fence Repair' },
    { id: 'irrigation', label: 'Irrigation Installation' },
    { id: 'tree-trimming', label: 'Tree & Bush Trimming' },
    { id: 'herbicide', label: 'Herbicide & Pesticide Treatment' },
    { id: 'pressure-washing', label: 'Pressure Washing' },
    { id: 'french-drainage', label: 'French Drainage Systems' },
    { id: 'sprinkler-repair', label: 'Minor Sprinkler Repair' }
  ];

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      const response = await apiRequest("POST", "/api/quote-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "Thank you for your interest! We will contact you within 24 hours with your personalized quote.",
      });
      reset();
      setSelectedServices([]);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertQuoteRequest) => {
    if (selectedServices.length === 0) {
      toast({
        title: "Please select at least one service",
        description: "You must select at least one service to proceed.",
        variant: "destructive",
      });
      return;
    }

    submitQuoteMutation.mutate({
      ...data,
      services: selectedServices
    });
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">Full Name *</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Input
                  {...register("firstName")}
                  placeholder="First"
                  className="h-10 text-base border-2 border-gray-300 focus:border-green-600"
                />
                <Input
                  {...register("lastName")}
                  placeholder="Last"
                  className="h-10 text-base border-2 border-gray-300 focus:border-green-600"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number *</Label>
              <Input
                {...register("phone")}
                type="tel"
                placeholder="(940) 555-0123"
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Email Address */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address *</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="your.email@example.com"
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Street Address */}
            <div>
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Street Address *</Label>
              <Input
                {...register("address")}
                placeholder="123 Main Street"
                className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            {/* City and Zip Code */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City *</Label>
                <Input
                  {...register("city")}
                  placeholder="Aubrey"
                  className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <Label htmlFor="zip" className="text-sm font-semibold text-gray-700">Zip Code *</Label>
                <Input
                  {...register("zip")}
                  placeholder="76227"
                  className="mt-1 h-10 text-base border-2 border-gray-300 focus:border-green-600"
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
              </div>
            </div>

            {/* Services Needed */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">Services Needed *</Label>
              <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                    />
                    <Label htmlFor={service.id} className="text-sm text-gray-600 cursor-pointer">{service.label}</Label>
                  </div>
                ))}
              </div>
              {selectedServices.length === 0 && (
                <p className="text-red-500 text-xs mt-1">Please select at least one service</p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Project Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Briefly describe your project..."
                className="mt-1 text-base border-2 border-gray-300 focus:border-green-600 min-h-[80px]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitQuoteMutation.isPending}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-base font-bold uppercase tracking-wide transition-all"
            >
              {submitQuoteMutation.isPending ? "Submitting..." : "GET FREE QUOTE"}
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

  // Non-floating form (for other uses)
  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Add non-floating form content if needed */}
      </form>
    </div>
  );
}