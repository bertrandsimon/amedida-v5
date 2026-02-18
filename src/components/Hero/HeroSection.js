/** biome-ignore-all lint/a11y/useButtonType: buttons are used for navigation, not form submission */
"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header/Header";
import HeroTitle from "./HeroTitle";
import SearchForm from "./SearchForm";
export default function HeroSection({ onSelection }) {
  const slides = [
    { type: "video", src: "/videos/amedida-video.mp4" },
    // { type: "image", src: "/images/slide-1.jpg" },
    // { type: "image", src: "/images/Rectangle 231.png" },
    // { type: "image", src: "/images/Rectangle 232.png" },
  ];
  const [currentIndex] = useState(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prev) => (prev + 1) % slides.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  // };

  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Header */}
      <Header />

      {/* Background Media */}
      <div className="absolute inset-0 z-0 rounded-[10px] overflow-hidden">
        <div className="relative w-full h-full overflow-hidden pointer-events-none rounded-[10px]">
          {slides[currentIndex].type === "video" ? (
            <video
              key={slides[currentIndex].src}
              src={slides[currentIndex].src}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              key={slides[currentIndex].src}
              src={slides[currentIndex].src}
              alt="Hero background"
              fill
              className="object-cover transition-opacity duration-500"
              style={{ objectPosition: "center top" }}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Left Navigation Arrow */}
      {/* <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-2 sm:left-4 lg:left-8 z-10 p-2 text-white hover:text-[#df986c] transition-colors cursor-pointer items-center h-full"
        aria-label="Previous slide"
      >
        <ArrowLongLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button> */}

      {/* Content */}
      <div className="relative z-10 container max-w-[1200px] px-4 py-16 sm:py-24 lg:py-32 flex items-center justify-center">
        <div className="max-w-5xl text-center w-full px-2">
          <HeroTitle key={currentIndex} />

          <SearchForm onSelection={onSelection} />
        </div>
      </div>

      {/* Right Navigation Arrow */}
      {/* <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-2 sm:right-4 lg:right-8 z-10 p-2 text-white hover:text-[#df986c] transition-colors cursor-pointer items-center h-full"
        aria-label="Next slide"
      >
        <ArrowLongRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button> */}
    </section>
  );
}
