"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "@/components/Hero/AnimatedButton.css";

export default function DestinationsClient() {
  const [destinations, setDestinations] = useState([]);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    zone: "",
    directFlight: "",
    tag: "",
    favorite: false,
    country: "",
  });

  useEffect(() => {
    fetch("/api/destinations?all=true")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setDestinations(Array.isArray(data) ? data : []))
      .catch(() => setDestinations([]));
  }, []);

  useEffect(() => {
    const tagParam = searchParams.get("tag") || "";
    setFilters((prev) => (prev.tag === tagParam ? prev : { ...prev, tag: tagParam }));
  }, [searchParams]);

  const options = useMemo(() => {
    const zones = new Set();
    const tags = new Set();
    const countriesByZone = new Map();
    destinations.forEach((destination) => {
      if (destination.zone) zones.add(destination.zone);
      if (Array.isArray(destination.tags)) {
        destination.tags.forEach((tag) => {
          tags.add(tag);
        });
      }
      if (destination.zone && destination.country) {
        if (!countriesByZone.has(destination.zone)) {
          countriesByZone.set(destination.zone, new Set());
        }
        countriesByZone.get(destination.zone).add(destination.country);
      }
    });
    return {
      zones: Array.from(zones).sort(),
      tags: Array.from(tags).sort(),
      countriesByZone,
    };
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      if (filters.zone && destination.zone !== filters.zone) return false;
      if (filters.country && destination.country !== filters.country) return false;
      if (filters.directFlight !== "") {
        if (filters.directFlight === "true" && !destination.direct_flight)
          return false;
        if (filters.directFlight === "false" && destination.direct_flight)
          return false;
      }
      if (filters.tag && !destination?.tags?.includes(filters.tag)) return false;
      if (filters.favorite && !destination.favorite) return false;
      return true;
    });
  }, [destinations, filters]);

  const activeTag = filters.tag;
  const countryOptions = filters.zone
    ? Array.from(options.countriesByZone.get(filters.zone) || []).sort()
    : [];

  return (
    <div className="mt-6 sm:mt-8">
      <section className="rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4">
          <select
            className="h-10 rounded-lg border border-[color:var(--dest-border)] bg-black text-white sm:bg-transparent sm:text-[color:var(--dest-text)] px-3 text-sm focus:outline-none"
            value={filters.zone}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                zone: event.target.value,
                country: "",
              }))
            }
          >
            <option value="">Tous</option>
            {options.zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          {filters.zone && (
            <select
              className="h-10 rounded-lg border border-[color:var(--dest-border)] bg-transparent px-3 text-sm text-[color:var(--dest-text)] focus:outline-none"
              value={filters.country}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  country: event.target.value,
                }))
              }
            >
              <option value="">Tous</option>
              {countryOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          )}
          <select
            className="h-10 rounded-lg border border-[color:var(--dest-border)] bg-transparent px-3 text-sm text-[color:var(--dest-text)] focus:outline-none"
            value={filters.directFlight}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                directFlight: event.target.value,
              }))
            }
          >
            <option value="">Vol direct</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
          <button
            type="button"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                favorite: !prev.favorite,
              }))
            }
            className="animated-button animated-button--small self-start lg:self-auto"
          >
            <span className="animated-button-text inline-flex items-center gap-1">
              {filters.favorite ? "Faîtes moi rêver" : <Heart className="h-4 w-4" />}
            </span>
            <span className="animated-button-title text-xs font-poppins">
              Nos coups de coeur
            </span>
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {options.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  tag: prev.tag === tag ? "" : tag,
                }))
              }
              className={`rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer hover:border-[color:var(--dest-text)] hover:text-[color:var(--dest-text)] ${
                activeTag === tag
                  ? "border-[#df986c] text-[#df986c]"
                  : "border-[color:var(--dest-chip-border)] text-[color:var(--dest-muted)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDestinations.map((destination) => {
          const image = destination.main_image
            ? `/images/destinations/${destination.main_image}`
            : "/images/favorite-1.jpg";
          return (
            <Link
              key={destination._id}
              href={`/destinations/${destination._id}`}
              className="group rounded-2xl border border-[color:var(--dest-border)] overflow-hidden bg-[color:var(--dest-panel)]"
            >
              <div className="h-[220px] overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.12]"
                  style={{ backgroundImage: `url('${image}')` }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[color:var(--dest-soft)]">
                    {destination.zone}
                  </p>
                  {destination.favorite && (
                    <span className="text-xs text-[#df986c] inline-flex items-center gap-1">
                      Coup de <Heart className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--dest-text)]">
                  {destination.country}
                </h3>
                <p className="text-xs text-[color:var(--dest-soft)] mt-1">
                  {destination.flight_type
                    ? destination.flight_type.charAt(0).toUpperCase() +
                      destination.flight_type.slice(1).replace("_", " ")
                    : ""}{" "}
                  · {destination.direct_flight ? "Vol direct" : "Avec escale"}
                </p>
                {Array.isArray(destination.tags) &&
                  destination.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {destination.tags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            setFilters((prev) => ({
                              ...prev,
                              tag,
                            }));
                          }}
                          className="rounded-full border border-[color:var(--dest-chip-border)] bg-[color:var(--dest-chip)] px-3 py-1 text-xs text-[color:var(--dest-muted)] hover:border-[#df986c] hover:text-[#df986c] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </Link>
          );
        })}
      </section>

      {!filteredDestinations.length && (
        <p className="mt-6 text-sm text-[color:var(--dest-muted)]">
          Aucun résultat ne correspond à vos filtres.
        </p>
      )}
    </div>
  );
}
