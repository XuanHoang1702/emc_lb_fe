export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isHot?: boolean;
  isNew?: boolean;
  inStock: boolean;
  soldCount?: number;
  totalStock?: number;
  description?: string;
  specs?: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  itemCount: number;
  image: string;
  gradient: string;
}

export type ProductFilterTab = 'all' | 'best-seller' | 'newest' | 'top-rated' | 'discount';
