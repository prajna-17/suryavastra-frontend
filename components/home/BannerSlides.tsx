"use client";

import { Dancing_Script } from "next/font/google";
import { useEffect, useState } from "react";

export const dancingScript = Dancing_Script({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

const slides = [
	{
		id: 1,
		image: "/img/img-1.jpg",
		text: '"Elegance In Every Thread"',
		buttonColor: "white",
		textColor: "white",
	},
	{
		id: 2,
		image: "/img/img-36.jpeg",
		text: "Wedding Collection",
		buttonColor: "white",
		textColor: "#E4B400",
	},
	{
		id: 3,
		image: "/img/img-21.jpg",
		text: "Party Wear",
		buttonColor: "white",
		textColor: "#FBADA1",
	},
];

const BannerFade = () => {
	const [index, setIndex] = useState(0);

	// Auto fade every 4 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % slides.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="fade-banner">
			{/* Dots */}
			<div className="fade-dots">
				{slides.map((_, i) => (
					<span
						key={i}
						className={`dot ${i === index ? "active" : ""}`}
					/>
				))}
			</div>

			{/* Images + Text */}
			{slides.map((slide, i) => (
				<div
					key={slide.id}
					className={`fade-slide ${i === index ? "active" : ""}`}
				>
					<div className="fade-image-wrapper">
						<img src={slide.image} alt={slide.text} />
						<div className="fade-gradient"></div>
					</div>
					<div className="fade-content">
						<h2
							style={{ color: slide.textColor }}
							className={dancingScript.className}
						>
							{slide.text}
						</h2>

						<button
							className="fade-btn"
							style={{
								backgroundColor: slide.buttonColor,
							}}
						>
							Shop Now
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default BannerFade;
