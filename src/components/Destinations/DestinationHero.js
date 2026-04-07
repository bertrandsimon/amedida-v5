"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header/Header";
import DestinationImageStrip from "@/components/Destinations/DestinationImageStrip";

export default function DestinationHero({ destination, mainImage, images, durationLabel }) {
  const fallbackImage = useMemo(() => images?.[0] || "", [images]);
  const initialImage = mainImage || fallbackImage;
  const [activeImage, setActiveImage] = useState(initialImage);

  useEffect(() => {
    setActiveImage(initialImage);
  }, [initialImage]);

  const displayedImage = activeImage || initialImage;

  return (
    <div className="space-y-4 sm:space-y-5">
      <section className="relative w-full min-h-[520px] sm:min-h-[640px] lg:min-h-[740px] rounded-[10px] overflow-hidden">
        <Header forceSticky />
        <div className="absolute inset-0 z-0 rounded-[10px] overflow-hidden">
          {displayedImage ? (
            <Image
              src={displayedImage}
              alt={destination?.country || "Destination"}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-white/5" />
          )}
        </div>
        <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 z-10">
          <p className="text-xs sm:text-sm text-white/80 drop-shadow">
            {destination?.zone}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white drop-shadow">
            {destination?.country}
          </h1>
          {durationLabel && (
            <p className="text-sm sm:text-base text-white/80 drop-shadow mt-1">
              {durationLabel}
            </p>
          )}
        </div>
      </section>

      {Array.isArray(images) && images.length > 0 && (
        <DestinationImageStrip
          images={images}
          activeImage={displayedImage}
          onSelect={setActiveImage}
        />
      )}
    </div>
  );
}
