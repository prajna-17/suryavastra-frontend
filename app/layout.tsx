import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { robotoSlab } from "./fonts";

export const metadata: Metadata = {
	title: "Surya Vastra",
	description: "E-Commerce application for Indian Traditional Clothing",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${robotoSlab.className} antialiased`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
