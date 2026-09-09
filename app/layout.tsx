import type { Metadata, Viewport } from "next";
import { Chakra_Petch } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const body = Chakra_Petch({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

// La misma tipografía que usa el HUD del juego.
const antilles = localFont({
  src: "./fonts/antilles.ttf",
  variable: "--font-antilles",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Urban Strike: SWAT Ops — Run & Gun 2D",
  description:
    "Un operativo SWAT limpia tres zonas tomadas por bandas criminales: tres niveles, cuatro arquetipos de enemigo y tres jefes blindados. Hecho en Godot 4.4.",
  applicationName: "Urban Strike: SWAT Ops",
  keywords: ["Urban Strike", "SWAT Ops", "run and gun", "Godot", "pixel art", "juego 2D"],
  openGraph: {
    title: "Urban Strike: SWAT Ops — Run & Gun 2D",
    description:
      "Tres zonas, oleadas sin descanso y tres jefes blindados. 21 balas por cargador y 10 puntos de vida.",
    siteName: "Urban Strike: SWAT Ops",
    type: "website",
    locale: "es_ES",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Strike: SWAT Ops — Run & Gun 2D",
    description:
      "Tres zonas, oleadas sin descanso y tres jefes blindados. 21 balas por cargador y 10 puntos de vida.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${body.variable} ${antilles.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-bone">{children}</body>
    </html>
  );
}
