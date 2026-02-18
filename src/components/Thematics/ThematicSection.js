"use client";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/lib/themes";
import ThemeCard from "./ThemeCard";

const tagMap = {
  "rencontres & emotions": "Rencontres & émotions",
  "cap soleil": "Cap soleil",
  "vivrations urbaines": "Vibrations urbaines",
  "hors des sentiers": "Hors des sentiers",
};

export default function ThematicSection({ onSelectTag }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Responsive: 1 card on mobile, 2 on tablet, 4 on desktop
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Calculate how many groups we have
  const totalGroups = Math.ceil(themes.length / visibleCards);
  const maxGroupIndex = totalGroups - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextGroup = prev + 1;
      return nextGroup > maxGroupIndex ? 0 : nextGroup;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const prevGroup = prev - 1;
      return prevGroup < 0 ? maxGroupIndex : prevGroup;
    });
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextGroup = prev + 1;
        return nextGroup > maxGroupIndex ? 0 : nextGroup;
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [maxGroupIndex]);

  const { theme } = useTheme();
  // Keep "une thematique inspirante" white in light mode (over imagery)
  const textColor = "text-white";
  const arrowColor = theme === "light" ? "text-black" : "text-white";

  const cardWidth = 210;
  const gap = 30;
  const containerWidth =
    visibleCards === 1
      ? cardWidth
      : visibleCards === 2
        ? cardWidth * 2 + gap
        : cardWidth * 4 + gap * 3;

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 relative z-20">
      <div className="container max-w-[1200px] px-4">
        <div className="w-full">
          <div className="flex items-center justify-end mb-4 sm:mb-6 relative z-20 pr-0 sm:pr-10 lg:pr-40">
            <div
              className={`${textColor} text-sm sm:text-base lg:text-lg relative z-20 font-poppins`}
            >
              une <span>thématique</span>{" "}
              <span className="font-display ">inspirante</span> ?
            </div>
            <div className="pt-2 pl-2 sm:pl-4">
              <Image
                src="/images/arrow-right.png"
                alt="arrow-right"
                width={20}
                height={24}
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-6"
              />
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className={`hidden sm:flex cursor-pointer z-10 p-2 ${arrowColor} hover:text-[#df986c] transition-colors items-center h-full mr-2 sm:mr-4 lg:mr-[30px]`}
              aria-label="Previous"
            >
              <ArrowLongLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Carousel Container */}
            <div
              className="overflow-hidden mx-auto w-full sm:w-auto"
              style={{ maxWidth: `${containerWidth}px` }}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(-${currentIndex * (visibleCards * (cardWidth + gap))}px)`,
                }}
              >
                {themes.map((theme) => {
                  const tag = tagMap[theme.title] || theme.title;
                  return (
                    <div key={theme.id} className="flex-shrink-0">
                      <ThemeCard
                        theme={theme}
                        onSelect={() => onSelectTag?.(tag)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className={`hidden sm:flex cursor-pointer z-10 p-2 ${arrowColor} hover:text-[#df986c] transition-colors items-center h-full ml-2 sm:ml-4 lg:ml-[30px]`}
              aria-label="Next"
            >
              <ArrowLongRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
