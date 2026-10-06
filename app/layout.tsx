import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { ReadingModeProvider } from "@/components/ReadingMode";
import WebAnalytics from "@/components/WebAnalytics";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.projectName}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  icons: {
    icon: "/brand/kauai-internet-bird.png",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${fraunces.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("kauai-reading-mode")==="plain")document.documentElement.classList.add("reading-plain")}catch(e){}`,
          }}
        />
        <WebAnalytics />
        <ReadingModeProvider>{children}</ReadingModeProvider>
      </body>
    </html>
  );
}
