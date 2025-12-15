"use client";

import { roboto, rougeScript, squarePeg } from "@/app/fonts";
import { useEffect, useState } from "react";

const slides = [
	{
		id: 1,
		image: "/img/img-1.jpg",
		text: '"Elegance In Every Thread"',
		buttonColor: "white",
		textColor: "white",
		font: squarePeg.className,
	},
	{
		id: 2,
		image: "/img/img-36.jpeg",
		text: "Wedding Collection",
		buttonColor: "white",
		textColor: "#E4B400",
		font: roboto.className,
		fontWeight: 500,
		fontStyle: "italic",
	},
	{
		id: 3,
		image: "/img/img-21.jpg",
		text: "Party Wear",
		buttonColor: "white",
		textColor: "#FBADA1",
		font: rougeScript.className,
		fontSize: "60px",
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
							style={{
								color: slide.textColor,
								fontWeight: slide.fontWeight,
								fontStyle: slide.fontStyle,
								fontSize: slide.fontSize,
							}}
							className={slide.font}
						>
							{slide.text}
						</h2>

						<button
							type="button"
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
