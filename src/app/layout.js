import { Poppins, Roboto, Shrikhand } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "animate.css";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const shrikhand = Shrikhand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-shrikhand",
});

const poppins = Poppins({
  weight: ["300"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "AMEDIDA - Voyages de récompense sur mesure",
  description: "Fabrique de magie événementielle dédiée au tourisme d'affaires",
  icons: {
    icon: [
      {
        url: "/favicon/favicon-light-mode/favicon.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/favicon-dark-mode/favicon.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon/favicon-light-mode/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/favicon-dark-mode/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/favicon/favicon-light-mode/apple-touch-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/favicon-dark-mode/apple-touch-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AMEDIDA",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${roboto.variable} ${shrikhand.variable} ${poppins.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
