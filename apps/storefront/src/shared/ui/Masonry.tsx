'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export interface MasonryItem {
  id: string | number;
  img: string;
  url?: string;
  height?: number;
  title?: string;
  sublabel?: string;
  category?: string;
  [key: string]: unknown;
}

export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}

export function Masonry({
  items = [],
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  className = '',
}: MasonryProps) {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());

  // Animate items on mount / items change
  useEffect(() => {
    if (!containerRef.current) return;
    const elements = Array.from(itemRefs.current.values()).filter(Boolean);
    if (elements.length === 0) return;

    let fromVars: gsap.TweenVars = { opacity: 0 };
    switch (animateFrom) {
      case 'bottom':
        fromVars = { opacity: 0, y: 50 };
        break;
      case 'top':
        fromVars = { opacity: 0, y: -50 };
        break;
      case 'left':
        fromVars = { opacity: 0, x: -50 };
        break;
      case 'right':
        fromVars = { opacity: 0, x: 50 };
        break;
      case 'center':
        fromVars = { opacity: 0, scale: 0.8 };
        break;
      case 'random':
        fromVars = {
          opacity: 0,
          x: () => (Math.random() - 0.5) * 100,
          y: () => (Math.random() - 0.5) * 100,
        };
        break;
    }

    gsap.fromTo(elements, fromVars, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      ease,
      stagger,
      overwrite: 'auto',
    });
  }, [items, animateFrom, duration, ease, stagger]);

  // Responsive column count determination
  const [numCols, setNumCols] = useState<number>(3);

  useEffect(() => {
    const updateCols = () => {
      if (typeof columns === 'number') {
        setNumCols(columns);
        return;
      }
      const w = window.innerWidth;
      if (w < 640) setNumCols(columns.sm || 1);
      else if (w < 768) setNumCols(columns.md || 2);
      else if (w < 1024) setNumCols(columns.lg || 3);
      else setNumCols(columns.xl || 4);
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [columns]);

  // Distribute items into columns using shortest column strategy
  const columnData = useMemo(() => {
    const cols: MasonryItem[][] = Array.from({ length: numCols }, () => []);
    const heights: number[] = Array.from({ length: numCols }, () => 0);

    items.forEach((item) => {
      let minIdx = 0;
      for (let i = 1; i < numCols; i++) {
        const currentMinH = heights[minIdx] ?? 0;
        const currentH = heights[i] ?? 0;
        if (currentH < currentMinH) {
          minIdx = i;
        }
      }
      const targetCol = cols[minIdx] ?? [];
      targetCol.push(item);
      cols[minIdx] = targetCol;
      heights[minIdx] = (heights[minIdx] ?? 0) + (item.height || 300);
    });

    return cols;
  }, [items, numCols]);

  return (
    <div ref={containerRef} className={`w-full flex gap-4 ${className}`}>
      {columnData.map((colItems, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-4">
          {colItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const isOtherHovered = hoveredId !== null && !isHovered;

            const cardInner = (
              <div className="relative w-full h-full min-h-[180px] bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title || `Masonry image ${item.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Content Overlay */}
                {(item.title || item.sublabel || item.category) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    {item.category && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                        {item.category}
                      </span>
                    )}
                    {item.title && (
                      <span className="text-base font-bold tracking-tight line-clamp-1 block">
                        {item.title}
                      </span>
                    )}
                    {item.sublabel && (
                      <p className="text-xs text-slate-200 mt-1 line-clamp-2">{item.sublabel}</p>
                    )}
                  </div>
                )}
              </div>
            );

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el);
                  else itemRefs.current.delete(item.id);
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative overflow-hidden rounded-2xl transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-xl border border-slate-100"
                style={{
                  height: item.height ? `${item.height}px` : 'auto',
                  transform: scaleOnHover && isHovered ? `scale(${hoverScale})` : 'scale(1)',
                  filter: `${blurToFocus && isOtherHovered ? 'blur(3px) opacity(0.6)' : 'blur(0px) opacity(1)'} ${
                    colorShiftOnHover && isHovered ? 'hue-rotate(30deg) saturate(1.3)' : ''
                  }`,
                  transition:
                    'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease, box-shadow 0.3s ease',
                }}
              >
                {item.url ? (
                  <Link href={item.url} className="block relative w-full h-full">
                    {cardInner}
                  </Link>
                ) : (
                  <div className="block relative w-full h-full">{cardInner}</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Masonry;
