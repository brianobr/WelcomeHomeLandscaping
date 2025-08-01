import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Mary Johnson",
    timeAgo: "1 month ago",
    text: "Derek has been taking care of my yard for some time now and does a great job. He's very efficient and his cost is reasonable. I highly recommend his services.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocL7f50bQwS9Bil5MAeWl-3xTnDXvI5K5b68SVJ5_QLZCocTXQ=s128-c0x00000000-cc-rp-mo",
    rating: 5
  },
  {
    name: "Diane Miller",
    timeAgo: "2 months ago", 
    text: "Welcome Home Landscaping mows my lawn. They do an excellent job. The team goes above and beyond to ensure that my dogs are safely secured inside my house before starting the job. As a pet owner I really appreciate that. The lawn always looks great when they get done. I also use them for weed treatment and I've seen great improvement in my lawn already this season!",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWuaMZj5rr6h7vpubLqzk3lvrcBAHHdAH_fVgISOudwyJNU5WE=s128-c0x00000000-cc-rp-mo-ba2",
    rating: 5
  },
  {
    name: "Emma Garcia",
    timeAgo: "2 months ago",
    text: "The team did such a good job with our yard today! Professional work and great attention to detail.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIu7Sl_tSaLNxAuqs_jwOlGHRGbJ4btqZzJ803ZLrRmHsWxoQ=s128-c0x00000000-cc-rp-mo",
    rating: 5
  },
  {
    name: "Sharon Wilson",
    timeAgo: "3 months ago",
    text: "My lawn looks amazing! I can't see any weeds and the grass is really green after getting fertilized. I love how the guys cut my lawn a different way each time, it looks like a golf green! 😍",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLrV6aUnKLfcoe98Ly_xHNLIrGOLASBQOiaydWlKu9a7e2DSg=s128-c0x00000000-cc-rp-mo",
    rating: 5
  },
  {
    name: "David Kumar",
    timeAgo: "4 months ago",
    text: "We hired Welcome Home Landscaping for cleaning the front flower bed and trees both in front and back. They did an excellent job and the pricing was very reasonable. Would definitely recommend!",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLFGpVDCMXcxVr2bXq89toQ8nJryjCiH3dqoa391ulP_biA72MG=s128-c0x00000000-cc-rp-mo",
    rating: 5
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Read Why Your Neighbors Choose Welcome Home Landscaping & Power Washing in{" "}
            <span className="font-semibold">Aubrey, Celina, Prosper & Frisco</span> TX
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700">reviews</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-800">4.8</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(139)</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">Review us on Google</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 5).map((review, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=10b981&color=fff`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <img 
                        src="https://cdn.jobber.com/yr/logos/third-party/icon_google.svg" 
                        alt="Google"
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {review.text}
                </p>
                <a 
                  href="#" 
                  className="text-blue-600 text-sm hover:underline"
                >
                  View on Google
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}