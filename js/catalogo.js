/* =========================================================
   catalogo.js
   Arreglo de productos (cilindros, reguladores, mangueras y
   accesorios) + render dinámico del catálogo y de la vista
   de detalle.
   Datos según: DSY1104 - Forma C - Catálogo Distribuidora Gas El Volcán
   ========================================================= */

// Arreglo de productos según catálogo oficial de la distribuidora.
const PRODUCTOS = [
  {
    id: "CL001",
    nombre: "Cilindro GLP 5 kg",
    categoria: "Cilindros de Gas",
    precio: 6500,
    precioComercial: 6000,
    stock: 80,
    imagen: "img/gasde5k.png",
    descripcionBreve: "Cilindro de gas licuado de petróleo 5 kg. Para uso residencial (cocina, calefacción pequeña).",
    descripcionCompleta: "Cilindro de gas licuado de petróleo de 5 kg. Para uso residencial (cocina, calefacción pequeña). Es el formato más liviano y fácil de transportar dentro del hogar, compatible con reguladores domésticos estándar."
  },
  {
    id: "CL002",
    nombre: "Cilindro GLP 11 kg",
    categoria: "Cilindros de Gas",
    precio: 12000,
    precioComercial: 11000,
    stock: 200,
    imagen: "img/gasde11k.png",
    descripcionBreve: "Cilindro estándar doméstico. El más utilizado en hogares chilenos.",
    descripcionCompleta: "Cilindro estándar doméstico. El más utilizado en hogares chilenos. Compatible con reguladores estándar de 1 etapa (28 mbar)."
  },
  {
    id: "CL003",
    nombre: "Cilindro GLP 15 kg",
    categoria: "Cilindros de Gas",
    precio: 16000,
    precioComercial: 14500,
    stock: 90,
    imagen: "img/gasde15k.png",
    descripcionBreve: "Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.",
    descripcionCompleta: "Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños. Ofrece mayor autonomía entre recargas, reduciendo la frecuencia de pedidos."
  },
  {
    id: "CL004",
    nombre: "Cilindro GLP 45 kg",
    categoria: "Cilindros de Gas",
    precio: 45000,
    precioComercial: 40000,
    stock: 30,
    imagen: "img/Cilindro.png",
    descripcionBreve: "Cilindro industrial. Uso comercial: restaurantes, talleres, calefacción de locales.",
    descripcionCompleta: "Cilindro industrial de 45 kg. Uso comercial: restaurantes, talleres, calefacción de locales de mayor tamaño."
  },
  {
    id: "RG001",
    nombre: "Regulador doméstico estándar",
    categoria: "Reguladores",
    precio: 8990,
    precioComercial: 8200,
    stock: 45,
    imagen: "img/reguladordegasdomestico.png",
    descripcionBreve: "Regulador de 1 etapa para cilindros 5, 11 y 15 kg. Presión de salida 28 mbar.",
    descripcionCompleta: "Regulador de 1 etapa para cilindros de 5, 11 y 15 kg. Presión de salida 28 mbar. Compatible con la mayoría de los artefactos residenciales."
  },
  {
    id: "RG002",
    nombre: "Regulador de alta presión",
    categoria: "Reguladores",
    precio: 18990,
    precioComercial: 17000,
    stock: 12,
    imagen: "img/reguladordepresion.png",
    descripcionBreve: "Regulador para cocinas industriales o equipos de mayor consumo. Presión regulable.",
    descripcionCompleta: "Regulador para cocinas industriales o equipos de mayor consumo, con presión regulable según la necesidad del artefacto conectado."
  },
  {
    id: "RG003",
    nombre: "Regulador dual (2 salidas)",
    categoria: "Reguladores",
    precio: 14990,
    precioComercial: 13500,
    stock: 18,
    imagen: "img/reguladordual.png",
    descripcionBreve: "Permite conectar dos artefactos simultáneamente al mismo cilindro.",
    descripcionCompleta: "Regulador dual con 2 salidas que permite conectar dos artefactos simultáneamente al mismo cilindro, sin necesidad de desconectar uno para usar el otro."
  },
  {
    id: "MG001",
    nombre: "Manguera gas 1.5 m",
    categoria: "Mangueras y Conexiones",
    precio: 3990,
    precioComercial: 3500,
    stock: 80,
    imagen: "img/manguerade1,5.png",
    descripcionBreve: "Manguera flexible homologada. Diámetro interior 9mm.",
    descripcionCompleta: "Manguera flexible homologada de 1,5 metros. Diámetro interior 9mm. Compatible con reguladores estándar."
  },
  {
    id: "MG002",
    nombre: "Manguera gas 3 m",
    categoria: "Mangueras y Conexiones",
    precio: 6990,
    precioComercial: 6200,
    stock: 50,
    imagen: "img/gas3metros.png",
    descripcionBreve: "Manguera larga para instalaciones donde el artefacto está alejado del cilindro.",
    descripcionCompleta: "Manguera flexible homologada de 3 metros, ideal para instalaciones donde el artefacto está alejado del cilindro."
  },
  {
    id: "MG003",
    nombre: "Abrazadera metálica",
    categoria: "Mangueras y Conexiones",
    precio: 990,
    precioComercial: 800,
    stock: 200,
    imagen: "img/mangueras.png",
    descripcionBreve: "Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.",
    descripcionCompleta: "Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto, evitando fugas por mala fijación."
  },
  {
    id: "MG004",
    nombre: "Kit conexión completo",
    categoria: "Mangueras y Conexiones",
    precio: 12990,
    precioComercial: 11500,
    stock: 25,
    imagen: "img/Kitconexióncompleto.png",
    descripcionBreve: "Regulador + manguera 1.5m + abrazaderas. Todo lo necesario para instalar un cilindro nuevo.",
    descripcionCompleta: "Kit conexión completo: incluye regulador, manguera de 1,5 m y abrazaderas. Todo lo necesario para instalar un cilindro nuevo de forma segura."
  },
  {
    id: "AC001",
    nombre: "Carro porta cilindro 11/15 kg",
    categoria: "Accesorios",
    precio: 12990,
    precioComercial: 11000,
    stock: 20,
    imagen: "img/Carroportacilindro11&15 kg.png",
    descripcionBreve: "Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.",
    descripcionCompleta: "Carro metálico con ruedas para transportar cilindros de 11 y 15 kg dentro del hogar con seguridad, reduciendo el esfuerzo físico y el riesgo de golpes."
  },
  {
    id: "AC002",
    nombre: "Tapa protectora para válvula",
    categoria: "Accesorios",
    precio: 1490,
    precioComercial: 1200,
    stock: 60,
    imagen: "img/Tapaprotectoraválvula.png",
    descripcionBreve: "Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.",
    descripcionCompleta: "Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte y almacenamiento, evitando golpes y el ingreso de suciedad."
  },
  {
    id: "AC003",
    nombre: "Detector de gas a batería",
    categoria: "Accesorios",
    precio: 19990,
    precioComercial: 17000,
    stock: 8,
    imagen: "img/detectorgas.png",
    descripcionBreve: "Sensor electroquímico. Alarma sonora y visual ante fuga de gas GLP o metano.",
    descripcionCompleta: "Detector de gas a batería con sensor electroquímico. Emite alarma sonora y visual ante fuga de gas GLP o metano, funcionando incluso sin conexión eléctrica."
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
// Categoría actualmente seleccionada en el filtro del catálogo
let categoriaActiva = "Todos";

// Se llama al hacer clic en una pestaña de categoría
function filtrarCatalogo(categoria, boton) {
  categoriaActiva = categoria;

  const botones = document.querySelectorAll(".filtro-categorias__boton");
  botones.forEach(function (b) { b.classList.remove("filtro-categorias__boton--activo"); });
  if (boton) boton.classList.add("filtro-categorias__boton--activo");

  renderizarCatalogo();
}

// Renderiza las tarjetas del catálogo dentro de #catalogo-grid, según el filtro activo
function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogo-grid");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const productosFiltrados = categoriaActiva === "Todos"
    ? PRODUCTOS
    : PRODUCTOS.filter(function (p) { return p.categoria === categoriaActiva; });

  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en esta categoría por ahora.</p>";
    return;
  }

  productosFiltrados.forEach(function (producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML =
      '<div class="tarjeta__imagen"><img src="' + producto.imagen + '" alt="' + producto.nombre + '"></div>' +
      '<div class="tarjeta__cuerpo">' +
        '<span class="tarjeta__categoria">' + producto.categoria + '</span>' +
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
  PRODUCTOS.slice(0, 3).forEach(function (producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML =
      '<div class="tarjeta__imagen"><img src="' + producto.imagen + '" alt="' + producto.nombre + '"></div>' +
      '<div class="tarjeta__cuerpo">' +
        '<span class="tarjeta__categoria">' + producto.categoria + '</span>' +
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