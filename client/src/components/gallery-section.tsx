import { ImageIcon } from "lucide-react";

export default function GallerySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-warm-gray mb-4">See Our Work</h2>
          <p className="text-xl text-gray-600">Before & After Gallery - Coming Soon</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ImageIcon className="h-12 w-12 mx-auto mb-4" />
                <p className="font-semibold">Before & After</p>
                <p className="text-sm">Gallery Coming Soon</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
