"use client";

import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black rounded-b-[12px] py-8 sm:py-12 lg:py-16">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-6 sm:gap-8">
          {/* Menu 1 Column */}
          <div className="flex flex-col w-full sm:w-auto">
            <h3 className="text-white text-sm sm:text-base font-poppins mb-3 sm:mb-4">
              Menu 1
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 1
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 2
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 3
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu4
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 5
              </li>
            </ul>
          </div>

          {/* Menu 2 Column */}
          <div className="flex flex-col w-full sm:w-auto">
            <h3 className="text-white text-sm sm:text-base font-poppins mb-3 sm:mb-4">
              Menu 2
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 1
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 2
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 3
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu4
              </li>
              <li className="text-[#9d9d9d] text-xs sm:text-sm font-poppins">
                Menu 5
              </li>
            </ul>
          </div>

          {/* On vous rappelle Section */}
          <div className="flex flex-col w-full lg:w-auto lg:max-w-[379px]">
            <h3 className="text-white text-sm sm:text-base font-poppins mb-2">
              On vous rappelle
            </h3>
            <p className="text-[#c2c2c2] text-xs sm:text-sm font-poppins font-light mb-4">
              Ornare arcu gravida natoque erat et cursus, ornare arcu gravida
              natoque erat et cursu.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <input
                type="tel"
                placeholder="Téléphone"
                className="bg-black border border-[#4e4e4e] rounded-[6px] h-[34px] px-3 text-white text-sm sm:text-base font-poppins focus:outline-none focus:border-[#DF986C] transition-colors w-full sm:w-[200px] lg:w-[270px]"
              />
              <button
                type="button"
                className="bg-[#c48056] rounded-[8px] h-[34px] px-4 text-white text-xs sm:text-sm font-poppins uppercase hover:bg-[#DF986C] transition-colors whitespace-nowrap"
              >
                ok
              </button>
            </div>
            {/* Social Media Icons */}
            <div className="flex gap-4 items-center">
              <a
                href="/"
                className="flex items-center justify-center w-[28px] h-[32px] text-white hover:text-[#df986c] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="/"
                className="flex items-center justify-center w-[29px] h-[29px] text-white hover:text-[#df986c] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
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
