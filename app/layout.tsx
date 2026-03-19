import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neel Jain",
  description: "Personal website of Neel Jain — Penn, a16z scout, traveler.",
  openGraph: {
    title: "Neel Jain",
    siteName: "Neel Jain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neel Jain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
