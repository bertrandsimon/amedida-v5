"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { contactInfo } from "@/lib/constants";

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const backgroundClass = isLight ? "bg-white" : "bg-black";
  const menuText = isLight ? "text-[#5c5c5c] hover:text-black" : "text-[#9d9d9d] hover:text-white";
  const headingText = isLight ? "text-black" : "text-white";
  const bodyText = isLight ? "text-[#6f6f6f]" : "text-[#c2c2c2]";
  const inputBg = isLight ? "bg-white border-[#d0d0d0] text-black" : "bg-black border-[#4e4e4e] text-white";
  const dividerColor = isLight ? "border-[#e0e0e0]" : "border-[#4e4e4e]";
  const footerLink = isLight ? "hover:text-black" : "hover:text-white";
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Présentation", href: "/presentation" },
    { label: "Destinations", href: "/destinations" },
  ];

  return (
    <footer className={`w-full ${backgroundClass} rounded-b-[12px] py-8 sm:py-12 lg:py-16`}>
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-6 sm:gap-8">
          <div className="w-full lg:flex-1">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs sm:text-sm font-poppins transition-colors ${menuText}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* On vous rappelle Section */}
          <div className="flex flex-col w-full lg:w-auto lg:max-w-[379px]">
            <h3 className={`text-sm sm:text-base font-poppins mb-2 ${headingText}`}>
              On vous rappelle
            </h3>
            <p className={`text-xs sm:text-sm font-poppins font-light mb-4 ${bodyText}`}>
              Laissez votre numéro et nous vous rappelons pour construire votre
              projet sur-mesure.
            </p>
            <form
              action={`https://formsubmit.co/${contactInfo.email}`}
              method="POST"
              className="flex flex-col sm:flex-row gap-2 mb-2"
            >
              <input type="hidden" name="_subject" value="On vous rappelle" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                required
                className={`rounded-[6px] h-[34px] px-3 text-xs sm:text-sm font-poppins focus:outline-none focus:border-[#DF986C] transition-colors w-full sm:w-[200px] lg:w-[270px] border ${inputBg}`}
              />
              <button
                type="submit"
                className="bg-[#c48056] rounded-[8px] h-[34px] px-4 text-white text-xs sm:text-sm font-poppins uppercase hover:bg-[#DF986C] transition-colors whitespace-nowrap"
              >
                ok
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t ${dividerColor}`}>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] sm:text-xs font-poppins ${bodyText}`}>
            <span>2026 Amedia. Droits réservés</span>
            <span className="hidden sm:inline">·</span>
            <Link
              href="/mentions-legales"
              className={`transition-colors ${footerLink}`}
            >
              Mentions légales
            </Link>
            <span className="hidden sm:inline">·</span>
            <a
              href="https://logeen.com"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${footerLink}`}
            >
              Conception du site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
