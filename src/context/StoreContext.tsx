'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  OrderItem,
  User,
  Coupon,
  Address,
  ProductVariant,
  OccasionReminder
} from '@/types';
import { PRODUCTS, CATEGORIES, COUPONS, REVIEWS } from '@/data/mockData';
import { generateOrderId, calculateDiscountPrice } from '@/lib/utils';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface StoreContextType {
  // Products & Categories
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    variant?: ProductVariant,
    customName?: string,
    customMessage?: string,
    giftWrap?: boolean
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Coupons & Pricing
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth / User
  user: User | null;
  loginCustomer: (email: string, password?: string) => boolean;
  registerCustomer: (name: string, email: string, phone?: string, password?: string) => boolean;
  loginAdmin: (email: string, password?: string) => boolean;
  loginAsCustomer: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  savedAddresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    address: Address;
    paymentMethod: 'RAZORPAY' | 'COD' | 'UPI';
    giftWrapNote?: string;
    shippingFee?: number;
    deliveryMethod?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], paymentStatus?: Order['paymentStatus']) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Occasion Reminders
  reminders: OccasionReminder[];
  addReminder: (reminder: Omit<OccasionReminder, 'id' | 'userId'>) => void;
  deleteReminder: (id: string) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-7']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Default demo user
  const [user, setUser] = useState<User | null>({
    id: 'usr-101',
    name: 'Aarav Singhania',
    email: 'aarav.singhania@example.com',
    phone: '+91 98765 43210',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    createdAt: '2026-01-15',
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'Aarav Singhania',
      phone: '+91 98765 43210',
      email: 'aarav.singhania@example.com',
      address: 'Darbar colony 402, Magnolia Residency, Jaipur',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302002',
      isDefault: true,
    },
    {
      id: 'addr-2',
      name: 'Aarav (Office)',
      phone: '+91 98765 43210',
      email: 'aarav.singhania@example.com',
      address: 'Tower B, 14th Floor, Maker Maxity, BKC',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      isDefault: false,
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-101',
      orderNumber: 'GFT-892104-3321',
      userId: 'usr-101',
      customerName: 'Aarav Singhania',
      customerEmail: 'aarav.singhania@example.com',
      customerPhone: '+91 98765 43210',
      address: {
        id: 'addr-1',
        name: 'Aarav Singhania',
        phone: '+91 98765 43210',
        address: 'Darbar colony 402, Magnolia Residency, Jaipur',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302002',
      },
      items: [
        {
          id: 'item-1',
          productId: 'prod-1',
          productName: 'Personalized Royal Oak Memory Box',
          price: 1614,
          quantity: 1,
          variantName: 'Medium (8x6 in)',
          customName: 'Kavya & Aarav',
          imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop',
        },
        {
          id: 'item-2',
          productId: 'prod-5',
          productName: 'Midnight Rose & Warm Amber Aromatherapy Candle Set',
          price: 1104,
          quantity: 1,
          imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400&auto=format&fit=crop',
        }
      ],
      subtotal: 2718,
      discount: 272,
      couponCode: 'WELCOME10',
      shipping: 0,
      tax: 0,
      total: 2446,
      status: 'SHIPPED',
      paymentStatus: 'PAID',
      paymentMethod: 'RAZORPAY',
      trackingNumber: 'DELHIVERY-994821034',
      giftWrapNote: 'Happy 5th Anniversary my love! From Aarav',
      createdAt: '2026-08-20T14:32:00.000Z',
      estimatedDelivery: '2026-08-24',
    }
  ]);

  const [reminders, setReminders] = useState<OccasionReminder[]>([
    {
      id: 'rem-1',
      userId: 'usr-101',
      recipientName: 'Kavya (Wife)',
      relationship: 'Wife',
      occasionType: 'Anniversary',
      date: '2026-09-12',
      reminderDaysBefore: 7,
    },
    {
      id: 'rem-2',
      userId: 'usr-101',
      recipientName: 'Mom',
      relationship: 'Mother',
      occasionType: 'Birthday',
      date: '2026-10-05',
      reminderDaysBefore: 5,
    }
  ]);

  // Load cart and wishlist from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('giftora_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('giftora_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedOrders = localStorage.getItem('giftora_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error('Failed to load storage', e);
    }
  }, []);

  // Save to LocalStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('giftora_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('giftora_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('giftora_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product Operations
  const addProduct = (newProd: Omit<Product, 'id'>): Product => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`Added product "${product.name}" successfully!`, 'success');
    return product;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
    showToast(`Stock updated to ${newStock} units`, 'success');
  };

  // Cart Operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    variant?: ProductVariant,
    customName?: string,
    customMessage?: string,
    giftWrap?: boolean
  ) => {
    const effectivePrice = calculateDiscountPrice(
      product.price + (variant?.priceAdjustment || 0),
      product.discount
    );

    const cartItemId = `${product.id}-${variant?.id || 'default'}-${customName || 'none'}-${giftWrap ? 'wrap' : 'nowrap'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          variant,
          customName,
          customMessage,
          giftWrap,
        },
      ];
    });

    showToast(`Added "${product.name}" to your cart!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupon Logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (cartSubtotal < found.minimumAmount) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of ₹${found.minimumAmount}.`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Pricing Calculations
  const freeShippingThreshold = 999;

  const cartSubtotal = cart.reduce((sum, item) => {
    const basePrice = item.product.price + (item.variant?.priceAdjustment || 0);
    const discountedPrice = calculateDiscountPrice(basePrice, item.product.discount);
    const wrapCost = item.giftWrap ? 99 : 0;
    return sum + (discountedPrice + wrapCost) * item.quantity;
  }, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      const disc = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
      cartDiscount = appliedCoupon.maxDiscount ? Math.min(disc, appliedCoupon.maxDiscount) : disc;
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const cartShipping = cartSubtotal === 0 || cartSubtotal >= freeShippingThreshold ? 0 : 79;
  const cartTax = 0; // Prices are inclusive of GST
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping + cartTax);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth authentication methods
  const loginCustomer = (email: string, password?: string): boolean => {
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    const customerUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '+91 98765 43210',
      role: 'CUSTOMER',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(customerUser);
    showToast(`Welcome back, ${customerUser.name}!`, 'success');
    return true;
  };

  const registerCustomer = (name: string, email: string, phone?: string, password?: string): boolean => {
    if (!name || !email) {
      showToast('Please fill all required registration fields', 'error');
      return false;
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '+91 98765 43210',
      role: 'CUSTOMER',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    showToast(`Account created successfully! Welcome to Giftora, ${name}.`, 'success');
    return true;
  };

  const loginAdmin = (email: string, password?: string): boolean => {
    if (email.trim().toLowerCase() === 'touseef@giftora.com' && password === 'Touseef@123') {
      setUser({
        id: 'usr-admin',
        name: 'Store Owner / Admin',
        email: 'touseef@giftora.com',
        phone: '+91 99999 00000',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
        createdAt: '2025-11-01',
      });
      showToast('Authenticated as Store Owner (Admin)', 'success');
      return true;
    } else {
      showToast('Invalid email or password', 'error');
      return false;
    }
  };

  const loginAsCustomer = () => {
    setUser({
      id: 'usr-101',
      name: 'Aarav Singhania',
      email: 'aarav.singhania@example.com',
      phone: '+91 98765 43210',
      role: 'CUSTOMER',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      createdAt: '2026-01-15',
    });
    showToast('Logged in as Customer (Aarav Singhania)', 'success');
  };

  const loginAsAdmin = () => {
    setUser({
      id: 'usr-admin',
      name: 'Admin Manager',
      email: 'touseef@giftora.com',
      phone: '+91 99999 00000',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
      createdAt: '2025-11-01',
    });
    showToast('Switched to Admin Role', 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Addresses
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = { ...addr, id: `addr-${Date.now()}` };
    setSavedAddresses((prev) => [...prev, newAddr]);
    showToast('New shipping address saved!', 'success');
  };

  const deleteAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address deleted', 'info');
  };

  // Orders
  const createOrder = ({
    address,
    paymentMethod,
    giftWrapNote,
    shippingFee,
    deliveryMethod,
  }: {
    address: Address;
    paymentMethod: 'RAZORPAY' | 'COD' | 'UPI';
    giftWrapNote?: string;
    shippingFee?: number;
    deliveryMethod?: string;
  }): Order => {
    const orderItems: OrderItem[] = cart.map((item) => {
      const basePrice = item.product.price + (item.variant?.priceAdjustment || 0);
      const discountedPrice = calculateDiscountPrice(basePrice, item.product.discount);
      return {
        id: `item-${Date.now()}-${Math.random()}`,
        productId: item.productId,
        productName: item.product.name,
        price: discountedPrice + (item.giftWrap ? 99 : 0),
        quantity: item.quantity,
        variantName: item.variant?.value,
        customName: item.customName,
        customMessage: item.customMessage,
        imageUrl: item.product.images[0],
      };
    });

    const effectiveShipping = shippingFee !== undefined ? shippingFee : cartShipping;
    const finalTotal = Math.max(0, cartSubtotal - cartDiscount + effectiveShipping + cartTax);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderId(),
      userId: user?.id || 'guest',
      customerName: address.name,
      customerEmail: address.email || user?.email || 'customer@example.com',
      customerPhone: address.phone,
      address,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      shipping: effectiveShipping,
      tax: cartTax,
      total: finalTotal,
      status: 'CONFIRMED',
      paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
      paymentMethod,
      trackingNumber: `EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      giftWrapNote,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + (deliveryMethod === 'express' ? 1 : 3) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
    };

    // Deduct stock for ordered products
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const cartItem = cart.find((ci) => ci.productId === prod.id);
        if (cartItem) {
          return { ...prod, stock: Math.max(0, prod.stock - cartItem.quantity) };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['status'],
    paymentStatus?: Order['paymentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              ...(paymentStatus ? { paymentStatus } : {}),
            }
          : o
      )
    );
    showToast(`Order #${orderId} updated to ${status}`, 'info');
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  // Occasion Reminders
  const addReminder = (rem: Omit<OccasionReminder, 'id' | 'userId'>) => {
    const newRem: OccasionReminder = {
      ...rem,
      id: `rem-${Date.now()}`,
      userId: user?.id || 'guest',
    };
    setReminders((prev) => [...prev, newRem]);
    showToast('Occasion reminder saved!', 'success');
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    showToast('Reminder deleted', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        freeShippingThreshold,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        loginCustomer,
        registerCustomer,
        loginAdmin,
        loginAsCustomer,
        loginAsAdmin,
        logout,
        savedAddresses,
        addAddress,
        deleteAddress,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        reminders,
        addReminder,
        deleteReminder,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
