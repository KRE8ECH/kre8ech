import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "KRE8ECH — Learn • Build • Innovate | Student Technology & Builder Initiative",
  description:
    "Helping school students transition from technology consumers to technology creators through the Four-Week Builder Program, practical AI and coding projects, and offline hackathons.",
  keywords: [
    "KRE8ECH",
    "Student Technology",
    "Four-Week Builder Program",
    "School Hackathon",
    "Learn to Code",
    "AI for School Students",
    "Project Building",
    "Student Innovation"
  ],
  authors: [{ name: "KRE8ECH Team" }],
  icons: {
    icon: "/images/kre8ech-logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-[#202124] font-sans antialiased selection:bg-[#F6C900] selection:text-[#202124]">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
