export interface Product {
  id: string
  name: string
  slug: string
  category: string
  image: string
  images: string[]
  mrp: number
  salePrice: number
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  sku: string
  isNew?: boolean
  isBestSeller?: boolean
  description: string
  features: string[]
  specifications: Record<string, string>
  reviews: {
    id: string
    author: string
    date: string
    rating: number
    comment: string
    verified: boolean
  }[]
}

export const categories = [
  'All',
  'Bridal Blouses',
  'Masterclasses & Courses',
  'Needles & Tools',
  'Threads & Zari',
  'Frames & Fabrics',
  'Kits & Accessories',
]

export const products: Product[] = [
  // --- BRIDAL BLOUSES ---
  {
    id: 'p-bb1',
    name: 'Royal Peacock Motif Heavy Bridal Aari Blouse Work',
    slug: 'royal-peacock-bridal-aari-blouse',
    category: 'Bridal Blouses',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80',
    ],
    mrp: 14999,
    salePrice: 9999,
    rating: 5.0,
    reviewCount: 48,
    inStock: true,
    stockCount: 10,
    sku: 'SN-BB-PEACOCK-01',
    isBestSeller: true,
    isNew: true,
    description:
      'Exquisite hand-crafted royal peacock motif Aari embroidery featuring antique gold zari, premium Kundan stones, and micro-cut pearls. Custom tailored to your measurements on pure raw silk fabric.',
    features: [
      'Full back neck heavy peacock & floral embroidery',
      'Elbow-length heavy work sleeves with dangling pearl beads',
      'Custom measurement consultation included',
      'Choice of 24 raw silk fabric colors',
      '100% handmade by master artisans in 7–10 days',
    ],
    specifications: {
      'Embroidery Type': 'Heavy Aari & Zardosi Work',
      'Fabric Material': 'Pure Kanchipuram Raw Silk',
      Embellishments: 'Antique Zari, Kundan Stones, Moti Pearls & Cutbeads',
      Turnaround: '7 - 10 Business Days',
      Customization: 'Neckline, Sleeve Length & Size Fitting',
    },
    reviews: [
      {
        id: 'r-bb1',
        author: 'Sowmya V.',
        date: '3 days ago',
        rating: 5,
        comment: 'Absolutely breathtaking work for my wedding blouse! The peacock design was super intricate.',
        verified: true,
      },
      {
        id: 'r-bb2',
        author: 'Meenakshi N.',
        date: '1 week ago',
        rating: 5,
        comment: 'Finishing is top notch. Delivered right on time before my muhurtham.',
        verified: true,
      },
    ],
  },
  {
    id: 'p-bb2',
    name: 'Kundan & Zardosi Sleeve-Focused Bridal Customization',
    slug: 'kundan-zardosi-sleeve-bridal-blouse',
    category: 'Bridal Blouses',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    ],
    mrp: 11999,
    salePrice: 7999,
    rating: 4.9,
    reviewCount: 32,
    inStock: true,
    stockCount: 15,
    sku: 'SN-BB-KUNDAN-02',
    isBestSeller: false,
    isNew: false,
    description:
      'Elegant Kundan and French wire Zardosi embroidery focused on statement sleeves and delicate back border accents. Perfect for reception sarees and muhurtham silk blouses.',
    features: [
      '3D Zardosi flower motifs with emerald & ruby tone stones',
      'Geometric sleeve border with hanging jhumka bead accents',
      'Includes padded lining & concealed side zipper option',
    ],
    specifications: {
      'Embroidery Type': 'Kundan & French Wire Zardosi',
      Fabric: 'Pure Chanderi / Raw Silk',
      Fitting: 'Custom Stitched to Size',
      Delivery: '5 - 7 Days',
    },
    reviews: [
      {
        id: 'r-bb3',
        author: 'Priya K.',
        date: '2 weeks ago',
        rating: 5,
        comment: 'Sleeve work was stunning under stage lighting!',
        verified: true,
      },
    ],
  },

  // --- MASTERCLASSES & COURSES ---
  {
    id: 'p-mc1',
    name: 'Complete Aari Embroidery Online Masterclass (Basic to Pro)',
    slug: 'complete-aari-embroidery-masterclass',
    category: 'Masterclasses & Courses',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80',
    ],
    mrp: 4999,
    salePrice: 2499,
    rating: 4.9,
    reviewCount: 310,
    inStock: true,
    stockCount: 999,
    sku: 'SN-COURSE-PRO-01',
    isBestSeller: true,
    isNew: true,
    description:
      'Master the art of Aari work from scratch! Includes 40+ HD video lessons, downloadable design trace templates, dedicated WhatsApp mentor support, and a physical Starter Tool Kit shipped to your doorstep.',
    features: [
      '40+ Step-by-Step HD Video Modules (Lifetime Access)',
      'FREE Physical Starter Kit delivered to your home (Needles, Frame & Threads)',
      'Chain Stitch, Water Filling, Zardosi, Bead Work & 3D Patchwork',
      'Blouse Marking & Tracing Technique Secrets',
      'ISO Verified Course Completion Certificate',
    ],
    specifications: {
      Format: 'Self-Paced HD Videos + Live Doubt Clearing',
      Language: 'Tamil & English Subtitles',
      'Kit Included': 'Yes, FREE Starter Material Box',
      Validity: 'Lifetime Access + Certificate',
    },
    reviews: [
      {
        id: 'r-mc1',
        author: 'Anitha S.',
        date: 'Yesterday',
        rating: 5,
        comment: 'Clear explanation! I started taking orders for friends after completing Module 3.',
        verified: true,
      },
      {
        id: 'r-mc2',
        author: 'Radhika M.',
        date: '5 days ago',
        rating: 5,
        comment: 'The free kit reached my house in 2 days. Very helpful support team on WhatsApp.',
        verified: true,
      },
    ],
  },
  {
    id: 'p-mc2',
    name: 'Advanced Zardosi & Bridal Blouse Designing Workshop',
    slug: 'advanced-zardosi-bridal-blouse-workshop',
    category: 'Masterclasses & Courses',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
    ],
    mrp: 6999,
    salePrice: 3499,
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    stockCount: 500,
    sku: 'SN-COURSE-ADV-02',
    isBestSeller: false,
    isNew: false,
    description:
      'Intensive advanced level program focused strictly on high-end bridal embroidery: French wire zardosi, cutwork lace techniques, mirror work, and pricing your boutique services for profit.',
    features: [
      '15 Advanced Motif Designs with Tracing Sheets',
      'Boutique Pricing & Client Handling Guide',
      'Live Weekend Q&A Sessions with Sangeetha Madam',
    ],
    specifications: {
      Prerequisite: 'Basic Aari Stitch Knowledge Required',
      Certificate: 'Advanced Artisan Certificate',
      Duration: '4 Weeks Accelerated',
    },
    reviews: [
      {
        id: 'r-mc3',
        author: 'Kavitha P.',
        date: '2 weeks ago',
        rating: 5,
        comment: 'Learned intricate cutwork techniques that doubled my boutique orders!',
        verified: true,
      },
    ],
  },

  // --- NEEDLES & TOOLS ---
  {
    id: 'p1',
    name: 'Premium Aari Needle Set (12 pcs)',
    slug: 'premium-aari-needle-set',
    category: 'Needles & Tools',
    image: 'https://picsum.photos/seed/prod1/600/750',
    images: [
      'https://picsum.photos/seed/prod1/600/750',
      'https://picsum.photos/seed/prod1b/600/750',
    ],
    mrp: 399,
    salePrice: 249,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 45,
    sku: 'SN-AARI-NDL-12',
    isBestSeller: true,
    isNew: false,
    description:
      'Engineered for ultimate precision and smooth stitching. Crafted from hardened high-carbon steel with micro-polished hook points.',
    features: [
      '12 Assorted Hook Sizes (0.5mm to 1.2mm)',
      'Micro-grooved wooden handle for fatigue-free work',
      'Includes velvet pouch',
    ],
    specifications: {
      Material: 'Carbon Steel & Teak Wood',
      Quantity: '12 Needles',
    },
    reviews: [],
  },

  // --- THREADS & ZARI ---
  {
    id: 'p2',
    name: 'Silk Aari Thread — Pure Gold (10 Reels)',
    slug: 'silk-aari-thread-gold',
    category: 'Threads & Zari',
    image: 'https://picsum.photos/seed/prod2/600/750',
    images: ['https://picsum.photos/seed/prod2/600/750'],
    mrp: 599,
    salePrice: 399,
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockCount: 60,
    sku: 'SN-THR-GOLD-10',
    isBestSeller: false,
    isNew: true,
    description: '100% pure silk gold thread optimized for smooth, non-break Aari embroidery stitches.',
    features: ['High tensile strength', 'Lustrous gold finish', 'Non-fading color'],
    specifications: { Quantity: '10 Reels', Material: 'Silk & Metallic Yarn' },
    reviews: [],
  },

  // --- FRAMES & FABRICS ---
  {
    id: 'p3',
    name: 'Round Aari Wooden Embroidery Frame — 12"',
    slug: 'round-aari-frame-12',
    category: 'Frames & Fabrics',
    image: 'https://picsum.photos/seed/prod3/600/750',
    images: ['https://picsum.photos/seed/prod3/600/750'],
    mrp: 699,
    salePrice: 499,
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    stockCount: 30,
    sku: 'SN-FRM-12INCH',
    isBestSeller: false,
    isNew: false,
    description: 'Sturdy seasoned wood frame with brass tension screw for drum-tight fabric grip.',
    features: ['Smooth sanded edges', 'Heavy-duty brass lock'],
    specifications: { Size: '12 Inches', Material: 'Seasoned Rubberwood' },
    reviews: [],
  },

  // --- KITS & ACCESSORIES ---
  {
    id: 'p4',
    name: 'All-in-One Beginner Aari Work Complete Kit',
    slug: 'beginner-aari-kit',
    category: 'Kits & Accessories',
    image: 'https://picsum.photos/seed/prod4/600/750',
    images: ['https://picsum.photos/seed/prod4/600/750'],
    mrp: 1499,
    salePrice: 999,
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    stockCount: 25,
    sku: 'SN-KIT-BEGINNER',
    isBestSeller: true,
    isNew: false,
    description: 'Everything a beginner needs: 12" frame, 6 needles, 5 zari threads, tracing paper & stones.',
    features: ['Complete starter toolbox', 'Practice fabric swatch included'],
    specifications: { Items: '18 Accessories', IdealFor: 'Beginners & Students' },
    reviews: [],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
