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

export const metadata = {
  title: "AMEDIDA - Voyages de récompense sur mesure",
  description: "Fabrique de magie événementielle dédiée au tourisme d'affaires",
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
