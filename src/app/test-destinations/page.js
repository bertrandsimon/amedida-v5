"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TestDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/destinations?all=true");
        if (!res.ok) {
          throw new Error("Failed to load destinations.");
        }
        const data = await res.json();
        if (isMounted) {
          setDestinations(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setError("Unable to fetch destinations.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] p-4 sm:p-6 lg:p-10 text-white">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        Destinations (Test)
      </h1>
      {loading && <p className="text-sm text-[#c2c2c2]">Loading...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {destinations.map((dest) => (
            <div
              key={dest._id || `${dest.country}-${dest.zone}`}
              className="rounded-lg border border-white/10 p-4 sm:p-5"
            >
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold">
                  {dest.country || "Destination"}
                </div>
                <div className="text-sm text-[#c2c2c2]">
                  {dest.zone} • {dest.transport_type} • {dest.duration}
                </div>
                <div className="text-xs text-[#9d9d9d]">{dest._id}</div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="relative h-[160px] sm:h-[180px] w-full overflow-hidden rounded-lg border border-white/10">
                  {dest.main_image ? (
                    <Image
                      src={`/images/destinations/${dest.main_image}`}
                      alt={dest.country || "Destination"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/5" />
                  )}
                  </div>
                  <p className="text-xs text-[#9d9d9d]">
                    {dest.main_image || "main_image: -"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(dest.images || []).slice(0, 4).map((image) => (
                    <div key={image} className="space-y-1">
                      <div className="relative h-[75px] sm:h-[85px] w-full overflow-hidden rounded-md border border-white/10">
                        <Image
                          src={`/images/destinations/${image}`}
                          alt={dest.country || "Destination"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[10px] text-[#9d9d9d] break-words">
                        {image}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="relative h-[140px] w-full overflow-hidden rounded-lg border border-white/10">
                  {dest.activity_image ? (
                    <Image
                      src={`/images/destinations/${dest.activity_image}`}
                      alt="activity"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/5" />
                  )}
                </div>
                <p className="text-xs text-[#9d9d9d]">
                  {dest.activity_image || "activity_image: -"}
                </p>
              </div>

              <p className="text-sm text-[#c2c2c2] mt-4">{dest.description}</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-[#9d9d9d] text-xs uppercase tracking-wide">
                    Informations
                  </div>
                  <div>
                    <span className="text-[#9d9d9d]">Période:</span>{" "}
                    {dest.period}
                  </div>
                  <div>
                    <span className="text-[#9d9d9d]">Décalage:</span>{" "}
                    {dest.time_difference}
                  </div>
                  <div>
                    <span className="text-[#9d9d9d]">Budget:</span>{" "}
                    {dest.budget}
                  </div>
                  <div>
                    <span className="text-[#9d9d9d]">Vol direct:</span>{" "}
                    {dest.direct_flight ? "Oui" : "Non"}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[#9d9d9d] text-xs uppercase tracking-wide">
                    Médias
                  </div>
                  <div>
                    <span className="text-[#9d9d9d]">Image principale:</span>{" "}
                    {dest.main_image}
                  </div>
                  <div>
                    <span className="text-[#9d9d9d]">Images:</span>{" "}
                    {Array.isArray(dest.images) ? dest.images.length : 0}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-[#9d9d9d] text-xs uppercase tracking-wide">
                    Saisons
                  </div>
                  <div>
                    {Array.isArray(dest.seasons) ? dest.seasons.join(", ") : ""}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[#9d9d9d] text-xs uppercase tracking-wide">
                    Type de vol
                  </div>
                  <div>{dest.flight_type || ""}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-[#9d9d9d] text-xs uppercase tracking-wide">
                    Tags
                  </div>
                  <div>
                    {Array.isArray(dest.tags) ? dest.tags.join(", ") : ""}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[#9d9d9d] text-xs uppercase tracking-wide">
                    Activités
                  </div>
                  <div>
                    {Array.isArray(dest.activities)
                      ? dest.activities.join(", ")
                      : ""}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm">
                <span className="text-[#9d9d9d]">Favori:</span>{" "}
                {dest.favorite ? "Oui" : "Non"}
                {dest.fav_group ? ` (${dest.fav_group})` : ""}
              </div>
              {dest.testimonial && (
                <div className="mt-2 text-sm text-[#c2c2c2]">
                  <span className="text-[#9d9d9d]">Témoignage:</span>{" "}
                  {dest.testimonial}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
