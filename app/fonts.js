import {
	Roboto,
	Roboto_Slab,
	Square_Peg,
	Rouge_Script,
} from "next/font/google";

export const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	display: "swap",
});

export const robotoSlab = Roboto_Slab({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
});

export const squarePeg = Square_Peg({
	subsets: ["latin"],
	weight: ["400"],
	display: "swap",
});

export const rougeScript = Rouge_Script({
	subsets: ["latin"],
	weight: ["400"],
	display: "swap",
});
