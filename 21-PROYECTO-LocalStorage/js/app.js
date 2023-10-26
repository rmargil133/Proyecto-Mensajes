// Espera a que se cargue el documento
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene elementos del DOM
    const formulario = document.getElementById('formulario');
    const mensajeInput = document.getElementById('mensaje');
    const listaMensajes = document.getElementById('lista-mensajes');

    // Carga los mensajes almacenados en el localStorage al cargar la página
    cargarMensajes();

    // Agregar un evento de envío de formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que se recargue la página

        const mensaje = mensajeInput.value;

        if (mensaje.trim() !== '') {
            // Agregar el mensaje al contenedor
            agregarMensaje(mensaje);

            // Almacena el mensaje en el localStorage
            almacenarMensaje(mensaje);

            // Limpia el campo de entrada
            mensajeInput.value = '';
        }
    });

    // Función para agregar un mensaje al contenedor
    function agregarMensaje(mensaje) {
        const nuevoMensaje = document.createElement('div');
        nuevoMensaje.textContent = mensaje;
    // Crear un botón de eliminación y adjuntarlo al mensaje
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            borrarMensaje(nuevoMensaje, mensaje);
        });

        nuevoMensaje.appendChild(botonEliminar);
        listaMensajes.appendChild(nuevoMensaje);
    }

    // Función para eliminar un mensaje
    function borrarMensaje(mensajeElement, mensaje) {
        mensajeElement.remove();
        eliminarMensaje(mensaje);
    }

    // Función para cargar mensajes almacenados en el localStorage
    function cargarMensajes() {
        const mensajes = obtenerMensajes();

        mensajes.forEach(function(mensaje) {
            agregarMensaje(mensaje);
        });
    }

    // Función para obtener mensajes del localStorage
    function obtenerMensajes() {
        const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        return mensajes;
    }

    // Función para almacenar un mensaje en el localStorage
    function almacenarMensaje(mensaje) {
        const mensajes = obtenerMensajes();
        mensajes.push(mensaje);
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
    }

    // Función para eliminar un mensaje del localStorage
    function eliminarMensaje(mensaje) {
        const mensajes = obtenerMensajes();
        const index = mensajes.indexOf(mensaje);
        if (index !== -1) {
            mensajes.splice(index, 1);
            localStorage.setItem('mensajes', JSON.stringify(mensajes));
        }
    }
});
