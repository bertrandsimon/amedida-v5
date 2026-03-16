"use client";

import Link from "next/link";
import { contactInfo } from "@/lib/constants";

export default function Footer() {
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Présentation", href: "/presentation" },
    { label: "Destinations", href: "/destinations" },
  ];

  return (
    <footer className="w-full bg-black rounded-b-[12px] py-8 sm:py-12 lg:py-16">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-6 sm:gap-8">
          <div className="w-full lg:flex-1">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[#9d9d9d] text-xs sm:text-sm font-poppins hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* On vous rappelle Section */}
          <div className="flex flex-col w-full lg:w-auto lg:max-w-[379px]">
            <h3 className="text-white text-sm sm:text-base font-poppins mb-2">
              On vous rappelle
            </h3>
            <p className="text-[#c2c2c2] text-xs sm:text-sm font-poppins font-light mb-4">
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
                className="bg-black border border-[#4e4e4e] rounded-[6px] h-[34px] px-3 text-white text-sm sm:text-base font-poppins focus:outline-none focus:border-[#DF986C] transition-colors w-full sm:w-[200px] lg:w-[270px]"
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
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#4e4e4e]">
          <p className="text-white text-xs sm:text-sm lg:text-base font-poppins text-center">
            2026 Amedia. Droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
