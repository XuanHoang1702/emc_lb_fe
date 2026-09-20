'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import type { Product } from '../model/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    if (onAddToCart) onAddToCart(product);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-slate-50 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
          {product.discountPercent && (
            <span className="px-2.5 py-1 text-[11px] font-extrabold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg shadow-sm tracking-wide">
              -{product.discountPercent}%
            </span>
          )}
          {product.isHot && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-xs uppercase tracking-wider">
              HOT
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg shadow-xs uppercase tracking-wider">
              MỚI
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={toggleLike}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isLiked
              ? 'bg-rose-50 text-rose-500 shadow-md scale-110'
              : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          aria-label="Thêm vào danh sách yêu thích"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Quick View Floating Overlay */}
        <div className="absolute inset-x-0 bottom-3 px-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 py-2 bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-teal-600" /> Xem Chi Tiết
          </Link>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
            {product.category}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-bold text-slate-800 hover:text-teal-700 transition-colors line-clamp-2 leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-slate-800">{product.rating}</span>
          <span className="text-slate-500">({product.reviewCount})</span>
          {product.soldCount && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 text-[11px]">Đã bán {product.soldCount}</span>
            </>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-base font-black text-slate-900 tracking-tight">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Thêm ${product.name} vào giỏ hàng`}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-md scale-105'
                : 'bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white hover:shadow-md'
            }`}
            title="Thêm vào giỏ hàng"
          >
            {isAdded ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
