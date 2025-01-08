"use strict";



/**
 * Crea una nota en el servidor
 * @param {Event} event 
 */
async function crearNota(event) {
  event.preventDefault();

  const nombre = document.getElementById("crearNotaNombre").value;
  const texto = document.getElementById("crearNotaTexto").value;
  const fecha = document.getElementById("crearNotaFecha").value;
  const usuario_id = document.getElementById("crearNotaUsuario_id").value;

  const respuesta = await fetch("/api/nota", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre,
      texto,
      fecha,
      usuario_id
    })
  });
  const json = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById("crearNotaInfo").innerHTML = `
      <p>Nota creada con éxito.</p>
      <p>ID de la nota creada: ${json.id}</p>
    `;
  } else {
    document.getElementById("crearNotaInfo").innerHTML = `
      <p>Error al crear la nota.</p>
      <p>Mensaje: ${json.error}</p>
      <p>Mensaje: ${json.message}</p>
    `;
  }
}








/**
 * Recupera una nota del servidor
 * @param {Event} event 
 */
async function recuperarNota(event) {
  event.preventDefault();

  const idNota = document.getElementById("recuperarNotaId").value;
  // console.log(`ID de la nota a recuperar: ${idNota}`);

  const respuesta = await fetch("/api/nota/"+idNota );
  const json = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById("recuperarNotaInfo").innerHTML = `
      <p>Nota recuperada con éxito.</p>
      <p>ID de la nota recuperada: ${json.id}</p>
      <p>Nombre de la nota recuperada: ${json.nombre}</p>
      <p>Texto de la nota recuperada: ${json.texto}</p>
      <p>Fecha de la nota recuperada: ${json.fecha}</p>
      <p>ID del usuario propietario de la nota recuperada: ${json.usuario_id}</p>
    `;
  } else {
    document.getElementById("recuperarNotaInfo").innerHTML = `
      <p>Error al recuperar la nota.</p>
      <p>Mensaje: ${json.error}</p>
      <p>Mensaje: ${json.message}</p>
    `;
  }
}










/**
 * Elimina una nota del servidor
 * @param {Event} event 
 */
async function eliminarNota(event) {
  event.preventDefault();

  const idNota = document.getElementById("eliminarNotaId").value;
  // console.log(`ID de la nota a recuperar: ${idNota}`);

  const respuesta = await fetch("/api/nota/"+idNota, {
    method: "DELETE"
  });
  const json = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById("eliminarNotaInfo").innerHTML = `
      <p>Nota eliminada con éxito.</p>
      <p>ID de la nota recuperada: ${json.message}</p>
    `;
  } else {
    document.getElementById("eliminarNotaInfo").innerHTML = `
      <p>Error al eliminar la nota.</p>
      <p>Mensaje: ${json.error}</p>
      <p>Mensaje: ${json.message}</p>
    `;
  }
}







/**
 * Modifica una nota en el servidor
 * @param {Event} event 
 */
async function modificarNota(event) {
  event.preventDefault();

  const nombre = document.getElementById("modificarNotaNombre").value;
  const texto = document.getElementById("modificarNotaTexto").value;
  const fecha = document.getElementById("modificarNotaFecha").value;
  const usuario_id = document.getElementById("modificarNotaUsuario_id").value;
  const id = document.getElementById("modificarNotaId").value;


  const respuesta = await fetch("/api/nota/"+id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre,
      texto,
      fecha,
      usuario_id
    })
  });
  const json = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById("modificarNotaInfo").innerHTML = `
      <p>Nota modificada con éxito.</p>
    `;
  } else {
    document.getElementById("modificarNotaInfo").innerHTML = `
      <p>Error al modificar la nota.</p>
      <p>Mensaje: ${json.error}</p>
      <p>Mensaje: ${json.message}</p>
    `;
  }
}






/**
 * Recupera una nota del servidor
 * @param {Event} event 
 */
async function recuperarNotas(event) {
  event.preventDefault();

  const respuesta = await fetch("/api/nota/" );
  const json = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById("recuperarNotasInfo").innerHTML = "";

    for(let nota of json){
      document.getElementById("recuperarNotasInfo").innerHTML += `<p>(${nota.id}) - ${nota.nombre}</p>`;
    }

  } else {
    document.getElementById("recuperarNotasInfo").innerHTML = `
      <p>Error al recuperar la nota.</p>
      <p>Mensaje: ${json.error}</p>
      <p>Mensaje: ${json.message}</p>
    `;
  }
}





////////////////////
// MAIN
///////////////////
const frmCrearNota = document.getElementById("frmCrearNota");
frmCrearNota.addEventListener("submit", crearNota);

const frmRecuperarNota = document.getElementById("frmRecuperarNota");
frmRecuperarNota.addEventListener("submit", recuperarNota);

const frmEliminarNota = document.getElementById("frmEliminarNota");
frmEliminarNota.addEventListener("submit", eliminarNota);

const frmModificarNota = document.getElementById("frmModificarNota");
frmModificarNota.addEventListener("submit", modificarNota);

const frmRecuperarNotas = document.getElementById("frmRecuperarNotas");
frmRecuperarNotas.addEventListener("submit", recuperarNotas);