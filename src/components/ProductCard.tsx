import React from 'react';
import { Product } from '../types';
import { Star, Plus } from 'lucide-react';
import { GlowCard } from './GlowCard';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <GlowCard
      id={`product-card-${product.id}`}
      onClick={() => onOpenDetails(product)}
      customSize={true}
      glowColor="white"
      className="group flex flex-col justify-between p-4 transition-all duration-350 hover:bg-[#131313] cursor-pointer"
    >
      {/* Badges Overlay */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1 font-mono text-[9px] font-bold tracking-widest text-black">
        {product.isNew && (
          <span className="bg-white text-black px-2 py-0.5 text-[8px] font-black uppercase rounded">
            NOVO
          </span>
        )}
        {product.isFeatured && (
          <span className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[8px] font-black uppercase text-white rounded">
            <Star size={8} className="fill-white text-white" />
            DESTAQUE
          </span>
         )}
      </div>

      {/* Main Visual Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 rounded-lg border border-neutral-900">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover quick add view filter */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center bg-white/95 py-2.5 transition-transform duration-300 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black tracking-widest text-black uppercase">
            ESCOLHER OPÇÕES <Plus size={10} />
          </span>
        </div>
      </div>

      {/* Meta Text details */}
      <div className="mt-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="font-mono text-[9px] font-bold tracking-wider text-neutral-400 uppercase">
            {product.brand}
          </span>
          <h3 className="mt-1 font-mono text-xs font-bold text-white tracking-tight group-hover:text-white transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Foot Stats: Price, Size tokens, and Available Colors */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-col gap-2.5">
          {/* Colors and Sizes Inline badges */}
          <div className="flex items-center justify-between">
            {/* Color circles */}
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 3).map((col, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: col.hex }}
                  className="h-2.5 w-2.5 rounded-full border border-neutral-800"
                  title={col.name}
                ></span>
              ))}
              {product.colors.length > 3 && (
                <span className="font-mono text-[8px] text-neutral-500 font-bold">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>

            {/* Sizes badge preview */}
            <div className="flex items-center gap-1 font-mono text-[9px] text-neutral-400">
              {product.sizes.slice(0, 3).map((sz, index) => (
                <span key={index} className="bg-neutral-900 px-1.5 py-0.5 border border-neutral-800 rounded">
                  {sz}
                </span>
              ))}
              {product.sizes.length > 3 && <span>...</span>}
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="font-mono text-sm font-black text-white italic">
              {formattedPrice}
            </span>
            <span className="font-mono text-[9px] text-neutral-450 font-bold uppercase tracking-wider">
              ou Pix
            </span>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
