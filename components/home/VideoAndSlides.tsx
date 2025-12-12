"use client";

import Image from "next/image";
import React from "react";
import { dancingScript } from "./BannerSlides";

const sliderItems = [
	{ id: 1, image: "/img/img-12.jpg", title: "Bandhani Saree" },
	{ id: 2, image: "/img/img-26.jpg", title: "Lining Saree" },
	{ id: 3, image: "/img/img-27.jpg", title: "Polka Saree" },
	{ id: 4, image: "/img/img-35.jpg", title: "Printed Saree" },
	{ id: 5, image: "/img/img-15.jpg", title: "Shiffon Saree" },
];

const VideoBannerWithSlider: React.FC = () => {
	return (
		<section className="video-slider-section">
			<div className="video-banner">
				<img
					src="/img/img-25-nobg.jpg"
					alt="Video Banner"
					className="video-bg"
					height={300}
				/>

				<div className="video-gradient"></div>

				<h2 className={`banner-heading ${dancingScript.className}`}>
					Sarees as per your choice
				</h2>

				<img
					src="/img/play.png"
					alt="Play Icon"
					width={120}
					height={120}
					className="play-icon"
				/>

				{/* SLIDER ON TOP OF IMAGE */}
				<div className="manual-slider">
					<div className="manual-track">
						{sliderItems.map((item) => (
							<div className="slider-card" key={item.id}>
								<div className="card-img">
									<Image
										src={item.image}
										alt={item.title}
										width={60}
										height={60}
										className="card-img-inner"
									/>
								</div>

								<div className="card-title">
									{item.title}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default VideoBannerWithSlider;
