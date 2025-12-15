"use client";

import { roboto } from "@/app/fonts";
import { useEffect, useRef } from "react";

type Story = {
	id: number;
	image: string;
	label: string;
};

const stories: Story[] = [
	{ id: 1, image: "/img/img-34.jpg", label: "Banarasi Saree" },
	{ id: 2, image: "/img/img-11.jpg", label: "Silk Saree" },
	{ id: 3, image: "/img/img-17.jpg", label: "Daily Wear Saree" },
	{ id: 4, image: "/img/img-28.jpg", label: "Party Wear Saree" },
	{ id: 5, image: "/img/img-10.jpg", label: "Festive Saree" },
];

/* only TWO copies */
const infiniteStories = [...stories, ...stories, ...stories];

const TopSlider = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const isDown = useRef(false);
	const startX = useRef(0);
	const scrollStart = useRef(0);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		/* jump to start of second copy */
		slider.scrollLeft = slider.scrollWidth / 2;
	}, []);

	const onMouseDown = (e: React.MouseEvent) => {
		const slider = sliderRef.current;
		if (!slider) return;

		isDown.current = true;
		startX.current = e.pageX;
		scrollStart.current = slider.scrollLeft;
	};

	const onMouseUp = () => {
		isDown.current = false;
	};

	const onMouseMove = (e: React.MouseEvent) => {
		const slider = sliderRef.current;
		if (!slider || !isDown.current) return;

		const walk = (e.pageX - startX.current) * 1.1;
		slider.scrollLeft = scrollStart.current - walk;

		const half = slider.scrollWidth / 2;

		/* seamless loop */
		if (slider.scrollLeft <= 0) {
			slider.scrollLeft += half;
		} else if (slider.scrollLeft >= half * 2) {
			slider.scrollLeft -= half;
		}
	};

	return (
		<div
			className={`stories-wrapper ${roboto.className}`}
			ref={sliderRef}
			onMouseDown={onMouseDown}
			onMouseLeave={onMouseUp}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
		>
			{infiniteStories.map((story, idx) => (
				<div className="story-item" key={`${story.id}-${idx}`}>
					<div className="story-image">
						<img src={story.image} alt={story.label} />
					</div>
					<span className="story-label">{story.label}</span>
				</div>
			))}
		</div>
	);
};

export default TopSlider;
