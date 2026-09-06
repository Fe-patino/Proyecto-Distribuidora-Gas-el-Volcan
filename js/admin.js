/* =========================================================
   admin.js
   Lógica del panel de administración: mantenedor de
   productos y mantenedor de usuarios. No hay conexión a
   base de datos en esta entrega: los datos viven en memoria
   (arreglos JS) y se re-renderizan al editar/crear.
   ========================================================= */

// Usuarios de ejemplo para el mantenedor (dato en memoria, sin backend)
let USUARIOS = [
  { run: "128437652", nombre: "Carla", apellidos: "Muñoz Reyes", correo: "carla.munoz@gaselvolcan.cl", tipo: "administrador" },
  { run: "179532918", nombre: "María", apellidos: "Pérez Soto", correo: "maria.perez@gaselvolcan.cl", tipo: "cliente" },
  { run: "151234563", nombre: "Juan", apellidos: "Soto Vega", correo: "juan.soto@gaselvolcan.cl", tipo: "cliente" }
];

let idEdicionProducto = null;
let indiceEdicionUsuario = null;

/* ---------------------------------------------------------
   MANTENEDOR DE PRODUCTOS (admin-productos.html)
--------------------------------------------------------- */
function renderizarTablaProductos() {
  const cuerpo = document.getElementById("tabla-productos-cuerpo");
  if (!cuerpo) return;

  cuerpo.innerHTML = "";
  PRODUCTOS.forEach(function (producto) {
    const fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" + producto.id + "</td>" +
      "<td>" + producto.nombre + "</td>" +
      "<td>" + producto.kg + " kg</td>" +
      "<td>" + formatearPrecio(producto.precio) + "</td>" +
      "<td>" + producto.stock + " unid.</td>" +
      '<td><button class="boton boton--secundario boton--pequeno" onclick="abrirEdicionProducto(\'' + producto.id + '\')">Editar</button></td>';
    cuerpo.appendChild(fila);
  });
}

function abrirEdicionProducto(id) {
  const producto = buscarProductoPorId(id);
  if (!producto) return;

  idEdicionProducto = id;
  document.getElementById("form-producto-titulo").textContent = "Editar producto: " + producto.nombre;
  document.getElementById("prod-nombre").value = producto.nombre;
  document.getElementById("prod-precio").value = producto.precio;
  document.getElementById("prod-stock").value = producto.stock;
  document.getElementById("panel-form-producto").classList.remove("oculto");
  document.getElementById("panel-form-producto").scrollIntoView({ behavior: "smooth" });
}

function cerrarEdicionProducto() {
  idEdicionProducto = null;
  document.getElementById("panel-form-producto").classList.add("oculto");
}

function guardarProducto(evento) {
  evento.preventDefault();
  const producto = buscarProductoPorId(idEdicionProducto);
  if (!producto) return false;

  producto.nombre = document.getElementById("prod-nombre").value.trim();
  producto.precio = parseInt(document.getElementById("prod-precio").value, 10) || producto.precio;
  producto.stock = parseInt(document.getElementById("prod-stock").value, 10) || producto.stock;

  renderizarTablaProductos();
  cerrarEdicionProducto();
  return false;
}

/* ---------------------------------------------------------
   MANTENEDOR DE USUARIOS (admin-usuarios.html)
--------------------------------------------------------- */
function renderizarTablaUsuarios() {
  const cuerpo = document.getElementById("tabla-usuarios-cuerpo");
  if (!cuerpo) return;

  cuerpo.innerHTML = "";
  USUARIOS.forEach(function (usuario, indice) {
    const claseChip = usuario.tipo === "administrador" ? "chip-rol" : "chip-rol chip-rol--cliente";
    const fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" + usuario.run + "</td>" +
      "<td>" + usuario.nombre + " " + usuario.apellidos + "</td>" +
      "<td>" + usuario.correo + "</td>" +
      '<td><span class="' + claseChip + '">' + usuario.tipo + "</span></td>" +
      '<td><button class="boton boton--secundario boton--pequeno" onclick="abrirEdicionUsuario(' + indice + ')">Editar</button></td>';
    cuerpo.appendChild(fila);
  });
}

function abrirCreacionUsuario() {
  indiceEdicionUsuario = null;
  document.getElementById("form-usuario-titulo").textContent = "Nuevo usuario";
  document.getElementById("form-usuario").reset();
  document.getElementById("panel-form-usuario").classList.remove("oculto");
  document.getElementById("panel-form-usuario").scrollIntoView({ behavior: "smooth" });
}

function abrirEdicionUsuario(indice) {
  const usuario = USUARIOS[indice];
  if (!usuario) return;

  indiceEdicionUsuario = indice;
  document.getElementById("form-usuario-titulo").textContent = "Editar usuario";
  document.getElementById("usr-run").value = usuario.run;
  document.getElementById("usr-nombre").value = usuario.nombre;
  document.getElementById("usr-apellidos").value = usuario.apellidos;
  document.getElementById("usr-correo").value = usuario.correo;
  document.getElementById("usr-tipo").value = usuario.tipo;
  document.getElementById("panel-form-usuario").classList.remove("oculto");
  document.getElementById("panel-form-usuario").scrollIntoView({ behavior: "smooth" });
}

function cerrarEdicionUsuario() {
  indiceEdicionUsuario = null;
  document.getElementById("panel-form-usuario").classList.add("oculto");
}

function guardarUsuario(evento) {
  evento.preventDefault();

  const datos = {
    run: document.getElementById("usr-run").value.trim(),
    nombre: document.getElementById("usr-nombre").value.trim(),
    apellidos: document.getElementById("usr-apellidos").value.trim(),
    correo: document.getElementById("usr-correo").value.trim(),
    tipo: document.getElementById("usr-tipo").value
  };

  if (indiceEdicionUsuario === null) {
    USUARIOS.push(datos);
  } else {
    USUARIOS[indiceEdicionUsuario] = datos;
  }

  renderizarTablaUsuarios();
  cerrarEdicionUsuario();
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarTablaProductos();
  renderizarTablaUsuarios();
});
