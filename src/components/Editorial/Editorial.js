"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function Editorial() {
  const { theme } = useTheme();
  const textColor = theme === "light" ? "text-black" : "text-white";

  return (
    <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-10 italic font-poppins">
      <div>
        <p className={`${textColor} text-sm sm:text-base lg:text-lg`}>
          " C'est une fabrique de magie événementielle dédiée au tourisme
          d'affaires, prête à enchanter les entreprises avec des événements sur
          mesure qui marient à la perfection efficacité professionnelle et
          souvenirs impérissables."
        </p>
      </div>
      <div>
        <p className={`${textColor} text-sm sm:text-base lg:text-lg`}>
          " C'est une fabrique de magie événementielle dédiée au tourisme
          d'affaires, prête à enchanter les entreprises avec des événements sur
          mesure qui marient à la perfection efficacité professionnelle et
          souvenirs impérissables."
        </p>
      </div>
    </div>
  );
}
