"use client";

import Image from "next/image";

export default function DestinationImageStrip({ images = [], activeImage, onSelect }) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 justify-start">
      {images.map((image) => (
        <button
          key={image}
          type="button"
          onClick={() => onSelect?.(image)}
          className={`relative h-[90px] w-[140px] sm:h-[110px] sm:w-[180px] overflow-hidden rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#df986c] transition ${
            activeImage === image ? "opacity-100" : "opacity-70 hover:opacity-100"
          }`}
          aria-label="Afficher cette image"
        >
          <Image src={image} alt="" fill className="object-cover" />
        </button>
      ))}
    </div>
  );
}
