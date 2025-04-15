import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@repo/ui/globals.css";
import { Toaster } from "@workspace/ui/components/sonner";
import SessionContextProvider from "../context/SessionProvider";
import NavBar from "../components/shared/NavBar";
import ReactQueryProvider from "../context/QueryProvider";
import Footer from "../components/shared/Footer";
import { Analytics } from "@vercel/analytics/react";

// Poppins is a Google Font that we are using in this example
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Metadata is a Next.js type that allows us to define metadata for the page
export const metadata: Metadata = {
  title: {
    template: "%s | JobFlowAI",
    default: "JobFlowAI",
  },
  description: "JobFlowAI is an AI powered job recommendation platform",
};

// RootLayout is a layout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Session context provider is a wrapper component that provides the session context to the entire application
    <SessionContextProvider>
      <ReactQueryProvider>
        <html lang="en" className="scroll-smooth">
          <body className={`${poppins.className} antialiased`}>
            <NavBar />
            {children}
            <Footer />
            <Toaster />
            <Analytics />
          </body>
        </html>
      </ReactQueryProvider>
    </SessionContextProvider>
  );
}
