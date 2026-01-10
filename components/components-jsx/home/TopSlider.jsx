"use client";

import { roboto } from "@/app/fonts";
import { useEffect, useRef, useState } from "react";
import { API } from "@/utils/api";
import { useRouter } from "next/navigation";

const TopSlider = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const infiniteStories = categories;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollLeft = slider.scrollWidth / 2;
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${API}/categories`);
        const json = await res.json();
        setCategories(json.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }

    fetchCategories();
  }, []);

  const onMouseDown = (e) => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDown.current = true;
    startX.current = e.pageX;
    scrollStart.current = slider.scrollLeft;
  };

  const onMouseUp = () => {
    isDown.current = false;
  };

  const onMouseMove = (e) => {
    const slider = sliderRef.current;
    if (!slider || !isDown.current) return;

    const walk = (e.pageX - startX.current) * 1.1;
    slider.scrollLeft = scrollStart.current - walk;

    const half = slider.scrollWidth / 2;
    if (slider.scrollLeft <= 0) slider.scrollLeft += half;
    else if (slider.scrollLeft >= half * 2) slider.scrollLeft -= half;
  };

  return (
    <div
      ref={sliderRef}
      className={`stories-wrapper ${roboto.className}`}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {infiniteStories.map((story, idx) => (
        <div
          className="story-item"
          key={`${story._id}-${idx}`}
          onClick={() => router.push(`/shop?category=${story._id}`)}
          style={{ cursor: "pointer" }}
        >
          <div className="story-image">
            <img src={story.image} alt={story.name} />
          </div>
          <span className="story-label">{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TopSlider;
