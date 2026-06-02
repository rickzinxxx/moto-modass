import React, { useState, useEffect } from 'react';
import { Product, ColorOption } from '../types';
import { PRODUCTS } from '../data';
import { Check, Plus, ShoppingBag, X, Layers } from 'lucide-react';

interface OutfitBuilderProps {
  onClose: () => void;
  onAddOutfitToCart: (items: { product: Product; size: string; color: ColorOption }[]) => void;
}

export default function OutfitBuilder({ onClose, onAddOutfitToCart }: OutfitBuilderProps) {
  // Categorize our curated stock
  const tops = PRODUCTS.filter((p) =>
    ['Moletom', 'Camiseta', 'Camisa', 'Jaqueta', 'Blazer', 'Polo'].some((keyword) =>
      p.name.includes(keyword)
    )
  );

  const bottoms = PRODUCTS.filter((p) =>
    ['Calça', 'Bermuda'].some((keyword) => p.name.includes(keyword))
  );

  const accessories = PRODUCTS.filter((p) => p.category === 'acessorios');

  // Selected states
  const [selectedTop, setSelectedTop] = useState<Product | null>(tops[0] || null);
  const [selectedBottom, setSelectedBottom] = useState<Product | null>(bottoms[0] || null);
  const [selectedAccessory, setSelectedAccessory] = useState<Product | null>(accessories[0] || null);

  // Attributes states for each selected item
  const [topSize, setTopSize] = useState<string>('');
  const [topColor, setTopColor] = useState<ColorOption | null>(null);

  const [bottomSize, setBottomSize] = useState<string>('');
  const [bottomColor, setBottomColor] = useState<ColorOption | null>(null);

  const [accessorySize, setAccessorySize] = useState<string>('');
  const [accessoryColor, setAccessoryColor] = useState<ColorOption | null>(null);

  // Active view tabs to switch list items
  const [activeTab, setActiveTab] = useState<'tops' | 'bottoms' | 'accessories'>('tops');
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);

  // Initialize properties on product selection change
  useEffect(() => {
    if (selectedTop) {
      setTopSize(selectedTop.sizes[0]);
      setTopColor(selectedTop.colors[0]);
    }
  }, [selectedTop]);

  useEffect(() => {
    if (selectedBottom) {
      setBottomSize(selectedBottom.sizes[0]);
      setBottomColor(selectedBottom.colors[0]);
    }
  }, [selectedBottom]);

  useEffect(() => {
    if (selectedAccessory) {
      setAccessorySize(selectedAccessory.sizes[0]);
      setAccessoryColor(selectedAccessory.colors[0]);
    }
  }, [selectedAccessory]);

  // Compute total lookup
  const lookTotal =
    (selectedTop?.price || 0) +
    (selectedBottom?.price || 0) +
    (selectedAccessory?.price || 0);

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(lookTotal);

  const handleAddLookToCart = () => {
    const list: { product: Product; size: string; color: ColorOption }[] = [];
    if (selectedTop && topSize && topColor) {
      list.push({ product: selectedTop, size: topSize, color: topColor });
    }
    if (selectedBottom && bottomSize && bottomColor) {
      list.push({ product: selectedBottom, size: bottomSize, color: bottomColor });
    }
    if (selectedAccessory && accessorySize && accessoryColor) {
      list.push({ product: selectedAccessory, size: accessorySize, color: accessoryColor });
    }

    if (list.length > 0) {
      onAddOutfitToCart(list);
      setIsAddedSuccessfully(true);
      setTimeout(() => {
        setIsAddedSuccessfully(false);
        onClose();
      }, 1200);
    }
  };
  return (
    <div className="border border-neutral-800 bg-[#111111] p-6 mb-8 relative rounded-2xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-neutral-500 hover:text-white transition rounded-full hover:bg-neutral-900 p-1"
        title="Fechar provador"
      >
        <X size={16} />
      </button>

      <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 mb-6">
        <Layers className="text-orange-500" size={18} />
        <div>
          <h2 className="font-mono text-sm font-black tracking-widest text-white uppercase">
            PROVADOR VIRTUAL // COMBO LOOK JM
          </h2>
          <p className="font-mono text-[9px] text-neutral-550 uppercase mt-0.5">
            Monte seu estilo completo e adicione tudo na sacola com um clique
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SVG/Product Placement Stack Preview (3cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-black border border-neutral-800 rounded-xl h-[420px] relative overflow-hidden">
          {/* Subtle design grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          <div className="relative z-10 w-full flex flex-col items-center justify-between h-full py-4 text-center">
            {/* Top preview */}
            <div className="relative flex-1 flex flex-col items-center justify-center min-h-[110px] w-full">
              {selectedTop ? (
                <div className="flex flex-col items-center animate-fade-in">
                  <div className="h-20 w-16 border border-neutral-800 overflow-hidden bg-[#111111] shadow-lg rounded-md">
                    <img
                      src={selectedTop.images[0]}
                      alt={selectedTop.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-neutral-300 mt-2 truncate max-w-[150px]">
                    {selectedTop.name}
                  </span>
                  <span className="font-mono text-[8px] text-orange-500 font-bold">
                    {topSize} / {topColor?.name.split(' ')[0]}
                  </span>
                </div>
              ) : (
                <div className="h-16 w-12 border border-dashed border-neutral-800 flex items-center justify-center text-[9px] font-mono text-neutral-600 rounded">
                  TOP
                </div>
              )}
            </div>

            {/* Link line divider */}
            <div className="h-4 w-[1px] bg-neutral-800 border-dashed border-r border-neutral-700"></div>

            {/* Bottom preview */}
            <div className="relative flex-1 flex flex-col items-center justify-center min-h-[110px] w-full">
              {selectedBottom ? (
                <div className="flex flex-col items-center animate-fade-in">
                  <div className="h-20 w-16 border border-neutral-800 overflow-hidden bg-[#111111] shadow-lg rounded-md">
                    <img
                      src={selectedBottom.images[0]}
                      alt={selectedBottom.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-neutral-300 mt-2 truncate max-w-[150px]">
                    {selectedBottom.name}
                  </span>
                  <span className="font-mono text-[8px] text-orange-500 font-bold">
                    {bottomSize} / {bottomColor?.name.split(' ')[0]}
                  </span>
                </div>
              ) : (
                <div className="h-16 w-12 border border-dashed border-neutral-800 flex items-center justify-center text-[9px] font-mono text-neutral-600 rounded">
                  BOTTOM
                </div>
              )}
            </div>

            {/* Link line divider */}
            <div className="h-4 w-[1px] bg-neutral-800 border-dashed border-r border-neutral-700"></div>

            {/* Accessory preview */}
            <div className="relative flex-1 flex flex-col items-center justify-center min-h-[90px] w-full">
              {selectedAccessory ? (
                <div className="flex flex-col items-center animate-fade-in">
                  <div className="h-14 w-14 border border-neutral-800 overflow-hidden bg-[#111111] shadow-lg rounded-md">
                    <img
                      src={selectedAccessory.images[0]}
                      alt={selectedAccessory.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-neutral-300 mt-1 truncate max-w-[150px]">
                    {selectedAccessory.name}
                  </span>
                  <span className="font-mono text-[8px] text-orange-500 font-bold">
                    {accessorySize} / {accessoryColor?.name.split(' ')[0]}
                  </span>
                </div>
              ) : (
                <div className="h-12 w-12 border border-dashed border-neutral-800 flex items-center justify-center text-[9px] font-mono text-neutral-600 rounded">
                  ACCESSORY
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Workbench Control list selector (5cols) */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between border-r border-neutral-800/20 pr-0 xl:pr-6">
          <div>
            <div className="flex border-b border-neutral-800 font-mono text-[10px] tracking-wider mb-4 gap-1">
              <button
                onClick={() => setActiveTab('tops')}
                className={`flex-1 py-2 font-bold cursor-pointer transition ${
                  activeTab === 'tops'
                    ? 'border-b-2 border-orange-500 text-orange-500 bg-[#0a0a0a]/60'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                1. PEÇA SUPERIOR
              </button>
              <button
                onClick={() => setActiveTab('bottoms')}
                className={`flex-1 py-2 font-bold cursor-pointer transition ${
                  activeTab === 'bottoms'
                    ? 'border-b-2 border-orange-500 text-orange-500 bg-[#0a0a0a]/60'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                2. PEÇA INFERIOR
              </button>
              <button
                onClick={() => setActiveTab('accessories')}
                className={`flex-1 py-2 font-bold cursor-pointer transition ${
                  activeTab === 'accessories'
                    ? 'border-b-2 border-orange-500 text-orange-500 bg-[#0a0a0a]/60'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                3. ACESSÓRIO
              </button>
            </div>

            {/* List to choose */}
            <div className="space-y-2 max-h-[290px] overflow-y-auto pr-2">
              {activeTab === 'tops' &&
                tops.map((top) => (
                  <div
                    key={top.id}
                    onClick={() => setSelectedTop(top)}
                    className={`flex items-center gap-3 p-2.5 border rounded-xl cursor-pointer transition ${
                      selectedTop?.id === top.id
                        ? 'border-orange-500 bg-[#0a0a0a]'
                        : 'border-neutral-800/80 bg-[#111111]/30 hover:border-neutral-700'
                    }`}
                  >
                    <img
                      src={top.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-12 w-9 object-cover border border-neutral-800 bg-[#111111] rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block font-mono text-[8px] text-orange-500 font-bold uppercase leading-none">
                        {top.brand}
                      </span>
                      <h4 className="font-mono text-[10px] font-bold text-white truncate mt-1">
                        {top.name}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400 mt-0.5">
                        R$ {top.price.toFixed(2)}
                      </p>
                    </div>
                    {selectedTop?.id === top.id && (
                      <Check size={12} className="text-orange-500" />
                    )}
                  </div>
                ))}

              {activeTab === 'bottoms' &&
                bottoms.map((bot) => (
                  <div
                    key={bot.id}
                    onClick={() => setSelectedBottom(bot)}
                    className={`flex items-center gap-3 p-2.5 border rounded-xl cursor-pointer transition ${
                      selectedBottom?.id === bot.id
                        ? 'border-orange-500 bg-[#0a0a0a]'
                        : 'border-neutral-800/80 bg-[#111111]/30 hover:border-neutral-700'
                    }`}
                  >
                    <img
                      src={bot.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-12 w-9 object-cover border border-neutral-800 bg-[#111111] rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block font-mono text-[8px] text-orange-500 font-bold uppercase leading-none">
                        {bot.brand}
                      </span>
                      <h4 className="font-mono text-[10px] font-bold text-white truncate mt-1">
                        {bot.name}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400 mt-0.5">
                        R$ {bot.price.toFixed(2)}
                      </p>
                    </div>
                    {selectedBottom?.id === bot.id && (
                      <Check size={12} className="text-orange-500" />
                    )}
                  </div>
                ))}

              {activeTab === 'accessories' &&
                accessories.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAccessory(acc)}
                    className={`flex items-center gap-3 p-2.5 border rounded-xl cursor-pointer transition ${
                      selectedAccessory?.id === acc.id
                        ? 'border-orange-500 bg-[#0a0a0a]'
                        : 'border-neutral-800/80 bg-[#111111]/30 hover:border-neutral-700'
                    }`}
                  >
                    <img
                      src={acc.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 object-cover border border-neutral-800 bg-[#111111] rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block font-mono text-[8px] text-orange-500 font-bold uppercase leading-none">
                        {acc.brand}
                      </span>
                      <h4 className="font-mono text-[10px] font-bold text-white truncate mt-1">
                        {acc.name}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400 mt-0.5">
                        R$ {acc.price.toFixed(2)}
                      </p>
                    </div>
                    {selectedAccessory?.id === acc.id && (
                      <Check size={12} className="text-orange-500" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Quick Attribute settings & Checker (4cols) */}
        <div className="lg:col-span-12 xl:col-span-3 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-bold text-neutral-400 tracking-widest border-b border-neutral-800 pb-2">
              AJUSTE DE TAMANHOS / CORES
            </h3>

            {/* Top configuration */}
            {selectedTop && (
              <div className="space-y-1 bg-black p-2 border border-neutral-800 rounded-lg">
                <span className="block font-mono text-[9px] text-black bg-orange-500 px-1 w-max font-extrabold rounded">
                  TOP: {selectedTop.brand}
                </span>
                <div className="flex gap-2 items-center justify-between mt-1">
                  {/* size list */}
                  <select
                    className="flex-1 h-7 border border-neutral-800 bg-neutral-950 rounded-md text-[10px] font-mono text-white px-1 outline-none focus:border-orange-500"
                    value={topSize}
                    onChange={(e) => setTopSize(e.target.value)}
                  >
                    {selectedTop.sizes.map((s) => (
                      <option key={s} value={s}>
                        Tam: {s}
                      </option>
                    ))}
                  </select>

                  {/* color list */}
                  <select
                    className="flex-1 h-7 border border-neutral-800 bg-neutral-950 rounded-md text-[10px] font-mono text-white px-1 outline-none focus:border-orange-500"
                    value={topColor?.name || ''}
                    onChange={(e) => {
                      const colorObj = selectedTop.colors.find((c) => c.name === e.target.value);
                      if (colorObj) setTopColor(colorObj);
                    }}
                  >
                    {selectedTop.colors.map((c) => (
                      <option key={c.name} value={c.name}>
                        Cor: {c.name.split(' ')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Bottom configuration */}
            {selectedBottom && (
              <div className="space-y-1 bg-black p-2 border border-neutral-800 rounded-lg">
                <span className="block font-mono text-[9px] text-black bg-orange-500 px-1 w-max font-extrabold rounded">
                  BOTTOM: {selectedBottom.brand}
                </span>
                <div className="flex gap-2 items-center justify-between mt-1">
                  {/* size list */}
                  <select
                    className="flex-1 h-7 border border-neutral-800 bg-neutral-950 rounded-md text-[10px] font-mono text-white px-1 outline-none focus:border-orange-500"
                    value={bottomSize}
                    onChange={(e) => setBottomSize(e.target.value)}
                  >
                    {selectedBottom.sizes.map((s) => (
                      <option key={s} value={s}>
                        Tam: {s}
                      </option>
                    ))}
                  </select>

                  {/* color list */}
                  <select
                    className="flex-1 h-7 border border-neutral-800 bg-neutral-950 rounded-md text-[10px] font-mono text-white px-1 outline-none focus:border-orange-500"
                    value={bottomColor?.name || ''}
                    onChange={(e) => {
                      const colorObj = selectedBottom.colors.find((c) => c.name === e.target.value);
                      if (colorObj) setBottomColor(colorObj);
                    }}
                  >
                    {selectedBottom.colors.map((c) => (
                      <option key={c.name} value={c.name}>
                        Cor: {c.name.split(' ')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Accessory configuration */}
            {selectedAccessory && (
              <div className="space-y-1 bg-black p-2 border border-neutral-800 rounded-lg">
                <span className="block font-mono text-[9px] text-black bg-orange-500 px-1 w-max font-extrabold rounded">
                  ACC: {selectedAccessory.brand}
                </span>
                <div className="flex gap-2 items-center justify-between mt-1">
                  {/* size list */}
                  <select
                    className="flex-1 h-7 border border-neutral-800 bg-neutral-950 rounded-md text-[10px] font-mono text-white px-1 outline-none focus:border-orange-500"
                    value={accessorySize}
                    onChange={(e) => setAccessorySize(e.target.value)}
                  >
                    {selectedAccessory.sizes.map((s) => (
                      <option key={s} value={s}>
                        Tam: {s}
                      </option>
                    ))}
                  </select>

                  {/* color list */}
                  <select
                    className="flex-1 h-7 border border-neutral-800 bg-neutral-950 rounded-md text-[10px] font-mono text-white px-1 outline-none focus:border-orange-500"
                    value={accessoryColor?.name || ''}
                    onChange={(e) => {
                      const colorObj = selectedAccessory.colors.find((c) => c.name === e.target.value);
                      if (colorObj) setAccessoryColor(colorObj);
                    }}
                  >
                    {selectedAccessory.colors.map((c) => (
                      <option key={c.name} value={c.name}>
                        Cor: {c.name.split(' ')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Action Total Checker */}
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <div className="flex justify-between items-baseline mb-3">
              <span className="font-mono text-[10px] text-neutral-400 font-bold">TOTAL DO LOOK:</span>
              <span className="font-mono text-base font-black text-orange-500 italic">{formattedTotal}</span>
            </div>

            <button
              id="add-combo-look-btn"
              onClick={handleAddLookToCart}
              disabled={isAddedSuccessfully}
              className={`w-full h-10 flex items-center justify-center gap-2 font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 border rounded-xl cursor-pointer ${
                isAddedSuccessfully
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-orange-500 bg-orange-500 text-black hover:bg-orange-600'
              }`}
            >
              {isAddedSuccessfully ? (
                <>
                  <Check size={14} /> LOOK ADICIONADO!
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> ADICIONAR SELEÇÃO
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
