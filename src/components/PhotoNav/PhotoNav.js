"use client";

import { useEffect, useState } from "react";
import Title from "@/components/Title/Title";
import { useTheme } from "@/contexts/ThemeContext";

export default function PhotoNav({
  title = "Le plus court chemin",
  subtitle = "vers le bout du monde",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tag,
}) {
  const { theme } = useTheme();
  // Text on photos should be white in light mode
  const textColor = theme === "light" ? "text-white" : "text-white";

  const [photoItems, setPhotoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({ limit: "4" });
    if (tag) {
      params.set("tag", tag);
    }
    fetch(`/api/destinations?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setIsLoading(false);
          return;
        }
        const mapped = data.map((destination, index) => {
          const rawActivity = destination?.activities?.[0] || "";
          const activity =
            rawActivity.length > 0
              ? rawActivity.charAt(0).toUpperCase() + rawActivity.slice(1)
              : "";
          return {
            id: destination._id || `${destination.country}-${index}`,
            image: destination?.activity_image
              ? `/images/destinations/${destination.activity_image}`
              : destination?.main_image
                ? `/images/destinations/${destination.main_image}`
                : "",
            title: activity,
            subtitle: destination?.country || "",
          };
        });
        setPhotoItems(mapped);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [tag]);

  const getItem = (index) => photoItems[index];

  return (
    <>
      <Title title1={title} title2={subtitle} description={description} />
      <div className="w-full pb-8 sm:pb-12 lg:pb-30 flex justify-center">
        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[1200px] px-4">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <div className="group relative rounded-[12px] overflow-hidden flex-1 h-[200px] sm:h-[250px] lg:h-[317px] cursor-pointer">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                </div>
              ) : (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-[1.2]"
                    style={{
                      backgroundImage: getItem(0)?.image
                        ? `url(${getItem(0).image})`
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15"></div>
                </>
              )}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex items-start justify-start">
                <div className="flex flex-col">
                  {tag && (
                    <span className="mb-1 inline-flex w-fit rounded-full bg-white/90 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-black">
                      {tag}
                    </span>
                  )}
                  <p className={`${textColor} text-xs sm:text-sm font-medium`}>
                    {getItem(0)?.title}
                  </p>
                  <p className={`${textColor} text-base sm:text-xl font-bold`}>
                    {getItem(0)?.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative rounded-[12px] overflow-hidden flex-[0.63] sm:flex-[0.63] h-[200px] sm:h-[250px] lg:h-[317px] cursor-pointer">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                </div>
              ) : (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-[1.2]"
                    style={{
                      backgroundImage: getItem(1)?.image
                        ? `url(${getItem(1).image})`
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15"></div>
                </>
              )}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex items-start justify-start">
                <div className="flex flex-col">
                  {tag && (
                    <span className="mb-1 inline-flex w-fit rounded-full bg-white/90 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-black">
                      {tag}
                    </span>
                  )}
                  <p className={`${textColor} text-xs sm:text-sm font-medium`}>
                    {getItem(1)?.title}
                  </p>
                  <p className={`${textColor} text-base sm:text-xl font-bold`}>
                    {getItem(1)?.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <div className="group relative rounded-[12px] overflow-hidden flex-[0.63] sm:flex-[0.63] h-[200px] sm:h-[250px] lg:h-[317px] cursor-pointer">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                </div>
              ) : (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-[1.2]"
                    style={{
                      backgroundImage: getItem(2)?.image
                        ? `url(${getItem(2).image})`
                        : "rgba(0, 0, 0, 0.08)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15"></div>
                </>
              )}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex items-start justify-start">
                <div className="flex flex-col">
                  {tag && (
                    <span className="mb-1 inline-flex w-fit rounded-full bg-white/90 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-black">
                      {tag}
                    </span>
                  )}
                  <p className={`${textColor} text-xs sm:text-sm font-medium`}>
                    {getItem(2)?.title}
                  </p>
                  <p className={`${textColor} text-base sm:text-xl font-bold`}>
                    {getItem(2)?.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative rounded-[12px] overflow-hidden flex-1 h-[200px] sm:h-[250px] lg:h-[317px] cursor-pointer">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                </div>
              ) : (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-[1.2]"
                    style={{
                      backgroundImage: getItem(3)?.image
                        ? `url(${getItem(3).image})`
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15"></div>
                </>
              )}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex items-start justify-start">
                <div className="flex flex-col">
                  {tag && (
                    <span className="mb-1 inline-flex w-fit rounded-full bg-white/90 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-black">
                      {tag}
                    </span>
                  )}
                  <p className={`${textColor} text-xs sm:text-sm font-medium`}>
                    {getItem(3)?.title}
                  </p>
                  <p className={`${textColor} text-base sm:text-xl font-bold`}>
                    {getItem(3)?.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
