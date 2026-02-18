/** biome-ignore-all lint/a11y/useButtonType: buttons are used for navigation, not form submission */
import { CalendarDays, Plane, Wand2 } from "lucide-react";
import { useState } from "react";
import "./AnimatedButton.css";

export default function SearchForm({ onSelection }) {
  const [selectedFlightType, setSelectedFlightType] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const seasons = [
    { slug: "printemps", name: "Printemps", colorTag: "#7ED321" },
    { slug: "ete", name: "Été", colorTag: "#f5a623" },
    { slug: "automne", name: "Automne", colorTag: "#d0021b" },
    { slug: "hiver", name: "Hiver", colorTag: "#4a90e2" },
  ];

  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-full w-full max-w-fit mx-auto p-2 sm:p-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 lg:gap-4">
        {/* Type de voyage */}
        <div className="flex items-center gap-2 sm:gap-3 border-b sm:border-b-0 sm:border-r border-white/80 pb-2 sm:pb-0 pr-0 sm:pr-3 lg:pr-4 pl-2 sm:pl-3 lg:pl-4">
          <Plane className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[20px] lg:h-[20px] text-white flex-shrink-0" />
          <select
            className="bg-transparent text-white placeholder-white/50 focus:outline-none transition-colors py-2 text-sm sm:text-base w-full sm:min-w-[100px] lg:min-w-[120px]"
            value={selectedFlightType}
            onChange={(event) => setSelectedFlightType(event.target.value)}
          >
            <option value="" disabled hidden className="bg-black">
              Type de voyage
            </option>
            <option value="court_courrier" className="bg-black">
              Court courrier
            </option>
            <option value="moyen_courrier" className="bg-black">
              Moyen courrier
            </option>
            <option value="long_courrier" className="bg-black">
              Long courrier
            </option>
          </select>
        </div>

        {/* Période */}
        <div className="flex items-center gap-2 sm:gap-3 border-b sm:border-b-0 sm:border-r border-white/80 pb-2 sm:pb-0 pr-0 sm:pr-3 lg:pr-4 pl-2">
          <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[20px] lg:h-[20px] text-white flex-shrink-0" />
          <select
            className="bg-transparent text-white placeholder-white/50 focus:outline-none transition-colors py-2 text-sm sm:text-base w-full sm:min-w-[100px] lg:min-w-[120px]"
            value={selectedSeason}
            onChange={(event) => setSelectedSeason(event.target.value)}
          >
            <option value="" disabled hidden className="bg-black">
              Période
            </option>
            {seasons.map((season) => (
              <option
                key={season.slug}
                value={season.slug}
                className="bg-black"
              >
                {season.name}
              </option>
            ))}
          </select>
        </div>

        {/* Faites moi rêver */}
        <div className="relative group">
          <button className="flex items-center gap-2 sm:gap-3 border-b sm:border-b-0 sm:border-r border-white/80 pb-2 sm:pb-0 pr-0 sm:pr-3 lg:pr-4 pl-2 cursor-pointer">
            <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[20px] lg:h-[20px] text-white flex-shrink-0" />
            <span className="text-white text-sm sm:text-base font-poppins">
              Faites moi rêver
            </span>
          </button>
          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-6 w-[200px] -translate-x-1/2 rounded-lg bg-white px-3 py-2 text-xs sm:text-sm text-black opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-[3px] bg-white"></div>
            Vous ne savez pas choisir ? faites nous confiance pour vous proposer
            des expériences inoubliables. <br />
          </div>
        </div>

        {/* Voyager Button */}
        <button
          className="animated-button self-center sm:self-auto mt-2 sm:mt-0"
          onClick={() => {
            if (!selectedFlightType) {
              return;
            }
            const params = new URLSearchParams({
              flight_type: selectedFlightType,
            });
            if (selectedSeason) {
              params.set("season", selectedSeason);
            }
            const url = `/api/destinations?${params.toString()}`;
            if (onSelection) {
              fetch(url)
                .then((res) => (res.ok ? res.json() : []))
                .then((data) => {
                  onSelection(Array.isArray(data) ? data : [], {
                    flightType: selectedFlightType,
                    season: selectedSeason,
                  });
                })
                .catch(() => {
                  onSelection([], {
                    flightType: selectedFlightType,
                    season: selectedSeason,
                  });
                });
              return;
            }
            window.location.href = `/test-destinations?${params.toString()}`;
          }}
        >
          <span className="animated-button-text">Go</span>
          <span className="animated-button-title">Envie de voyager ?</span>
        </button>
      </div>
    </div>
  );
}
