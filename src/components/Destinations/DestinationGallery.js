"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function DestinationGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const hasImages = Array.isArray(images) && images.length > 0;

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

  if (!hasImages) {
    return (
      <p className="text-sm text-[color:var(--dest-soft)]">
        Aucune image disponible.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative overflow-hidden rounded-lg border border-[color:var(--dest-border)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#df986c] ${
              index === 0
                ? "col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
                : "aspect-[4/3] sm:aspect-[3/2]"
            }`}
            aria-label="Agrandir l'image"
          >
            <Image src={image} alt="" fill className="object-cover" />
          </button>
        ))}
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
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-8 text-white text-sm px-3 py-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
            aria-label="Fermer l'aperçu"
          >
            Fermer
          </button>
        </div>
      )}
    </>
  );
}
