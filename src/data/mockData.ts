import { Category, Product, Review, Coupon } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Personalized Gifts',
    slug: 'personalized-gifts',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop',
    description: 'Custom engraved wooden frames, bespoke jewelry boxes, and personalized keepsakes.',
    itemCount: 14,
    featured: true,
  },
  {
    id: 'cat-2',
    name: 'Luxury Gift Hampers',
    slug: 'luxury-hampers',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
    description: 'Artisan gourmet sweets, roasted dry fruits, organic teas, and curated celebratory boxes.',
    itemCount: 18,
    featured: true,
  },
  {
    id: 'cat-3',
    name: 'Soft Toys & Plushies',
    slug: 'soft-toys',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop',
    description: 'Ultra-soft huggable teddy bears, giant plushies, and baby-safe animal companions.',
    itemCount: 22,
    featured: true,
  },
  {
    id: 'cat-4',
    name: 'STEM & Educational Toys',
    slug: 'stem-educational-toys',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop',
    description: 'Creative building blocks, robotic kits, wooden puzzles, and cognitive development games.',
    itemCount: 16,
    featured: true,
  },
  {
    id: 'cat-5',
    name: 'Scented Candles & Aromatherapy',
    slug: 'scented-candles',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
    description: 'Hand-poured 100% soy wax candles, French vanilla scents, lavender diffusers.',
    itemCount: 12,
    featured: false,
  },
  {
    id: 'cat-6',
    name: 'Kids & Baby Keepsakes',
    slug: 'kids-baby',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop',
    description: 'Milestone baby gift boxes, rattles, organic cotton plush blankets, and nursery decor.',
    itemCount: 15,
    featured: false,
  },
  {
    id: 'cat-7',
    name: 'Romantic & Anniversary',
    slug: 'romantic-anniversary',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
    description: 'Everlasting preserved roses, couple memory scrapbooks, and gold-foiled celebration sets.',
    itemCount: 10,
    featured: false,
  },
  {
    id: 'cat-8',
    name: 'Corporate & Festive Hampers',
    slug: 'corporate-festive',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop',
    description: 'Premium executive notebooks, brass diyas, handcrafted sweets, and sleek desk sets.',
    itemCount: 9,
    featured: false,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Personalized Royal Oak Memory Box',
    slug: 'personalized-royal-oak-memory-box',
    tagline: 'Hand-carved solid oak wood with gold brass latches and custom name engraving',
    description: 'A timeless heirloom handcrafted from premium seasoned oak. Features plush velvet-lined interior compartments and customized laser-engraved names or heartfelt messages on the lid.',
    longDescription: 'Crafted with passion by veteran woodworkers, the Royal Oak Memory Box provides an elegant home for cherished letters, jewelry, watches, and precious keepsakes. Includes an optional secret compartment and complimentary brass key with tassel.',
    price: 1899,
    discount: 15, // 15% off -> 1614
    sku: 'GFT-OAK-001',
    stock: 14,
    categoryId: 'cat-1',
    categoryName: 'Personalized Gifts',
    featured: true,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop',
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-gift-wrapped-in-brown-paper-42718-large.mp4',
    variants: [
      { id: 'v1-1', name: 'Size', value: 'Medium (8x6 in)', priceAdjustment: 0, stock: 8 },
      { id: 'v1-2', name: 'Size', value: 'Large (11x8 in)', priceAdjustment: 400, stock: 6 },
    ],
    tags: ['Personalized', 'Wooden', 'Anniversary', 'Birthday', 'Luxury'],
    occasion: ['Anniversary', 'Birthday', 'Wedding', 'Housewarming'],
    ageGroup: 'Adults',
    isPersonalizable: true,
    personalizationNote: 'Enter recipient name (up to 25 chars) and custom date/message',
    boxContents: [
      '1x Solid Handcrafted Oak Keepsake Box',
      '1x Velvet interior tray with 4 compartments',
      '1x Antique Brass Lock & Tassel Key',
      '1x Certificate of Authenticity & Care Card'
    ],
    specifications: {
      'Material': 'Seasoned White Oak & Brass',
      'Interior': 'Burgundy Wine Micro-velvet',
      'Finish': 'Natural Organic Beeswax Polish',
      'Dimensions': '28cm x 20cm x 11cm',
      'Origin': 'Handcrafted in Jaipur, India'
    },
    careInstructions: 'Wipe clean with a dry microfiber cloth. Avoid direct moisture or prolonged harsh sunlight.'
  },
  {
    id: 'prod-2',
    name: 'Jumbo Cloud-Soft Cuddle Bear (100cm)',
    slug: 'jumbo-cloud-soft-cuddle-bear',
    tagline: 'Ultra-luxurious hypo-allergenic velvet plushie with embroidered paw prints',
    description: 'Meet Barnaby, the softest giant teddy bear designed for cozy warm hugs. Made with zero-shed high-density cloud fiber and child-safe stitched eyes.',
    longDescription: 'Created with premium ultra-plush fabric that retains fluffiness through endless snuggles. Completely odor-free, non-toxic, and tested against all international toy safety standards. Comes with a satin ribbon bow in royal plum.',
    price: 2499,
    discount: 20, // 20% off -> 1999
    sku: 'TOY-BEAR-002',
    stock: 22,
    categoryId: 'cat-3',
    categoryName: 'Soft Toys & Plushies',
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 240,
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?q=80&w=800&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-little-girl-hugging-a-teddy-bear-on-the-bed-41484-large.mp4',
    variants: [
      { id: 'v2-1', name: 'Color', value: 'Warm Honey Bear', priceAdjustment: 0, stock: 12 },
      { id: 'v2-2', name: 'Color', value: 'Snow White Bear', priceAdjustment: 0, stock: 5 },
      { id: 'v2-3', name: 'Color', value: 'Blush Rose Bear', priceAdjustment: 100, stock: 5 },
    ],
    tags: ['Soft Toy', 'Teddy Bear', 'Kids', 'Birthday', 'Girlfriend'],
    occasion: ['Birthday', 'Anniversary', 'Valentine', 'Kids'],
    ageGroup: '3-5 Years',
    isPersonalizable: true,
    personalizationNote: 'Add custom embroidered name tag on bear ribbon (+₹149)',
    boxContents: [
      '1x 100cm Jumbo Huggable Plush Bear',
      '1x Premium Satin Plum Ribbon with Bow',
      '1x Eco-friendly Cotton Dust Storage Bag'
    ],
    specifications: {
      'Height': '100 cm (3.3 feet)',
      'Fabric': '100% Hypoallergenic Microfiber Plush',
      'Filling': 'Virgin PP Cotton (Non-Toxic)',
      'Wash Care': 'Surface washable with damp cloth'
    },
    careInstructions: 'Spot clean with mild baby detergent. Air dry in shade.'
  },
  {
    id: 'prod-3',
    name: 'Artisan Grand Celebration Gourmet Hamper',
    slug: 'artisan-grand-celebration-gourmet-hamper',
    tagline: 'Hand-curated luxury box with dark Belgian chocolates, roasted nuts & scented candle',
    description: 'An opulent gourmet feast encased in a textured burgundy leatherette trunk. Includes handcrafted artisan truffles, smoked almond jars, organic Kashmiri saffron honey, and a French vanilla soy candle.',
    longDescription: 'Make any celebration memorable with this grand hamper. Every item is handpicked from artisanal producers and packaged in an eco-luxe presentation gift box tied with golden ribbon.',
    price: 3499,
    discount: 10, // 3149
    sku: 'GFT-HMP-003',
    stock: 9,
    categoryId: 'cat-2',
    categoryName: 'Luxury Gift Hampers',
    featured: true,
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v3-1', name: 'Edition', value: 'Classic Trunk Box', priceAdjustment: 0, stock: 5 },
      { id: 'v3-2', name: 'Edition', value: 'Royal Gold Limited Trunk', priceAdjustment: 600, stock: 4 },
    ],
    tags: ['Gourmet', 'Chocolates', 'Festive', 'Corporate', 'Luxury Hamper'],
    occasion: ['Festival', 'Corporate', 'Anniversary', 'Housewarming', 'Wedding'],
    ageGroup: 'Adults',
    isPersonalizable: true,
    personalizationNote: 'Enter custom printed greeting card message',
    boxContents: [
      '1x Premium Burgundy Reusable Keepsake Trunk',
      '1x Box of 12 Handcrafted Belgian Pralines',
      '1x Glass Jar Smoked Almonds & Cashews (200g)',
      '1x Pure Kashmiri Saffron Honey Jar (150g)',
      '1x Hand-poured Amber Vanilla Soy Candle (120g)',
      '1x Gold Embossed Personal Greeting Card'
    ],
    specifications: {
      'Shelf Life': '6 Months from packaging',
      'Dietary': '100% Vegetarian',
      'Packaging': 'Food-grade sealed airtight jars inside faux leather trunk'
    }
  },
  {
    id: 'prod-4',
    name: 'Smart Explorer Solar & Motorized STEM Robot Kit',
    slug: 'smart-explorer-solar-stem-robot-kit',
    tagline: '12-in-1 Educational Engineering & Solar Robotics DIY Builder for Kids 6-12 Years',
    description: 'Inspire the next generation of innovators with this award-winning 12-in-1 robot builder kit. Powered by dual solar panels and optional battery motor for indoor/outdoor fun.',
    longDescription: 'Step-by-step illustrated blueprint manual guides kids through building walking turtles, robotic dogs, speed boats, and automated rovers. Enhances problem-solving, spatial logic, and mechanical engineering basics.',
    price: 1699,
    discount: 25, // 1274
    sku: 'TOY-STEM-004',
    stock: 18,
    categoryId: 'cat-4',
    categoryName: 'STEM & Educational Toys',
    featured: true,
    isNew: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 86,
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v4-1', name: 'Model', value: '12-in-1 Solar Pioneer', priceAdjustment: 0, stock: 10 },
      { id: 'v4-2', name: 'Model', value: '14-in-1 Pro with Motor & Gears', priceAdjustment: 300, stock: 8 },
    ],
    tags: ['STEM', 'Robotics', 'Educational', 'Kids 6-12', 'Science'],
    occasion: ['Birthday', 'Kids', 'Return Gifts'],
    ageGroup: '6-12 Years',
    isPersonalizable: false,
    boxContents: [
      '190x Precision Snap-fit Engineering Parts',
      '1x High-efficiency Solar Panel Module',
      '1x Micro-gear Motor Transmission Unit',
      '1x Full-Color Illustrated Step-by-Step Guidebook'
    ],
    specifications: {
      'Age Recommended': '6 to 14 Years',
      'Safety Certification': 'BIS & EN71 Certified Non-toxic ABS',
      'Power Source': 'Solar or 1x AAA Battery (optional)'
    }
  },
  {
    id: 'prod-5',
    name: 'Midnight Rose & Warm Amber Aromatherapy Candle Set',
    slug: 'midnight-rose-warm-amber-candle-set',
    tagline: 'Set of 3 pure soy wax candles in ceramic matte jars with crackling wooden wicks',
    description: 'Transform any room into a tranquil sanctuary. Infused with therapeutic essential oils including Damascus rose, golden amber, Madagascar vanilla, and French lavender.',
    longDescription: 'Each candle burns cleanly for 45+ hours without toxic fumes or black soot. The natural FSC-certified wooden wicks provide a soothing gentle campfire crackle sound.',
    price: 1299,
    discount: 15,
    sku: 'GFT-CNDL-005',
    stock: 25,
    categoryId: 'cat-5',
    categoryName: 'Scented Candles & Aromatherapy',
    featured: false,
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop'
    ],
    tags: ['Candles', 'Aromatherapy', 'Relaxation', 'Anniversary', 'Housewarming'],
    occasion: ['Anniversary', 'Housewarming', 'Birthday', 'Valentine'],
    ageGroup: 'Adults',
    isPersonalizable: true,
    personalizationNote: 'Add a customized gift wrap card with warm fragrance message',
    boxContents: [
      '3x 140g Hand-poured Ceramic Soy Candles',
      '1x Brass Candle Snuffer',
      '1x Box of Long Aesthetic Wooden Matches'
    ],
    specifications: {
      'Wax': '100% Pure Organic Soy Wax',
      'Burn Time': '45 hours per jar (135 hours total)',
      'Scents': 'Velvet Rose, Warm Amber Woods, French Lavender'
    }
  },
  {
    id: 'prod-6',
    name: 'Montessori Wooden Sensory Activity Cube',
    slug: 'montessori-wooden-sensory-activity-cube',
    tagline: '5-in-1 Busy Board Activity Center with Bead Maze, Clock & Shape Sorter',
    description: 'An all-in-one developmental wooden center crafted from smooth sustainably-sourced beechwood with water-based non-toxic pastel colors. Perfect for toddlers 1-3 years.',
    longDescription: 'Engages fine motor skills, hand-eye coordination, color recognition, and spatial reasoning. The top bead maze reverses inside the box for easy neat storage.',
    price: 1799,
    discount: 18,
    sku: 'TOY-MONT-006',
    stock: 11,
    categoryId: 'cat-6',
    categoryName: 'Kids & Baby Keepsakes',
    featured: false,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 78,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop'
    ],
    tags: ['Montessori', 'Toddler Toys', 'Wooden Toys', 'Baby Shower', 'Sensory'],
    occasion: ['Birthday', 'Kids', 'Baby Shower'],
    ageGroup: '0-2 Years',
    isPersonalizable: true,
    personalizationNote: 'Add toddler name laser engraved on base (+₹99)',
    boxContents: [
      '1x 5-in-1 Solid Wood Sensory Cube',
      '4x Geometric Matching Sorting Blocks',
      '1x Reversible Bead Maze Lid'
    ],
    specifications: {
      'Dimensions': '18cm x 18cm x 31cm',
      'Wood Type': 'Natural Premium Beechwood',
      'Paints': '100% Water-based Lead-Free Certified'
    }
  },
  {
    id: 'prod-7',
    name: 'Eternal Preserved 24K Gold Rose in Glass Dome',
    slug: 'eternal-preserved-gold-rose-glass-dome',
    tagline: 'Real natural rose preserved to last forever with ambient fairy LED lights',
    description: 'A genuine fresh-cut Ecuadorian rose preserved using advanced Japanese micro-molecular technique to retain vibrant softness and beauty for over 5 years. Features 24K gold foil trim and warm LED lights inside a crystal glass dome.',
    longDescription: 'Symbolize everlasting love with this fairy-tale inspired glass cloche. Operates with subtle touch switch on the natural wooden base.',
    price: 2199,
    discount: 22, // 1715
    sku: 'GFT-ROSE-007',
    stock: 7,
    categoryId: 'cat-7',
    categoryName: 'Romantic & Anniversary',
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 164,
    images: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v7-1', name: 'Rose Color', value: 'Royal Crimson Red', priceAdjustment: 0, stock: 4 },
      { id: 'v7-2', name: 'Rose Color', value: 'Midnight Twilight Purple', priceAdjustment: 100, stock: 3 },
    ],
    tags: ['Romantic', 'Anniversary', 'Valentine', 'Rose Dome', 'Luxury'],
    occasion: ['Anniversary', 'Valentine', 'Birthday', 'Wedding'],
    ageGroup: 'Adults',
    isPersonalizable: true,
    personalizationNote: 'Enter engraved gold plate text (e.g., "Forever Yours, Aryan")',
    boxContents: [
      '1x Preserved Eternal Rose in High Borosilicate Glass Dome',
      '1x Solid Walnut Base with Integrated Warm LED String',
      '1x Premium Magnetic Gift Box with Satin Bow',
      '1x Blank Love Note Card & Envelope'
    ],
    specifications: {
      'Dome Height': '23 cm',
      'Dome Diameter': '13 cm',
      'Lifespan': '3 to 5 Years without watering'
    }
  },
  {
    id: 'prod-8',
    name: 'Executive Vegan Leather Desk & Journal Gift Set',
    slug: 'executive-vegan-leather-desk-journal-set',
    tagline: 'Custom monogrammed journal, matte metal pen, cardholder, and thermal coffee tumbler',
    description: 'The ultimate professional gift for colleagues, mentors, and corporate celebrations. Features cross-grain textured cruelty-free leather with gold foil monograms.',
    longDescription: 'Sleek, minimalist, and functional. Perfect for milestone promotions, welcome gifts, Diwali corporate hampers, or birthday appreciation.',
    price: 1599,
    discount: 12,
    sku: 'GFT-CORP-008',
    stock: 30,
    categoryId: 'cat-8',
    categoryName: 'Corporate & Festive Hampers',
    featured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v8-1', name: 'Colorway', value: 'Midnight Charcoal & Gold', priceAdjustment: 0, stock: 15 },
      { id: 'v8-2', name: 'Colorway', value: 'Cognac Tan & Rose Gold', priceAdjustment: 0, stock: 15 },
    ],
    tags: ['Corporate', 'Journal', 'Personalized', 'Executive', 'Work Anniversary'],
    occasion: ['Corporate', 'Birthday', 'Festive', 'Housewarming'],
    ageGroup: 'Adults',
    isPersonalizable: true,
    personalizationNote: 'Enter initials or full name for gold foil embossing on notebook',
    boxContents: [
      '1x Hardbound 200-page 100 GSM Ivory Journal with Bookmark',
      '1x Heavyweight Brass & Matte Black Ballpoint Pen (0.7mm)',
      '1x RFID-Protected Slim Card Wallet',
      '1x 350ml Double-wall Vacuum Insulated Thermal Flask',
      '1x Matte Black Rigid Presentation Box'
    ],
    specifications: {
      'Material': 'High-grade Vegan PU Leather & Food-grade 304 Steel',
      'Journal Pages': '192 Ruled Pages (Bleed-resistant)',
      'Flask Capacity': '350 ml (Keeps hot/cold 8 hrs)'
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userId: 'u-1',
    userName: 'Pooja Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    productId: 'prod-1',
    rating: 5,
    title: 'Exceeded all expectations! Absolute master craftsmanship.',
    comment: 'I ordered the Personalized Oak Memory Box for my husband on our 5th wedding anniversary. The laser engraving was so crisp and clean, and the velvet lining feels super premium. He was moved to tears. Delivery arrived in 2 days in flawless packaging!',
    verified: true,
    date: '2026-08-10',
  },
  {
    id: 'rev-2',
    userId: 'u-2',
    userName: 'Vikram Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    productId: 'prod-2',
    rating: 5,
    title: 'My 4-year old daughter carries this everywhere!',
    comment: 'The quality of the Barnaby Cuddle Bear is phenomenal. Zero shedding, super soft fabric, and very safe for kids. The personalized ribbon with her name made her feel so special on her birthday.',
    verified: true,
    date: '2026-08-15',
  },
  {
    id: 'rev-3',
    userId: 'u-3',
    userName: 'Ananya Deshmukh',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    productId: 'prod-3',
    rating: 5,
    title: 'The best luxury hamper I have ever gifted!',
    comment: 'Sent this to a major corporate client for their anniversary. The packaging looked like a million bucks and the Belgian chocolates were out of this world delicious. Highly recommend Giftora for high-end gifting.',
    verified: true,
    date: '2026-08-18',
  },
  {
    id: 'rev-4',
    userId: 'u-4',
    userName: 'Rahul Singhania',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    productId: 'prod-4',
    rating: 5,
    title: 'Engaging & brain stimulating for kids',
    comment: 'My 8 year old nephew spent the entire weekend building the different robotic models. The solar panel worked great outdoors in the sun. Very happy with the educational value.',
    verified: true,
    date: '2026-08-20',
  }
];

export const COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'WELCOME10',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    minimumAmount: 500,
    maxDiscount: 300,
    active: true,
    description: '10% discount on orders above ₹500 for new shoppers.',
  },
  {
    id: 'coup-2',
    code: 'GIFT100',
    discountType: 'FIXED',
    discountValue: 100,
    minimumAmount: 999,
    active: true,
    description: '₹100 flat discount on orders over ₹999.',
  },
  {
    id: 'coup-3',
    code: 'FESTIVE15',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minimumAmount: 1500,
    maxDiscount: 600,
    active: true,
    description: '15% festive celebration discount on orders above ₹1,500.',
  },
  {
    id: 'coup-4',
    code: 'BIRTHDAY20',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minimumAmount: 2000,
    maxDiscount: 800,
    active: true,
    description: '20% special birthday discount on orders above ₹2,000.',
  }
];
