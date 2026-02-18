"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Navigation from "./Navigation";
import TopToolbar from "./TopToolbar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > 20;
      setIsSticky(shouldStick);
      if (!shouldStick) {
        setIsMobileMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerClass = isSticky
    ? "container max-w-[1260px] px-2 sm:px-4"
    : "container max-w-[1200px] px-2 sm:px-4";

  const renderHeaderContent = () => (
    <div className={containerClass}>
      <div className="flex items-center justify-between py-2 sm:py-4">
        <div
          className="h-[50px] w-[110px] sm:h-[69px] sm:w-[148px] relative flex-shrink-0"
          data-name="Amedia logo"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ overflow: "hidden" }}
          >
            <Image
              src={
                isSticky
                  ? theme === "light"
                    ? "/images/amedida-logo-noir.png"
                    : "/images/amedida-logo-blanc.png"
                  : "/images/amedida-logo-blanc.png"
              }
              alt="AMEDIDA Logo"
              className="object-contain"
              width={148}
              height={69}
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <Navigation isSticky={isSticky} theme={theme} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {theme === "dark" ? (
            <button
              type="button"
              onClick={toggleTheme}
              className="cursor-pointer text-white hover:text-[#df986c] transition-colors p-2"
              aria-label="Switch to light mode"
            >
              <Sun className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleTheme}
              className={`cursor-pointer ${
                isSticky ? "text-black" : "text-white"
              } hover:text-[#df986c] transition-colors p-2`}
              aria-label="Switch to dark mode"
            >
              <Moon className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            className="cursor-pointer bg-black text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-poppins hover:bg-[#df986c] transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-white/20">
          <div className="pt-4 space-y-4">
            <Navigation isSticky={isSticky} theme={theme} />
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="cursor-pointer text-white hover:text-[#df986c] transition-colors p-2"
                    aria-label="Switch to light mode"
                  >
                    <Sun className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`cursor-pointer ${
                      isSticky ? "text-black" : "text-white"
                    } hover:text-[#df986c] transition-colors p-2`}
                    aria-label="Switch to dark mode"
                  >
                    <Moon className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="cursor-pointer bg-black text-white px-4 py-2 rounded-full text-sm font-poppins hover:bg-[#df986c] transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {!isSticky && (
        <header className="absolute top-0 left-0 right-0 z-50 pt-2 sm:pt-4 px-2 sm:px-4">
          {renderHeaderContent()}
        </header>
      )}
      {isSticky && (
        <>
          <div
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1260px] px-2 sm:px-4 pt-[40px] pb-4 sm:pb-6 ${
              theme === "light" ? "bg-[#EFEEF1]" : "bg-[#181818]"
            }`}
          >
            <TopToolbar isSticky />
          </div>
          <header
            className={`fixed top-[90px] left-1/2 -translate-x-1/2 z-50 w-full max-w-[1260px] px-2 sm:px-4 rounded-t-[12px] ${
              theme === "light" ? "bg-white" : "bg-black"
            }`}
          >
            {renderHeaderContent()}
          </header>
        </>
      )}
    </>
  );
}
