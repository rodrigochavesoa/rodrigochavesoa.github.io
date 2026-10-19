import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

const themeBoot = `(function(){try{var q=new URLSearchParams(location.search).get("theme");if(q==="light"||q==="dark"){localStorage.setItem("theme",q);}var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}var href=d?"/icon-dark.png?v=3":"/icon-light.png?v=3";var links=document.querySelectorAll('link[rel="icon"]');if(links.length){links.forEach(function(el){el.removeAttribute("media");el.type="image/png";el.href=href;});}else{var l=document.createElement("link");l.rel="icon";l.type="image/png";l.href=href;document.head.appendChild(l);}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://rodrigochavesoa.github.io"),
  title: {
    default: "@colabdeveloper",
    template: "%s · @colabdeveloper",
  },
  description:
    "Comunidade @colabdeveloper: laboratório colaborativo de Rodrigo Chaves, com projetos no ar e repositórios públicos.",
  icons: {
    icon: [
      {
        url: "/icon-light.png?v=3",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.png?v=3",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
