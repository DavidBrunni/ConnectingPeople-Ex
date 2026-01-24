"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Heart } from "lucide-react";
import { Button } from "@/components/Button";

// Placeholder – ersätts med riktig profil när backend finns
export default function ProfilePage() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-2">
          Your profile
        </h1>
        <p className="text-gray-600 mb-10">
          Add interests, travel preferences, and upcoming trips. (Frontend placeholder.)
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-orange-400 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || "?"}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#0a1628]">
                {user?.name || "Traveler"}
              </h2>
              <p className="text-gray-500">{user?.email || "—"}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-100">
              <div className="flex items-center gap-2 text-cyan-700 font-medium mb-1">
                <MapPin className="w-4 h-4" />
                Upcoming trips
              </div>
              <p className="text-sm text-gray-600">No trips yet. Create one from Search.</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <div className="flex items-center gap-2 text-orange-700 font-medium mb-1">
                <Heart className="w-4 h-4" />
                Interests
              </div>
              <p className="text-sm text-gray-600">Add interests in a future update.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/search">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Search trips
              </Button>
            </Link>
            <Link href="/matches">
              <Button variant="outline" size="lg" className="border-[#0a1628] text-[#0a1628] hover:bg-gray-100">
                View matches
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
