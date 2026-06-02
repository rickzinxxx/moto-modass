import React, { useState } from 'react';
import { CartItem, CheckoutDetails } from '../types';
import { X, Plus, Minus, Trash2, Send, CreditCard, ArrowRight, ShieldCheck, Smile } from 'lucide-react';
import { STORE_WHATSAPP, PAYMENT_METHODS, DELIVERY_OPTIONS } from '../data';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function ShoppingBagDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingBagDrawerProps) {
  // Checkout details state
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix');
  const [deliveryOption, setDeliveryOption] = useState<'Retirada' | 'Entrega'>('Retirada');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalPix = paymentMethod === 'Pix' ? subtotal * 0.95 : subtotal;

  const formattedSubtotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(subtotal);

  const formattedTotalPix = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPix);

  const discountSavings = subtotal * 0.05;
  const formattedSavings = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(discountSavings);

  // Generate WhatsApp formatted message
  const generateWhatsAppUrl = () => {
    if (!customerName.trim()) return '#';

    let message = `🛒 *NOVO PEDIDO - JM MOTA MODAS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 *CLIENTE:* ${customerName.trim()}\n`;
    message += `💳 *PAGAMENTO:* ${paymentMethod}\n`;
    message += `🚚 *RETIRADA/ENTREGA:* ${deliveryOption === 'Retirada' ? 'Retirada Física na Loja' : 'Entrega por Motoboy'}\n`;

    if (deliveryOption === 'Entrega' && deliveryAddress.trim()) {
      message += `📍 *ENDEREÇO:* ${deliveryAddress.trim()}\n`;
    }

    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 *ITENS COMPRADOS:* \n\n`;

    cartItems.forEach((item, index) => {
      const itemTotal = item.product.price * item.quantity;
      const formattedItemTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(itemTotal);

      message += `*${index + 1}. ${item.product.name}*\n`;
      message += `   • Marca: ${item.product.brand}\n`;
      message += `   • Tam: ${item.selectedSize} | Cor: ${item.selectedColor.name}\n`;
      message += `   • Qtd: ${item.quantity}x de R$ ${item.product.price.toFixed(2)}\n`;
      message += `   • Valor: ${formattedItemTotal}\n\n`;
    });

    message += `━━━━━━━ RESUMO DO VALOR ━━━━━━━\n`;
    message += `💰 *Subtotal:* ${formattedSubtotal}\n`;

    if (paymentMethod === 'Pix') {
      message += `⚡ *Desconto Pix (5%):* - ${formattedSavings}\n`;
      message += `🔥 *TOTAL COM DESCONTO PIX:* ${formattedTotalPix}\n`;
    } else {
      message += `💵 *TOTAL DO PEDIDO:* ${formattedSubtotal}\n`;
    }

    if (customerNotes.trim()) {
      message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `📝 *OBSERVAÇÕES DO PEDIDO:*\n_"${customerNotes.trim()}"_\n`;
    }

    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📱 _Pedido gerado via Catálogo Virtual JM Mota Modas_`;

    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${STORE_WHATSAPP}?text=${encodedText}`;
  };

  const isFormValid = customerName.trim().length > 0 && (deliveryOption === 'Retirada' || deliveryAddress.trim().length > 0);
  const whatsappUrl = generateWhatsAppUrl();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      {/* Sliding Bag Panel */}
      <div className="flex h-full w-full max-w-sm flex-col justify-between border-l border-neutral-800 bg-[#080808] text-white">
        
        {/* Header Drawer */}
        <div className="flex h-20 items-center justify-between border-b border-neutral-800 px-6 bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <h3 className="font-mono text-sm font-bold tracking-widest uppercase">
              SUA SACOLA ({cartItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700 transition rounded-full"
          >
            <X size={16} />
          </button>
        </div>

        {/* Dynamic Inner Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center font-mono text-xs text-neutral-500 gap-3">
              <Smile size={24} className="text-white" />
              Sua sacola está vazia. <br /> Continue escolhendo no catálogo!
            </div>
          ) : (
            <>
              {/* Product list */}
              <div className="space-y-4 border-b border-neutral-800 pb-6">
                <span className="block font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase mb-1">
                  PEÇAS SELECIONADAS:
                </span>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border border-neutral-800 bg-[#111111] p-3 rounded-xl"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-16 w-12 object-cover border border-neutral-900 bg-neutral-950 rounded"
                    />

                    {/* Metadata details */}
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[8px] text-neutral-400 font-bold leading-none block uppercase">
                        {item.product.brand}
                      </span>
                      <h4 className="mt-1 font-mono text-[11px] font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="mt-1 font-mono text-[9px] text-neutral-400">
                        Tam: {item.selectedSize} | Cor: {item.selectedColor.name.split(' ')[0]}
                      </p>
                      
                      {/* Price lines */}
                      <span className="block font-mono text-[11px] text-white font-bold mt-1.5">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Actions and Qty managers columns */}
                    <div className="flex flex-col items-end justify-between gap-3 shrink-0 h-full">
                      {/* Remove item */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition"
                        title="Remover peça"
                      >
                        <Trash2 size={13} />
                      </button>

                      {/* Selector */}
                      <div className="flex items-center border border-neutral-800 bg-black text-[10px] font-mono rounded overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-neutral-450 hover:text-white"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-white bg-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-neutral-450 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout validation requirements details Form */}
              <div className="space-y-4 pt-1">
                <span className="block font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                  DADOS DO PEDIDO:
                </span>

                {/* 1. Nome do cliente */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-neutral-400">
                    Seu nome completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu nome..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="h-10 w-full rounded border border-neutral-800 bg-[#111111] px-3 font-mono text-xs text-white placeholder-neutral-700 outline-none focus:border-white focus:bg-black transition-all"
                  />
                  {!customerName.trim() && (
                    <span className="font-mono text-[8px] text-neutral-550 block">
                      ⚠ Necessário preencher para habilitar envio do WhatsApp
                    </span>
                  )}
                </div>

                {/* 2. Opção de Entrega */}
                <div className="space-y-2">
                  <span className="block font-mono text-[10px] text-neutral-400">
                    Como deseja obter suas roupas?
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {DELIVERY_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setDeliveryOption(option.id as any)}
                        className={`flex flex-col text-left p-2.5 border rounded-xl transition cursor-pointer ${
                          deliveryOption === option.id
                            ? 'border-white bg-[#111111]'
                            : 'border-neutral-800 bg-neutral-900/30 hover:border-neutral-700'
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase leading-none">
                          {option.id}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-450 mt-1 uppercase leading-tight">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Entrega Address details */}
                {deliveryOption === 'Entrega' && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block font-mono text-[10px] text-neutral-400">
                      Endereço de Entrega Completo *
                    </label>
                    <textarea
                      required
                      placeholder="Ex: Rua, Número, Bairro, CEP e Ponto de Referência..."
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full rounded border border-neutral-800 bg-[#111111] p-2.5 font-mono text-xs text-white placeholder-neutral-700 outline-none focus:border-white focus:bg-black resize-none transition-all"
                    />
                  </div>
                )}

                {/* 4. Forma de Pagamento */}
                <div className="space-y-2">
                  <span className="block font-mono text-[10px] text-neutral-400">
                    Forma de Pagamento Preferida
                  </span>
                  <div className="space-y-1.5">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`w-full flex items-center justify-between p-2.5 border rounded-xl transition cursor-pointer ${
                          paymentMethod === method.id
                            ? 'border-white bg-[#111111]'
                            : 'border-neutral-800 bg-neutral-900/30 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{method.icon}</span>
                          <span className="font-mono text-[10px] font-bold text-white uppercase leading-none">
                            {method.id}
                          </span>
                        </div>
                        <span className={`font-mono text-[8px] uppercase font-bold py-0.5 px-1.5 rounded ${method.id === 'Pix' ? 'bg-white/10 text-white border border-white/20' : 'text-neutral-500'}`}>
                          {method.id === 'Pix' ? 'Ganhar 5% Desc.' : 'Ver Opções'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Observações gerais */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-neutral-400">
                    Observações adicionais (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Embrulho para presente, ligar antes..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="h-10 w-full rounded border border-neutral-800 bg-[#111111] px-3 font-mono text-xs text-white placeholder-neutral-700 outline-none focus:border-white focus:bg-black transition-all"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout display summaries and sending linkages */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-800 bg-[#0a0a0a] p-6 space-y-4 shrink-0">
            {/* Calculation lines info summaries */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[11px] text-neutral-400">
                <span>SUBTOTAL:</span>
                <span>{formattedSubtotal}</span>
              </div>

              {paymentMethod === 'Pix' && (
                <div className="flex justify-between font-mono text-[11px] text-neutral-400 font-bold">
                  <span>DESCONTO PIX (-5%):</span>
                  <span>- {formattedSavings}</span>
                </div>
              )}

              <div className="flex justify-between font-mono text-sm font-black text-white pt-2 border-t border-neutral-800">
                <span>TOTAL ESTIMADO:</span>
                <span className="text-white font-black">
                  {paymentMethod === 'Pix' ? formattedTotalPix : formattedSubtotal}
                </span>
              </div>
            </div>

            {/* Direct Web link anchor matching our restriction targets */}
            {isFormValid ? (
              <a
                id="whatsapp-dispatch-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full h-12 rounded-xl bg-white hover:bg-neutral-200 text-black border border-white font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Send size={13} className="text-black" />
                ENVIAR PEDIDO NO WHATSAPP
              </a>
            ) : (
              <button
                disabled
                className="w-full h-12 rounded-xl bg-neutral-900 text-neutral-600 font-mono text-[10px] font-bold tracking-widest uppercase cursor-not-allowed border border-neutral-800"
              >
                PREENCHA SEU NOME PARA ENVIAR
              </button>
            )}

            <div className="flex gap-2 justify-center items-center">
              <ShieldCheck size={11} className="text-neutral-500" />
              <span className="font-mono text-[8px] text-neutral-550 tracking-wider uppercase text-center leading-none">
                FINALIZAÇÃO 100% SEGURA VIA WHATSAPP OFICIAL
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
