import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/Button";

export default function EventsPage() {
  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-2">
          Meetup events
        </h1>
        <p className="text-gray-600 mb-10">
          Create and join small meetups in your destination. (Frontend placeholder.)
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <CalendarDays className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Events will be tied to trips and destinations. Create-event flow and list view coming with backend.
          </p>
          <Link href="/search">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Search trips
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-cyan-600 hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
