import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Sage",
  description: "Created by Nischal K Shaj",
  authors: [{ name: "Nischal K Shaj", url: "https://github.com/nischalkshaj" }],
  openGraph: {
    title: "Code Sage",
    description: "Created by Nischal K Shaj",
    url: "http://192.168.0.249:3000/",
    siteName: "Code Sage",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#4CAF50",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#F44336",
                color: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
