export type Role = 'CUSTOMER' | 'ADMIN';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type DiscountType = 'PERCENTAGE' | 'FIXED';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  icon?: string;
  itemCount?: number;
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceAdjustment: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  sortOrder: number;
  altText?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  verified: boolean;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  price: number;
  discount: number; // Percentage, e.g. 15 for 15% off
  originalPrice?: number;
  sku: string;
  stock: number;
  categoryId: string;
  categoryName?: string;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  videoUrl?: string;
  variants?: ProductVariant[];
  tags: string[];
  occasion: string[];
  ageGroup?: string;
  isPersonalizable?: boolean;
  personalizationNote?: string;
  boxContents?: string[];
  specifications?: Record<string, string>;
  careInstructions?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  variant?: ProductVariant;
  customName?: string;
  customMessage?: string;
  giftWrap?: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  variantName?: string;
  customName?: string;
  customMessage?: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'RAZORPAY' | 'COD' | 'UPI';
  trackingNumber?: string;
  giftWrapNote?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minimumAmount: number;
  maxDiscount?: number;
  expiresAt?: string;
  active: boolean;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface OccasionReminder {
  id: string;
  userId: string;
  recipientName: string;
  relationship: string;
  occasionType: 'Birthday' | 'Anniversary' | 'Festival' | 'Other';
  date: string;
  reminderDaysBefore: number;
}
