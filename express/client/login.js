"use strict";

/**
 * Realiza la operación de login
 * @param {Event} event 
 */
async function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const clave = document.getElementById("clave").value;

  const respuesta = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      clave
    })
  });
  const json = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById("divResultado").innerHTML = `
      <p>Login realizado correctamente.</p>
      <p>Nombre: ${json.nombre}</p>
      <p>E-mail: ${json.email}</p>
      <p>Token: ${json.token}</p>
    `;
    localStorage.setItem("nombre", json.nombre);
    localStorage.setItem("email", json.email);
    localStorage.setItem("token", json.token);
  } else {
    document.getElementById("divResultado").innerHTML = `
      <p>Login incorrecto.</p>
      <p>Mensaje: ${json.error}</p>
    `;
  }
}


////////////////////
// MAIN
///////////////////
const frmLoginUsuario = document.getElementById("frmLoginUsuario");
frmLoginUsuario.addEventListener("submit", login);