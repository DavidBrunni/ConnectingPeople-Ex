"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";
import { getPublicProfile, type PublicUser } from "@/lib/api";

export default function PublicProfilePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getPublicProfile(id)
      .then(setUser)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center text-gray-600">
          Loading profile…
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <p className="text-red-600 mb-4">{error || "User not found"}</p>
          <Link href="/search">
            <Button variant="outline">Back to search</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to search
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-orange-400 flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0) || "?"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0a1628]">{user.name}</h1>
              {user.bio && (
                <p className="text-gray-600 mt-2 leading-relaxed">{user.bio}</p>
              )}
              {user.interests && user.interests.length > 0 && (
                <div className="flex items-center gap-2 mt-4 text-gray-600">
                  <Heart className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{user.interests.join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">
              Interested in travelling together? Start a conversation.
            </p>
            <Link href={`/messages?to=${user._id}`}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
