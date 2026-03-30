import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { CSPostHogProvider } from "./providers";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RankFlow UI - Modern, Animated UI Library",
  description: "A premium, UI library for React with smooth animations and clean design.",
  openGraph: {
    title: "RankFlow UI - Modern, Animated UI Library",
    description: "A premium, UI library for React with smooth animations and clean design.",
    url: "https://ui.rankflow.in",
    siteName: "RankFlow UI",
    images: [
      {
        url: "https://ui.rankflow.in/ogimg.png",
        width: 1200,
        height: 630,
        alt: "RankFlow UI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankFlow UI - Modern, Animated UI Library",
    description: "A premium, dark-mode focused UI library for React with smooth animations and clean design.",
    images: ["https://ui.rankflow.in/ogimg.png"],
    creator: "@AdityaS1204",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <CSPostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
