/**
 * MyOrderNow - Gestor de Estado del Carrito, Favoritos y Pedidos
 * Persistencia en localStorage y lógica de negocio
 */

class CartManager {
  constructor() {
    this.STORAGE_KEYS = {
      CART: "myordernow_cart_v1",
      COUPON: "myordernow_coupon_v1",
      FAVORITES: "myordernow_favorites_v1",
      ORDERS: "myordernow_orders_v1",
      ADDRESS: "myordernow_address_v1"
    };

    this.cart = this.loadFromStorage(this.STORAGE_KEYS.CART, []);
    this.appliedCoupon = this.loadFromStorage(this.STORAGE_KEYS.COUPON, null);
    this.favorites = new Set(this.loadFromStorage(this.STORAGE_KEYS.FAVORITES, [1, 5]));
    this.orders = this.loadFromStorage(this.STORAGE_KEYS.ORDERS, []);
    this.currentAddress = this.loadFromStorage(this.STORAGE_KEYS.ADDRESS, DEFAULT_ADDRESSES[0]);
    this.baseShippingFee = 2.50;

    this.listeners = [];
  }

  // --- Suscripción a cambios de estado ---
  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.saveToStorage(this.STORAGE_KEYS.CART, this.cart);
    this.saveToStorage(this.STORAGE_KEYS.COUPON, this.appliedCoupon);
    this.saveToStorage(this.STORAGE_KEYS.FAVORITES, Array.from(this.favorites));
    this.saveToStorage(this.STORAGE_KEYS.ORDERS, this.orders);
    this.saveToStorage(this.STORAGE_KEYS.ADDRESS, this.currentAddress);

    this.listeners.forEach(cb => {
      try {
        cb(this);
      } catch (err) {
        console.error("Error in CartManager listener:", err);
      }
    });
  }

  // --- Operaciones del Carrito ---
  addItem(product, quantity = 1, selectedOptions = [], instructions = "") {
    const optionsKey = selectedOptions
      .map(o => o.name)
      .sort()
      .join("|");
    const itemUniqueKey = `${product.id}__${optionsKey}__${instructions.trim().toLowerCase()}`;

    const existingIndex = this.cart.findIndex(i => i.itemKey === itemUniqueKey);

    const extraPrice = selectedOptions.reduce((acc, opt) => acc + (opt.price || 0), 0);
    const unitPrice = parseFloat((product.price + extraPrice).toFixed(2));

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        itemKey: itemUniqueKey,
        productId: product.id,
        name: product.name,
        restaurant: product.restaurant,
        image: product.image,
        basePrice: product.price,
        unitPrice: unitPrice,
        quantity: quantity,
        selectedOptions: selectedOptions,
        instructions: instructions.trim()
      });
    }

    this.notify();
    return true;
  }

  updateQuantity(itemKey, newQuantity) {
    const index = this.cart.findIndex(i => i.itemKey === itemKey);
    if (index > -1) {
      if (newQuantity <= 0) {
        this.cart.splice(index, 1);
      } else {
        this.cart[index].quantity = newQuantity;
      }
      this.notify();
    }
  }

  removeItem(itemKey) {
    this.cart = this.cart.filter(i => i.itemKey !== itemKey);
    this.notify();
  }

  clearCart() {
    this.cart = [];
    this.appliedCoupon = null;
    this.notify();
  }

  // --- Cupones ---
  applyCoupon(code) {
    if (!code) return { success: false, message: "Ingresa un código de cupón." };
    const upperCode = code.trim().toUpperCase();
    const couponData = COUPONS[upperCode];

    if (!couponData) {
      return { success: false, message: "El cupón no es válido o ha expirado." };
    }

    const { subtotal } = this.getTotals();
    if (couponData.minSubtotal && subtotal < couponData.minSubtotal) {
      return {
        success: false,
        message: `Este cupón requiere un pedido mínimo de $${couponData.minSubtotal.toFixed(2)}.`
      };
    }

    this.appliedCoupon = couponData;
    this.notify();
    return { success: true, message: `¡Cupón ${upperCode} aplicado exitosamente!`, coupon: couponData };
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this.notify();
  }

  // --- Cálculos de Totales ---
  getTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    let shipping = subtotal > 0 ? this.baseShippingFee : 0;
    let discount = 0;

    if (this.appliedCoupon && subtotal > 0) {
      if (this.appliedCoupon.freeShipping) {
        shipping = 0;
      }
      if (this.appliedCoupon.discountPercent) {
        discount += (subtotal * (this.appliedCoupon.discountPercent / 100));
      }
      if (this.appliedCoupon.fixedDiscount) {
        discount += Math.min(this.appliedCoupon.fixedDiscount, subtotal);
      }
    }

    discount = Math.min(discount, subtotal);
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount
    };
  }

  // --- Favoritos ---
  toggleFavorite(productId) {
    if (this.favorites.has(productId)) {
      this.favorites.delete(productId);
      this.notify();
      return false; // Ahora no es favorito
    } else {
      this.favorites.add(productId);
      this.notify();
      return true; // Ahora es favorito
    }
  }

  isFavorite(productId) {
    return this.favorites.has(productId);
  }

  // --- Direcciones ---
  setAddress(address) {
    this.currentAddress = address;
    this.notify();
  }

  // --- Pedidos y Checkout ---
  createOrder(checkoutData) {
    const totals = this.getTotals();
    if (this.cart.length === 0) {
      throw new Error("El carrito está vacío");
    }

    const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderNumber,
      date: new Date().toISOString(),
      displayDate: new Date().toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }),
      items: [...this.cart],
      totals: totals,
      coupon: this.appliedCoupon,
      deliveryAddress: checkoutData.address || this.currentAddress.address,
      phone: checkoutData.phone,
      paymentMethod: checkoutData.paymentMethod,
      notes: checkoutData.notes || "",
      status: "preparando" // 'preparando' | 'en_camino' | 'entregado'
    };

    this.orders.unshift(newOrder);
    this.clearCart();
    this.notify();

    return newOrder;
  }

  // --- Almacenamiento Local ---
  loadFromStorage(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn("Could not load from localStorage:", key, e);
      return defaultValue;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Could not save to localStorage:", key, e);
    }
  }
}

// Instancia global
window.cartManager = new CartManager();
