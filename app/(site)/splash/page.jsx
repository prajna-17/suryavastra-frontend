"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setAnimate(true), 1100);
    const end = setTimeout(() => router.replace("/"), 3200);

    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [router]);

  return (
    <div className="splash-container">
      <div className={`logo ${animate ? "animate" : ""}`}>
        <span className="s">S</span>
        <span className="urya">urya</span>
        <span className="v">V</span>
        <span className="astra">astra</span>
      </div>
    </div>
  );
}
