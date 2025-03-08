import type { Metadata } from "next";
import "../globals.css";
import { MyProvider } from "../context/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


export const metadata: Metadata = {
  title: "NoteVault",
  description: "Generated by NoteVault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body >
        <MyProvider>
          <Navbar/>
          {children}
          <Footer/>
        </MyProvider>
        </body>
    </html>
  );
}
