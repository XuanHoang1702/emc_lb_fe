'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export interface SpiralItem {
  src: string;
  alt: string;
  title?: string;
}

export interface InfiniteSpiralProps {
  items: SpiralItem[];
  animationMode?: 'auto' | 'scroll';
  speed?: number;
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeBlur?: number;
  cardsPerTurn?: number;
  pauseOnHover?: boolean;
  direction?: 'up' | 'down';
  rotation?: number;
  cardTilt?: number;
  edgeFade?: number;
  imageFit?: 'cover' | 'contain';
  grayscale?: number;
}

export function InfiniteSpiral({
  items,
  speed = 0.55,
  radius = 170,
  cardWidth = 110,
  cardHeight = 110,
  verticalSpacing = 65,
  perspective = 1000,
  cardRadius = 16,
  centerScale = 1.3,
  edgeBlur = 4,
  cardsPerTurn = 7,
  pauseOnHover = true,
  direction = 'up',
  edgeFade = 0.3,
  grayscale = 0,
}: InfiniteSpiralProps) {
  const [isPaused, setIsPaused] = useState(false);
  const animOffsetRef = useRef(0);
  const reqRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetState, setOffsetState] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused) {
        const move = speed * delta * (direction === 'up' ? 1 : -1);
        animOffsetRef.current += move;
        setOffsetState(animOffsetRef.current);
      }
      reqRef.current = requestAnimationFrame(loop);
    };

    reqRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isPaused, speed, direction]);

  if (!items || items.length === 0) return null;

  // Repeat items for infinite continuous spiral loop
  const totalCount = items.length * 3;
  const firstItem = items[0];
  if (!firstItem) return null;
  const virtualItems = Array.from(
    { length: totalCount },
    (_, i) => items[i % items.length] ?? firstItem,
  );

  const heightTotal = totalCount * verticalSpacing;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      className="w-full h-full relative overflow-hidden select-none flex items-center justify-center"
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {virtualItems.map((item, index) => {
          // Calculate spiral position
          const baseIndex = index - totalCount / 2;
          const rawY = baseIndex * verticalSpacing + ((offsetState * 100) % heightTotal);

          // Wrap Y position continuously within container visible bounds
          let wrappedY = ((rawY + heightTotal / 2) % heightTotal) - heightTotal / 2;
          if (wrappedY < -heightTotal / 2) wrappedY += heightTotal;

          const turnAngle = (index * (2 * Math.PI)) / cardsPerTurn + offsetState;
          const x = Math.sin(turnAngle) * radius;
          const z = Math.cos(turnAngle) * radius;

          // Scale based on distance to center Y=0 and Z front
          const distFromCenter = Math.abs(wrappedY) / (heightTotal / 3);
          const centerFactor = Math.max(0, 1 - distFromCenter);
          const scale = 1 + (centerScale - 1) * centerFactor * (z > 0 ? 1 : 0.7);

          // Calculate opacity and blur
          const fade = Math.max(
            0,
            1 - Math.pow(Math.abs(wrappedY) / (heightTotal / 2.5), 2) * edgeFade,
          );
          const blurVal = distFromCenter > 0.6 ? edgeBlur * (distFromCenter - 0.6) * 2 : 0;
          const grayscaleVal = grayscale > 0 ? (1 - centerFactor) * grayscale : 0;

          return (
            <div
              key={index}
              className="absolute transition-transform duration-75 ease-out shadow-xl overflow-hidden border border-white/20 bg-slate-900 group"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${cardRadius}px`,
                transform: `translate3d(${x}px, ${wrappedY}px, ${z}px) scale(${scale})`,
                opacity: fade,
                filter: `blur(${blurVal}px) grayscale(${grayscaleVal})`,
                zIndex: Math.round(z + 1000),
                transformStyle: 'preserve-3d',
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="150px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
              />
              {item.title && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-2 text-[10px] font-extrabold text-white text-center truncate">
                  {item.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
