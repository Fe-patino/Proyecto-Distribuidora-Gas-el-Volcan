/* =========================================================
   catalogo.js
   Arreglo de productos (cilindros de gas) + render dinámico
   del catálogo y de la vista de detalle.
   ========================================================= */

// Arreglo de productos según catálogo oficial de la distribuidora.
const PRODUCTOS = [
  {
    id: "CL001",
    nombre: "Cilindro GLP 5 kg",
    kg: 5,
    precio: 6500,
    stock: 80,
    imagen: "img/gasde5k.png",
    descripcionBreve: "Ideal para cocina o calefacción pequeña en departamentos y espacios reducidos.",
    descripcionCompleta: "Cilindro de gas licuado de petróleo de 5 kg, pensado para uso residencial ligero: cocinas pequeñas, calefactores portátiles o como respaldo. Es el formato más liviano y fácil de transportar dentro del hogar, compatible con reguladores domésticos estándar."
  },
  {
    id: "CL002",
    nombre: "Cilindro GLP 11 kg",
    kg: 11,
    precio: 12000,
    stock: 200,
    imagen: "img/gasde11k.png",
    descripcionBreve: "El formato más usado en hogares chilenos. Rinde para cocina y agua caliente.",
    descripcionCompleta: "Cilindro estándar doméstico de 11 kg, el más utilizado en los hogares de Chillán y alrededores. Rinde para cocina, calefont y estufas de uso diario. Compatible con reguladores estándar de 1 etapa (28 mbar)."
  },
  {
    id: "CL003",
    nombre: "Cilindro GLP 15 kg",
    kg: 15,
    precio: 16000,
    stock: 90,
    imagen: "img/gasde15k.png",
    descripcionBreve: "Mayor autonomía para hogares de alto consumo o locales pequeños.",
    descripcionCompleta: "Cilindro de 15 kg pensado para hogares con alto consumo de gas o pequeños locales comerciales. Ofrece mayor autonomía entre recargas, reduciendo la frecuencia de pedidos. Compatible con reguladores domésticos estándar."
  }
];

// Devuelve un producto por su id (usado en detalle-producto.html)
function buscarProductoPorId(id) {
  return PRODUCTOS.find(function (p) { return p.id === id; });
}

// Formatea un número como precio en pesos chilenos
function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

// Renderiza las tarjetas del catálogo dentro de #catalogo-grid
function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogo-grid");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  PRODUCTOS.forEach(function (producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML =
      '<div class="tarjeta__imagen"><img src="' + producto.imagen + '" alt="' + producto.nombre + '"></div>' +
      '<div class="tarjeta__cuerpo">' +
        '<span class="tarjeta__categoria">Cilindros de gas</span>' +
        '<h3 class="tarjeta__titulo">' + producto.nombre + '</h3>' +
        '<p>' + producto.descripcionBreve + '</p>' +
        '<span class="tarjeta__precio">' + formatearPrecio(producto.precio) + '</span>' +
        '<div class="tarjeta__acciones">' +
          '<a class="boton boton--secundario boton--pequeno" href="detalle-producto.html?id=' + producto.id + '">Ver detalle</a>' +
          '<button class="boton boton--primario boton--pequeno" onclick="agregarAlCarrito(\'' + producto.id + '\')">Agregar</button>' +
        '</div>' +
      '</div>';
    contenedor.appendChild(tarjeta);
  });
}

// Renderiza la información de un producto en detalle-producto.html
function renderizarDetalleProducto() {
  const contenedor = document.getElementById("detalle-producto");
  if (!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const producto = buscarProductoPorId(id);

  if (!producto) {
    contenedor.innerHTML = "<p>No encontramos el producto solicitado. <a href='catalogo.html'>Volver al catálogo</a></p>";
    return;
  }

  document.title = producto.nombre + " — Gas El Volcán";

  contenedor.innerHTML =
    '<div class="detalle-producto__imagen"><img src="' + producto.imagen + '" alt="' + producto.nombre + '"></div>' +
    '<div class="detalle-producto__info">' +
      '<span class="badge-stock">Stock disponible: ' + producto.stock + ' unidades</span>' +
      '<h1>' + producto.nombre + '</h1>' +
      '<p>' + producto.descripcionCompleta + '</p>' +
      '<div class="detalle-producto__precio">' + formatearPrecio(producto.precio) + '</div>' +
      '<div class="tarjeta__acciones">' +
        '<button class="boton boton--primario" onclick="agregarAlCarrito(\'' + producto.id + '\')">Agregar al carrito</button>' +
        '<a class="boton boton--secundario" href="catalogo.html">Volver al catálogo</a>' +
      '</div>' +
    '</div>';
}

// Renderiza 3 productos destacados en index.html (#destacados-grid)
function renderizarDestacados() {
  const contenedor = document.getElementById("destacados-grid");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  PRODUCTOS.forEach(function (producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML =
      '<div class="tarjeta__imagen"><img src="' + producto.imagen + '" alt="' + producto.nombre + '"></div>' +
      '<div class="tarjeta__cuerpo">' +
        '<span class="tarjeta__categoria">Cilindros de gas</span>' +
        '<h3 class="tarjeta__titulo">' + producto.nombre + '</h3>' +
        '<span class="tarjeta__precio">' + formatearPrecio(producto.precio) + '</span>' +
        '<div class="tarjeta__acciones">' +
          '<a class="boton boton--primario boton--pequeno" href="detalle-producto.html?id=' + producto.id + '">Ver detalle</a>' +
        '</div>' +
      '</div>';
    contenedor.appendChild(tarjeta);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarCatalogo();
  renderizarDetalleProducto();
  renderizarDestacados();
});