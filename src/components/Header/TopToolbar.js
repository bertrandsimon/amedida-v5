"use client";

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { contactInfo } from "@/lib/constants";

export default function TopToolbar({ isSticky = false }) {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = theme === "light" ? "text-black" : "text-white";
  const dividerColor = theme === "light" ? "bg-black/30" : "bg-white/30";
  const spacingClass = isSticky ? "mb-2 sm:mb-4" : "";
  const modalBg = theme === "light" ? "bg-white" : "bg-[#1f1f1f]";
  const modalText = theme === "light" ? "text-black" : "text-white";
  const modalBorder = theme === "light" ? "border-black/10" : "border-white/10";
  const inputBg = theme === "light" ? "bg-white" : "bg-[#181818]";
  const inputBorder = theme === "light" ? "border-black/20" : "border-white/20";

  return (
    <div className="w-full bg-transparent py-2 sm:py-4">
      <div className="w-full max-w-[1260px] mx-auto px-2 sm:px-4">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-end gap-2 sm:gap-4 ${spacingClass}`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <PhoneIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${textColor}`} />
            <span
              className={`text-xs ${textColor} font-poppins cursor-pointer`}
            >
              {contactInfo.phone}
            </span>
          </div>
          <div className={`hidden sm:block h-4 w-px ${dividerColor}`}></div>
          <div className="flex items-center gap-2 sm:gap-3">
            <EnvelopeIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${textColor}`} />
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className={`text-xs ${textColor} font-poppins break-all sm:break-normal cursor-pointer hover:text-[#df986c] transition-colors`}
              aria-label="Open email form"
            >
              {contactInfo.email}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[1000] bg-black/60"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close email form"
          />
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none">
            <div
              className={`w-full max-w-[520px] rounded-xl border ${modalBorder} ${modalBg} p-5 sm:p-6 ${modalText} pointer-events-auto`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Envoyer un message
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm text-[#9d9d9d] hover:text-[#df986c] transition-colors cursor-pointer"
                  aria-label="Close email form"
                >
                  Fermer
                </button>
              </div>

              <form
                className="space-y-3"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setIsModalOpen(false);
                  }
                }}
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs uppercase tracking-wide text-[#9d9d9d]"
                  >
                    Nom
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Votre nom"
                    className={`h-10 rounded-md border ${inputBorder} ${inputBg} px-3 text-sm ${modalText} focus:outline-none focus:border-[#df986c] transition-colors`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs uppercase tracking-wide text-[#9d9d9d]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Votre email"
                    className={`h-10 rounded-md border ${inputBorder} ${inputBg} px-3 text-sm ${modalText} focus:outline-none focus:border-[#df986c] transition-colors`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs uppercase tracking-wide text-[#9d9d9d]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Votre message"
                    className={`rounded-md border ${inputBorder} ${inputBg} px-3 py-2 text-sm ${modalText} focus:outline-none focus:border-[#df986c] transition-colors`}
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs sm:text-sm px-3 py-2 rounded-md border border-[#9d9d9d]/40 text-[#9d9d9d] hover:text-white hover:border-[#df986c] transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="text-xs sm:text-sm px-4 py-2 rounded-md bg-[#c48056] text-white hover:bg-[#df986c] transition-colors cursor-pointer"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
