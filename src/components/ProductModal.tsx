import React, { useState } from 'react';
import { Product, ColorOption } from '../types';
import { X, Check, ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ColorOption, quantity: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);

  const discountPrice = product.price * 0.95; // 5% discount for pix

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const formattedDiscountPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(discountPrice);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedSuccessfully(true);
    setTimeout(() => {
      setIsAddedSuccessfully(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      {/* Container Card */}
      <div
        id={`product-modal-${product.id}`}
        className="relative w-full max-w-4xl border border-neutral-800 bg-[#080808] text-white overflow-hidden p-0 sm:grid sm:grid-cols-2 lg:rounded-2xl shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-750 transition rounded-full"
        >
          <X size={16} />
        </button>

        {/* Left Side: Photo carousel */}
        <div className="flex flex-col bg-neutral-950 p-6 gap-4 border-b border-neutral-900 sm:border-b-0 sm:border-r border-neutral-800 justify-center">
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-neutral-900 rounded-xl">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-300"
            />
          </div>
          {/* Alternatives select line */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-16 w-12 border rounded overflow-hidden transition-all ${
                    activeImageIndex === index ? 'border-white scale-105' : 'border-neutral-900 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Options and Custom selectors */}
        <div className="flex flex-col h-full bg-[#111111] p-6 justify-between overflow-y-auto">
          {/* Basic info header */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-extrabold tracking-widest text-black bg-white px-1.5 uppercase leading-none py-1 rounded">
                {product.brand}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase">
                {product.category === 'street'
                  ? 'Streetwear'
                  : product.category === 'casual'
                  ? 'Casual'
                  : product.category === 'social'
                  ? 'Social / Alfaiataria'
                  : 'Acessório'}
              </span>
            </div>

            <h2 className="mt-3 font-mono text-base sm:text-lg font-bold tracking-tight text-white">
              {product.name}
            </h2>

            {/* Price line */}
            <div className="mt-3 flex items-baseline gap-3 border-b border-neutral-800 pb-4">
              <span className="font-mono text-lg font-black text-white italic">{formattedPrice}</span>
              <span className="font-mono text-[10px] text-white font-bold bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                PIX: {formattedDiscountPrice} (-5%)
              </span>
            </div>

            {/* Product description details */}
            <p className="mt-4 text-xs text-neutral-400 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Technical Specifications list */}
            {product.details && product.details.length > 0 && (
              <div className="mt-4 space-y-1.5 border-t border-neutral-800/60 pt-3">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] text-neutral-400">
                    <Check size={11} className="mt-0.5 text-white shrink-0" />
                    <span className="font-mono leading-tight">{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active selections */}
          <div className="mt-6 space-y-4">
            {/* 1. Color picker */}
            <div>
              <span className="block font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                Cor: <span className="text-white text-[11px] font-sans font-bold capitalize">{selectedColor.name}</span>
              </span>
              <div className="mt-2 flex flex-wrap gap-2 animate-fade-in">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`h-7 w-7 rounded-full border transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-white scale-110 ring-2 ring-white/40'
                        : 'border-neutral-800 hover:border-neutral-500'
                    }`}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <span className={`block mx-auto h-1.5 w-1.5 rounded-full ${color.hex === '#ffffff' ? 'bg-black' : 'bg-white'}`}></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Size selector */}
            <div>
              <span className="block font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                Tamanho Selecionado:
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-8 min-w-[36px] px-2 flex items-center justify-center font-mono text-xs transition border rounded cursor-pointer ${
                      selectedSize === size
                        ? 'border-white bg-white text-black font-extrabold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Quantity control and Add actions */}
            <div className="pt-4 border-t border-neutral-850 flex items-center justify-between gap-4">
              {/* Quantity Adjust */}
              <div className="flex items-center border border-neutral-800 bg-black rounded overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-white cursor-pointer text-sm font-bold"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-white cursor-pointer text-sm font-bold"
                >
                  +
                </button>
              </div>

              {/* Add trigger call to action */}
              <button
                id="add-to-bag-modal-btn"
                onClick={handleAddToCart}
                disabled={isAddedSuccessfully}
                className={`flex-1 h-10 flex items-center justify-center gap-2 font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 border rounded-lg cursor-pointer ${
                  isAddedSuccessfully
                    ? 'border-neutral-800 bg-[#111111] text-white font-extrabold'
                    : 'border-white bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {isAddedSuccessfully ? (
                  <>
                    <Check size={14} /> ADICIONADO!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} /> ADICIONAR À SACOLA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
