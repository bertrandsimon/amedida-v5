import Header from "@/components/Header/Header";
import SiteShell from "@/components/Layout/SiteShell";
import { contactInfo } from "@/lib/constants";

export const metadata = {
  title: "Mentions légales | AMEDIDA",
  description:
    "Mentions légales et informations relatives à l'utilisation du site AMEDIDA.",
  alternates: {
    canonical: "/mentions-legales",
  },
  openGraph: {
    title: "Mentions légales | AMEDIDA",
    description:
      "Mentions légales et informations relatives à l'utilisation du site AMEDIDA.",
    url: "/mentions-legales",
    type: "website",
  },
  twitter: {
    title: "Mentions légales | AMEDIDA",
    description:
      "Mentions légales et informations relatives à l'utilisation du site AMEDIDA.",
  },
};

export default function MentionsLegalesPage() {
  return (
    <SiteShell showTopToolbar={false}>
      <div className="mx-auto max-w-[1200px] px-5 py-6 sm:py-10">
        <section className="relative w-full rounded-[10px] overflow-hidden border border-transparent">
          <Header forceSticky />
        </section>

        <section className="mt-6 sm:mt-8 text-[color:var(--dest-text)]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-20">
            Mentions légales
          </h1>
          <div className="mt-4 space-y-6 text-sm sm:text-base text-[color:var(--dest-muted)] leading-relaxed">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--dest-text)]">
                Éditeur du site
              </h2>
              <p className="mt-2">
                AMEDIDA, agence événementielle spécialisée en tourisme d&apos;affaires.
              </p>
              <p>
                Contact : {contactInfo.email} · {contactInfo.phone}
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--dest-text)]">
                Propriété intellectuelle
              </h2>
              <p className="mt-2">
                L&apos;ensemble des contenus (textes, images, graphismes, logos) est
                la propriété d&apos;AMEDIDA, sauf mentions contraires. Toute
                reproduction est interdite sans autorisation préalable.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--dest-text)]">
                Utilisation de l&apos;IA
              </h2>
              <p className="mt-2">
                Précision sur l&apos;utilisation de l&apos;IA : certaines photos
                d&apos;activités peuvent être issues d&apos;outils d&apos;intelligence
                artificielle.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--dest-text)]">
                Droits réservés
              </h2>
              <p className="mt-2">2026 Amedia. Droits réservés.</p>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
