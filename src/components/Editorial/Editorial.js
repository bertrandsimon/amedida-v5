"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function Editorial() {
  const { theme } = useTheme();
  const textColor = theme === "light" ? "text-black" : "text-white";

  return (
    <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-10 italic font-poppins">
      <div>
        <p className={`${textColor} text-sm sm:text-base lg:text-lg`}>
          Qui sommes-nous ?
        </p>
        <p
          className={`${textColor} text-sm sm:text-base lg:text-lg mt-2 leading-relaxed`}
        >
          Amedida, un nom qui évoque le « sur-mesure » en portugais, est notre
          signature. Nous sommes une agence événementielle dédiée au tourisme
          d'affaires, prête à servir les entreprises qui veulent faire de chaque
          événement un cocktail parfait de professionnalisme et de souvenirs
          inoubliables. Et ne vous inquiétez pas, pas besoin de parler portugais
          pour nous comprendre, nous nous adaptons aussi « à medida » !
        </p>
      </div>
      <div>
        <p className={`${textColor} text-sm sm:text-base lg:text-lg`}>
          Notre Mission
        </p>
        <p
          className={`${textColor} text-sm sm:text-base lg:text-lg mt-2 leading-relaxed`}
        >
          Créer des événements d'entreprise qui allient performance, cohésion et
          inspiration. Que ce soit pour un séminaire, un voyage incentive, un
          team-building ou un lancement de produit, nous concevons des formats
          sur-mesure adaptés à vos enjeux et à votre culture d’entreprise.
        </p>
      </div>
    </div>
  );
}
