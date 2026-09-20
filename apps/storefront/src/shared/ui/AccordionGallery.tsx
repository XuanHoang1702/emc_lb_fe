'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

export interface AccordionItem {
  image: string;
  label: string;
  sublabel?: string;
  link?: string;
}

export interface AccordionGalleryProps {
  items: AccordionItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: 'hover' | 'click';
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  height?: number | string;
  gap?: number;
  radius?: number;
  orientation?: 'horizontal' | 'vertical';
}

export function AccordionGallery({
  items,
  defaultIndex = 2,
  expandRatio = 0.52,
  trigger = 'hover',
  overlayColor = '#060010',
  textColor = '#ffffff',
  grayscale = false,
  showLabels = true,
  duration = 0.6,
  ease = 'power3.out',
  height = 460,
  gap = 12,
  radius = 20,
}: AccordionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const total = items.length;
    const activeFlex = expandRatio * total;
    const inactiveFlex = (1 - expandRatio) * (total / (total - 1 || 1));

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const isExpanded = index === activeIndex;
      const targetFlex = isExpanded ? activeFlex : inactiveFlex;

      gsap.to(el, {
        flexGrow: targetFlex,
        duration,
        ease,
        overwrite: 'auto',
      });

      // Animate text / label overlay inside
      const labelEl = el.querySelector('.accordion-label');
      const overlayEl = el.querySelector('.accordion-overlay');
      const imgEl = el.querySelector('.accordion-img');

      if (labelEl) {
        gsap.to(labelEl, {
          opacity: isExpanded ? 1 : 0.7,
          y: isExpanded ? 0 : 10,
          scale: isExpanded ? 1 : 0.95,
          duration: duration * 0.8,
          ease,
        });
      }

      if (overlayEl) {
        gsap.to(overlayEl, {
          opacity: isExpanded ? 0.35 : 0.65,
          duration: duration * 0.8,
        });
      }

      if (imgEl && grayscale) {
        gsap.to(imgEl, {
          filter: isExpanded ? 'grayscale(0%) brightness(1)' : 'grayscale(80%) brightness(0.75)',
          scale: isExpanded ? 1.05 : 1,
          duration: duration * 1.2,
          ease,
        });
      }
    });
  }, [activeIndex, items.length, expandRatio, duration, ease, grayscale]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col md:flex-row items-stretch transition-all select-none overflow-hidden"
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        gap: `${gap}px`,
      }}
    >
      {items.map((item, index) => {
        const isExpanded = index === activeIndex;

        return (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onMouseEnter={() => trigger === 'hover' && handleInteraction(index)}
            onClick={() => trigger === 'click' && handleInteraction(index)}
            style={{
              borderRadius: `${radius}px`,
              flexBasis: 0,
            }}
            className="relative h-full overflow-hidden cursor-pointer group flex flex-col justify-end p-6 border border-white/10 shadow-lg"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="accordion-img object-cover object-center transition-transform duration-700"
              />
              {/* Dark Overlay Layer */}
              <div
                className="accordion-overlay absolute inset-0 transition-opacity"
                style={{ backgroundColor: overlayColor }}
              />
            </div>

            {/* Content & Label */}
            {showLabels && (
              <div className="accordion-label relative z-10 space-y-2">
                {item.sublabel && (
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-200 block">
                    {item.sublabel}
                  </span>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-lg sm:text-xl font-bold tracking-tight line-clamp-1 block"
                    style={{ color: textColor }}
                  >
                    {item.label}
                  </span>

                  {item.link && (
                    <Link
                      href={item.link}
                      aria-label={item.label}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isExpanded
                          ? 'bg-white text-slate-900 scale-110 shadow-md'
                          : 'bg-white/20 text-white hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
