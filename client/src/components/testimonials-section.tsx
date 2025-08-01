import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Mary S.",
    location: "Aubrey, TX",
    rating: 5,
    text: "Derek has been taking care of my yard for some time now and does a great job. He's very efficient and his cost is reasonable. I highly recommend his services."
  },
  {
    name: "Deb J.",
    location: "Aubrey, TX", 
    rating: 5,
    text: "Very happy with Derrick. He shows up when he says he will. Great attention to detail, friendly, responsive to emails. Exceptional job with weed control and mowing."
  },
  {
    name: "Dee C.",
    location: "Frisco, TX",
    rating: 5,
    text: "Great company! Welcome Home Landscaping provided me with an incredibly professional service, and the work was done to perfection! My yard looks amazing!"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-warm-gray mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">4.5 stars with 41+ verified reviews on HomeAdvisor</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-lg">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 font-semibold">{testimonial.rating}.0</span>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-warm-gray">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
