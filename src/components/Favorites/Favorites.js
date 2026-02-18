import Title from "@/components/Title/Title";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Favorites({
  title = "nos destinations",
  subtitle = "coups de coeur",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/destinations?favorite=true&limit=3")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setFavorites(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setFavorites([]);
      });
  }, []);

  if (!favorites.length) {
    return null;
  }

  return (
    <>
      <Title title1={title} title2={subtitle} description={description} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((destination) => {
          const tag = destination?.tags?.[0] || "Sélection";
          const country = destination?.country || "Destination";
          const activity = destination?.activities?.[0] || "Découvrez";
          const image = destination?.main_image
            ? `/images/destinations/${destination.main_image}`
            : "/images/favorite-1.jpg";
          const href = destination?._id
            ? `/destinations/${destination._id}`
            : null;

          return (
            <Link
              key={destination._id || `${country}-${tag}`}
              className="col-span-1 h-[300px] sm:h-[380px] lg:h-[440px] perspective-1000 group"
              href={href || "#"}
              aria-disabled={!href}
            >
              <div className="relative w-full h-full cursor-pointer preserve-3d transition-transform duration-700 ease-in-out group-hover:rotate-y-180">
                {/* Front */}
                <div
                  className="absolute inset-0 backface-hidden rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden"
                  style={{ backgroundImage: `url('${image}')` }}
                >
                  <div className="absolute inset-0 bg-black/15"></div>
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[380px] h-auto sm:h-[70px] bg-white/10 backdrop-blur-md border-t border-white/20 rounded-xl flex items-start justify-start pl-3 sm:pl-4 pt-2 sm:pt-3 pb-2 sm:pb-0">
                    <div className="flex flex-col">
                      <p className="text-white text-xs sm:text-sm font-medium">
                        {tag}
                      </p>
                      <p className="text-white text-base sm:text-xl font-bold">
                        {country}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-[#DF986C] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center px-4 text-center">
                    <p className="text-black text-sm font-medium">
                      Une idée d'activité ?
                    </p>
                    <p className="text-black text-xl font-bold max-w-[280px]">
                      {activity}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
