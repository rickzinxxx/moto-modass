import React, { useState, useEffect } from 'react';
import { Product, CartItem, ColorOption, CategoryType } from './types';
import { PRODUCTS, STORE_ADDRESS, STORE_WHATSAPP, STORE_INSTAGRAM, SITE_CREATOR } from './data';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import ShoppingBagDrawer from './components/ShoppingBagDrawer';
import { MotaLogo } from './components/MotaLogo';
import { MagneticText } from './components/MagneticText';
import { ShadowOverlay } from './components/ShadowOverlay';
import AdminPanel from './components/AdminPanel';
import { Instagram, MapPin, Phone, ShieldCheck, Mail, ArrowRight, SlidersHorizontal, Sliders, Sparkles, Filter } from 'lucide-react';

export default function App() {
  // --- States ---
  const [activeCategory, setActiveCategory] = useState<CategoryType>('tudo');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // High-fidelity state-managed product catalog
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('jm_mota_modas_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load initial cart elements from standard localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jm_mota_modas_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Live products updates handler
  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('jm_mota_modas_products', JSON.stringify(newProducts));
    } catch (e) {
      console.error('Falha ao gravar catálogo localmente', e);
    }
  };

  // Sync cart additions dynamically with localStorage standard
  useEffect(() => {
    try {
      localStorage.setItem('jm_mota_modas_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Falha ao sincronizar sacola com storage local', e);
    }
  }, [cartItems]);

  // --- Handlers ---
  const handleAddToCart = (product: Product, size: string, color: ColorOption, quantity: number) => {
    const finalSize = size || 'Único';
    const finalColor = color || { name: 'Padrão', hex: '#ffffff' };
    setCartItems((prev) => {
      // Craft a composite unique ID for tracking combinations of size and color in our shopping lists
      const itemId = `${product.id}-${finalSize}-${finalColor.name || 'Padrão'}`;
      const existing = prev.find((item) => item.id === itemId);

      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prev, { id: itemId, product, selectedSize: finalSize, selectedColor: finalColor, quantity }];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Search and category sorting pipeline ---
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'tudo' || product.category === activeCategory;

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.longDescription && product.longDescription.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredItems = products.filter((p) => p.isFeatured && p.inStock);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#070707] text-white relative overflow-x-hidden">
      {/* Global Ethereal Shadow Overlay Background */}
      <ShadowOverlay
        sizing="fill"
        color="rgba(255, 255, 255, 0.05)"
        animation={{ scale: 45, speed: 4 }}
        noise={{ opacity: 0.1, scale: 0.5 }}
        style={{ pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Immersive Header and search filter bars */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">

        {/* Brand visual introductory banner */}
        {!searchQuery && activeCategory === 'tudo' && (
          <div className="relative border border-neutral-900 bg-black min-h-[380px] md:min-h-[460px] flex flex-col items-center justify-center p-8 md:p-14 overflow-hidden rounded-2xl select-none animate-fade-in group">
            {/* Ambient Shadow Overlay Background */}
            <ShadowOverlay
              sizing="fill"
              color="rgba(255, 255, 255, 0.12)"
              animation={{ scale: 35, speed: 10 }}
              noise={{ opacity: 0.15, scale: 0.5 }}
            />
            
            {/* Ambient Background Grid pattern and subtle glowing vector fields */}
            <div className="absolute inset-0 bg-[radial-gradient(#151515_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8 w-full max-w-md">
              {/* Geometric stylized white line logo */}
              <div className="transform transition-transform duration-700 hover:scale-105 cursor-pointer">
                <MotaLogo className="w-48 md:w-64 h-auto text-white filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
              </div>

              <div className="space-y-4 mt-6 flex flex-col items-center justify-center">
                {/* Large main brand name with interactive MagneticText effect */}
                <MagneticText
                  text="MOTA MODAS"
                  hoverText="COLEÇÃO 2026"
                  className="font-mono"
                />
                
                {/* Secondary styled smaller serif name */}
                <p className="font-serif text-sm sm:text-base italic tracking-[0.4em] text-neutral-300 font-medium uppercase leading-none pl-1 opacity-95">
                  MOTA MODAS
                </p>
              </div>

              {/* Precise minimal placeholder lines from designer image specification */}
              <p className="pt-6 font-mono text-[8px] md:text-[9px] tracking-[0.05em] text-neutral-600 uppercase">
                © 2024 MOTA MODAS. Todos os direitos reservados.
              </p>
            </div>
          </div>
        )}

        {/* Featured Items Highlights lines */}
        {!searchQuery && activeCategory === 'tudo' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h3 className="font-mono text-xs font-black tracking-widest text-neutral-300 uppercase">
                <span className="text-white">//</span> PEÇAS EM DESTAQUE NA SEMANA
              </h3>
              <span className="font-mono text-[8px] text-neutral-500 uppercase">Estoque limitado</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {featuredItems.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Catalog Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-3">
            <div>
              <h3 className="font-mono text-sm font-black tracking-widest text-white uppercase flex items-center gap-2">
                <Filter size={12} className="text-white" />
                CATÁLOGO GERAL DE COMPRAS
              </h3>
              <p className="font-mono text-[9px] text-neutral-550 uppercase mt-0.5">
                Exibindo {filteredProducts.length} itens encontrados {activeCategory !== 'tudo' ? `na categoria ${activeCategory}` : ''}
              </p>
            </div>

            {/* Quick quick descriptors tags */}
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[9px] bg-[#111111] text-white border border-neutral-800 px-2.5 py-1 rounded-lg font-bold">
                ⚡ ENVIO RÁPIDO
              </span>
              <span className="font-mono text-[9px] bg-[#111111] text-white border border-neutral-800 px-2.5 py-1 rounded-lg font-bold">
                💳 ATÉ 3X SEM JUROS
              </span>
              <span className="font-mono text-[9px] bg-[#111111] text-white border border-neutral-800 px-2.5 py-1 rounded-lg font-bold">
                🔒 PAGO NA ENTREGA
              </span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-neutral-900 bg-neutral-950/40 font-mono text-xs text-neutral-500 space-y-3">
              <span>Nenhum produto correspondente aos filtros foi encontrado.</span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('tudo');
                }}
                className="px-3 py-1.5 border border-neutral-800 hover:border-neutral-500 text-white transition text-[10px]"
              >
                REMOVER TODOS OS FILTROS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER IMITATING IMAGE UPLOAD (JM MOTA MODAS BRAND FOOTBOARD COMPRESSED INTEGRALS) */}
      <footer className="relative z-10 mt-auto border-t border-neutral-900 bg-[#040404] py-12 md:py-16 text-neutral-400 font-mono">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Logo, address block */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border-2 border-white bg-black font-mono font-bold text-base text-white">
                JM
              </div>
              <h2 className="font-mono text-sm font-black tracking-widest text-white">
                MOTA MODAS
              </h2>
            </div>

            <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs uppercase">
              Sua curadoria de marcas famosas do mercado. Vista os estilos mais desejados: casual, social e street com máxima autenticidade e preço justo.
            </p>

            {/* Address */}
            <div className="flex gap-2 text-[10px] text-neutral-550 max-w-sm">
              <MapPin size={14} className="shrink-0 text-neutral-600 mt-0.5" />
              <address className="not-italic leading-relaxed uppercase shrink-0 max-w-[280px]">
                {STORE_ADDRESS}
              </address>
            </div>

            {/* Large White WhatsApp button mimicking user picture branding details exactly */}
            <a
              id="footer-whatsapp-brand-badge"
              href={`https://wa.me/${STORE_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-between bg-white text-black font-bold uppercase transition hover:bg-neutral-200"
              style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', gap: '1.25rem' }}
            >
              <span className="text-[10px] font-black tracking-widest">FALE NO WHATSAPP</span>
              <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5">81 98555-5951</span>
            </a>
          </div>

          {/* Social connections line (Instas oficiais) */}
          <div className="space-y-6">
            <span className="block border-l-2 border-white pl-3 text-xs font-black text-white tracking-widest">
              INSTAS OFICIAIS
            </span>

            <div className="space-y-2.5">
              {/* @jm_mmota store */}
              <a
                href={`https://instagram.com/${STORE_INSTAGRAM.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-neutral-800 bg-[#111111] rounded-xl p-3.5 text-neutral-400 hover:border-white hover:text-white transition group"
              >
                <div className="flex items-center gap-2">
                  <Instagram size={14} className="text-white group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold tracking-wider">{STORE_INSTAGRAM}</span>
                </div>
                <span className="text-[8px] font-black tracking-widest text-[#939393] flex items-center gap-1">
                  SIGA A LOJA <ArrowRight size={10} />
                </span>
              </a>

              {/* @rickzinx site creator */}
              <a
                href={`https://instagram.com/${SITE_CREATOR.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-neutral-800 bg-[#111111] rounded-xl p-3.5 text-neutral-400 hover:border-white hover:text-white transition group"
              >
                <div className="flex items-center gap-2">
                  <Instagram size={14} className="text-white group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold tracking-wider">{SITE_CREATOR}</span>
                </div>
                <span className="text-[8px] font-black tracking-widest text-[#939393] flex items-center gap-1">
                  CRIADOR DO SITE <ArrowRight size={10} />
                </span>
              </a>
            </div>

            <div className="flex gap-2 items-center text-[10px] text-neutral-500 uppercase">
              <ShieldCheck size={14} className="text-white" />
              <span>Garantia JM Mota Modas</span>
            </div>
          </div>

          {/* Development block */}
          <div className="space-y-6">
            <span className="block border-l-2 border-white pl-3 text-xs font-black text-white tracking-widest">
              DESENVOLVIMENTO
            </span>

            <p className="text-[11px] text-neutral-550 leading-relaxed uppercase">
              Este site de altíssima performance foi desenhado e programado por experts com foco em velocidade e conversão de vendas.
            </p>

            <div className="grid grid-cols-2 gap-3 text-[10px]">
              {/* Card ECOS agency */}
              <a
                href="https://instagram.com/ecos__agency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col border border-neutral-800 bg-[#111111] rounded-xl p-4 hover:border-white text-left transition group"
              >
                <span className="font-black text-[#f3f3f3] group-hover:text-white transition-colors uppercase tracking-wider text-[9px]">ECOS AGENCY</span>
                <span className="text-[8px] text-neutral-500 mt-2 hover:text-white">@ecos__agency ↗</span>
              </a>

              {/* Card TECHIFY */}
              <a
                href="https://instagram.com/techify.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col border border-neutral-800 bg-[#111111] rounded-xl p-4 hover:border-white text-left transition group"
              >
                <span className="font-black text-[#f3f3f3] group-hover:text-white transition-colors uppercase tracking-wider text-[9px]">TECHIFY</span>
                <span className="text-[8px] text-neutral-500 mt-2 hover:text-white">techify.oficial ↗</span>
              </a>
            </div>
          </div>

        </div>

        {/* Global copyright footer rail */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 pt-8 border-t border-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] tracking-wider text-neutral-600">
          <span className="flex items-center gap-1.5 select-none text-neutral-600 text-left">
            © 2026 JM MOTA MODAS. TODOS OS DIREITOS RESERVADOS.
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-neutral-900 hover:text-neutral-500 transition-colors uppercase ml-0.5 cursor-pointer font-bold"
              title="Acesso Administrativo"
            >
              • [Área Restrita]
            </button>
          </span>
          <span className="uppercase">
            PROJETADO POR <span className="text-neutral-500 font-bold">@rickzinx_</span> • PARCERIA ECOS & TECHIFY
          </span>
        </div>
      </footer>

      {/* --- Overlay Modals (Detail Viewer + sliding bag drawer) --- */}

      {/* Detail product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Drawer Shopping Bag list */}
      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* Hidden Store Owner Configuration Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
      />
    </div>
  );
}
