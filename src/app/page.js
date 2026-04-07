import HomePageClient from "@/components/Home/HomePageClient";

export const metadata = {
  title: "AMEDIDA - Voyages de récompense sur mesure",
  description:
    "Agence événementielle dédiée au tourisme d'affaires et aux voyages de récompense sur mesure.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AMEDIDA - Voyages de récompense sur mesure",
    description:
      "Agence événementielle dédiée au tourisme d'affaires et aux voyages de récompense sur mesure.",
    url: "/",
    type: "website",
  },
  twitter: {
    title: "AMEDIDA - Voyages de récompense sur mesure",
    description:
      "Agence événementielle dédiée au tourisme d'affaires et aux voyages de récompense sur mesure.",
  },
};

export default function Home() {
  return <HomePageClient />;
}
