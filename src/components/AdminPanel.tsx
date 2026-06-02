import React, { useState } from 'react';
import { Product, ColorOption, CategoryType } from '../types';
import { 
  X, Plus, Trash2, Edit3, Save, Lock, Unlock, 
  Settings, RefreshCw, Check, AlertCircle, Eye, EyeOff, Search,
  Upload, Image as ImageIcon
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
}

export default function AdminPanel({ isOpen, onClose, products, onUpdateProducts }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Search in admin view
  const [adminSearch, setAdminSearch] = useState('');
  
  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form Fields State
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState<Exclude<CategoryType, 'tudo'>>('street');
  const [formDescription, setFormDescription] = useState('');
  const [formLongDescription, setFormLongDescription] = useState('');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formImages, setFormImages] = useState<string[]>([]);
  const [imageInputUrl, setImageInputUrl] = useState('');
  const [formSizes, setFormSizes] = useState<string[]>([]);
  const [sizeInput, setSizeInput] = useState('');
  const [formColors, setFormColors] = useState<ColorOption[]>([]);
  const [colorNameInput, setColorNameInput] = useState('');
  const [colorHexInput, setColorHexInput] = useState('#ffffff');
  const [formInStock, setFormInStock] = useState(true);
  const [formIsNew, setFormIsNew] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formDetails, setFormDetails] = useState<string[]>([]);
  const [detailInput, setDetailInput] = useState('');

  // High-fidelity reactive image uploader state and handlers
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setFormImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handlePasteImage = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              setFormImages((prev) => [...prev, reader.result as string]);
            }
          };
          reader.readAsDataURL(file);
          e.preventDefault(); // Stop paste content into textual input if pasted inside
        }
      }
    }
  };

  if (!isOpen) return null;

  // Handles standard admin secret login (Accepts "mota2026", "jm2026", "admin123" or empty for developers)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();
    if (cleanPass === 'mota2026' || cleanPass === 'jm2026' || cleanPass === 'admin123' || cleanPass === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Senha incorreta. Tente "jm2026" ou "mota2026"');
    }
  };

  // Open Edit Mode
  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreatingNew(false);

    setFormId(prod.id);
    setFormName(prod.name);
    setFormBrand(prod.brand);
    setFormCategory(prod.category);
    setFormDescription(prod.description);
    setFormLongDescription(prod.longDescription || '');
    setFormPrice(prod.price);
    setFormImages(prod.images);
    setFormSizes(prod.sizes);
    setFormColors(prod.colors);
    setFormInStock(prod.inStock);
    setFormIsNew(prod.isNew || false);
    setFormIsFeatured(prod.isFeatured || false);
    setFormDetails(prod.details || []);

    // Clear inputs
    setImageInputUrl('');
    setSizeInput('');
    setColorNameInput('');
    setDetailInput('');
  };

  // Open Create Mode
  const startCreateProduct = () => {
    setIsCreatingNew(true);
    setEditingProduct(null);

    setFormId(`jm-${Date.now()}`);
    setFormName('');
    setFormBrand('');
    setFormCategory('street');
    setFormDescription('');
    setFormLongDescription('');
    setFormPrice(0);
    setFormImages(['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop']);
    setFormSizes(['P', 'M', 'G', 'GG']);
    setFormColors([
      { name: 'Preto', hex: '#111111' },
      { name: 'Branco Sólido', hex: '#ffffff' }
    ]);
    setFormInStock(true);
    setFormIsNew(true);
    setFormIsFeatured(false);
    setFormDetails([
      'Material premium de alta durabilidade',
      'Costuras reforçadas e toque macio',
      'Modelagem exclusiva com acabamento luxuoso'
    ]);

    // Clear inputs
    setImageInputUrl('');
    setSizeInput('');
    setColorNameInput('');
    setDetailInput('');
  };

  // List Handlers
  const handleAddImage = () => {
    if (imageInputUrl.trim() !== '') {
      setFormImages([...formImages, imageInputUrl.trim()]);
      setImageInputUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  const handleAddSize = () => {
    if (sizeInput.trim() !== '' && !formSizes.includes(sizeInput.trim().toUpperCase())) {
      setFormSizes([...formSizes, sizeInput.trim().toUpperCase()]);
      setSizeInput('');
    }
  };

  const handleRemoveSize = (sz: string) => {
    setFormSizes(formSizes.filter(s => s !== sz));
  };

  const handleAddColor = () => {
    if (colorNameInput.trim() !== '') {
      const newColor: ColorOption = {
        name: colorNameInput.trim(),
        hex: colorHexInput
      };
      setFormColors([...formColors, newColor]);
      setColorNameInput('');
    }
  };

  const handleRemoveColor = (index: number) => {
    setFormColors(formColors.filter((_, i) => i !== index));
  };

  const handleAddDetail = () => {
    if (detailInput.trim() !== '') {
      setFormDetails([...formDetails, detailInput.trim()]);
      setDetailInput('');
    }
  };

  const handleRemoveDetail = (index: number) => {
    setFormDetails(formDetails.filter((_, i) => i !== index));
  };

  // Submit Product Changes
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim() || !formBrand.trim() || formPrice <= 0) {
      alert('Nome, marca e preço devem ser válidos!');
      return;
    }

    const updatedProduct: Product = {
      id: formId,
      name: formName.trim(),
      brand: formBrand.trim(),
      description: formDescription.trim(),
      longDescription: formLongDescription.trim() || undefined,
      price: formPrice,
      category: formCategory,
      images: formImages.length > 0 ? formImages : ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop'],
      sizes: formSizes.length > 0 ? formSizes : ['U'],
      colors: formColors.length > 0 ? formColors : [{ name: 'Padrão', hex: '#ffffff' }],
      inStock: formInStock,
      isNew: formIsNew,
      isFeatured: formIsFeatured,
      details: formDetails.length > 0 ? formDetails : undefined
    };

    if (isCreatingNew) {
      onUpdateProducts([updatedProduct, ...products]);
    } else {
      onUpdateProducts(products.map(p => p.id === formId ? updatedProduct : p));
    }

    // Reset view
    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Tem certeza que deseja DELETAR esta peça do catálogo? Essa ação é definitiva.')) {
      onUpdateProducts(products.filter(p => p.id !== productId));
      if (editingProduct?.id === productId) {
        setEditingProduct(null);
      }
    }
  };

  // Reset to default list from data.ts
  const handleResetCatalog = () => {
    if (window.confirm('Tem certeza que deseja redefinir TODAS as modificações e voltar aos produtos originais da loja?')) {
      localStorage.removeItem('jm_mota_modas_products');
      window.location.reload();
    }
  };

  const filteredAdminProducts = products.filter(p => 
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-mono overflow-y-auto">
      <div 
        id="admin-panel-container"
        className="relative w-full max-w-5xl bg-[#0e0e0e] border border-neutral-850 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-8"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header Rail */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-neutral-950">
          <div className="flex items-center gap-3">
            <Settings className="text-white animate-spin-slow" size={18} />
            <h2 className="text-xs font-black tracking-widest text-white uppercase">
              RESTRITO // CONFIGURAÇÃO DA LOJA
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition rounded-lg border border-transparent hover:border-neutral-900"
          >
            <X size={16} />
          </button>
        </div>

        {/* Auth Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto space-y-6">
            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-full text-neutral-400">
              <Lock size={32} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-widest uppercase">Acesso Reservado</h3>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase">Digite a senha administrativa da loja para prosseguir</p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="DIGITE A SENHA..."
                  autoFocus
                  className="w-full bg-[#141414] border border-neutral-800 focus:border-white px-4 py-3 text-xs text-center text-white font-bold tracking-widest focus:outline-none rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {errorMsg && (
                <div className="flex items-center justify-center gap-2 text-red-500 text-[10px] uppercase font-bold">
                  <AlertCircle size={12} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-black text-[10px] tracking-widest hover:bg-neutral-200 transition uppercase rounded-xl"
              >
                AUTENTICAR DIRETÓRIO
              </button>
            </form>

            <div className="text-[9px] text-neutral-600 border-t border-neutral-900/60 pt-4 w-full">
              DICA: A SENHA PADRÃO É &quot;<span className="text-neutral-400 font-bold">jm2026</span>&quot; OU &quot;<span className="text-neutral-400 font-bold">mota2026</span>&quot;
            </div>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* LEFT SIDE: Products selection list */}
            <div className="w-full md:w-5/12 border-r border-neutral-900 flex flex-col overflow-y-auto bg-neutral-950/20">
              
              <div className="p-4 border-b border-neutral-900 bg-neutral-950/80 sticky top-0 z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">CATÁLOGO ({products.length})</span>
                  <button 
                    onClick={startCreateProduct}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white text-black font-black text-[9px] tracking-widest hover:bg-neutral-200 transition uppercase rounded-lg"
                  >
                    <Plus size={10} /> NOVO PRODUTO
                  </button>
                </div>

                {/* Local search in admin list */}
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder="BUSCAR NO CATÁLOGO..."
                    className="w-full bg-[#111111] border border-neutral-800 text-[10px] pl-8 pr-3 py-2 text-white focus:outline-none focus:border-neutral-500 rounded-lg"
                  />
                  {adminSearch && (
                    <button 
                      onClick={() => setAdminSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-[10px]"
                    >
                      CLEAR
                    </button>
                  )}
                </div>
              </div>

              {/* Products list scrollable */}
              <div className="divide-y divide-neutral-900 flex-1">
                {filteredAdminProducts.map((p) => {
                  const isSelected = editingProduct?.id === p.id && !isCreatingNew;
                  return (
                    <div 
                      key={p.id}
                      className={`p-3.5 flex items-center justify-between transition cursor-pointer hover:bg-neutral-900/50 ${isSelected ? 'bg-neutral-900 border-l-2 border-white' : ''}`}
                      onClick={() => startEditProduct(p)}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <img 
                          src={p.images[0]} 
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-11 object-cover border border-neutral-800 bg-[#1e1e1e] rounded-md shrink-0" 
                        />
                        <div className="min-w-0">
                          <h4 className="text-[10px] font-bold text-white truncate uppercase">{p.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[8px] text-neutral-400">
                            <span className="font-semibold text-neutral-400 bg-neutral-900 px-1 rounded uppercase tracking-wider">{p.category}</span>
                            <span>R$ {p.price.toFixed(2)}</span>
                          </div>
                          <div className="flex gap-1 mt-1">
                            {p.inStock ? (
                              <span className="text-[7px] text-green-500 font-bold bg-green-950/40 px-1 rounded uppercase">EM ESTOQUE</span>
                            ) : (
                              <span className="text-[7px] text-red-500 font-bold bg-red-950/40 px-1 rounded uppercase">ESGOTADO</span>
                            )}
                            {p.isFeatured && (
                              <span className="text-[7px] text-amber-500 font-bold bg-amber-950/40 px-1 rounded uppercase">DESTAQUE</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(p.id);
                        }}
                        className="p-1 text-neutral-500 hover:text-red-500 transition hover:bg-red-950/20 rounded-md"
                        title="Deletar Do Catálogo"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}

                {filteredAdminProducts.length === 0 && (
                  <div className="text-center p-8 text-neutral-600 text-[10px]">
                    NENHUM ITEM CORRESPONDENTE
                  </div>
                )}
              </div>

              {/* Bottom system action footer */}
              <div className="p-3 border-t border-neutral-900 bg-neutral-950 flex items-center justify-between text-[9px] text-neutral-500">
                <button
                  onClick={handleResetCatalog}
                  className="flex items-center gap-1.5 hover:text-white transition"
                  title="Reseta para os itens padrão de fábrica"
                >
                  <RefreshCw size={10} /> RESETAR FÁBRICA
                </button>
                <span>VERSÃO ESTÁVEL 1.2</span>
              </div>

            </div>

            {/* RIGHT SIDE: Dedicated Product Editor/Creator Form */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0c0c0c] flex flex-col justify-between">
              
              {editingProduct || isCreatingNew ? (
                <form onSubmit={handleSaveProduct} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                    <h3 className="text-[11px] font-black tracking-widest text-white uppercase">
                      {isCreatingNew ? 'CRIAR NEW PRODUTO' : 'EDITANDO PEÇA'}
                    </h3>
                    <div className="text-[9px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded font-mono">
                      ID: {formId}
                    </div>
                  </div>

                  {/* Dual Grid block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-400 font-bold uppercase block">Nome da Peça *</label>
                      <input 
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ex: Camisa de Linho Premium"
                        className="w-full bg-[#111111] border border-neutral-850 px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white rounded-lg"
                      />
                    </div>

                    {/* Product Brand */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-400 font-bold uppercase block">Marca / Fabricante *</label>
                      <input 
                        type="text"
                        required
                        value={formBrand}
                        onChange={(e) => setFormBrand(e.target.value)}
                        placeholder="Ex: Armani Exchange"
                        className="w-full bg-[#111111] border border-neutral-850 px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white rounded-lg"
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-400 font-bold uppercase block">Categoria *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as Exclude<CategoryType, 'tudo'>)}
                        className="w-full bg-[#111111] border border-neutral-850 px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white rounded-lg uppercase"
                      >
                        <option value="street">Streetwear</option>
                        <option value="casual">Casual</option>
                        <option value="social">Social</option>
                        <option value="acessorios">Acessórios</option>
                      </select>
                    </div>

                    {/* Price field */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-neutral-400 font-bold uppercase block">Preço (R$) *</label>
                      <input 
                        type="number"
                        step="0.01"
                        required
                        min="0.01"
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        placeholder="Ex: 199.90"
                        className="w-full bg-[#111111] border border-neutral-850 px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Description (Short teaser) */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-neutral-400 font-bold uppercase block">Teaser descritivo curto</label>
                    <input 
                      type="text"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Ex: Camisa social manga longa com caimento sob medida de linho belga"
                      className="w-full bg-[#111111] border border-neutral-850 px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white rounded-lg"
                    />
                  </div>

                  {/* Long descriptive text */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-neutral-400 font-bold uppercase block">Descrição de detalhes completos</label>
                    <textarea 
                      rows={3}
                      value={formLongDescription}
                      onChange={(e) => setFormLongDescription(e.target.value)}
                      placeholder="Desenvolva o parágrafo longo detalhado que explica o caimento, as origens do tecido nobre, as razões pelas quais esse produto é diferenciado de outros..."
                      className="w-full bg-[#111111] border border-neutral-850 px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white rounded-lg resize-none"
                    />
                  </div>

                  {/* Images list manager */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block">
                        Galeria de Imagens *
                      </label>
                      <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-bold">
                        DICA: COLE PRINTS DIRETAMENTE (CTRL+V)
                      </span>
                    </div>

                    {/* Integrated Upload Area & URL Input */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onPaste={handlePasteImage}
                      className={`relative overflow-hidden border rounded-xl transition-all duration-300 ${
                        isDragActive 
                          ? 'border-white bg-[#151515] ring-2 ring-white/10 scale-[1.005]' 
                          : 'border-neutral-850 bg-[#0d0d0d] hover:border-neutral-700'
                      }`}
                    >
                      <div className="p-6 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group"
                           onClick={() => document.getElementById('file-upload-input')?.click()}
                      >
                        <input 
                          id="file-upload-input"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                        
                        <div className={`p-3.5 bg-neutral-950 border border-neutral-900 rounded-full text-neutral-400 transition-transform duration-300 ${isDragActive ? 'scale-110 text-white animate-bounce' : 'group-hover:scale-110 group-hover:text-white'}`}>
                          <Upload size={18} />
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-white font-bold tracking-widest uppercase">
                            ARRASTE E SOLTE FOTOS OU COLE PRINT INSTANTÂNEO
                          </p>
                          <p className="text-[8px] text-neutral-500 uppercase tracking-widest">
                            Clique aqui para selecionar mídias do seu aparelho
                          </p>
                        </div>
                      </div>

                      {/* URL input inside the container card */}
                      <div className="px-4 pb-4 pt-4 border-t border-neutral-900 bg-neutral-950/40">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-neutral-500 font-extrabold tracking-widest uppercase">
                              URL:
                            </span>
                            <input 
                              type="url"
                              value={imageInputUrl}
                              onChange={(e) => setImageInputUrl(e.target.value)}
                              placeholder="Ou cole uma URL externa se preferir (Unsplash, Pinterest, etc.)..."
                              className="w-full bg-[#111111] border border-neutral-850 focus:border-neutral-700 pl-11 pr-3 py-2 text-[10px] text-white focus:outline-none rounded-lg"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddImage();
                            }}
                            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-white font-bold text-[9px] uppercase tracking-wider rounded-lg border border-neutral-700 transition active:scale-95 shrink-0"
                          >
                            ADICIONAR
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Preview Images List Grid */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">Mídia do Catálogo ({formImages.length})</span>
                        {formImages.length > 1 && (
                          <span className="text-[8px] text-neutral-500 uppercase font-black">★ CLIQUE PARA DEFINIR COMO FOTO CAPA</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {formImages.map((img, i) => {
                          const isBase64 = img.startsWith('data:');
                          const isCover = i === 0;
                          return (
                            <div 
                              key={i} 
                              className={`relative group bg-[#090909] border rounded-xl overflow-hidden shadow-inner flex flex-col transition duration-300 ${
                                isCover ? 'border-neutral-400 shadow-white/5 ring-1 ring-white/10' : 'border-neutral-900 hover:border-neutral-800'
                              }`}
                            >
                              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                                <img 
                                  src={img} 
                                  alt={`Preview ${i}`} 
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                                />

                                {/* Badge format */}
                                <span className="absolute bottom-2 left-2 text-[8px] font-bold tracking-wider bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded uppercase text-neutral-400 border border-neutral-900">
                                  {isBase64 ? 'ARQUIVO' : 'URL LINK'}
                                </span>

                                {/* Set as cover trigger button overlay */}
                                {!isCover && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // Reorder first index
                                      const reordered = [...formImages];
                                      const clickedItem = reordered.splice(i, 1)[0];
                                      setFormImages([clickedItem, ...reordered]);
                                    }}
                                    className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-[8px] text-white font-black tracking-widest uppercase p-2 text-center"
                                  >
                                    Clica para definir como imagem Capa
                                  </button>
                                )}

                                {/* Cover indicator badge */}
                                {isCover && (
                                  <div className="absolute top-2 left-2 bg-white text-black text-[8px] font-bold px-1.5 py-0.5 rounded tracking-widest shadow-lg flex items-center gap-1.5 font-bold uppercase">
                                    <span className="w-1 h-1 rounded-full bg-green-500 animate-ping"></span>
                                    FOTO CAPA
                                  </div>
                                )}

                                {/* Remove triggers inside overlay hover state */}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(i)}
                                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg opacity-90 hover:opacity-100 shadow transition-all duration-200 hover:scale-105 border border-red-500 z-10"
                                  title="Remover imagem"
                                >
                                  <Trash2 size={10} />
                                </button>
                              </div>

                              {/* Index tag bar */}
                              <div className="p-2 border-t border-neutral-900 bg-neutral-950 flex items-center justify-between text-[8px]">
                                <span className="text-neutral-500 font-bold uppercase tracking-wider">Item #{i + 1}</span>
                                {isCover ? (
                                  <span className="text-white font-bold uppercase tracking-widest">Capa</span>
                                ) : (
                                  <span className="text-neutral-600 uppercase">Anexo</span>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {formImages.length === 0 && (
                          <div className="col-span-full border border-dashed border-neutral-850 rounded-xl p-8 text-center bg-neutral-950/20">
                            <ImageIcon className="mx-auto text-neutral-600 mb-2" size={20} />
                            <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-bold">
                              Nenhuma mídia adicionada.
                            </span>
                            <span className="text-[8px] text-neutral-600 mt-1 block uppercase">
                              Cole fotos ou prints acima para cadastrar a roupa.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sizes and colors section in columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Sizes selection list */}
                    <div className="space-y-2">
                      <label className="text-[9px] text-neutral-400 font-bold uppercase block">Tamanhos Disponíveis</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={sizeInput}
                          onChange={(e) => setSizeInput(e.target.value)}
                          placeholder="M, GG, 42..."
                          className="flex-1 bg-[#111111] border border-neutral-855 px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-white rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleAddSize}
                          className="px-2.5 py-1 text-neutral-800 bg-white font-black hover:bg-neutral-200 text-[9px] uppercase rounded-md"
                        >
                          +
                        </button>
                      </div>

                      {/* Pill display sizes available */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {formSizes.map((sz) => (
                          <span 
                            key={sz}
                            className="inline-flex items-center gap-1 bg-[#161616] border border-neutral-850 text-neutral-300 px-2 py-0.5 rounded text-[9px]"
                          >
                            <span>{sz}</span>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSize(sz)}
                              className="text-neutral-500 hover:text-white font-bold ml-1"
                            >
                              x
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Colors selection list */}
                    <div className="space-y-2">
                      <label className="text-[9px] text-neutral-400 font-bold uppercase block">Opções de Cores</label>
                      <div className="flex gap-1.5 items-center">
                        <input
                          type="text"
                          value={colorNameInput}
                          onChange={(e) => setColorNameInput(e.target.value)}
                          placeholder="Nome (Ex: Oliva)"
                          className="flex-1 bg-[#111111] border border-neutral-855 px-2 py-1.5 text-[10px] text-white focus:outline-none focus:border-white rounded-lg"
                        />
                        <input 
                          type="color"
                          value={colorHexInput}
                          onChange={(e) => setColorHexInput(e.target.value)}
                          className="w-7 h-7 bg-transparent border-0 cursor-pointer p-0 shrink-0"
                        />
                        <button
                          type="button"
                          onClick={handleAddColor}
                          className="px-2 py-1 text-neutral-800 bg-white font-black hover:bg-neutral-200 text-[9px] uppercase rounded-md"
                        >
                          +
                        </button>
                      </div>

                      {/* Display Color options list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {formColors.map((col, idx) => (
                          <span 
                            key={idx}
                            style={{ borderLeftColor: col.hex }}
                            className="inline-flex items-center gap-1 bg-[#161616] border border-neutral-850 border-l-4 text-neutral-300 px-2 py-0.5 rounded text-[9px]"
                          >
                            <span>{col.name}</span>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveColor(idx)}
                              className="text-neutral-500 hover:text-white font-bold ml-1/2"
                            >
                              x
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Bullet points specifics details list */}
                  <div className="space-y-2">
                    <label className="text-[9px] text-neutral-400 font-bold uppercase block font-serif">Especificações técnicas estruturais (Garantia, fio, etc.)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={detailInput}
                        onChange={(e) => setDetailInput(e.target.value)}
                        placeholder="Ex: Fio: 30.1 penteado fiação fina de alta torção"
                        className="flex-1 bg-[#111111] border border-neutral-850 px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleAddDetail}
                        className="px-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[9px] uppercase rounded-lg border border-neutral-700"
                      >
                        + FILET
                      </button>
                    </div>

                    <ul className="text-[9.5px] uppercase text-neutral-500 font-mono space-y-1 border border-neutral-900 rounded p-3 list-inside list-disc">
                      {formDetails.map((det, index) => (
                        <li key={index} className="flex justify-between items-center group">
                          <span>- {det}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDetail(index)}
                            className="text-red-500 hover:text-red-400 font-bold ml-2 text-[9px]"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                      {formDetails.length === 0 && (
                        <span className="text-[9px] text-neutral-600 block">Nenhuma especificação cadastrada.</span>
                      )}
                    </ul>
                  </div>

                  {/* Boolean Switch boxes */}
                  <div className="flex flex-wrap gap-4 pt-2 border-t border-neutral-900">
                    {/* inStock */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={formInStock}
                        onChange={(e) => setFormInStock(e.target.checked)}
                        className="w-4 h-4 rounded accent-white text-black border-neutral-800 bg-[#111111] focus:ring-0" 
                      />
                      <span className="text-[10px] text-white font-bold uppercase">Produto em Estoque</span>
                    </label>

                    {/* isFeatured */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={formIsFeatured}
                        onChange={(e) => setFormIsFeatured(e.target.checked)}
                        className="w-4 h-4 rounded accent-white text-black border-neutral-800 bg-[#111111] focus:ring-0" 
                      />
                      <span className="text-[10px] text-amber-500 font-bold uppercase">Destaque Semanal</span>
                    </label>

                    {/* isNew */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={formIsNew}
                        onChange={(e) => setFormIsNew(e.target.checked)}
                        className="w-4 h-4 rounded accent-white text-black border-neutral-800 bg-[#111111] focus:ring-0" 
                      />
                      <span className="text-[10px] text-teal-400 font-bold uppercase">Nova Coleção</span>
                    </label>
                  </div>

                  {/* Submit save button */}
                  <div className="pt-4 flex gap-4 w-full">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-black text-[10px] tracking-widest hover:bg-neutral-200 transition uppercase rounded-xl"
                    >
                      <Save size={13} /> SALVAR ALTERAÇÕES
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setIsCreatingNew(false);
                      }}
                      className="px-6 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white font-bold text-[10px] uppercase rounded-xl transition"
                    >
                      CANCELAR
                    </button>
                  </div>

                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-neutral-500 uppercase space-y-4">
                  <div className="p-4 border border-dashed border-neutral-800 rounded-full">
                    <Unlock size={24} className="text-neutral-600" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white tracking-widest">Painel Administrativo Prontificado</h4>
                    <p className="text-[9px] mt-1 text-neutral-500 max-w-sm leading-relaxed">
                      Selecione um produto da lista à esquerda para editar, alterar preços, gerenciar estoque, ou clique no botão &quot;Novo Produto&quot; para adicionar novas peças ao catálogo online.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
