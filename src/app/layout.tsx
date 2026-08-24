import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { TopBar } from '@/components/navbar/TopBar';
import { Navbar } from '@/components/navbar/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { Footer } from '@/components/footer/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Giftora | Luxury Gifts, Joyful Toys & Bespoke Keepsakes',
  description:
    'Discover India’s premier destination for personalized gifts, artisan luxury hampers, cuddly soft toys, and educational STEM robotic kits. Free express pan-India delivery above ₹999.',
  keywords: [
    'gifts',
    'toys',
    'personalized gifts',
    'luxury hampers',
    'birthday gifts',
    'anniversary gifts',
    'stem toys',
    'giftora',
    'online gift shop india',
  ],
  authors: [{ name: 'Giftora Shop' }],
  openGraph: {
    title: 'Giftora | Luxury Gifts, Joyful Toys & Bespoke Keepsakes',
    description:
      'Curated gifts and joyful toys that touch hearts. Personalized engravings, luxury gourmet hampers, and express pan-India delivery.',
    type: 'website',
    url: 'https://giftora.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F242D] antialiased selection:bg-plum-800 selection:text-white font-sans">
        <StoreProvider>
          <TopBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
