/** biome-ignore-all lint/a11y/useButtonType: buttons are used for navigation, not form submission */
"use client";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];
  const { theme } = useTheme();
  const textColor = theme === "light" ? "text-black" : "text-white";
  const secondaryTextColor = theme === "light" ? "text-gray-600" : "text-[#9ea0a9]";
  const arrowColor = theme === "light" ? "text-gray-400" : "text-white/50";
  const arrowHoverColor = theme === "light" ? "hover:text-gray-600" : "hover:text-white";

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="w-full flex justify-center pb-12 sm:pb-16 lg:pb-20">
      <div className="container max-w-[1000px] px-4">
        <div className="w-full">
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex flex-col flex-shrink-0 w-full sm:w-auto">
                <div className="flex items-start gap-3 sm:gap-4 pr-0 sm:pr-10 lg:pr-20">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={currentTestimonial.photo}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className={`${textColor} font-semibold font-poppins text-sm sm:text-base`}>
                      {currentTestimonial.name}
                    </p>
                    <p className={`${secondaryTextColor} text-xs sm:text-sm font-poppins`}>
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className={`${arrowColor} ${arrowHoverColor} transition-colors cursor-pointer`}
                    aria-label="Previous testimonial"
                  >
                    <ArrowLongLeftIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className={`${arrowColor} ${arrowHoverColor} transition-colors cursor-pointer`}
                    aria-label="Next testimonial"
                  >
                    <ArrowLongRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 flex items-start sm:items-center">
                <p className={`${textColor} text-sm sm:text-base lg:text-lg font-poppins italic leading-relaxed`}>
                  "{currentTestimonial.text}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
