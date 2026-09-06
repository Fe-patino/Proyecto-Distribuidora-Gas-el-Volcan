/* =========================================================
   validaciones.js
   Funciones de validación para los formularios de:
   - Contacto
   - Registro de usuario (incluye validación de RUN chileno)
   - Inicio de sesión
   ========================================================= */

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Muestra un mensaje de error debajo del campo indicado
function mostrarError(idCampo, mensaje) {
  const campo = document.getElementById(idCampo);
  const contenedorCampo = campo.closest(".campo");
  const spanError = document.getElementById("error-" + idCampo);

  if (mensaje) {
    contenedorCampo.classList.add("con-error");
    spanError.textContent = mensaje;
    return false;
  } else {
    contenedorCampo.classList.remove("con-error");
    spanError.textContent = "";
    return true;
  }
}

/* ---------------------------------------------------------
   Validación: dígito verificador de un RUN chileno
   Recibe el RUN completo SIN puntos ni guion, ej: "128437652"
   El último caracter es el dígito verificador (puede ser 'K')
--------------------------------------------------------- */
function validarDigitoVerificadorRUN(run) {
  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1).toUpperCase();

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}

/* ---------------------------------------------------------
   FORMULARIO DE CONTACTO
   Reglas: nombre obligatorio (máx 100), correo válido
   (máx 100), comentario obligatorio (máx 500)
--------------------------------------------------------- */
function validarContacto(evento) {
  evento.preventDefault();
  let esValido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (nombre === "") {
    esValido = mostrarError("nombre", "El nombre es obligatorio.") && esValido;
  } else if (nombre.length > 100) {
    esValido = mostrarError("nombre", "El nombre no puede superar los 100 caracteres.") && esValido;
  } else {
    mostrarError("nombre", "");
  }

  if (correo === "") {
    esValido = mostrarError("correo", "El correo es obligatorio.") && esValido;
  } else if (correo.length > 100) {
    esValido = mostrarError("correo", "El correo no puede superar los 100 caracteres.") && esValido;
  } else if (!REGEX_CORREO.test(correo)) {
    esValido = mostrarError("correo", "Ingrese un correo con formato válido.") && esValido;
  } else {
    mostrarError("correo", "");
  }

  if (comentario === "") {
    esValido = mostrarError("comentario", "El comentario es obligatorio.") && esValido;
  } else if (comentario.length > 500) {
    esValido = mostrarError("comentario", "El comentario no puede superar los 500 caracteres.") && esValido;
  } else {
    mostrarError("comentario", "");
  }

  const mensajeExito = document.getElementById("mensaje-exito");
  if (esValido) {
    mensajeExito.textContent = "¡Gracias " + nombre + "! Tu mensaje fue enviado correctamente.";
    mensajeExito.classList.remove("oculto");
    document.getElementById("form-contacto").reset();
  } else {
    mensajeExito.classList.add("oculto");
  }

  return false;
}

