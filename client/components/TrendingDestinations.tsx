import Image from "next/image";
import { Users } from "lucide-react";

const destinations = [
  {
    city: "Tokyo",
    country: "Japan",
    travelers: 234,
    image:
      "https://images.unsplash.com/photo-1640871426525-a19540c45a39?w=1080&q=80",
  },
  {
    city: "Bali",
    country: "Indonesia",
    travelers: 189,
    image:
      "https://images.unsplash.com/photo-1698466632744-f79b37b88ffd?w=1080&q=80",
  },
  {
    city: "Paris",
    country: "France",
    travelers: 312,
    image:
      "https://images.unsplash.com/photo-1645573324217-17cd62e55151?w=1080&q=80",
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    travelers: 156,
    image:
      "https://images.unsplash.com/photo-1630316685886-5c134cb6d9f0?w=1080&q=80",
  },
  {
    city: "New York",
    country: "USA",
    travelers: 267,
    image:
      "https://images.unsplash.com/photo-1543716091-a840c05249ec?w=1080&q=80",
  },
  {
    city: "Barcelona",
    country: "Spain",
    travelers: 198,
    image:
      "https://images.unsplash.com/photo-1595685842822-7893ddb30176?w=1080&q=80",
  },
];

export function TrendingDestinations() {
  return (
    <section id="destinations" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a1628] mb-4">
            Trending destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See where travelers are heading and join the adventure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={d.image}
                  alt={`${d.city}, ${d.country}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-1">{d.city}</h3>
                <p className="text-sm text-gray-200 mb-3">{d.country}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{d.travelers} travelers</span>
                </div>
              </div>

              <div
                className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-300 pointer-events-none"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
