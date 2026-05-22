import Image from "next/image";
import { Sparkles, Users, Globe2, Target } from "lucide-react";
import Header from "@/components/Header/Header";
import SiteShell from "@/components/Layout/SiteShell";

export const metadata = {
  title: "Présentation | AMEDIDA",
  description:
    "Découvrez AMEDIDA, agence événementielle dédiée au tourisme d'affaires et aux expériences sur-mesure.",
  alternates: {
    canonical: "/presentation",
  },
  openGraph: {
    title: "Présentation | AMEDIDA",
    description:
      "Découvrez AMEDIDA, agence événementielle dédiée au tourisme d'affaires et aux expériences sur-mesure.",
    url: "/presentation",
    type: "website",
  },
  twitter: {
    title: "Présentation | AMEDIDA",
    description:
      "Découvrez AMEDIDA, agence événementielle dédiée au tourisme d'affaires et aux expériences sur-mesure.",
  },
};

export default function PresentationPage() {
  return (
    <SiteShell showTopToolbar={false}>
      <div className="mx-auto max-w-[1200px] px-5 py-6 sm:py-10">
        <section className="relative w-full rounded-[10px] overflow-hidden border border-transparent">
          <Header forceSticky />
        </section>

        <section className="mt-6 sm:mt-8">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[color:var(--dest-text)] mt-20">
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
            </div>
            <div className="w-full lg:w-[260px] flex justify-center lg:justify-end mt-4 lg:mt-24">
              <div className="relative h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] rounded-full overflow-hidden">
                <Image
                  src="/images/pendule.jpg"
                  alt="Pendule"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--dest-text)]">
            Notre Promesse
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-transparent bg-[#df986c] p-4 sm:p-5 text-white">
              <Sparkles className="h-6 w-6 text-white" />
              <p className="mt-3 text-sm sm:text-base">
                Des destinations coup de coeur et concepts différents
              </p>
            </div>
            <div className="rounded-2xl border border-transparent bg-[#df986c] p-4 sm:p-5 text-white">
              <Users className="h-6 w-6 text-white" />
              <p className="mt-3 text-sm sm:text-base">
                Une équipe réactive, créative et rigoureuse
              </p>
            </div>
            <div className="rounded-2xl border border-transparent bg-[#df986c] p-4 sm:p-5 text-white">
              <Globe2 className="h-6 w-6 text-white" />
              <p className="mt-3 text-sm sm:text-base">
                Un réseau solide de partenaires en France et à l’international
              </p>
            </div>
            <div className="rounded-2xl border border-transparent bg-[#df986c] p-4 sm:p-5 text-white">
              <Target className="h-6 w-6 text-white" />
              <p className="mt-3 text-sm sm:text-base">
                Un seul objectif : faire de chaque événement un levier de performance
                et de fidélisation
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--dest-text)] mb-4">
            Nos garanties
          </h2>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
            {["partner-1.jpg", "partner-2.jpg", "partner-3.jpg"].map((partner) => (
              <div
                key={partner}
                className="relative h-[96px] w-[96px] sm:h-[120px] sm:w-[120px] md:h-[142px] md:w-[142px] rounded-xl overflow-hidden"
              >
                <Image
                  src={`/images/${partner}`}
                  alt="Partenaire AMEDIDA"
                  width={142}
                  height={142}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
