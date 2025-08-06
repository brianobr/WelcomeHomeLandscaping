import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteRequestSchema, type InsertQuoteRequest } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
  { id: "lawncare", label: "Lawn Care" },
  { id: "powerwashing", label: "Power Washing" },
  { id: "treetrimming", label: "Tree Trimming" },
  { id: "maintenance", label: "Property Maintenance" }
];

export default function QuoteFormSection() {
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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

  return (
    <section id="quote" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⚡ Instant Quote Available
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Your Free Quote in Minutes</h2>
            <p className="text-xl text-gray-600">Tell us about your project and we'll provide a detailed estimate within 24 hours</p>
          </div>
          
          <Card className="bg-white rounded-xl shadow-2xl border-2 border-green-100">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="Enter your first name"
                      className="w-full"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Enter your last name"
                      className="w-full"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="(972) 409-6288"
                      className="w-full"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Property Information */}
                <div>
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700 mb-2">
                    Property Address *
                  </Label>
                  <Input
                    id="address"
                    {...register("address")}
                    placeholder="Enter your property address"
                    className="w-full"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700 mb-2">
                      City
                    </Label>
                    <Input
                      id="city"
                      {...register("city")}
                      placeholder="Aubrey"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700 mb-2">
                      State
                    </Label>
                    <Input
                      id="state"
                      {...register("state")}
                      placeholder="TX"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip"
                      {...register("zip")}
                      placeholder="76227"
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Service Selection */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-4 block">
                    Services Needed (Select all that apply) *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {serviceOptions.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={(checked) => 
                            handleServiceChange(service.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={service.id} className="cursor-pointer">
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedServices.length === 0 && errors.services && (
                    <p className="text-sm text-red-600 mt-1">At least one service must be selected</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    rows={4}
                    placeholder="Tell us about your project, property size, specific needs, etc."
                    className="w-full"
                  />
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <Button 
                    type="submit"
                    disabled={submitQuoteMutation.isPending}
                    className="bg-gradient-to-r from-primary to-forest-green text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {submitQuoteMutation.isPending ? "Submitting..." : "Get My Free Quote"}
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    We'll respond within 24 hours with your personalized quote
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
