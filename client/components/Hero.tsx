import Link from "next/link";
import Header from "./Header";

const Hero = (): JSX.Element => {
  return (
    <section className="relative bg-[#0a1628] text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <Header />

      <div className="relative container mx-auto px-6 py-20 md:py-32">
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

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
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