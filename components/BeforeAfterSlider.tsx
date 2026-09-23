"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    else if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
    else if (e.key === "Home") setPosition(0);
    else if (e.key === "End") setPosition(100);
  };

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      role="slider"
      tabIndex={0}
      aria-label="Drag to compare before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
    >
      {/* After (fills the whole frame) */}
      <div className="ba-slider-layer">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 1080px) 100vw, 1016px"
          quality={90}
          style={{ objectFit: "cover" }}
        />
        <span className="ba-slider-pill ba-slider-pill--after">After</span>
      </div>

      {/* Before (clipped from the right by position) */}
      <div
        className="ba-slider-layer ba-slider-layer--before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1080px) 100vw, 1016px"
          quality={90}
          style={{ objectFit: "cover" }}
        />
        <span className="ba-slider-pill ba-slider-pill--before">Before</span>
      </div>

      {/* Handle */}
      <div className="ba-slider-handle" style={{ left: `${position}%` }} aria-hidden>
        <span className="ba-slider-line" />
        <span className="ba-slider-knob">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="18"
            height="18"
          >
            <path d="M8 7l-4 5 4 5" />
            <path d="M16 7l4 5-4 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
