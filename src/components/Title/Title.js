"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function Title({ title1, title2, description }) {
  const { theme } = useTheme();
  const textColor = theme === "light" ? "text-black" : "text-white";
  const descriptionColor = theme === "light" ? "text-gray-600" : "text-[#9ea0a9]";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 lg:p-10 gap-4 sm:gap-6">
      <div className="font-poppins">
        <p className={`font-light text-sm sm:text-base lg:text-lg ${textColor}`}>{title1}</p>
        <p className={`font-light text-2xl sm:text-3xl lg:text-4xl font-display ${textColor}`}>{title2}</p>
      </div>
      <div className="w-full sm:w-auto sm:max-w-[400px] lg:max-w-[500px]">
        <p className={`text-xs sm:text-sm ${descriptionColor} font-light font-poppins`}>
          {description}
        </p>
      </div>
    </div>
  );
}
