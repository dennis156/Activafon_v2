// RootLayout.js (componente del cliente)
"use client"; // Aquí declaras el cliente
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
// import "./globals.css";
import BootstrapScript from '../components/BootstrapScript';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from "./views/common/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar /> */}
        <SessionProvider>{children}</SessionProvider>
        <BootstrapScript />
      </body>
    </html>
  );
}
