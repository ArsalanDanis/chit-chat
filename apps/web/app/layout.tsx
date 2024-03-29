
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "../context/SocketProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./redux/providers";

// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <SocketProvider>
          <body className={inter.className}>{children}</body>
        </SocketProvider>
      </Providers>
    </html>
  );
}
