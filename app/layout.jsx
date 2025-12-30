import "./globals.css";
import { robotoSlab } from "./fonts";

export const metadata = {
  title: "Surya Vastra",
  description: "E-Commerce application for Indian Traditional Clothing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoSlab.className}>{children}</body>
    </html>
  );
}
