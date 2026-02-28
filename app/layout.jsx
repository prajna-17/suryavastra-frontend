import "./globals.css";
import { robotoSlab } from "./fonts";

export const metadata = {
	title: "Surya Vastra",
	description: "E-Commerce application for Indian Traditional Clothing",
	manifest: "/manifest.json",
	themeColor: "#2563eb",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "School ERP",
	},
	icons: {
		apple: "/icons/icon-192.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={robotoSlab.className}>{children}</body>
		</html>
	);
}
