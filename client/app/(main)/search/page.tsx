"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/Button";
import { searchTrips, createTrip, type Trip } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

const DESTINATION_SUGGESTIONS = [
  "Amsterdam", "Athens", "Bali", "Barcelona", "Bangkok", "Berlin", "Bruges",
  "Budapest", "Copenhagen", "Dubai", "Edinburgh", "Florence", "Helsinki",
  "Istanbul", "Krakow", "Lisbon", "Ljubljana", "London", "Madrid", "Milan",
  "Munich", "New York", "Oslo", "Paris", "Porto", "Prague", "Reykjavik",
  "Rome", "Seoul", "Singapore", "Stockholm", "Sydney", "Tallinn", "Tokyo",
  "Valencia", "Venice", "Vienna", "Zurich",
];

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return s;
  }
}

export default function SearchPage() {
  const { isLoggedIn } = useAuth();
  const [destination, setDestination] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [results, setResults] = useState<Trip[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const destInputRef = useRef<HTMLInputElement>(null);
  const destSuggestionsRef = useRef<HTMLUListElement>(null);

  const filteredDestinations = destination.trim()
    ? DESTINATION_SUGGESTIONS.filter((d) =>
        d.toLowerCase().includes(destination.trim().toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        destInputRef.current?.contains(target) ||
        destSuggestionsRef.current?.contains(target)
      )
        return;
      setShowDestSuggestions(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function applyDestination(value: string) {
    setDestination(value);
    setShowDestSuggestions(false);
    setSelectedSuggestionIndex(-1);
  }

  const [showCreate, setShowCreate] = useState(false);
  const [createDest, setCreateDest] = useState("");
  const [createFrom, setCreateFrom] = useState("");
  const [createTo, setCreateTo] = useState("");
  const [createDesc, setCreateDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const trips = await searchTrips({
        destination: destination.trim() || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      });
      setResults(trips);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTrip(e: React.FormEvent) {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    if (!createDest.trim() || !createFrom || !createTo) {
      setCreateError("Destination and dates are required.");
      return;
    }
    setCreating(true);
    setCreateError("");
    try {
      await createTrip(token, {
        destination: createDest.trim(),
        dateFrom: createFrom,
        dateTo: createTo,
        description: createDesc.trim() || undefined,
      });
      setShowCreate(false);
      setCreateDest("");
      setCreateFrom("");
      setCreateTo("");
      setCreateDesc("");
      setResults(null);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Could not create trip");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-2">
          Find your travel tribe
        </h1>
        <p className="text-gray-600 mb-10">
          Search by destination and dates. See who else is travelling there.
        </p>

        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="dest" className="block text-sm font-medium text-gray-700 mb-1">
                Destination (city or country)
              </label>
              <div className="relative" ref={destInputRef}>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <input
                  id="dest"
                  type="text"
                  placeholder="e.g. Tokyo, Lisbon, Barcelona"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setShowDestSuggestions(true);
                    setSelectedSuggestionIndex(-1);
                  }}
                  onFocus={() => setShowDestSuggestions(true)}
                  onKeyDown={(e) => {
                    if (!showDestSuggestions || filteredDestinations.length === 0) return;
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSelectedSuggestionIndex((i) =>
                        i < filteredDestinations.length - 1 ? i + 1 : 0
                      );
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSelectedSuggestionIndex((i) =>
                        i <= 0 ? filteredDestinations.length - 1 : i - 1
                      );
                    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
                      e.preventDefault();
                      applyDestination(filteredDestinations[selectedSuggestionIndex]);
                    } else if (e.key === "Escape") {
                      setShowDestSuggestions(false);
                      setSelectedSuggestionIndex(-1);
                    }
                  }}
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                />
                {showDestSuggestions && filteredDestinations.length > 0 && (
                  <ul
                    ref={destSuggestionsRef}
                    className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 max-h-56 overflow-auto"
                    role="listbox"
                  >
                    {filteredDestinations.map((d, i) => (
                      <li
                        key={d}
                        role="option"
                        aria-selected={i === selectedSuggestionIndex}
                        className={`px-4 py-2.5 cursor-pointer text-sm ${
                          i === selectedSuggestionIndex
                            ? "bg-cyan-50 text-cyan-800"
                            : "text-gray-800 hover:bg-gray-50"
                        }`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          applyDestination(d);
                        }}
                        onMouseEnter={() => setSelectedSuggestionIndex(i)}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
                  From date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
                  To date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  />
                </div>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600" role="alert">{error}</p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mt-2"
              disabled={loading}
            >
              <Search className="w-5 h-5 mr-2 inline" />
              {loading ? "Searching…" : "Search trips"}
            </Button>
          </div>
        </form>

        {isLoggedIn && (
          <div className="mb-10">
            {!showCreate ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreate(true)}
                className="border-cyan-500 text-cyan-600 hover:bg-cyan-50"
              >
                <Plus className="w-5 h-5 mr-2 inline" />
                Create a trip
              </Button>
            ) : (
              <form
                onSubmit={handleCreateTrip}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
              >
                <h2 className="text-lg font-semibold text-[#0a1628] mb-4">Create a trip</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="create-dest" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input
                      id="create-dest"
                      type="text"
                      placeholder="e.g. Tokyo"
                      value={createDest}
                      onChange={(e) => setCreateDest(e.target.value)}
                      className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="create-from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
                      <input
                        id="create-from"
                        type="date"
                        value={createFrom}
                        onChange={(e) => setCreateFrom(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="create-to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <input
                        id="create-to"
                        type="date"
                        value={createTo}
                        onChange={(e) => setCreateTo(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="create-desc" className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                    <textarea
                      id="create-desc"
                      value={createDesc}
                      onChange={(e) => setCreateDesc(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none resize-y"
                      placeholder="What are you planning?"
                    />
                  </div>
                  {createError && <p className="text-sm text-red-600" role="alert">{createError}</p>}
                  <div className="flex gap-3">
                    <Button type="submit" disabled={creating} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      {creating ? "Creating…" : "Create trip"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreate(false)} disabled={creating}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {results !== null && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-[#0a1628] mb-4">
              {results.length === 0 ? "No trips found" : `${results.length} trip(s) found`}
            </h2>
            {results.length > 0 && (
              <ul className="space-y-4">
                {results.map((trip) => (
                  <li
                    key={trip._id}
                    className="p-4 rounded-xl border border-gray-100 hover:border-cyan-200 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#0a1628]">{trip.destination}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(trip.dateFrom)} – {formatDate(trip.dateTo)}
                        </p>
                        {trip.description && (
                          <p className="text-sm text-gray-600 mt-2">{trip.description}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          by {trip.createdBy?.name ?? "Unknown"}
                        </p>
                      </div>
                      {trip.createdBy?._id && (
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <Link href={`/user/${trip.createdBy._id}`}>
                            <Button variant="outline" size="sm" className="border-[#0a1628] text-[#0a1628] hover:bg-gray-100">
                              View profile
                            </Button>
                          </Link>
                          <Link href={`/messages?to=${trip.createdBy._id}`}>
                            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                              Contact
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          <Link href="/" className="text-cyan-600 hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
