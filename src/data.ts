import { Product } from './types';

export const STORE_WHATSAPP = '5581985555951'; // Oficial phone number formatted with international code (Brazil +55, DDD +81, Number)
export const STORE_NAME = 'JM MOTA MODAS';
export const STORE_INSTAGRAM = '@jm_mmota';
export const SITE_CREATOR = '@rickzinxx_';
export const STORE_ADDRESS = 'Avenida Antonio Jacome Bezerra, N: 9 C, Jaboatão dos Guararapes - PE, CEP: 54220-240';

export const PRODUCTS: Product[] = [
  // --- STREETWEAR CATEGORY ---
  {
    id: 'st-01',
    name: 'Moletom Oversized Fog Essentials',
    brand: 'Fear of God',
    description: 'Moletom boxy fit de alta gramatura com capuz transpassado e estampa em silicone alto relevo.',
    longDescription: 'Desenvolvido em algodão ultra heavyweight com interior peluciado premium. Possui modelagem americana boxy com ombros caídos e punhos reforçados, oferecendo extremo conforto e caimento estruturado perfeito para o lifestyle streetwear.',
    price: 349.90,
    category: 'street',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto Carbono', hex: '#1c1c1c' },
      { name: 'Bege Off-White', hex: '#eae5d8' },
      { name: 'Cinza Mesclado', hex: '#9e9e9e' }
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    details: [
      'Material: 80% Algodão Heavyweight, 20% Poliéster',
      'Gramatura: 420g/m² (Toque encorpado e quente)',
      'Estampa: Logo em alto relevo termo colado nas costas',
      'Modelagem: Boxy Fit (forma grande, ombros caídos)',
      'Capuz duplo sem cordão para visual minimalista'
    ]
  },
  {
    id: 'st-02',
    name: 'Calça Cargo Militar Techwear',
    brand: 'Street Culture',
    description: 'Calça cargo com bolsos tridimensionais, fivelas reguláveis e punhos em ribana estruturada.',
    longDescription: 'Inspirada na estética techwear utilitária. Confeccionada em sarja ripstop robusta e resistente a rasgos. Possui 6 bolsos multifuncionais de fácil acesso, fit semi-afiunilado com quadril mais relaxado e barras ajustáveis por zíperes e ribana.',
    price: 229.90,
    category: 'street',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Preto Fosco', hex: '#0f0f0f' },
      { name: 'Verde Militar', hex: '#3b4b3c' },
      { name: 'Cáqui Desert', hex: '#c2b291' }
    ],
    inStock: true,
    isFeatured: true,
    details: [
      'Tecido: Sarja Ripstop Anti-rasgo (100% Algodão)',
      'Modelagem: Cargo Tapered (Afinada no tornozelo)',
      '6 Bolsos: 2 frontais, 2 traseiros chapados, 2 laterais com lapela',
      'Fitas táticas decorativas removíveis nas laterais',
      'Cós elástico traseiro para ajuste confortável na cintura'
    ]
  },
  {
    id: 'st-03',
    name: 'Camiseta Heavyweight Backprint',
    brand: 'Street Culture',
    description: 'Camiseta algodão 260g penteado fiação 30.1 com estampa traseira abstrata e gola de 3cm.',
    longDescription: 'Nossa camiseta assinatura com shape oversized real. O algodão de alta densidade garante estrutura que não deforma, gola canelada fechada de 3cm super vintage e lavagem amaciada para toque macio.',
    price: 139.90,
    category: 'street',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    colors: [
      { name: 'Cinza Wash', hex: '#484d50' },
      { name: 'Preto Amaciado', hex: '#161616' },
      { name: 'Branco Sólido', hex: '#ffffff' }
    ],
    inStock: true,
    isNew: true,
    details: [
      'Tecido: 100% Algodão Premium Penteado',
      'Gramatura: 260g/m² (Super pesada e estruturada)',
      'Gola: Canelada 2x1 com 3,2 cm de altura',
      'Fio: 30.1 penteado fiação fina de alta torção',
      'Resistente a lavagens industriais (encolhimento zero)'
    ]
  },
  {
    id: 'st-04',
    name: 'Jaqueta Puffer Cyber Black',
    brand: 'Street Culture',
    description: 'Jaqueta de nylon impermeável com acolchoamento volumoso ultra térmico e gola alta.',
    longDescription: 'Projetada para climas frios e noites urbanas, a jaqueta puffer conta com tecido externo repelente à água e enchimento de algodão sintético de alta densidade que retém o calor corporal sem pesar. Acabamento impecável com zíper tratorado robusto.',
    price: 399.90,
    category: 'street',
    images: [
      'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['M', 'G', 'GG'],
    colors: [
      { name: 'Preto Brilhante Tech', hex: '#111215' },
      { name: 'Cinza Prata Refletivo', hex: '#bcc0c4' }
    ],
    inStock: true,
    details: [
      'Exterior: Nylon Taslan Impermeável',
      'Forro: Poliéster acetinado térmico',
      'Acolchoamento: Pluma sintética macia',
      'Bolsos internos com zíper e saída para fone',
      'Punhos elásticos inteligentes e barra ajustável'
    ]
  },

  // --- CASUAL CATEGORY ---
  {
    id: 'ca-01',
    name: 'Camiseta Polo Pima Slim',
    brand: 'Calvin Klein',
    description: 'Polo confeccionada em algodão Pima peruano com logo discreto e três botões de madrepérola.',
    longDescription: 'O algodão Pima é cultivado nos vales do Peru, colhido manualmente, garantindo as fibras mais longas e macias do mundo. Apresenta caimento sob medida, gola estruturada que não deforma e toque incrivelmente sedoso.',
    price: 199.90,
    category: 'casual',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Azul Marinho', hex: '#1a2b49' },
      { name: 'Preto Real', hex: '#121212' },
      { name: 'Branco Pima', hex: '#fafafa' },
      { name: 'Verde Oliva', hex: '#445147' }
    ],
    inStock: true,
    isFeatured: true,
    details: [
      'Composição: 100% Algodão Pima Peruano',
      'Modelagem: Slim Fit estruturado',
      'Gola polo reforçada com pesponto duplo',
      'Toque macio com brilho natural das fibras nobres',
      'Não forma bolinhas ("anti-pilling") e retenção de cor ultra forte'
    ]
  },
  {
    id: 'ca-02',
    name: 'Calça Sarja Chino Comfort',
    brand: 'Tommy Hilfiger',
    description: 'Calça chino em sarja acetinada com elastano, modelagem regular e bolsos faca.',
    longDescription: 'Seja para o trabalho ou um jantar casual no fim de semana, a Calça Chino Tommy une o tecido clássico de sarja com corte moderno adaptado. Toque peletizado com elasticidade esticada em 4 sentidos para máximo conforto no dia a dia.',
    price: 259.90,
    category: 'casual',
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Bege Areia', hex: '#d9cdb6' },
      { name: 'Cinza Stone', hex: '#7a7a7a' },
      { name: 'Preto Clássico', hex: '#1c1c1c' }
    ],
    inStock: true,
    details: [
      'Material: 98% Algodão Nobre, 2% Elastano Premium',
      'Bolsos: Estilo Faca frontal, embutidos traseiros com abotoação',
      'Zíper de metal YKK premium autotravante',
      'Cós interno personalizado com debrum e costuras invisíveis'
    ]
  },
  {
    id: 'ca-03',
    name: 'Bermuda Moletom French Terry',
    brand: 'Lacoste',
    description: 'Bermuda leve em moletom premium sem felpa, com cordão de ajuste e logo do crocodilo bordado.',
    longDescription: 'Super estilosa e versátil para dias quentes. Feita em French Terry de alta densidade com excelente respirabilidade. Modelagem acima do joelho para visual contemporâneo despojado.',
    price: 159.90,
    category: 'casual',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565166341251-83fc2ed78df9?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto Clássico', hex: '#1a1a1a' },
      { name: 'Cinza Mesclado', hex: '#d1d5db' },
      { name: 'Azul Índigo', hex: '#2b3b5c' }
    ],
    inStock: true,
    isNew: true,
    details: [
      'Tecido: 100% Algodão Premium (French Terry)',
      'Possui 2 bolsos laterais profundos e 1 traseiro',
      'Cós elástico macio com cadarço achatado de ponteira metálica',
      'Logo clássico minunciosamente bordado à mão'
    ]
  },

  // --- SOCIAL CATEGORY ---
  {
    id: 'so-01',
    name: 'Camisa Social Slim Linho Belga',
    brand: 'Armani Exchange',
    description: 'Camisa social manga longa confeccionada em mescla nobre de linho e algodão com corte italiano.',
    longDescription: 'O frescor inigualável do linho premium combinado com a maciez do algodão penteado. Modelo slim fit que desenha o corpo masculino de forma elegante, com gola estruturada perfeita para uso sem gravata e punhos franceses refinados.',
    price: 289.90,
    category: 'social',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621072156002-e2fcc103e869?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['1', '2', '3', '4', '5'],
    colors: [
      { name: 'Branco Puro', hex: '#ffffff' },
      { name: 'Azul Serene', hex: '#c5d8eb' },
      { name: 'Rosa Quartzo', hex: '#f0d8d8' },
      { name: 'Preto Social', hex: '#151515' }
    ],
    inStock: true,
    isFeatured: true,
    details: [
      'Composição: 55% Linho Puro Belga, 45% Algodão Egípcio',
      'Modelagem: Tailored Slim Fit italiano',
      'Botões de madrepérola natural com costuras cruzadas resistentes',
      'Gola semirrígida com barbatanas embutidas removíveis',
      'Toque fresco de caimento luxuoso e leve amassado natural chic'
    ]
  },
  {
    id: 'so-02',
    name: 'Blazer Estruturado Slim Alfaiataria',
    brand: 'Hugo Boss',
    description: 'Blazer estruturado com dois botões, lapela fina, fendas traseiras e caimento impecável.',
    longDescription: 'Uma obra-prima da alfaiataria clássica Hugo Boss. Com meio forro acetinado jacquard para maior respirabilidade em dias quentes tropicais, ombros ligeiramente acolchoados para porte atlético e bolsos flap costurados com precisão cirúrgica.',
    price: 499.90,
    category: 'social',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['48', '50', '52', '54', '56'],
    colors: [
      { name: 'Preto Charcoal', hex: '#1c1c20' },
      { name: 'Azul Midnight', hex: '#161c2b' },
      { name: 'Cinza London', hex: '#5c5e63' }
    ],
    inStock: true,
    isNew: true,
    details: [
      'Material Externo: 80% Viscose de Alta Densidade, 17% Poliamida, 3% Elastano',
      'Forro: Crepe acetinado 100% Poliéster Premium',
      'Dois botões frontais e punho real com quatro botões decorativos',
      'Duas fendas traseiras para máximo conforto ao sentar-se',
      'Costura ponto picado de alfaiataria clássica'
    ]
  },
  {
    id: 'so-03',
    name: 'Calça de Alfaiataria Super Slim',
    brand: 'Hugo Boss',
    description: 'Calça social de caimento afunilado moderno, vinco marcado e cós com transpasse de botão.',
    longDescription: 'Para combinar com camisas sociais ou look casual-chic com camiseta heavyweight. Possui gancho baixo, pernas de corte estreito super contemporâneo, acabamento interno invisível nas barras e toque extremamente liso.',
    price: 239.90,
    category: 'social',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Cinza Chumbo', hex: '#3d3f42' },
      { name: 'Azul Escuro', hex: '#192130' },
      { name: 'Preto Sólido', hex: '#000000' }
    ],
    inStock: true,
    details: [
      'Tecido: Gabardine Premium de Alta Torção',
      'Modelagem: Super Slim Fit Alfaiataria',
      'Fechamento com zíper, colchete duplo e fecho oculto na cintura',
      'Pregas traseiras discretas para acomodação perfeita'
    ]
  },

  // --- ACCESSORIES CATEGORY ---
  {
    id: 'ac-01',
    name: 'Boné Dad Hat Vintage JM',
    brand: 'JM Mota Modas',
    description: 'Boné aba curva desestruturado estilo dad hat, confeccionado em lona lavada amaciada.',
    longDescription: 'O acessório streetwear de maior sucesso da nossa coleção autoral. Um boné com caimento perfeito, aba flexível com tripla costura, bordagem frontal da sigla JM minimalista e fivela reguladora de metal envelhecido.',
    price: 89.90,
    category: 'acessorios',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Ajustável (U)'],
    colors: [
      { name: 'Fosco Lavado Black', hex: '#2d2e30' },
      { name: 'Algodão Cru Off', hex: '#e8e2d5' },
      { name: 'Bege Areia', hex: '#ccb997' }
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    details: [
      'Material: Lona 100% Algodão Premium Wash',
      'Fecho: Regulador metálico de latão envelhecido tipo "strapback"',
      'Gomos com respiradores ilhoses bordados eletronicamente',
      'Bordado frontal JM de alta definição com linha alemã extra-brilho'
    ]
  },
  {
    id: 'ac-02',
    name: 'Corrente Veneziana Prata 925 Sólida',
    brand: 'Curadoria JM',
    description: 'Corrente de prata legítima 925 com elos venezianos de 1.5mm espessura e fecho mosquetão.',
    longDescription: 'Sólida e refinada, fabricada em prata de lei 925 certificada com banho protetivo para evitar oxidação precoce. Ideal para compor o look streetwear ou dar aquele toque discreto em um visual social com blazer.',
    price: 189.90,
    category: 'acessorios',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611085583191-a3b1a3a35541?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['60 cm', '70 cm'],
    colors: [
      { name: 'Prata 925 de Lei', hex: '#e1e4e6' }
    ],
    inStock: true,
    details: [
      'Material: Prata Maciça Sólida Teor 925 Legitima',
      'Espessura: 1,5 mm de simetria geométrica de elos',
      'Peso aproximado: 12g (elos densos e resistentes)',
      'Fecho: Tipo Mosquetão importado robusto e seguro'
    ]
  },
  {
    id: 'ac-03',
    name: 'Óculos de Sol Retro Hexagonal',
    brand: 'Curadoria JM',
    description: 'Óculos de sol hexagonal minimalista com ponteiras em acetato e lentes filtro UV400.',
    longDescription: 'Estrutura leve em metal anticorrosivo na tonalidade dourada escovada, lentes de policarbonato premium com total proteção contra raios solares. O design geométrico se adapta magnificamente a qualquer formato de rosto.',
    price: 129.90,
    category: 'acessorios',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Médio (U)'],
    colors: [
      { name: 'Dourado / Preto', hex: '#bdaa84' },
      { name: 'Chumbo Sólido', hex: '#484c54' }
    ],
    inStock: true,
    isFeatured: true,
    details: [
      'Material Armação: Metal de Alta Durabilidade Dourado',
      'Filtro Lentes: UV400 real UVA/UVB permanente',
      'Ponteiras do ouvido revestidas com acetato italiano macio',
      'Acompanha estojo rígido de couro JM e flanela microfibra de limpeza'
    ]
  },
  {
    id: 'ac-04',
    name: 'Mochila Roll-top Matte Black',
    brand: 'Street Culture',
    description: 'Mochila utilitária impermeável de poliuretano emborrachado com compartimento para laptop de 16".',
    longDescription: 'Inspirada em mensageiros urbanos, a mochila possui fechamento superior expansível roll-top com fivela de engate rápido Cobra. Alças anatômicas acolchoadas em mesh respirável garantem conforto absoluto nas costas.',
    price: 219.90,
    category: 'acessorios',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Único (30L)'],
    colors: [
      { name: 'Preto Emborrachado Matte', hex: '#181819' }
    ],
    inStock: true,
    details: [
      'Material: Poliéster 900D com revestimento de Poliuretano emborrachado estanque',
      'Volume expansível de 22 até 32 litros de capacidade total',
      'Compartimento flutuante traseiro acolchoado para Laptop 16"',
      'Zíperes externos selados AquaGuard resistentes a chuva forte'
    ]
  }
];

export const PAYMENT_METHODS = [
  { id: 'Pix', label: 'PIX (Aprovação Imediata / Desconto de 5%)', icon: '⚡' },
  { id: 'Cartão', label: 'Cartão de Crédito / Débito (Até 3x sem juros)', icon: '💳' },
  { id: 'Dinheiro', label: 'Dinheiro na Entrega ou Retirada', icon: '💵' }
] as const;

export const DELIVERY_OPTIONS = [
  { id: 'Retirada', label: 'Retirar na Loja (Grátis - Jaboatão)', info: 'Pronto em até 2 horas úteis' },
  { id: 'Entrega', label: 'Receber via Motoboy ou Correios', info: 'Consultar taxa de entrega para PE' }
] as const;
