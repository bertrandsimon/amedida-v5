"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function DestinationsClient() {
  const [destinations, setDestinations] = useState([]);
  const [filters, setFilters] = useState({
    zone: "",
    flightType: "",
    directFlight: "",
    country: "",
    tag: "",
    favorite: false,
  });

  useEffect(() => {
    fetch("/api/destinations?all=true")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setDestinations(Array.isArray(data) ? data : []))
      .catch(() => setDestinations([]));
  }, []);

  const options = useMemo(() => {
    const zones = new Set();
    const flightTypes = new Set();
    const tags = new Set();
    const countries = new Set();
    destinations.forEach((destination) => {
      if (destination.zone) zones.add(destination.zone);
      if (destination.flight_type) flightTypes.add(destination.flight_type);
      if (destination.country) countries.add(destination.country);
      if (Array.isArray(destination.tags)) {
        destination.tags.forEach((tag) => {
          tags.add(tag);
        });
      }
    });
    return {
      zones: Array.from(zones).sort(),
      flightTypes: Array.from(flightTypes).sort(),
      countries: Array.from(countries).sort(),
      tags: Array.from(tags).sort(),
    };
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      if (filters.zone && destination.zone !== filters.zone) return false;
      if (filters.flightType && destination.flight_type !== filters.flightType)
        return false;
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

  return (
    <div className="mt-6 sm:mt-8">
      <section className="rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4">
          <select
            className="h-10 rounded-lg border border-[color:var(--dest-border)] bg-transparent px-3 text-sm text-[color:var(--dest-text)] focus:outline-none"
            value={filters.zone}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, zone: event.target.value }))
            }
          >
            <option value="">Zone</option>
            {options.zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <select
            className="h-10 rounded-lg border border-[color:var(--dest-border)] bg-transparent px-3 text-sm text-[color:var(--dest-text)] focus:outline-none"
            value={filters.flightType}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                flightType: event.target.value,
              }))
            }
          >
            <option value="">Type de vol</option>
            {options.flightTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace("_", " ")}
              </option>
            ))}
          </select>
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
            <option value="">Pays</option>
            {options.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
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
          <select
            className="h-10 rounded-lg border border-[color:var(--dest-border)] bg-transparent px-3 text-sm text-[color:var(--dest-text)] focus:outline-none"
            value={filters.tag}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, tag: event.target.value }))
            }
          >
            <option value="">Thématique</option>
            {options.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-[color:var(--dest-text)]">
            <input
              type="checkbox"
              checked={filters.favorite}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  favorite: event.target.checked,
                }))
              }
            />
            Coups de coeur
          </label>
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
              <div
                className="h-[220px] bg-cover bg-center"
                style={{ backgroundImage: `url('${image}')` }}
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[color:var(--dest-soft)]">
                    {destination.zone}
                  </p>
                  {destination.favorite && (
                    <span className="text-xs text-[#df986c]">Coup de coeur</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--dest-text)]">
                  {destination.country}
                </h3>
                <p className="text-xs text-[color:var(--dest-soft)] mt-1">
                  {destination.flight_type?.replace("_", " ") || ""} ·{" "}
                  {destination.direct_flight ? "Vol direct" : "Avec escale"}
                </p>
                {Array.isArray(destination.tags) &&
                  destination.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {destination.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[color:var(--dest-chip-border)] bg-[color:var(--dest-chip)] px-3 py-1 text-xs text-[color:var(--dest-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
