import Link from "next/link";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/Button";

export default function SearchPage() {
  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-2">
          Find your travel tribe
        </h1>
        <p className="text-gray-600 mb-10">
          Search by destination and dates. Filter by interests and travel style. (Frontend placeholder.)
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="dest" className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="dest"
                  type="text"
                  placeholder="e.g. Tokyo, Lisbon"
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  disabled
                />
              </div>
            </div>
            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-1">
                Dates
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="dates"
                  type="text"
                  placeholder="Select dates"
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  disabled
                />
              </div>
            </div>
            <Button
              size="lg"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mt-4"
              disabled
            >
              <Search className="w-5 h-5 mr-2 inline" />
              Search (coming with backend)
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-cyan-600 hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
