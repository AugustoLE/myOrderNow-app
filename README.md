# 🍔 MyOrderNow • Food Delivery Web App (Beta v1.0)

> Aplicación web moderna y responsive para pedidos de comida a domicilio. Diseñada con enfoque **mobile-first**, interacción en tiempo real y persistencia en cliente. Ideal como proyecto de portafolio frontend.

---

## 🚀 Vista Rápida y Características

* **🍽️ Catálogo Dinámico y Categorizado:**
  * 8 platillos gastronómicos con fotografías en alta definición, etiquetas promocionales (*"Envío gratis"*, *"2x1"*, *"Bestseller"*), tiempos de entrega y valoraciones en estrellas.
  * Filtro por categorías temáticas (*Hamburguesas, Mexicana, Pizzas & Platos, Saludable, Mariscos, Postres*).
* **⚡ Búsqueda y Filtros en Tiempo Real:**
  * Buscador instantáneo con coincidencias en tiempo real por nombre, ingredientes y restaurante.
  * Filtros rápidos (*Top Valorados 4.8+*, *Envío Gratis*, *Ofertas & 2x1*) y ordenación por precio o popularidad.
* **🛒 Carrito de Compras Reactivo (Offcanvas Drawer):**
  * Control interactivo de cantidades, personalización de extras y notas especiales para la cocina.
  * Sistema de cupones de descuento (`BIENVENIDO10`, `ENVIOGRATIS`, `BURGERLOVER`).
  * Cálculo dinámico de subtotal, descuentos, costos de envío y total.
  * Persistencia en el navegador mediante `localStorage`.
* **🛵 Simulación de Checkout y Live Tracking:**
  * Formulario de checkout con selector de dirección, teléfono y métodos de pago (Efectivo, Tarjetas, Transferencia/Nequi).
  * Stepper animado en tiempo real de 4 etapas que simula el estado del pedido:
    1. *Pedido Confirmado* ➔ 2. *En Cocina* ➔ 3. *En Camino con Repartidor* ➔ 4. *¡Entregado!*
* **👤 Perfil de Usuario, Historial y Favoritos:**
  * Pestaña de historial con registro de pedidos anteriores y opción para **"Repetir Pedido"** con un solo clic.
  * Sistema de platillos favoritos con botón de corazón y acceso rápido.
  * Selector y gestor de direcciones de entrega múltiples.
* **🔔 Notificaciones Toast Fluidas:**
  * Avisos flotantes instantáneos ante cada acción (agregar al carrito, aplicar cupones, cambios de favoritos).

---

## 🛠️ Stack Tecnológico

* **Estructura:** HTML5 semántico con estándares de accesibilidad (ARIA) y SEO optimizado.
* **Estilos:** CSS3 Moderno con variables CSS (`:root`), efectos de *Glassmorphism* (`backdrop-filter`), CSS Grid y Flexbox responsivo.
* **Lógica & Estado:** JavaScript Vanilla (ES6+ modular) sin dependencias externas pesadas, con patrón observador (`CartManager`), persistencia en `localStorage` y manipulación del DOM nativa.
* **Iconografía & Tipografía:** FontAwesome 5 y Google Fonts (*Montserrat*).

---

## 📂 Estructura del Proyecto

```text
├── css/
│   ├── app.css           # Sistema de diseño moderno, variables CSS, animaciones y modales
│   └── main.css          # Estilos base y utilidades
├── js/
│   ├── data.js           # Catálogo de productos, categorías, cupones y banners
│   ├── cart.js           # Gestor de estado (CartManager), storage y lógica de negocio
│   └── app.js            # Controlador principal de la UI, eventos y modales
├── img/                  # Fotografías de productos y assets gráficos
├── index.html            # Punto de entrada principal
└── README.md             # Documentación del proyecto
```

---

## 💻 Cómo Ejecutar el Proyecto

No requiere instalación de bases de datos ni configuración compleja de servidores:

1. **Opción 1 (Directo):**
   Abre el archivo `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

2. **Opción 2 (Servidor Local de Desarrollo):**
   Puedes levantarlo usando cualquier servidor ligero:
   ```bash
   # Con npx serve
   npx serve .
   
   # O con la extensión Live Server de VS Code
   ```

---

## 🏷️ Cupones de Prueba Disponibles

Puedes probar el sistema de promociones en el carrito ingresando estos códigos:
* `BIENVENIDO10` — 10% de descuento en tu orden total.
* `ENVIOGRATIS` — Envío 100% gratuito.
* `BURGERLOVER` — $3.00 de descuento en órdenes mayores a $10.00.
