import Header from "@/components/Header/Header";
import SiteShell from "@/components/Layout/SiteShell";
import DestinationsClient from "@/components/Destinations/DestinationsClient";

export const metadata = {
  title: "Destinations | AMEDIDA",
  description:
    "Explorez toutes les destinations AMEDIDA avec filtres par zone, vols et thématiques.",
};

export default function DestinationsPage() {
  return (
    <SiteShell showTopToolbar={false}>
      <div className="mx-auto max-w-[1200px] px-5 py-6 sm:py-10">
        <section className="relative w-full rounded-[10px] overflow-hidden border border-transparent">
          <Header forceSticky />
        </section>
        <div className="mt-6 sm:mt-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[color:var(--dest-text)]">
            Destinations
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[color:var(--dest-muted)]">
            Parcourez nos destinations et filtrez selon vos envies.
          </p>
          <DestinationsClient />
        </div>
      </div>
    </SiteShell>
  );
}
