/**
 * MyOrderNow - Datos del catálogo y configuración inicial
 * Versión Beta 1.0
 */

const PRODUCTS = [
  {
    id: 1,
    name: "Burrito especial",
    category: "mexicana",
    restaurant: "Taquería El Mexicano",
    price: 14.99,
    rating: 4.8,
    reviews: 142,
    deliveryTime: "20-30 min",
    image: "img/producto1.jpg",
    tags: ["Descuento", "Envío gratis"],
    description: "Delicioso burrito relleno de carne asada marinada al carbón, frijoles refritos, arroz sazonado, queso Oaxaca fundido, guacamole fresco y pico de gallo, envuelto en tortilla de harina dorada a la plancha.",
    calories: "680 kcal",
    options: [
      { id: "opt-1-1", name: "Extra guacamole fresco", price: 1.50 },
      { id: "opt-1-2", name: "Queso cheddar fundido", price: 1.20 },
      { id: "opt-1-3", name: "Jalapeños toreados", price: 0.80 },
      { id: "opt-1-4", name: "Salsa brava habanera", price: 0.50 }
    ]
  },
  {
    id: 2,
    name: "Postre de la casa",
    category: "postres",
    restaurant: "Sweet Treats Bakery",
    price: 6.99,
    rating: 4.9,
    reviews: 89,
    deliveryTime: "15-25 min",
    image: "img/producto2.jpg",
    tags: ["2x1", "Descuento 50%"],
    description: "Cremoso cheesecake artesanal estilo New York horneado a fuego lento sobre base crujiente de galleta graham, cubierto con coulis casero de frutos rojos silvestres y hojas de menta fresca.",
    calories: "420 kcal",
    options: [
      { id: "opt-2-1", name: "Sirope extra de chocolate belga", price: 0.90 },
      { id: "opt-2-2", name: "Bola de helado de vainilla francesa", price: 1.80 },
      { id: "opt-2-3", name: "Fresas frescas laminadas", price: 1.20 }
    ]
  },
  {
    id: 3,
    name: "Salmón a las finas hierbas",
    category: "mariscos",
    restaurant: "Oceano Gourmet",
    price: 21.47,
    rating: 4.7,
    reviews: 110,
    deliveryTime: "30-40 min",
    image: "img/producto3.jpg",
    tags: ["Envío gratis", "Chef Choice"],
    description: "Filete de salmón noruego premium sellado al punto con mantequilla clarificada, reducción cítrica de limón amarillo y finas hierbas provenzales. Servido con espárragos tiernos a la parrilla.",
    calories: "510 kcal",
    options: [
      { id: "opt-3-1", name: "Porción extra de espárragos", price: 2.50 },
      { id: "opt-3-2", name: "Puré rústico de papas con ajo confitado", price: 2.00 },
      { id: "opt-3-3", name: "Salsa de alcaparras y vino blanco", price: 1.50 }
    ]
  },
  {
    id: 4,
    name: "Donas glaseadas x6",
    category: "postres",
    restaurant: "Donut Paradise",
    price: 9.99,
    rating: 4.6,
    reviews: 230,
    deliveryTime: "15-20 min",
    image: "img/producto4.jpg",
    tags: ["Envío gratis", "Combo"],
    description: "Caja surtida de 6 donas esponjosas horneadas a diario: 2 clásicas glaseadas de vainilla bourbon, 2 con cobertura de chocolate amargo y 2 con dulce de leche y toppings crujientes.",
    calories: "1150 kcal (caja)",
    options: [
      { id: "opt-4-1", name: "Café americano 12oz", price: 1.80 },
      { id: "opt-4-2", name: "Frappé moka con crema batida", price: 2.50 },
      { id: "opt-4-3", name: "Dipping de nutella 50g", price: 1.50 }
    ]
  },
  {
    id: 5,
    name: "Mega hamburguesa Royale",
    category: "hamburguesas",
    restaurant: "Burger House BBQ",
    price: 15.99,
    rating: 4.9,
    reviews: 315,
    deliveryTime: "20-35 min",
    image: "img/producto5.jpg",
    tags: ["Envío gratis", "Bestseller"],
    description: "Doble carne angus certificada (360g en total), triple queso cheddar fundido, tocino ahumado en madera de manzano, cebollas caramelizadas al bourbon y aderezo especial en pan brioche artesanal con mantequilla.",
    calories: "940 kcal",
    options: [
      { id: "opt-5-1", name: "Papas fritas trufadas con queso parmesano", price: 2.50 },
      { id: "opt-5-2", name: "Aros de cebolla crocantes (x6)", price: 2.20 },
      { id: "opt-5-3", name: "Tira extra de tocino ahumado", price: 1.50 },
      { id: "opt-5-4", name: "Queso cheddar líquido extra", price: 1.20 }
    ]
  },
  {
    id: 6,
    name: "Ensalada Gourmet con Pollo",
    category: "saludable",
    restaurant: "Green & Healthy Bar",
    price: 12.50,
    rating: 4.8,
    reviews: 94,
    deliveryTime: "15-25 min",
    image: "img/producto6.jpg",
    tags: ["Fit", "Envío gratis"],
    description: "Fresca mezcla de espinacas tiernas, pechuga de pollo marinada y grillada a las finas hierbas, tomates cherry, rodajas de pepino, arándanos secos, semillas tostadas de girasol y aderezo especial de mostaza Dijon y miel orgánica.",
    calories: "380 kcal",
    options: [
      { id: "opt-6-1", name: "Queso feta griego en cubos", price: 1.50 },
      { id: "opt-6-2", name: "Aguacate hass en láminas", price: 1.80 },
      { id: "opt-6-3", name: "Proteína extra de pollo grillado (120g)", price: 2.80 }
    ]
  },
  {
    id: 7,
    name: "Pizza Artesanal Pepperoni",
    category: "platos-fuertes",
    restaurant: "Bella Napoli Pizzería",
    price: 16.80,
    rating: 4.9,
    reviews: 278,
    deliveryTime: "25-35 min",
    image: "img/producto7.jpg",
    tags: ["Horno de leña", "Favorito"],
    description: "Masa madre madurada lentamente por 48 horas, salsa de tomates San Marzano D.O.P., mozzarella fresca fior di latte, generosas rodajas de pepperoni italiano crujiente y hojas de albahaca fresca con aceite de oliva virgen extra.",
    calories: "890 kcal",
    options: [
      { id: "opt-7-1", name: "Borde relleno de queso crema y mozzarella", price: 2.50 },
      { id: "opt-7-2", name: "Champiñones salteados al ajillo", price: 1.50 },
      { id: "opt-7-3", name: "Aceite picante de peperoncino casero", price: 0.60 }
    ]
  },
  {
    id: 8,
    name: "Tacos al Pastor Tradicionales (x3)",
    category: "mexicana",
    restaurant: "El Trompo Sagrado",
    price: 11.90,
    rating: 4.9,
    reviews: 340,
    deliveryTime: "15-25 min",
    image: "img/producto8.jpg",
    tags: ["2x1", "Top ventas"],
    description: "Trío de tacos en tortilla de maíz nixtamalizado hecha a mano, carne de cerdo marinada con achiote y especias asada en trompo vertical tradicional, piña caramelizada a la brasa, cilantro fresco, cebolla picada y cuartos de limón.",
    calories: "540 kcal",
    options: [
      { id: "opt-8-1", name: "Queso costra dorado a la plancha", price: 1.50 },
      { id: "opt-8-2", name: "Totopos crujientes con guacamole (orden)", price: 2.80 },
      { id: "opt-8-3", name: "Frijoles charros caldosos", price: 1.90 }
    ]
  }
];

