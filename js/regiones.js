/* =========================================================
   regiones.js
   Arreglo de regiones y comunas de Chile (foco en Ñuble y
   comunas cubiertas por la distribuidora) + lógica para
   cargar el select de Región/Comuna en registro.html
   ========================================================= */

const REGIONES = [
  {
    nombre: "Región de Ñuble",
    comunas: ["Chillán", "Chillán Viejo", "El Carmen", "Pinto", "San Ignacio", "Bulnes", "Quillón"]
  },
  {
    nombre: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"]
  },
  {
    nombre: "Región Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Maipú", "Puente Alto"]
  },
  {
    nombre: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué"]
  }
];

// Llena el select de regiones al cargar la página
function cargarRegiones() {
  const selectRegion = document.getElementById("region");
  if (!selectRegion) return;

  selectRegion.innerHTML = '<option value="">Seleccione una región</option>';
  REGIONES.forEach(function (region, indice) {
    const opcion = document.createElement("option");
    opcion.value = indice;
    opcion.textContent = region.nombre;
    selectRegion.appendChild(opcion);
  });

  selectRegion.addEventListener("change", actualizarComunas);
}

// Actualiza el select de comunas según la región elegida
function actualizarComunas() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");
  if (!selectRegion || !selectComuna) return;

  const indice = selectRegion.value;
  selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

  if (indice === "") {
    selectComuna.disabled = true;
    return;
  }

  const region = REGIONES[indice];
  region.comunas.forEach(function (comuna) {
    const opcion = document.createElement("option");
    opcion.value = comuna;
    opcion.textContent = comuna;
    selectComuna.appendChild(opcion);
  });
  selectComuna.disabled = false;
}

document.addEventListener("DOMContentLoaded", cargarRegiones);
