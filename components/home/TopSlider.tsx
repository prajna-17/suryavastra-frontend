"use client";

import { useRef } from "react";

type Story = {
	id: number;
	image: string;
	label: string;
};

const sampleStories: Story[] = [
	{ id: 1, image: "/img/img-34.jpg", label: "Banarasi Saree" },
	{ id: 2, image: "/img/img-11.jpg", label: "Silk Saree" },
	{ id: 3, image: "/img/img-17.jpg", label: "Daily Wear Saree" },
	{ id: 4, image: "/img/img-28.jpg", label: "Party Wear Saree" },
	{ id: 5, image: "/img/img-10.jpg", label: "Festive Saree" },
];

const TopSlider = () => {
	const sliderRef = useRef<HTMLDivElement>(null);

	const onMouseDown = (e: React.MouseEvent) => {
		const slider = sliderRef.current;
		if (!slider) return;

		slider.dataset.mouseDown = "true";
		slider.dataset.startX = String(e.pageX - slider.offsetLeft);
		slider.dataset.scrollLeft = String(slider.scrollLeft);
	};

	const onMouseUp = () => {
		const slider = sliderRef.current;
		if (slider) slider.dataset.mouseDown = "false";
	};

	const onMouseMove = (e: React.MouseEvent) => {
		const slider = sliderRef.current;
		if (!slider || slider.dataset.mouseDown !== "true") return;

		const x = e.pageX - slider.offsetLeft;
		const walk = (x - Number(slider.dataset.startX)) * 1.2;
		slider.scrollLeft = Number(slider.dataset.scrollLeft) - walk;
	};

	return (
		<div
			className="stories-wrapper"
			ref={sliderRef}
			onMouseDown={onMouseDown}
			onMouseLeave={onMouseUp}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
		>
			{sampleStories.map((story) => (
				<div className="story-item" key={story.id}>
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
