"use client";

import Footer from "@/components/Footer/Footer";
import TopToolbar from "@/components/Header/TopToolbar";
import { useTheme } from "@/contexts/ThemeContext";

export default function SiteShell({ children, showTopToolbar = true }) {
  const { theme } = useTheme();

  return (
    <div
      className="pt-2 px-2 sm:px-4"
      style={{ backgroundColor: theme === "light" ? "#EFEEF1" : "#181818" }}
    >
      <div className="flex justify-center items-center py-4 sm:py-8">
        {/* <AnimatedNav /> */}
      </div>
      {showTopToolbar && <TopToolbar />}
      <div
        className={`mb-30 rounded-[12px] w-full max-w-[1260px] mx-auto transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-black"}`}
      >
        <div className="p-3 sm:p-5">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
