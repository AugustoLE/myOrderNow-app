/**
 * MyOrderNow - Controlador Principal de la Aplicación
 * Versión Beta 1.0 (Vanilla JS ES6+)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado local de la interfaz
  const uiState = {
    selectedCategory: "todos",
    searchQuery: "",
    selectedFilterTag: "todos", // 'todos' | 'top' | 'free_shipping' | 'deals'
    sortBy: "popular", // 'popular' | 'price_asc' | 'price_desc' | 'rating'
    modalProduct: null,
    modalQuantity: 1,
    modalSelectedOptions: [],
    trackingTimer: null
  };

  // --- Elementos del DOM ---
  const elements = {
    // Header & Navegación
    addressBtn: document.getElementById("addressSelectorBtn"),
    currentAddressText: document.getElementById("currentAddressText"),
    cartToggleBtn: document.getElementById("cartToggleBtn"),
    cartBadge: document.getElementById("cartBadge"),
    searchInput: document.getElementById("searchInput"),
    clearSearchBtn: document.getElementById("clearSearchBtn"),
    
    // Categorías y Filtros
    categoriesContainer: document.getElementById("categoriesContainer"),
    filterChips: document.querySelectorAll(".filter-chip"),
    sortSelect: document.getElementById("sortSelect"),
    resultsCount: document.getElementById("resultsCount"),
    
    // Catálogo de Productos
    productsGrid: document.getElementById("productsGrid"),
    emptyState: document.getElementById("emptyProductsState"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    
    // Banner Promocional
    promoBanner: document.getElementById("promoBanner"),
    
    // Carrito Drawer
    cartDrawer: document.getElementById("cartDrawer"),
    cartOverlay: document.getElementById("cartOverlay"),
    closeCartBtn: document.getElementById("closeCartBtn"),
    cartItemsList: document.getElementById("cartItemsList"),
    cartEmptyView: document.getElementById("cartEmptyView"),
    cartFooter: document.getElementById("cartFooter"),
    cartSubtotal: document.getElementById("cartSubtotal"),
    cartShipping: document.getElementById("cartShipping"),
    cartDiscountRow: document.getElementById("cartDiscountRow"),
    cartDiscount: document.getElementById("cartDiscount"),
    cartTotal: document.getElementById("cartTotal"),
    couponInput: document.getElementById("couponInput"),
    applyCouponBtn: document.getElementById("applyCouponBtn"),
    appliedCouponBadge: document.getElementById("appliedCouponBadge"),
    couponText: document.getElementById("couponText"),
    removeCouponBtn: document.getElementById("removeCouponBtn"),
    clearCartBtn: document.getElementById("clearCartBtn"),
    goToCheckoutBtn: document.getElementById("goToCheckoutBtn"),
    
    // Modal Detalle de Producto
    productDetailModal: document.getElementById("productDetailModal"),
    closeProductModalBtn: document.getElementById("closeProductModalBtn"),
    modalProductImg: document.getElementById("modalProductImg"),
    modalProductTags: document.getElementById("modalProductTags"),
    modalProductName: document.getElementById("modalProductName"),
    modalProductRestaurant: document.getElementById("modalProductRestaurant"),
    modalProductRating: document.getElementById("modalProductRating"),
    modalProductTime: document.getElementById("modalProductTime"),
    modalProductCalories: document.getElementById("modalProductCalories"),
    modalProductDesc: document.getElementById("modalProductDesc"),
    modalProductOptions: document.getElementById("modalProductOptions"),
    modalInstructions: document.getElementById("modalInstructions"),
    modalQtyMinus: document.getElementById("modalQtyMinus"),
    modalQtyPlus: document.getElementById("modalQtyPlus"),
    modalQtyValue: document.getElementById("modalQtyValue"),
    modalAddToCartBtn: document.getElementById("modalAddToCartBtn"),
    modalBtnTotal: document.getElementById("modalBtnTotal"),
    
    // Modal Checkout
    checkoutModal: document.getElementById("checkoutModal"),
    closeCheckoutModalBtn: document.getElementById("closeCheckoutModalBtn"),
    checkoutForm: document.getElementById("checkoutForm"),
    checkoutAddressInput: document.getElementById("checkoutAddressInput"),
    checkoutPhoneInput: document.getElementById("checkoutPhoneInput"),
    checkoutNotesInput: document.getElementById("checkoutNotesInput"),
    checkoutTotalDisplay: document.getElementById("checkoutTotalDisplay"),
    checkoutItemsSummary: document.getElementById("checkoutItemsSummary"),
    
    // Modal Tracking de Pedido
    trackingModal: document.getElementById("trackingModal"),
    closeTrackingModalBtn: document.getElementById("closeTrackingModalBtn"),
    trackingOrderNumber: document.getElementById("trackingOrderNumber"),
    trackingOrderTotal: document.getElementById("trackingOrderTotal"),
    trackingSteps: document.querySelectorAll(".tracking-step"),
    trackingProgressBar: document.getElementById("trackingProgressBar"),
    trackingStatusMessage: document.getElementById("trackingStatusMessage"),
    trackingDismissBtn: document.getElementById("trackingDismissBtn"),
    
    // Modal Direcciones
    addressModal: document.getElementById("addressModal"),
    closeAddressModalBtn: document.getElementById("closeAddressModalBtn"),
    addressesList: document.getElementById("addressesList"),
    saveNewAddressBtn: document.getElementById("saveNewAddressBtn"),
    newAddressInput: document.getElementById("newAddressInput"),
    
    // Modal Perfil de Usuario
    profileModal: document.getElementById("profileOptionsModal"),
    closeProfileModalBtn: document.getElementById("closeProfileModalBtn"),
    profileTabs: document.querySelectorAll(".profile-tab-btn"),
    profileTabPanes: document.querySelectorAll(".profile-tab-pane"),
    profileOrdersList: document.getElementById("profileOrdersList"),
    profileFavoritesList: document.getElementById("profileFavoritesList"),
    
    // Contenedor Toasts
    toastsContainer: document.getElementById("toastsContainer")
  };

  // ========================================================
  // INICIALIZACIÓN
  // ========================================================
  function init() {
    renderAddress();
    renderCategories();
    renderProducts();
    updateCartUI();
    renderPromoBanners();
    setupEventListeners();

    // Escuchar cambios del estado global del carrito
    window.cartManager.subscribe(() => {
      updateCartUI();
      renderAddress();
      // Si el tab de perfil o favoritos está abierto, actualizar
      if (elements.profileModal && elements.profileModal.classList.contains("active")) {
        renderProfileOrders();
        renderProfileFavorites();
      }
    });
  }

  // ========================================================
  // RENDER: DIRECCIÓN ACTUAL
  // ========================================================
  function renderAddress() {
    if (elements.currentAddressText && window.cartManager.currentAddress) {
      elements.currentAddressText.textContent = `${window.cartManager.currentAddress.name}: ${window.cartManager.currentAddress.address}`;
    }
  }

  // ========================================================
  // RENDER: BANNERS PROMOCIONALES
  // ========================================================
  function renderPromoBanners() {
    if (!elements.promoBanner) return;
    const banner = PROMO_BANNERS[0];
    elements.promoBanner.innerHTML = `
      <div class="promo-card" style="background: ${banner.bgColor};">
        <div class="promo-content">
          <span class="promo-badge">${banner.badge}</span>
          <h3 class="promo-title">${banner.title}</h3>
          <p class="promo-subtitle">${banner.subtitle}</p>
          <button class="btn btn-sm btn-light btn-copy-coupon" data-coupon="${banner.coupon}">
            <i class="fas fa-tag"></i> Aplicar Cupón <strong>${banner.coupon}</strong>
          </button>
        </div>
        <div class="promo-icon">
          <i class="fas fa-gift"></i>
        </div>
      </div>
    `;

    const copyBtn = elements.promoBanner.querySelector(".btn-copy-coupon");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const coupon = copyBtn.dataset.coupon;
        const res = window.cartManager.applyCoupon(coupon);
        if (res.success) {
          showToast(res.message, "success", "fas fa-check-circle");
          openCartDrawer();
        } else {
          showToast(res.message, "warning", "fas fa-exclamation-triangle");
        }
      });
    }
  }

  // ========================================================
  // RENDER: CATEGORÍAS
  // ========================================================
  function renderCategories() {
    if (!elements.categoriesContainer) return;
    elements.categoriesContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="category-pill ${uiState.selectedCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
        <i class="${cat.icon}"></i>
        <span>${cat.name}</span>
      </button>
    `).join("");

    elements.categoriesContainer.querySelectorAll(".category-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        uiState.selectedCategory = btn.dataset.category;
        elements.categoriesContainer.querySelectorAll(".category-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts();
      });
    });
  }

  // ========================================================
  // FILTRADO Y ORDENACIÓN DE PRODUCTOS
  // ========================================================
  function getFilteredProducts() {
    return PRODUCTS.filter(p => {
      // Filtro por Categoría
      if (uiState.selectedCategory !== "todos" && p.category !== uiState.selectedCategory) {
        return false;
      }

      // Filtro por Búsqueda de Texto
      if (uiState.searchQuery.trim() !== "") {
        const q = uiState.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesRest = p.restaurant.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesRest && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Filtro por Etiquetas Rápidas
      if (uiState.selectedFilterTag === "top" && p.rating < 4.8) {
        return false;
      }
      if (uiState.selectedFilterTag === "free_shipping" && !p.tags.includes("Envío gratis")) {
        return false;
      }
      if (uiState.selectedFilterTag === "deals" && !p.tags.some(t => t.includes("Descuento") || t.includes("2x1") || t.includes("Combo"))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Ordenación
      if (uiState.sortBy === "price_asc") return a.price - b.price;
      if (uiState.sortBy === "price_desc") return b.price - a.price;
      if (uiState.sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews; // 'popular'
    });
  }

  // ========================================================
  // RENDER: CATÁLOGO DE PRODUCTOS
  // ========================================================
  function renderProducts() {
    if (!elements.productsGrid) return;
    const filtered = getFilteredProducts();

    if (elements.resultsCount) {
      elements.resultsCount.textContent = `${filtered.length} platillo${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      elements.productsGrid.innerHTML = "";
      if (elements.emptyState) elements.emptyState.classList.remove("d-none");
      return;
    }

    if (elements.emptyState) elements.emptyState.classList.add("d-none");

    elements.productsGrid.innerHTML = filtered.map(product => {
      const isFav = window.cartManager.isFavorite(product.id);
      const starIcons = Array.from({ length: 5 }, (_, i) => {
        const isFull = i < Math.floor(product.rating);
        const isHalf = !isFull && (product.rating - i >= 0.5);
        if (isFull) return '<i class="fas fa-star text-warning"></i>';
        if (isHalf) return '<i class="fas fa-star-half-alt text-warning"></i>';
        return '<i class="far fa-star text-muted"></i>';
      }).join("");

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-card-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="favorite-toggle-btn ${isFav ? 'active' : ''}" data-id="${product.id}" title="Favorito">
              <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="product-tags-badges">
              ${product.tags.map(t => `<span class="product-badge">${t}</span>`).join("")}
            </div>
          </div>
          
          <div class="product-card-body">
            <div class="product-meta-row">
              <span class="restaurant-name"><i class="fas fa-store"></i> ${product.restaurant}</span>
              <span class="delivery-time"><i class="fas fa-clock"></i> ${product.deliveryTime}</span>
            </div>
            
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc-snippet">${product.description}</p>
            
            <div class="product-rating-row">
              <div class="stars">${starIcons}</div>
              <span class="rating-num"><strong>${product.rating.toFixed(1)}</strong> (${product.reviews})</span>
            </div>
            
            <div class="product-card-footer">
              <div class="product-price">
                <span class="currency">$</span>${product.price.toFixed(2)}
              </div>
              <button class="btn btn-primary btn-add-fast" data-id="${product.id}" title="Añadir al pedido">
                <i class="fas fa-plus"></i> Agregar
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    attachProductCardEvents();
  }

  function attachProductCardEvents() {
    // Clic en la tarjeta abre el detalle del producto
    elements.productsGrid.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", (e) => {
        // Ignorar si se hizo clic en el botón de favoritos o en el botón rápido de agregar
        if (e.target.closest(".favorite-toggle-btn") || e.target.closest(".btn-add-fast")) {
          return;
        }
        const productId = parseInt(card.dataset.id, 10);
        openProductModal(productId);
      });
    });

    // Toggle de favoritos
    elements.productsGrid.querySelectorAll(".favorite-toggle-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.id, 10);
        const isNowFav = window.cartManager.toggleFavorite(productId);
        btn.classList.toggle("active", isNowFav);
        const icon = btn.querySelector("i");
        icon.className = isNowFav ? "fas fa-heart" : "far fa-heart";
        
        const prod = PRODUCTS.find(p => p.id === productId);
        const name = prod ? prod.name : "Platillo";
        showToast(
          isNowFav ? `❤️ "${name}" guardado en favoritos.` : `Eliminado de favoritos.`,
          "info",
          "fas fa-heart"
        );
      });
    });

    // Botón rápido de agregar
    elements.productsGrid.querySelectorAll(".btn-add-fast").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.id, 10);
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
          window.cartManager.addItem(product, 1, [], "");
          showToast(`¡${product.name} agregado al carrito!`, "success", "fas fa-shopping-bag");
          animateCartIcon();
        }
      });
    });
  }

  // ========================================================
  // MODAL: DETALLE DEL PRODUCTO Y PERSONALIZACIÓN
  // ========================================================
  function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    uiState.modalProduct = product;
    uiState.modalQuantity = 1;
    uiState.modalSelectedOptions = [];

    elements.modalProductImg.src = product.image;
    elements.modalProductImg.alt = product.name;
    elements.modalProductName.textContent = product.name;
    elements.modalProductRestaurant.textContent = product.restaurant;
    elements.modalProductRating.innerHTML = `<i class="fas fa-star text-warning"></i> ${product.rating.toFixed(1)} (${product.reviews} reseñas)`;
    elements.modalProductTime.textContent = product.deliveryTime;
    elements.modalProductCalories.textContent = product.calories || "500 kcal";
    elements.modalProductDesc.textContent = product.description;
    elements.modalInstructions.value = "";
    elements.modalQtyValue.textContent = "1";

    // Badges
    elements.modalProductTags.innerHTML = product.tags.map(t => `<span class="product-badge">${t}</span>`).join("");

    // Opciones adicionales
    if (product.options && product.options.length > 0) {
      elements.modalProductOptions.innerHTML = `
        <h4 class="modal-options-title">Personaliza tu orden</h4>
        <div class="options-checklist">
          ${product.options.map(opt => `
            <label class="custom-option-item">
              <input type="checkbox" class="modal-option-checkbox" data-opt-id="${opt.id}" data-name="${opt.name}" data-price="${opt.price}">
              <span class="option-name">${opt.name}</span>
              <span class="option-price">+ $${opt.price.toFixed(2)}</span>
            </label>
          `).join("")}
        </div>
      `;

      elements.modalProductOptions.querySelectorAll(".modal-option-checkbox").forEach(chk => {
        chk.addEventListener("change", () => {
          updateModalSelectedOptions();
        });
      });
    } else {
      elements.modalProductOptions.innerHTML = "";
    }

    updateModalTotalPrice();
    elements.productDetailModal.classList.add("active");
    document.body.classList.add("modal-open-lock");
  }

  function closeProductModal() {
    elements.productDetailModal.classList.remove("active");
    document.body.classList.remove("modal-open-lock");
    uiState.modalProduct = null;
  }

  function updateModalSelectedOptions() {
    const checkboxes = elements.modalProductOptions.querySelectorAll(".modal-option-checkbox:checked");
    uiState.modalSelectedOptions = Array.from(checkboxes).map(chk => ({
      id: chk.dataset.optId,
      name: chk.dataset.name,
      price: parseFloat(chk.dataset.price)
    }));
    updateModalTotalPrice();
  }

  function updateModalTotalPrice() {
    if (!uiState.modalProduct) return;
    const extras = uiState.modalSelectedOptions.reduce((acc, o) => acc + o.price, 0);
    const totalUnit = uiState.modalProduct.price + extras;
    const finalTotal = totalUnit * uiState.modalQuantity;
    elements.modalBtnTotal.textContent = `$${finalTotal.toFixed(2)}`;
  }

  // ========================================================
  // CARRITO DE COMPRAS: DRAWER Y ACTUALIZACIÓN
  // ========================================================
  function updateCartUI() {
    const totals = window.cartManager.getTotals();
    const cart = window.cartManager.cart;

    // Actualizar badge en header
    if (elements.cartBadge) {
      elements.cartBadge.textContent = totals.itemCount;
      elements.cartBadge.style.display = totals.itemCount > 0 ? "inline-flex" : "none";
    }

    // Actualizar Drawer
    if (cart.length === 0) {
      elements.cartItemsList.innerHTML = "";
      elements.cartEmptyView.classList.remove("d-none");
      elements.cartFooter.classList.add("d-none");
      return;
    }

    elements.cartEmptyView.classList.add("d-none");
    elements.cartFooter.classList.remove("d-none");

    // Render ítems
    elements.cartItemsList.innerHTML = cart.map(item => {
      const optionsHtml = item.selectedOptions && item.selectedOptions.length > 0
        ? `<ul class="cart-item-extras">${item.selectedOptions.map(o => `<li>+ ${o.name} ($${o.price.toFixed(2)})</li>`).join("")}</ul>`
        : "";
      const instructionsHtml = item.instructions
        ? `<p class="cart-item-note"><i class="fas fa-pencil-alt"></i> "${item.instructions}"</p>`
        : "";

      return `
        <div class="cart-item" data-key="${item.itemKey}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <div class="cart-item-header">
              <h4 class="cart-item-title">${item.name}</h4>
              <button class="btn-remove-item" data-key="${item.itemKey}" title="Eliminar">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            ${optionsHtml}
            ${instructionsHtml}
            <div class="cart-item-bottom">
              <span class="cart-item-price">$${(item.unitPrice * item.quantity).toFixed(2)}</span>
              <div class="quantity-stepper small">
                <button class="btn-qty-cart minus" data-key="${item.itemKey}">-</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="btn-qty-cart plus" data-key="${item.itemKey}">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Eventos de cantidad y eliminación en el carrito
    elements.cartItemsList.querySelectorAll(".btn-qty-cart.minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        const it = cart.find(i => i.itemKey === key);
        if (it) window.cartManager.updateQuantity(key, it.quantity - 1);
      });
    });

    elements.cartItemsList.querySelectorAll(".btn-qty-cart.plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        const it = cart.find(i => i.itemKey === key);
        if (it) window.cartManager.updateQuantity(key, it.quantity + 1);
      });
    });

    elements.cartItemsList.querySelectorAll(".btn-remove-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        window.cartManager.removeItem(key);
        showToast("Producto eliminado del carrito", "info", "fas fa-trash-alt");
      });
    });

    // Actualizar Totales
    elements.cartSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    elements.cartShipping.textContent = totals.shipping === 0 ? "Gratis" : `$${totals.shipping.toFixed(2)}`;
    elements.cartTotal.textContent = `$${totals.total.toFixed(2)}`;

    // Cupón
    if (window.cartManager.appliedCoupon) {
      elements.cartDiscountRow.classList.remove("d-none");
      elements.cartDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
      elements.appliedCouponBadge.classList.remove("d-none");
      elements.couponText.textContent = `${window.cartManager.appliedCoupon.code} (${window.cartManager.appliedCoupon.description})`;
      elements.couponInput.value = "";
    } else {
      elements.cartDiscountRow.classList.add("d-none");
      elements.appliedCouponBadge.classList.add("d-none");
    }
  }

  function openCartDrawer() {
    elements.cartDrawer.classList.add("active");
    elements.cartOverlay.classList.add("active");
    document.body.classList.add("modal-open-lock");
  }

  function closeCartDrawer() {
    elements.cartDrawer.classList.remove("active");
    elements.cartOverlay.classList.remove("active");
    document.body.classList.remove("modal-open-lock");
  }

  function animateCartIcon() {
    if (!elements.cartToggleBtn) return;
    elements.cartToggleBtn.classList.add("cart-bounce");
    setTimeout(() => {
      elements.cartToggleBtn.classList.remove("cart-bounce");
    }, 600);
  }

  // ========================================================
  // CHECKOUT Y CONFIRMACIÓN DE PEDIDO
  // ========================================================
  function openCheckoutModal() {
    closeCartDrawer();
    const totals = window.cartManager.getTotals();
    const cart = window.cartManager.cart;

    if (cart.length === 0) {
      showToast("Tu carrito está vacío.", "warning", "fas fa-shopping-cart");
      return;
    }

    elements.checkoutAddressInput.value = window.cartManager.currentAddress.address;
    elements.checkoutPhoneInput.value = "+57 310 987 6543";
    elements.checkoutNotesInput.value = "";
    elements.checkoutTotalDisplay.textContent = `$${totals.total.toFixed(2)}`;

    elements.checkoutItemsSummary.innerHTML = cart.map(i => `
      <div class="checkout-summary-row">
        <span>${i.quantity}x ${i.name}</span>
        <strong>$${(i.unitPrice * i.quantity).toFixed(2)}</strong>
      </div>
    `).join("");

    elements.checkoutModal.classList.add("active");
    document.body.classList.add("modal-open-lock");
  }

  function closeCheckoutModal() {
    elements.checkoutModal.classList.remove("active");
    document.body.classList.remove("modal-open-lock");
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const address = elements.checkoutAddressInput.value.trim();
    const phone = elements.checkoutPhoneInput.value.trim();
    const notes = elements.checkoutNotesInput.value.trim();
    const paymentRadio = elements.checkoutForm.querySelector("input[name='paymentMethod']:checked");
    const paymentMethod = paymentRadio ? paymentRadio.value : "Efectivo";

    if (!address) {
      showToast("Por favor ingresa una dirección de entrega válida.", "warning", "fas fa-map-marker-alt");
      return;
    }

    const orderData = {
      address,
      phone,
      notes,
      paymentMethod
    };

    try {
      const order = window.cartManager.createOrder(orderData);
      closeCheckoutModal();
      openTrackingModal(order);
      showToast("¡Pedido confirmado con éxito!", "success", "fas fa-check-circle");
    } catch (err) {
      showToast(err.message, "danger", "fas fa-times-circle");
    }
  }

  // ========================================================
  // SIMULACIÓN DE TRACKING EN VIVO DEL PEDIDO
  // ========================================================
  function openTrackingModal(order) {
    if (uiState.trackingTimer) clearInterval(uiState.trackingTimer);

    elements.trackingOrderNumber.textContent = `#${order.id}`;
    elements.trackingOrderTotal.textContent = `$${order.totals.total.toFixed(2)}`;

    // Resetear pasos
    elements.trackingSteps.forEach((s, idx) => {
      s.classList.remove("completed", "active");
      if (idx === 0) s.classList.add("completed");
    });
    elements.trackingProgressBar.style.width = "25%";
    elements.trackingStatusMessage.textContent = "El restaurante ha recibido y confirmado tu pedido.";

    elements.trackingModal.classList.add("active");
    document.body.classList.add("modal-open-lock");

    // Iniciar simulación de progreso
    let currentStep = 1;
    uiState.trackingTimer = setInterval(() => {
      currentStep++;
      if (currentStep === 2) {
        elements.trackingSteps[1].classList.add("active");
        elements.trackingProgressBar.style.width = "50%";
        elements.trackingStatusMessage.textContent = "👨‍🍳 El chef está preparando tus platillos con ingredientes frescos...";
        showToast("👨‍🍳 Tu comida se está preparando.", "info", "fas fa-utensils");
      } else if (currentStep === 3) {
        elements.trackingSteps[1].classList.remove("active");
        elements.trackingSteps[1].classList.add("completed");
        elements.trackingSteps[2].classList.add("active");
        elements.trackingProgressBar.style.width = "75%";
        elements.trackingStatusMessage.textContent = "🛵 Carlos (repartidor) recogió tu pedido y va en camino a tu dirección.";
        showToast("🛵 ¡El repartidor va en camino!", "info", "fas fa-motorcycle");
      } else if (currentStep === 4) {
        elements.trackingSteps[2].classList.remove("active");
        elements.trackingSteps[2].classList.add("completed");
        elements.trackingSteps[3].classList.add("completed");
        elements.trackingProgressBar.style.width = "100%";
        elements.trackingStatusMessage.textContent = "🎉 ¡Tu pedido ha sido entregado en la puerta! Que lo disfrutes.";
        showToast("🎉 ¡Tu pedido ha llegado! Buen provecho.", "success", "fas fa-box-open");
        clearInterval(uiState.trackingTimer);
        uiState.trackingTimer = null;
      }
    }, 4500);
  }

  function closeTrackingModal() {
    if (uiState.trackingTimer) {
      clearInterval(uiState.trackingTimer);
      uiState.trackingTimer = null;
    }
    elements.trackingModal.classList.remove("active");
    document.body.classList.remove("modal-open-lock");
  }

  // ========================================================
  // MODAL: SELECCIÓN DE DIRECCIÓN
  // ========================================================
  function openAddressModal() {
    renderAddressList();
    elements.addressModal.classList.add("active");
    document.body.classList.add("modal-open-lock");
  }

  function closeAddressModal() {
    elements.addressModal.classList.remove("active");
    document.body.classList.remove("modal-open-lock");
  }

  function renderAddressList() {
    elements.addressesList.innerHTML = DEFAULT_ADDRESSES.map(addr => {
      const isSelected = window.cartManager.currentAddress && window.cartManager.currentAddress.id === addr.id;
      return `
        <div class="address-option-item ${isSelected ? 'selected' : ''}" data-id="${addr.id}">
          <div class="address-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="address-details">
            <strong>${addr.name}</strong>
            <p>${addr.address}, ${addr.city}</p>
          </div>
          ${isSelected ? '<span class="badge badge-success"><i class="fas fa-check"></i> Activa</span>' : ''}
        </div>
      `;
    }).join("");

    elements.addressesList.querySelectorAll(".address-option-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        const found = DEFAULT_ADDRESSES.find(a => a.id === id);
        if (found) {
          window.cartManager.setAddress(found);
          showToast(`Dirección cambiada a: ${found.name}`, "info", "fas fa-map-marker-alt");
          closeAddressModal();
        }
      });
    });
  }

  // ========================================================
  // MODAL: PERFIL, HISTORIAL Y FAVORITOS
  // ========================================================
  function openProfileModal() {
    renderProfileOrders();
    renderProfileFavorites();
    elements.profileModal.classList.add("active");
    document.body.classList.add("modal-open-lock");
  }

  function closeProfileModal() {
    elements.profileModal.classList.remove("active");
    document.body.classList.remove("modal-open-lock");
  }

  function renderProfileOrders() {
    if (!elements.profileOrdersList) return;
    const orders = window.cartManager.orders;

    if (orders.length === 0) {
      elements.profileOrdersList.innerHTML = `
        <div class="empty-tab-state">
          <i class="fas fa-receipt"></i>
          <p>Aún no has realizado pedidos.</p>
          <button class="btn btn-sm btn-primary" onclick="document.getElementById('closeProfileModalBtn').click();">Explorar Menú</button>
        </div>
      `;
      return;
    }

    elements.profileOrdersList.innerHTML = orders.map(ord => `
      <div class="profile-order-card">
        <div class="order-header-row">
          <div>
            <strong>Pedido #${ord.id}</strong>
            <span class="order-date">${ord.displayDate}</span>
          </div>
          <span class="order-status-badge completed">Entregado</span>
        </div>
        <div class="order-items-snippet">
          ${ord.items.map(it => `<div>${it.quantity}x ${it.name}</div>`).join("")}
        </div>
        <div class="order-footer-row">
          <span>Total pagado: <strong>$${ord.totals.total.toFixed(2)}</strong></span>
          <button class="btn btn-sm btn-outline-primary btn-reorder" data-order-id="${ord.id}">
            <i class="fas fa-redo-alt"></i> Repetir pedido
          </button>
        </div>
      </div>
    `).join("");

    elements.profileOrdersList.querySelectorAll(".btn-reorder").forEach(btn => {
      btn.addEventListener("click", () => {
        const orderId = btn.dataset.orderId;
        const ord = orders.find(o => o.id === orderId);
        if (ord) {
          ord.items.forEach(it => {
            const prod = PRODUCTS.find(p => p.id === it.productId);
            if (prod) {
              window.cartManager.addItem(prod, it.quantity, it.selectedOptions, it.instructions);
            }
          });
          closeProfileModal();
          openCartDrawer();
          showToast("Productos del pedido añadidos al carrito", "success", "fas fa-shopping-bag");
        }
      });
    });
  }

  function renderProfileFavorites() {
    if (!elements.profileFavoritesList) return;
    const favIds = Array.from(window.cartManager.favorites);
    const favProducts = PRODUCTS.filter(p => favIds.includes(p.id));

    if (favProducts.length === 0) {
      elements.profileFavoritesList.innerHTML = `
        <div class="empty-tab-state">
          <i class="far fa-heart"></i>
          <p>No tienes platillos guardados en tus favoritos.</p>
        </div>
      `;
      return;
    }

    elements.profileFavoritesList.innerHTML = favProducts.map(p => `
      <div class="profile-fav-item">
        <img src="${p.image}" alt="${p.name}">
        <div class="fav-item-details">
          <strong>${p.name}</strong>
          <span class="fav-restaurant">${p.restaurant}</span>
          <span class="fav-price">$${p.price.toFixed(2)}</span>
        </div>
        <button class="btn btn-sm btn-primary btn-fav-add" data-id="${p.id}">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `).join("");

    elements.profileFavoritesList.querySelectorAll(".btn-fav-add").forEach(btn => {
      btn.addEventListener("click", () => {
        const pId = parseInt(btn.dataset.id, 10);
        const prod = PRODUCTS.find(p => p.id === pId);
        if (prod) {
          window.cartManager.addItem(prod, 1, [], "");
          showToast(`¡${prod.name} agregado al carrito!`, "success", "fas fa-shopping-bag");
        }
      });
    });
  }

  // ========================================================
  // SISTEMA DE NOTIFICACIONES TOAST
  // ========================================================
  function showToast(message, type = "info", icon = "fas fa-info-circle") {
    if (!elements.toastsContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast-pill ${type}`;
    toast.innerHTML = `
      <div class="toast-icon"><i class="${icon}"></i></div>
      <div class="toast-text">${message}</div>
      <button class="toast-close">&times;</button>
    `;

    elements.toastsContainer.appendChild(toast);

    // Animación de entrada
    requestAnimationFrame(() => {
      toast.classList.add("visible");
    });

    const dismiss = () => {
      toast.classList.remove("visible");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    };

    toast.querySelector(".toast-close").addEventListener("click", dismiss);
    setTimeout(dismiss, 3500);
  }

  // ========================================================
  // EVENT LISTENERS GLOBALES
  // ========================================================
  function setupEventListeners() {
    // Dirección
    if (elements.addressBtn) {
      elements.addressBtn.addEventListener("click", openAddressModal);
    }
    if (elements.closeAddressModalBtn) {
      elements.closeAddressModalBtn.addEventListener("click", closeAddressModal);
    }
    if (elements.saveNewAddressBtn) {
      elements.saveNewAddressBtn.addEventListener("click", () => {
        const val = elements.newAddressInput.value.trim();
        if (val) {
          const newObj = {
            id: "addr-" + Date.now(),
            name: "Dirección Nueva",
            address: val,
            city: "Bogotá",
            isDefault: false
          };
          DEFAULT_ADDRESSES.push(newObj);
          window.cartManager.setAddress(newObj);
          elements.newAddressInput.value = "";
          showToast("Nueva dirección guardada y seleccionada", "success", "fas fa-map-marker-alt");
          closeAddressModal();
        }
      });
    }

    // Carrito Toggle
    if (elements.cartToggleBtn) {
      elements.cartToggleBtn.addEventListener("click", openCartDrawer);
    }
    if (elements.closeCartBtn) {
      elements.closeCartBtn.addEventListener("click", closeCartDrawer);
    }
    if (elements.cartOverlay) {
      elements.cartOverlay.addEventListener("click", closeCartDrawer);
    }

    // Buscador
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", (e) => {
        uiState.searchQuery = e.target.value;
        if (elements.clearSearchBtn) {
          elements.clearSearchBtn.style.display = uiState.searchQuery ? "block" : "none";
        }
        renderProducts();
      });
    }
    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener("click", () => {
        elements.searchInput.value = "";
        uiState.searchQuery = "";
        elements.clearSearchBtn.style.display = "none";
        renderProducts();
      });
    }

    // Filtros Rápidos (Chips)
    elements.filterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        elements.filterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        uiState.selectedFilterTag = chip.dataset.filter;
        renderProducts();
      });
    });

    // Ordenación
    if (elements.sortSelect) {
      elements.sortSelect.addEventListener("change", (e) => {
        uiState.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Resetear filtros
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener("click", () => {
        uiState.selectedCategory = "todos";
        uiState.searchQuery = "";
        uiState.selectedFilterTag = "todos";
        uiState.sortBy = "popular";
        if (elements.searchInput) elements.searchInput.value = "";
        if (elements.clearSearchBtn) elements.clearSearchBtn.style.display = "none";
        if (elements.sortSelect) elements.sortSelect.value = "popular";
        elements.filterChips.forEach(c => c.classList.remove("active"));
        if (elements.filterChips[0]) elements.filterChips[0].classList.add("active");
        renderCategories();
        renderProducts();
      });
    }

    // Cupones en el Carrito
    if (elements.applyCouponBtn) {
      elements.applyCouponBtn.addEventListener("click", () => {
        const code = elements.couponInput.value.trim();
        const res = window.cartManager.applyCoupon(code);
        if (res.success) {
          showToast(res.message, "success", "fas fa-check-circle");
        } else {
          showToast(res.message, "warning", "fas fa-exclamation-triangle");
        }
      });
    }
    if (elements.removeCouponBtn) {
      elements.removeCouponBtn.addEventListener("click", () => {
        window.cartManager.removeCoupon();
        showToast("Cupón retirado", "info", "fas fa-times");
      });
    }

    // Vaciar Carrito
    if (elements.clearCartBtn) {
      elements.clearCartBtn.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
          window.cartManager.clearCart();
          showToast("Carrito vaciado.", "info", "fas fa-trash");
        }
      });
    }

    // Ir a Checkout
    if (elements.goToCheckoutBtn) {
      elements.goToCheckoutBtn.addEventListener("click", openCheckoutModal);
    }
    if (elements.closeCheckoutModalBtn) {
      elements.closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
    }
    if (elements.checkoutForm) {
      elements.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
    }

    // Tracking Modal
    if (elements.closeTrackingModalBtn) {
      elements.closeTrackingModalBtn.addEventListener("click", closeTrackingModal);
    }
    if (elements.trackingDismissBtn) {
      elements.trackingDismissBtn.addEventListener("click", closeTrackingModal);
    }

    // Modal Producto Controles
    if (elements.closeProductModalBtn) {
      elements.closeProductModalBtn.addEventListener("click", closeProductModal);
    }
    if (elements.modalQtyMinus) {
      elements.modalQtyMinus.addEventListener("click", () => {
        if (uiState.modalQuantity > 1) {
          uiState.modalQuantity--;
          elements.modalQtyValue.textContent = uiState.modalQuantity;
          updateModalTotalPrice();
        }
      });
    }
    if (elements.modalQtyPlus) {
      elements.modalQtyPlus.addEventListener("click", () => {
        uiState.modalQuantity++;
        elements.modalQtyValue.textContent = uiState.modalQuantity;
        updateModalTotalPrice();
      });
    }
    if (elements.modalAddToCartBtn) {
      elements.modalAddToCartBtn.addEventListener("click", () => {
        if (!uiState.modalProduct) return;
        const note = elements.modalInstructions.value;
        window.cartManager.addItem(
          uiState.modalProduct,
          uiState.modalQuantity,
          uiState.modalSelectedOptions,
          note
        );
        showToast(`¡${uiState.modalProduct.name} añadido al carrito!`, "success", "fas fa-shopping-bag");
        animateCartIcon();
        closeProductModal();
      });
    }

    // Perfil Modal
    const profileAvatarBtn = document.getElementById("profileAvatarBtn");
    if (profileAvatarBtn) {
      profileAvatarBtn.addEventListener("click", openProfileModal);
    }
    if (elements.closeProfileModalBtn) {
      elements.closeProfileModalBtn.addEventListener("click", closeProfileModal);
    }

    // Tabs del perfil
    elements.profileTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        elements.profileTabs.forEach(t => t.classList.remove("active"));
        elements.profileTabPanes.forEach(p => p.classList.remove("active"));

        tab.classList.add("active");
        const targetPane = document.getElementById(tab.dataset.tab);
        if (targetPane) targetPane.classList.add("active");
      });
    });

    // Cerrar modales al presionar la tecla Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (elements.productDetailModal.classList.contains("active")) closeProductModal();
        if (elements.cartDrawer.classList.contains("active")) closeCartDrawer();
        if (elements.checkoutModal.classList.contains("active")) closeCheckoutModal();
        if (elements.trackingModal.classList.contains("active")) closeTrackingModal();
        if (elements.addressModal.classList.contains("active")) closeAddressModal();
        if (elements.profileModal.classList.contains("active")) closeProfileModal();
      }
    });
  }

  // Arrancar aplicación
  init();
});
