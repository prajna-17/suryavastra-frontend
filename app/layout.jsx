import "./globals.css";

import Header from "@/components/components-jsx/Header";
import Footer from "@/components/components-jsx/Footer";
import { robotoSlab } from "./fonts";

export const metadata = {
  title: "Surya Vastra",
  description: "E-Commerce application for Indian Traditional Clothing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoSlab.className} antialiased`}>
        <Header />
        <main className="relative z-[1]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
