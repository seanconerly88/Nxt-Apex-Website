'use client';

import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const RADIUS = 150; // px of cursor influence
const LIFT = 7; // max px a word rises

const BASE = [198, 166, 44]; // #C6A62C
const BRIGHT = [245, 220, 122]; // #F5DC7A

function mix(t) {
  const c = BASE.map((b, i) => Math.round(b + (BRIGHT[i] - b) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

/**
 * A line of gold text that ripples around the cursor: nearby words lift,
 * brighten, and glow. When idle, a slow shimmer wave passes through it
 * (keyframes live in globals.css as `gsl-wave`).
 */
export default function GoldShimmerLine({ text, className = '', style }) {
  const words = text.split(' ');
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const frame = useRef(null);
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [intensity, setIntensity] = useState(() => words.map(() => 0));

  function handleMove(e) {
    if (reduceMotion || !containerRef.current) return;
    const { clientX, clientY } = e;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      // offset* ignores transforms, so lifted words don't feed back into the math
      const box = containerRef.current.getBoundingClientRect();
      setIntensity(
        wordRefs.current.map(el => {
          if (!el) return 0;
          const cx = box.left + el.offsetLeft + el.offsetWidth / 2;
          const cy = box.top + el.offsetTop + el.offsetHeight / 2;
          const d = Math.hypot(clientX - cx, (clientY - cy) * 1.6);
          return Math.max(0, 1 - d / RADIUS);
        })
      );
    });
  }

  function handleEnter(e) {
    if (reduceMotion) return;
    setHovering(true);
    handleMove(e);
  }

  function handleLeave() {
    if (frame.current) cancelAnimationFrame(frame.current);
    setHovering(false);
    setIntensity(words.map(() => 0));
  }

  return (
    <span
      ref={containerRef}
      className={`block ${className}`}
      style={{ position: 'relative', color: '#C6A62C', ...style }}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {words.map((word, i) => {
        const t = intensity[i];
        return (
          <span key={i}>
            <span
              ref={el => (wordRefs.current[i] = el)}
              style={{
                display: 'inline-block',
                transform: `translateY(${-LIFT * t}px) scale(${1 + 0.04 * t})`,
                color: mix(t),
                textShadow: t > 0.02 ? `0 0 ${18 * t}px rgba(232, 200, 74, ${0.55 * t})` : 'none',
                transition:
                  'transform 180ms cubic-bezier(0.22, 1, 0.36, 1), color 180ms ease, text-shadow 180ms ease',
                animation: hovering || reduceMotion ? 'none' : `gsl-wave 5.5s ease-in-out ${i * 0.11}s infinite`,
              }}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}
