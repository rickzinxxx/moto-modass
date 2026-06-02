export interface ColorOption {
  name: string;
  hex: string;
}

export type CategoryType = 'tudo' | 'street' | 'casual' | 'social' | 'acessorios';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  longDescription?: string;
  price: number;
  category: Exclude<CategoryType, 'tudo'>;
  images: string[];
  sizes: string[];
  colors: ColorOption[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  details?: string[];
}

export interface CartItem {
  id: string; // Unique ID for this cart item (combines product id, size, and color)
  product: Product;
  selectedSize: string;
  selectedColor: ColorOption;
  quantity: number;
}

export interface CheckoutDetails {
  customerName: string;
  paymentMethod: 'Pix' | 'Cartão' | 'Dinheiro';
  deliveryOption: 'Retirada' | 'Entrega';
  deliveryAddress: string;
  customerNotes: string;
}

export interface QuickFilter {
  category: CategoryType;
  searchQuery: string;
  priceRange: [number, number];
  selectedSize: string;
  sortBy: 'featured' | 'priceAsc' | 'priceDesc' | 'name';
}
