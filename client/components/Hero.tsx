import Link from "next/link";
import Image from "next/image";
import Header from "./Header";

const cityImages = [
  { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80", alt: "Paris" },
  { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80", alt: "Tokyo" },
  { src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80", alt: "New York" },
  { src: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&q=80", alt: "London" },
  { src: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&q=80", alt: "Barcelona" },
  { src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", alt: "Dubai" },
  { src: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80", alt: "Amsterdam" },
  { src: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80", alt: "Sydney" },
];

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[480px] flex flex-col bg-[#0a1628] text-white overflow-hidden">
      {/* Film strip – scrolling cities background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[#0a1628]/70 z-[1]" />
        <div className="absolute inset-0 flex items-center overflow-hidden z-0">
          <div className="flex animate-[scroll_70s_linear_infinite] w-max">
            {[...cityImages, ...cityImages].map((city, i) => (
              <div key={i} className="relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[400px] lg:w-[520px] xl:w-[600px] h-[160px] sm:h-[200px] md:h-[250px] lg:h-[340px] xl:h-[400px] mx-1 sm:mx-1.5 md:mx-2 rounded-lg overflow-hidden opacity-90">
                <Image
                  src={city.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 520px, 600px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-[2]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-6 sm:py-12 md:py-20 flex-1 flex flex-col justify-center min-h-0">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Find your travel tribe
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with like-minded solo travelers heading to the same destination.
            Share experiences, split costs, and make memories together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-cyan-500 hover:bg-cyan-600 text-white h-12 px-8 py-6 text-lg"
            >
              Create a Trip
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white h-12 px-8 py-6 text-lg"
            >
              Explore Travelers
            </Link>
          </div>
        </div>
      </div>

      {/* Wave separator – längst ner på första skärmen */}
      <div className="absolute bottom-0 left-0 right-0 z-10 mt-auto" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;