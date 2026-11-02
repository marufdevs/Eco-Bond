import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EcoBond | Small Actions. Greener Communities.",
    template: "%s | EcoBond",
  },
  description:
    "Join EcoBond to discover and participate in community environmental events. Together, we can make our planet greener.",
  keywords: [
    "EcoBond",
    "environmental events",
    "community cleanup",
    "tree plantation",
    "sustainability",
    "eco volunteering",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}