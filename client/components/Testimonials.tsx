import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    location: "Singapore",
    text: "I was nervous about traveling solo to Europe, but this app helped me find amazing travel buddies in Barcelona. We explored the city together and I made lifelong friends!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    location: "London",
    text: "The verification process made me feel safe, and I love how easy it is to find people with similar interests. Met incredible travelers in Thailand!",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    location: "Mexico City",
    text: "This changed how I travel. No more eating alone or missing out on group activities. Connecting People made my Japan trip unforgettable.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a1628] mb-4">
            What travelers say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of solo travelers who&apos;ve found their tribe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow"
            >
              <Quote
                className="absolute top-6 right-6 w-8 h-8 text-cyan-200"
                aria-hidden
              />

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-5 h-5 fill-orange-500 text-orange-500"
                    aria-hidden
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">&quot;{t.text}&quot;</p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-orange-400 flex items-center justify-center text-white font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0a1628]">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
