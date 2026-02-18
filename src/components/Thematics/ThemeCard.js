"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeCard({ theme, onSelect }) {
  const { theme: currentTheme } = useTheme();
  const textColor = currentTheme === "light" ? "text-black" : "text-white";
  const borderColor = currentTheme === "light" ? "border-gray-300" : "border-white";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative group cursor-pointer flex flex-col items-center"
    >
      <div className={`relative w-[180px] h-[85px] sm:w-[200px] sm:h-[95px] lg:w-[210px] lg:h-[100px] rounded-lg overflow-hidden border-2 ${borderColor} shadow-[0px_6px_10px_4px_rgba(0,0,0,0.15),0px_2px_3px_0px_rgba(0,0,0,0.3)]`}>
        <Image
          src={theme.image}
          alt={theme.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>
      <p className={`text-center ${textColor} text-sm sm:text-[15px] lg:text-[16px] mt-2 font-poppins w-[180px] sm:w-[200px] lg:w-[210px]`}>
        {theme.title === "rencontres & emotions" ? (
          <>
            <span className="font-light">rencontres </span>
            <span className="font-bold">& emotions</span>
          </>
        ) : theme.title === "cap soleil" ? (
          <>
            <span className="font-light">cap </span>
            <span className="font-bold">soleil</span>
          </>
        ) : theme.title === "vivrations urbaines" ? (
          <>
            <span className="font-light">vivrations </span>
            <span className="font-bold">urbaines</span>
          </>
        ) : theme.title === "hors des sentiers" ? (
          <>
            <span className="font-light">hors des </span>
            <span className="font-bold">sentiers</span>
          </>
        ) : (
          <span className="font-light">{theme.title}</span>
        )}
      </p>
    </button>
  );
}
