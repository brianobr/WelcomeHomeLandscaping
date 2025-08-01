import { Play } from "lucide-react";
import heroVideo from "@assets/13346173_3840_2160_25fps_1753936308649.mp4";

export default function VideoShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-warm-gray mb-4">
            See Our Work in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how we transform outdoor spaces with professional landscaping and power washing services
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <video 
              controls 
              className="w-full h-auto"
              poster="/api/placeholder/800/450"
            >
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video overlay for better presentation */}
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-white bg-opacity-90 rounded-full p-4">
                <Play className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg text-gray-600 mb-6">
              Professional landscaping services that enhance the beauty and value of your property
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>✓ 4K Quality Work</span>
              <span>✓ Professional Equipment</span>
              <span>✓ Attention to Detail</span>
              <span>✓ Customer Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}