const CATEGORIES = [
  { id: "todos", name: "Todos", icon: "fas fa-utensils" },
  { id: "hamburguesas", name: "Hamburguesas", icon: "fas fa-hamburger" },
  { id: "mexicana", name: "Mexicana", icon: "fas fa-pepper-hot" },
  { id: "platos-fuertes", name: "Pizzas & Platos", icon: "fas fa-pizza-slice" },
  { id: "saludable", name: "Saludable", icon: "fas fa-leaf" },
  { id: "mariscos", name: "Mariscos", icon: "fas fa-fish" },
  { id: "postres", name: "Postres", icon: "fas fa-ice-cream" }
];

const COUPONS = {
  "BIENVENIDO10": {
    code: "BIENVENIDO10",
    discountPercent: 10,
    description: "10% de descuento en tu orden total"
  },
  "ENVIOGRATIS": {
    code: "ENVIOGRATIS",
    freeShipping: true,
    description: "Envío gratis para este pedido"
  },
  "BURGERLOVER": {
    code: "BURGERLOVER",
    fixedDiscount: 3.00,
    minSubtotal: 10.00,
    description: "$3.00 de descuento en órdenes superiores a $10"
  }
};

const DEFAULT_ADDRESSES = [
  { id: "addr-1", name: "Casa", address: "Calle 85 # 11-53, Apt 402", city: "Bogotá", isDefault: true },
  { id: "addr-2", name: "Oficina", address: "Carrera 7 # 72-10, Piso 8", city: "Bogotá", isDefault: false },
  { id: "addr-3", name: "Gimnasio", address: "Av. 19 # 104-20", city: "Bogotá", isDefault: false }
];

const PROMO_BANNERS = [
  {
    title: "¡Bienvenido a MyOrderNow!",
    subtitle: "Usa el cupón BIENVENIDO10 y obtén 10% de descuento en tu primer pedido.",
    badge: "10% OFF",
    coupon: "BIENVENIDO10",
    bgColor: "linear-gradient(135deg, #ff7f00 0%, #ff4500 100%)"
  },
  {
    title: "Jueves de Envío Gratis 🛵",
    subtitle: "Aplica el cupón ENVIOGRATIS sin mínimo de compra.",
    badge: "ENVÍO GRATIS",
    coupon: "ENVIOGRATIS",
    bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
  }
];
