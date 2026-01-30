"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Heart } from "lucide-react";
import { Button } from "@/components/Button";
import { getMe, updateProfile } from "@/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    bio?: string;
    interests?: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editInterests, setEditInterests] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      getMe(token)
        .then((data) => {
          setUser({
            name: data.name,
            email: data.email,
            bio: data.bio,
            interests: data.interests,
          });
          setEditName(data.name ?? "");
          setEditBio(data.bio ?? "");
          setEditInterests(Array.isArray(data.interests) ? data.interests.join(", ") : "");
        })
        .catch(() => {
          try {
            const raw = localStorage.getItem("user");
            if (raw) {
              const u = JSON.parse(raw);
              setUser(u);
              setEditName(u.name ?? "");
              setEditBio(u.bio ?? "");
              setEditInterests(Array.isArray(u.interests) ? u.interests.join(", ") : "");
            } else setUser(null);
          } catch {
            setUser(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      try {
        const raw = localStorage.getItem("user");
        if (raw) {
          const u = JSON.parse(raw);
          setUser(u);
          setEditName(u.name ?? "");
          setEditBio(u.bio ?? "");
          setEditInterests(Array.isArray(u.interests) ? u.interests.join(", ") : "");
        } else setUser(null);
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    setSaving(true);
    setSaveError("");
    try {
      const interests = editInterests
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const data = await updateProfile(token, {
        name: editName.trim() || undefined,
        bio: editBio.trim() || undefined,
        interests: interests.length ? interests : undefined,
      });
      setUser({
        name: data.name,
        email: data.email,
        bio: data.bio,
        interests: data.interests,
      });
      setEditing(false);
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const u = JSON.parse(stored);
          localStorage.setItem("user", JSON.stringify({ ...u, name: data.name }));
        }
      } catch {
        /* ignore */
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center text-gray-600">
          Loading profile…
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-2">
          Your profile
        </h1>
        <p className="text-gray-600 mb-10">
          Add interests, travel preferences, and upcoming trips.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
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
            {!editing ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(true)}
                className="border-[#0a1628] text-[#0a1628] hover:bg-gray-100"
              >
                Edit profile
              </Button>
            ) : null}
          </div>

          {editing && (
            <form onSubmit={handleSaveProfile} className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-100 space-y-4">
              {saveError && (
                <p className="text-sm text-red-600" role="alert">{saveError}</p>
              )}
              <div>
                <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="profile-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="profile-bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  id="profile-bio"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-y"
                  placeholder="A short intro about you"
                />
              </div>
              <div>
                <label htmlFor="profile-interests" className="block text-sm font-medium text-gray-700 mb-1">Interests (comma-separated)</label>
                <input
                  id="profile-interests"
                  type="text"
                  value={editInterests}
                  onChange={(e) => setEditInterests(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  placeholder="e.g. hiking, food, photography"
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={saving} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setEditing(false); setSaveError(""); }}
                  disabled={saving}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

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
              <p className="text-sm text-gray-600">
                {user?.interests?.length ? user.interests.join(", ") : "Add interests in a future update."}
              </p>
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
