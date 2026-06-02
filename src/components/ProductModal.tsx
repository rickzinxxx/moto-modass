import React, { useState, useEffect } from 'react';
import { Product, ColorOption } from '../types';
import { X, Check, ShoppingBag } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ColorOption, quantity: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Único');
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : { name: 'Padrão', hex: '#ffffff' });
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);

  // Prevent background body double scrolling on touch devices
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const discountPrice = product.price * 0.95; // 5% discount for pix

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const formattedDiscountPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(discountPrice);

  // Generate deterministic stock quantity (2 to 8 units) based on ID, size and color
  const getStockCount = () => {
    if (!product.inStock) return 0;
    let hash = 0;
    const key = product.id + selectedSize + (selectedColor?.name || 'Padrão');
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const count = (Math.abs(hash) % 7) + 2; // Returns 2 to 8 units
    return count;
  };

  const stockCount = getStockCount();

  const handleColorSelect = (color: ColorOption, idx: number) => {
    setSelectedColor(color);
    if (product.images && product.images.length > 0) {
      setActiveImageIndex(idx % product.images.length);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedSuccessfully(true);
    setTimeout(() => {
      setIsAddedSuccessfully(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-fade-in" onClick={onClose}>
      {/* Container Card */}
      <div
        id={`product-modal-${product.id}`}
        className="relative w-full h-full sm:h-auto max-w-4xl max-h-[100dvh] sm:max-h-[90vh] border-0 sm:border border-neutral-800 bg-[#080808] text-white overflow-y-auto sm:overflow-hidden p-0 flex flex-col sm:grid sm:grid-cols-2 rounded-none sm:rounded-2xl shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex h-8 w-8 items-center justify-center border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700 transition rounded-full cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Left Side: Photo carousel */}
        <div className="flex flex-col bg-neutral-950 p-3 sm:p-6 gap-3 sm:gap-4 border-b border-neutral-900 sm:border-b-0 sm:border-r border-neutral-800 justify-center">
          <div className="relative aspect-[4/5] sm:aspect-[3/4] max-h-[260px] sm:max-h-none w-full overflow-hidden border border-neutral-900 rounded-xl bg-[#0d0d0d]">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-300"
            />
          </div>
          {/* Alternatives select line */}
          {product.images.length > 1 && (
            <div className="flex gap-1.5 justify-center">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-11 w-8 sm:h-16 sm:w-12 border rounded overflow-hidden transition-all cursor-pointer ${
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
        <div className="flex flex-col sm:h-full bg-[#111111] p-4 sm:p-6 justify-between sm:overflow-y-auto space-y-4 sm:space-y-0 text-left">
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

            <h2 className="mt-2.5 font-mono text-sm sm:text-base md:text-lg font-bold tracking-tight text-white uppercase">
              {product.name}
            </h2>

            {/* Price line */}
            <div className="mt-2 flex items-baseline gap-3 border-b border-neutral-800 pb-3">
              <span className="font-mono text-base sm:text-lg font-black text-white italic">{formattedPrice}</span>
              <span className="font-mono text-[9px] text-white font-bold bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                PIX: {formattedDiscountPrice} (-5%)
              </span>
            </div>

            {/* High fidelity Live stock indicator banner */}
            <div className="mt-3">
              {product.inStock && stockCount > 0 ? (
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-emerald-950/40 border border-emerald-900/50 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                    {stockCount} unidades em estoque ({selectedSize})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-red-950/40 border border-red-900/50 w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  <span className="font-mono text-[9px] text-red-400 font-bold uppercase tracking-wider">
                    Esgotado nesta variação
                  </span>
                </div>
              )}
            </div>

            {/* Product description details */}
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed font-sans">
              {product.longDescription || product.description}
            </p>

            {/* Technical Specifications list */}
            {product.details && product.details.length > 0 && (
              <div className="mt-3.5 space-y-1 border-t border-neutral-800/60 pt-2.5 max-h-[100px] overflow-y-auto scrollbar-none">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[9px] sm:text-[10px] text-neutral-400">
                    <Check size={10} className="mt-0.5 text-white shrink-0" />
                    <span className="font-mono leading-normal">{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active selections */}
          <div className="mt-3 space-y-4">
            {/* 1. Color picker */}
            <div>
              <span className="block font-mono text-[9px] font-bold tracking-widest text-neutral-500 uppercase">
                Selecione a Cor: <span className="text-white text-[10px] font-sans font-bold capitalize ml-1">{selectedColor?.name || 'Padrão'}</span>
              </span>
              <div className="mt-1.5 flex flex-wrap gap-2 animate-fade-in">
                {product.colors?.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorSelect(color, idx)}
                    style={{ backgroundColor: color.hex }}
                    className={`h-7 w-7 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                      selectedColor?.name === color.name
                        ? 'border-white scale-110 ring-2 ring-white/40'
                        : 'border-neutral-800 hover:border-neutral-500'
                    }`}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <span className={`block h-1.5 w-1.5 rounded-full ${color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#fafafa' ? 'bg-black' : 'bg-white'}`}></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Size selector */}
            <div>
              <span className="block font-mono text-[9px] font-bold tracking-widest text-neutral-500 uppercase">
                Tamanho Selecionado: <span className="text-white text-[10px] font-mono font-bold ml-1">{selectedSize}</span>
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-7 min-w-[34px] px-2 flex items-center justify-center font-mono text-[10px] transition border rounded cursor-pointer ${
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
            <div className="pt-3 border-t border-neutral-850 flex items-center justify-between gap-3">
              {/* Quantity Adjust */}
              <div className="flex items-center border border-neutral-850 bg-black rounded overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-white cursor-pointer text-xs font-bold"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-6 text-center font-mono text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-white cursor-pointer text-xs font-bold"
                >
                  +
                </button>
              </div>

              {/* Add trigger call to action */}
              <button
                id="add-to-bag-modal-btn"
                onClick={handleAddToCart}
                disabled={isAddedSuccessfully}
                className={`flex-1 h-8.5 flex items-center justify-center gap-1.5 font-mono text-[10px] font-black tracking-widest uppercase transition-all duration-300 border rounded cursor-pointer ${
                  isAddedSuccessfully
                    ? 'border-neutral-800 bg-[#111111] text-white font-bold'
                    : 'border-white bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {isAddedSuccessfully ? (
                  <>
                    <Check size={12} /> ADICIONADO!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={12} /> ADICIONAR À SACOLA
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
