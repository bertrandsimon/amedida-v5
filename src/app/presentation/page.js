import Header from "@/components/Header/Header";
import SiteShell from "@/components/Layout/SiteShell";

export const metadata = {
  title: "Présentation | AMEDIDA",
  description:
    "Découvrez AMEDIDA, agence événementielle dédiée au tourisme d'affaires et aux expériences sur-mesure.",
};

export default function PresentationPage() {
  return (
    <SiteShell showTopToolbar={false}>
      <div className="mx-auto max-w-[1200px] px-5 py-6 sm:py-10">
        <section className="relative w-full rounded-[10px] overflow-hidden border border-transparent">
          <Header forceSticky />
        </section>

        <section className="mt-6 sm:mt-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[color:var(--dest-text)]">
            Qui sommes-nous ?
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[color:var(--dest-muted)]">
            Amedida, un nom qui évoque le « sur-mesure » en portugais, est notre
            signature. Nous sommes une agence événementielle dédiée au tourisme
            d'affaires, prête à servir les entreprises qui veulent faire de chaque
            événement un cocktail parfait de professionnalisme et de souvenirs
            inoubliables. Et ne vous inquiétez pas, pas besoin de parler portugais
            pour nous comprendre, nous nous adaptons aussi « à medida » !
          </p>
          <p className="mt-6 text-sm sm:text-base font-semibold text-[color:var(--dest-text)]">
            AMEDIDA
          </p>
          <p className="text-sm sm:text-base text-[color:var(--dest-muted)]">
            Les Sables d’Olonne
          </p>
        </section>

        <section
          className="mt-8 sm:mt-10 rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--dest-text)]">
            Notre Promesse
          </h2>
          <ul className="mt-4 space-y-2 text-sm sm:text-base text-[color:var(--dest-muted)]">
            <li>Des destinations coup de coeur et concepts différents</li>
            <li>Une équipe réactive, créative et rigoureuse</li>
            <li>Un réseau solide de partenaires en France et à l’international</li>
            <li>
              Un seul objectif : faire de chaque événement un levier de performance
              et de fidélisation
            </li>
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
