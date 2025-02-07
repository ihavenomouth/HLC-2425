"use strict";


//////////////////////////
// FUNCIONES
//////////////////////////

/**
 * Crear un usuario del servidor
 * @param {Event} event 
 */
async function crearUsuario(event) {

  divCrearUsuarioInfo.innerHTML="";
  const nombre = document.getElementById("txtNombre").value;
  const email = document.getElementById("txtEmail").value;
  const clave = document.getElementById("txtClave").value;
  const clave2 = document.getElementById("txtClave2").value;

  // console.log(`Usuario a crear: ${nombre}`);

  if( !nombre || !email || !clave || clave != clave2 ){
    divCrearUsuarioInfo.innerHTML="<p>Error: No se puede crear un usuario porque faltan datos o las claves introducidas son diferentes.</p>"
    return;
  }

  const respuesta = await fetch("/api/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre,
      email,
      clave
    })
  });
  const json = await respuesta.json();

  if (respuesta.ok) {
    divCrearUsuarioInfo.innerHTML = `
      <p>Usuario creado con éxito.</p>
      <p>ID del usuario creado: ${json.id }</p>
    `;
  } else {
    divCrearUsuarioInfo.innerHTML = `
      <p>Error al crear el usuario.</p>
      <p>Mensaje: ${json.error}</p>
    `;
  }
}


//////////////////////////
// MAIN
//////////////////////////
const divCrearUsuarioInfo = document.querySelector("#divCrearUsuarioInfo");
document.querySelector("#btnCrearUsuario").addEventListener("click", crearUsuario);