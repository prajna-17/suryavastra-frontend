"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
	{
		id: 1,
		review: "The saree quality is absolutely stunning. The fabric feels premium and the designs are timeless.",
		name: "Ananya Sharma",
		image: "/img/img-11.jpg",
		rating: 5,
	},
	{
		id: 2,
		review: "I loved how elegant and comfortable the saree was. Perfect for weddings and family functions.",
		name: "Ritika Verma",
		image: "/img/img-32.jpg",
		rating: 4,
	},
	{
		id: 3,
		review: "Surya Vastra truly delivers on quality and transparency. Highly recommended.",
		name: "Pooja Mehta",
		image: "/img/img-33.jpg",
		rating: 5,
	},
];

const Testimonials = () => {
	const [expanded, setExpanded] = useState(false);
	return (
		<>
			<section className="testimonial-section">
				<h2 className="testimonial-heading">
					Customer Testimonials
				</h2>
				<p className="testimonial-subheading">
					Speaking from their hearts
				</p>

				<div className="testimonial-slider">
					<div className="testimonial-track">
						{testimonials.map((item) => (
							<div
								className="testimonial-card"
								key={item.id}
							>
								{/* LEFT */}

								<FaQuoteLeft
									size={16}
									className="testimonial-quote"
								/>

								{/* CENTER */}
								<div className="testimonial-content">
									<p className="testimonial-text">
										{item.review}
									</p>

									<div className="testimonial-name">
										{item.name}
									</div>

									<div className="testimonial-stars">
										{Array.from({
											length: item.rating,
										}).map((_, i) => (
											<FaStar key={i} />
										))}
									</div>
								</div>

								{/* RIGHT */}
								<div className="testimonial-image">
									<Image
										src={item.image}
										alt={item.name}
										width={90}
										height={90}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="about-video-section">
				<div className="about-video-banner">
					<img
						src="/img/img-31.jpg"
						alt="About Surya Vastra"
						className="about-video-bg"
					/>

					<div className="about-video-gradient"></div>

					<img
						src="/img/play.png"
						alt="Play Icon"
						width={120}
						height={120}
						className="about-play-icon"
					/>

					{/* GLASS CARD */}
					<div className="about-glass-card">
						<h2 className="about-heading">
							About Surya Vastra
						</h2>

						<p
							className={`about-text ${
								expanded ? "expanded" : ""
							}`}
						>
							Surya Vastra is a celebration of timeless
							Indian craftsmanship. Every saree is
							thoughtfully curated, blending tradition with
							modern elegance to create pieces that feel
							personal, graceful, and enduring.
						</p>

						<button
							className="about-toggle-btn"
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? "Show Less" : "Show More"}
						</button>
					</div>
				</div>
			</section>

			<section className="insta-section">
				<h2 className="insta-heading">Follow us on Instagram</h2>
				<p className="insta-subheading">
					Stay updated with our stories and updates on Instagram
				</p>

				<div className="insta-grid">
					{/* LEFT BIG IMAGE */}
					<div className="insta-item insta-item-large">
						<Image
							src="/img/img-6.jpg"
							alt="Instagram Feature"
							fill
							className="insta-img"
						/>
					</div>

					{/* RIGHT 3 IMAGES */}
					<div className="insta-item">
						<Image
							src="/img/img-16.jpeg"
							alt="Instagram"
							fill
							className="insta-img"
						/>
					</div>

					<div className="insta-item">
						<Image
							src="/img/img-3.jpg"
							alt="Instagram"
							fill
							className="insta-img"
						/>
					</div>

					<div className="insta-item">
						<Image
							src="/img/img-29.jpg"
							alt="Instagram"
							fill
							className="insta-img"
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Testimonials;
