'use client';

import React from 'react';
import { Header } from '@/widgets/header';
import { HeroBanner } from '@/widgets/hero';
import { ServicePerks } from '@/widgets/service-perks';
import { LookbookShowcase } from '@/widgets/lookbook';
import { FlashDeals } from '@/widgets/flash-deals';
import { CategoryGrid } from '@/widgets/categories';
import { ProductShowcase } from '@/widgets/product-grid';
import { SpiralShowcase } from '@/widgets/spiral-showcase';
import { BrandPartners } from '@/widgets/brand-partners';
import { Footer } from '@/widgets/footer';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-500 selection:text-white font-sans antialiased">
      {/* Sticky Header Widget */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Banner Carousel & Special Perks */}
        <HeroBanner />

        {/* 2. Service Perks Bar */}
        <ServicePerks />

        {/* 3. Interactive Accordion Lookbook Gallery (GSAP Animated) */}
        <LookbookShowcase />

        {/* 4. Flash Sale Section with Countdown Clock */}
        <FlashDeals />

        {/* 5. Category Grid */}
        <CategoryGrid />

        {/* 6. Product Showcase Grid (Tabbed Filter) */}
        <ProductShowcase />

        {/* 7. 3D Infinite Spiral Runway Showcase */}
        <SpiralShowcase />

        {/* 8. Brand Partners Ecosystem Showcase */}
        <BrandPartners />
      </main>

      {/* Rich E-Commerce Footer */}
      <Footer />
    </div>
  );
}
