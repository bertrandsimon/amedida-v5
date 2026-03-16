"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function DestinationImageStrip({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const stripRef = useRef(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? images.length - 1 : (prev - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const scrollByAmount = 260;

  return (
    <>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => stripRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" })}
          className="hidden sm:flex cursor-pointer z-10 p-2 text-white hover:text-[#df986c] transition-colors"
          aria-label="Previous images"
        >
          <ArrowLongLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div ref={stripRef} className="flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative h-[90px] w-[140px] sm:h-[110px] sm:w-[180px] flex-shrink-0 overflow-hidden rounded-lg border border-white/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#df986c]"
              aria-label="Agrandir l'image"
            >
              <Image src={image} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => stripRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" })}
          className="hidden sm:flex cursor-pointer z-10 p-2 text-white hover:text-[#df986c] transition-colors"
          aria-label="Next images"
        >
          <ArrowLongRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[1000]">
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            onClick={() => setActiveIndex(null)}
            aria-label="Fermer l'aperçu"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4 py-8 pointer-events-none">
            <div className="relative w-full max-w-[1100px] h-[70vh] sm:h-[78vh] pointer-events-auto rounded-xl overflow-hidden bg-black/20">
              <Image
                src={images[activeIndex]}
                alt=""
                fill
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === null ? 0 : (prev - 1 + images.length) % images.length,
              )
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white text-2xl px-3 py-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === null ? 0 : (prev + 1) % images.length,
              )
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white text-2xl px-3 py-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            aria-label="Image suivante"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
