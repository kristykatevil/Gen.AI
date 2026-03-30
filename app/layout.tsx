import "./globals.css";
import { Nav } from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MeshMint Starter",
  description: "Replit-ready Tripo-like 3D generator starter."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
