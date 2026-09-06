/* =========================================================
   carrito.js
   Manejo del carrito de compras usando LocalStorage.
   Estructura guardada: [{ id, cantidad }, ...]
   ========================================================= */

const CLAVE_STORAGE = "gasElVolcan_carrito";

// Lee el carrito desde LocalStorage (arreglo vacío si no existe)
function leerCarrito() {
  const datos = localStorage.getItem(CLAVE_STORAGE);
  return datos ? JSON.parse(datos) : [];
}

// Guarda el carrito en LocalStorage
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Agrega un producto al carrito (o suma 1 si ya existe)
function agregarAlCarrito(idProducto) {
  const carrito = leerCarrito();
  const item = carrito.find(function (i) { return i.id === idProducto; });

  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  mostrarAvisoCarrito();
}

// Quita por completo un producto del carrito
function quitarDelCarrito(idProducto) {
  let carrito = leerCarrito();
  carrito = carrito.filter(function (i) { return i.id !== idProducto; });
  guardarCarrito(carrito);
  renderizarCarrito();
}

// Cambia la cantidad de un producto ya agregado
function cambiarCantidad(idProducto, nuevaCantidad) {
  nuevaCantidad = parseInt(nuevaCantidad, 10);
  if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;

  const carrito = leerCarrito();
  const item = carrito.find(function (i) { return i.id === idProducto; });
  if (item) item.cantidad = nuevaCantidad;

  guardarCarrito(carrito);
  renderizarCarrito();
}

// Actualiza el contador que aparece junto al ícono del carrito en el header
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;
  const carrito = leerCarrito();
  const totalUnidades = carrito.reduce(function (acc, i) { return acc + i.cantidad; }, 0);
  contador.textContent = totalUnidades;
  contador.classList.toggle("oculto", totalUnidades === 0);
}

// Pequeño aviso visual al agregar un producto (si existe el elemento en la página)
function mostrarAvisoCarrito() {
  const aviso = document.getElementById("aviso-carrito");
  if (!aviso) return;
  aviso.classList.remove("oculto");
  clearTimeout(window._timeoutAvisoCarrito);
  window._timeoutAvisoCarrito = setTimeout(function () {
    aviso.classList.add("oculto");
  }, 2000);
}

// Dibuja la tabla completa del carrito en carrito.html
function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-contenido");
  if (!contenedor) return;

  const carrito = leerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML =
      '<div class="carrito-vacio">' +
        '<p>Tu carrito está vacío.</p>' +
        '<a class="boton boton--primario" href="catalogo.html">Ir al catálogo</a>' +
      '</div>';
    return;
  }

  let filas = "";
  let total = 0;

  carrito.forEach(function (item) {
    const producto = buscarProductoPorId(item.id);
    if (!producto) return;
    const subtotal = producto.precio * item.cantidad;
    total += subtotal;

    filas +=
      '<tr>' +
        '<td><div class="tabla-carrito__producto">' +
          '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
          '<span>' + producto.nombre + '</span>' +
        '</div></td>' +
        '<td>' + formatearPrecio(producto.precio) + '</td>' +
        '<td><input type="number" min="1" value="' + item.cantidad + '" style="width:70px" ' +
          'onchange="cambiarCantidad(\'' + producto.id + '\', this.value)"></td>' +
        '<td>' + formatearPrecio(subtotal) + '</td>' +
        '<td><button class="boton boton--peligro boton--pequeno" onclick="quitarDelCarrito(\'' + producto.id + '\')">Quitar</button></td>' +
      '</tr>';
  });

  contenedor.innerHTML =
    '<table class="tabla-carrito">' +
      '<thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead>' +
      '<tbody>' + filas + '</tbody>' +
    '</table>' +
    '<div class="carrito-resumen">' +
      '<div class="carrito-resumen__linea"><span>Subtotal</span><span>' + formatearPrecio(total) + '</span></div>' +
      '<div class="carrito-resumen__linea"><span>Despacho</span><span>Se coordina al confirmar</span></div>' +
      '<div class="carrito-resumen__linea carrito-resumen__total"><span>Total</span><span>' + formatearPrecio(total) + '</span></div>' +
      '<button class="boton boton--primario" style="width:100%; margin-top:14px" onclick="alert(\'Pedido registrado. Nos pondremos en contacto para coordinar la entrega.\')">Confirmar pedido</button>' +
    '</div>';
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarContadorCarrito();
  renderizarCarrito();
});
