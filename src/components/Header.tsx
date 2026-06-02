import React from 'react';
import { Search, ShoppingBag, Instagram, Phone } from 'lucide-react';
import { CategoryType } from '../types';
import { STORE_NAME, STORE_INSTAGRAM, STORE_WHATSAPP } from '../data';
import { MorphingText } from './MorphingText';
import { GooeyText } from './GooeyText';

interface HeaderProps {
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'tudo', label: 'TUDO' },
    { id: 'street', label: 'STREETWEAR' },
    { id: 'casual', label: 'CASUAL' },
    { id: 'social', label: 'SOCIAL' },
    { id: 'acessorios', label: 'ACESSÓRIOS' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-850 bg-[#0a0a0a]/95 backdrop-blur-md">
      {/* Top Banner Bar */}
      <div className="flex h-10 w-full items-center justify-between border-b border-neutral-850 bg-black px-4 font-mono text-[10px] tracking-widest text-neutral-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
            CATÁLOGO VIRTUAL ATIVO
          </span>
          <span className="hidden sm:inline text-neutral-805">|</span>
          <span className="hidden sm:inline">FRETE GRÁTIS EM JABOATÃO (CONSULTE)</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`https://instagram.com/${STORE_INSTAGRAM.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Instagram size={12} className="text-neutral-400" />
            {STORE_INSTAGRAM}
          </a>
          <span className="text-neutral-805">|</span>
          <a
            href={`https://wa.me/${STORE_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors font-semibold text-white"
          >
            <Phone size={12} className="text-neutral-400" />
            (81) 98555-5951
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Block */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border-2 border-white bg-black font-mono font-black text-xs text-white relative overflow-hidden select-none">
            <MorphingText texts={['JM', 'MM', 'JM']} className="w-full h-full text-xs font-black text-white" />
          </div>
          <div>
            <div className="h-6 w-36 relative flex items-center justify-start select-none overflow-hidden">
              <GooeyText
                texts={['MOTAMODAS', 'COLEÇÃO 2026', 'JM MODAS']}
                className="w-full h-full"
                textClassName="text-base font-mono font-black tracking-tighter text-white"
                morphTime={1.2}
                cooldownTime={1.5}
              />
            </div>
            <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase leading-none">
              Elite Riding Gear & Apparel
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mx-4 hidden max-w-sm flex-1 md:block">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Buscar por peça, marca ou estilo..."
            className="h-10 w-full rounded-none border border-neutral-800 bg-[#111111] pl-10 pr-4 font-mono text-xs text-white placeholder-neutral-600 outline-none transition-all focus:border-white focus:bg-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Pulsing online status indicator */}
          <div className="hidden lg:flex bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800 items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse"></div>
            <span className="text-[10px] font-mono leading-none font-bold tracking-wide text-neutral-300">VENDEDOR ONLINE</span>
          </div>

          {/* Cart Status Trigger */}
          <button
            id="shopping-bag-trigger-btn"
            onClick={onOpenCart}
            className="relative flex h-10 items-center justify-center border border-neutral-800 bg-neutral-900 hover:bg-neutral-850 px-4 font-mono text-xs font-semibold text-white transition-all cursor-pointer"
          >
            <ShoppingBag size={14} className="mr-2 text-white" />
            <span className="hidden sm:inline text-neutral-200">SACOLA</span>
            <span className="ml-1.5 rounded bg-white px-1.5 py-0.5 text-[9px] font-black text-black font-mono leading-none">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search input (Visible only on mobile screen widths) */}
      <div className="border-t border-neutral-900 bg-neutral-950 px-4 py-2.5 md:hidden">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-500">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Buscar roupas, acessórios..."
            className="h-9 w-full rounded-none border border-neutral-900 bg-black pl-9 pr-4 font-mono text-[11px] text-white placeholder-neutral-600 outline-none focus:border-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Segment Navigation Categories */}
      <div className="border-t border-neutral-900 bg-[#070707] px-4 overflow-x-auto">
        <nav className="mx-auto flex max-w-7xl items-center gap-1 py-1.5 sm:px-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              id={`category-tab-${cat.id}`}
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
              }}
              className={`whitespace-nowrap px-4 py-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'border-b-2 border-white text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