/* ---------------------------------------------------------
   FORMULARIO DE REGISTRO
--------------------------------------------------------- */
function validarRegistro(evento) {
  evento.preventDefault();
  let esValido = true;

  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const tipoUsuario = document.getElementById("tipoUsuario").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();

  // RUN: obligatorio, solo números y K, con dígito verificador válido
  const regexRUN = /^[0-9]{7,8}[0-9Kk]$/;
  if (run === "") {
    esValido = mostrarError("run", "El RUN es obligatorio.") && esValido;
  } else if (!regexRUN.test(run)) {
    esValido = mostrarError("run", "Ingrese el RUN sin puntos ni guion (ej: 128437652).") && esValido;
  } else if (!validarDigitoVerificadorRUN(run)) {
    esValido = mostrarError("run", "El dígito verificador del RUN no es válido.") && esValido;
  } else {
    mostrarError("run", "");
  }

  // Nombre: obligatorio, máx 50
  if (nombre === "") {
    esValido = mostrarError("nombre", "El nombre es obligatorio.") && esValido;
  } else if (nombre.length > 50) {
    esValido = mostrarError("nombre", "El nombre no puede superar los 50 caracteres.") && esValido;
  } else {
    mostrarError("nombre", "");
  }

  // Apellidos: obligatorio, máx 100
  if (apellidos === "") {
    esValido = mostrarError("apellidos", "Los apellidos son obligatorios.") && esValido;
  } else if (apellidos.length > 100) {
    esValido = mostrarError("apellidos", "Los apellidos no pueden superar los 100 caracteres.") && esValido;
  } else {
    mostrarError("apellidos", "");
  }

  // Correo: obligatorio, máx 100, formato válido
  if (correo === "") {
    esValido = mostrarError("correo", "El correo es obligatorio.") && esValido;
  } else if (correo.length > 100) {
    esValido = mostrarError("correo", "El correo no puede superar los 100 caracteres.") && esValido;
  } else if (!REGEX_CORREO.test(correo)) {
    esValido = mostrarError("correo", "Ingrese un correo con formato válido.") && esValido;
  } else {
    mostrarError("correo", "");
  }

  // Tipo de usuario: obligatorio
  if (tipoUsuario === "") {
    esValido = mostrarError("tipoUsuario", "Seleccione un tipo de usuario.") && esValido;
  } else {
    mostrarError("tipoUsuario", "");
  }

  // Región: obligatoria
  if (region === "") {
    esValido = mostrarError("region", "Seleccione una región.") && esValido;
  } else {
    mostrarError("region", "");
  }

  // Comuna: obligatoria
  if (comuna === "") {
    esValido = mostrarError("comuna", "Seleccione una comuna.") && esValido;
  } else {
    mostrarError("comuna", "");
  }

  // Dirección: obligatoria, máx 300
  if (direccion === "") {
    esValido = mostrarError("direccion", "La dirección es obligatoria.") && esValido;
  } else if (direccion.length > 300) {
    esValido = mostrarError("direccion", "La dirección no puede superar los 300 caracteres.") && esValido;
  } else {
    mostrarError("direccion", "");
  }

  const mensajeExito = document.getElementById("mensaje-exito");
  if (esValido) {
    mensajeExito.textContent = "¡Cuenta creada correctamente! Ya puedes iniciar sesión.";
    mensajeExito.classList.remove("oculto");
    document.getElementById("form-registro").reset();
    document.getElementById("comuna").disabled = true;
  } else {
    mensajeExito.classList.add("oculto");
  }

  return false;
}

/* ---------------------------------------------------------
   FORMULARIO DE INICIO DE SESIÓN
   Reglas: correo obligatorio (máx 100, formato válido),
   contraseña obligatoria (entre 4 y 10 caracteres)
--------------------------------------------------------- */
function validarLogin(evento) {
  evento.preventDefault();
  let esValido = true;

  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value;

  if (correo === "") {
    esValido = mostrarError("correo", "El correo es obligatorio.") && esValido;
  } else if (correo.length > 100) {
    esValido = mostrarError("correo", "El correo no puede superar los 100 caracteres.") && esValido;
  } else if (!REGEX_CORREO.test(correo)) {
    esValido = mostrarError("correo", "Ingrese un correo con formato válido.") && esValido;
  } else {
    mostrarError("correo", "");
  }

  if (clave === "") {
    esValido = mostrarError("clave", "La contraseña es obligatoria.") && esValido;
  } else if (clave.length < 4 || clave.length > 10) {
    esValido = mostrarError("clave", "La contraseña debe tener entre 4 y 10 caracteres.") && esValido;
  } else {
    mostrarError("clave", "");
  }

  if (!esValido) return false;

  // Sin backend: se simula el acceso según el correo ingresado.
  if (correo === "admin@gaselvolcan.cl") {
    window.location.href = "admin/admin-inicio.html";
  } else {
    window.location.href = "index.html";
  }

  return false;
}
