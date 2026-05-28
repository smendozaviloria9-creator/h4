const API_URL = "https://jsonplaceholder.typicode.com/posts";
const taskForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const taskList = document.getElementById("productList");
const syncBtn = document.getElementById("syncBtn");
let productos = [];

function cargarProductos() {

    const datosGuardados = localStorage.getItem("productos");

    if (datosGuardados) {

        productos = JSON.parse(datosGuardados);

        renderProductos();
    }
}


// ==========================
// GUARDAR PRODUCTOS
// ==========================

function guardarProductos() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}


// ==========================
// MOSTRAR PRODUCTOS EN EL DOM
// ==========================

function renderProductos() {

    // Limpiar lista
    productList.innerHTML = "";

    // Recorrer arreglo
    productos.forEach((producto, index) => {

        // Crear li
        const li = document.createElement("li");

        // Crear texto
        const texto = document.createElement("span");

      texto.textContent = `
      ${index + 1}. ${producto.nombre} - $${producto.precio}
      `;
        // Crear botón eliminar
        const btnEliminar = document.createElement("button");

        btnEliminar.textContent = "Eliminar";

        // Evento eliminar
        btnEliminar.addEventListener("click", () => {

            eliminarProducto(index);

        });

        // Agregar elementos
        li.appendChild(texto);

        li.appendChild(btnEliminar);

        productList.appendChild(li);

    });
}



// AGREGAR PRODUCTO


productForm.addEventListener("submit", async (e) => {

    // Evitar recarga
    e.preventDefault();

    // Obtener valores
    const nombre = productName.value.trim();

    const precio = productPrice.value.trim();

    // Validar campos
    if (nombre === "" || precio === "") {

        alert("Todos los campos son obligatorios");

        console.error("Campos vacíos");

        return;
    }

    // Crear objeto
    const nuevoProducto = {

        nombre: nombre,

        precio: precio

    };

    // Guardar en arreglo
    productos.push(nuevoProducto);

    // Guardar localStorage
    guardarProductos();

    // Mostrar en pantalla
    renderProductos();

    // Enviar a API
    await agregarProductoAPI(nuevoProducto);

    console.log("Producto agregado");

    // Limpiar inputs
    productName.value = "";

    productPrice.value = "";

});


// ==========================
// ELIMINAR PRODUCTO
// ==========================

function eliminarProducto(index) {

    // Eliminar del arreglo
    productos.splice(index, 1);

    // Actualizar localStorage
    guardarProductos();

    // Renderizar nuevamente
    renderProductos();

    console.log("Producto eliminado");
}


// ==========================
// GET
// ==========================

async function obtenerProductosAPI() {

    try {

        const respuesta = await fetch(API_URL);

        const datos = await respuesta.json();

        console.log("GET:", datos);

    } catch (error) {

        console.error("Error GET:", error);

    }
}


// ==========================
// POST
// ==========================

async function agregarProductoAPI(producto) {

    try {
        console.log("enviando producto")
        const respuesta = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(producto)

        });

        const datos = await respuesta.json();

        console.log("POST:", datos);

    } catch (error) {

        console.error("Error POST:", error);

    }
}


// ==========================
// PUT
// ==========================

async function actualizarProductoAPI(id, productoActualizado) {

    try {

        const respuesta = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(productoActualizado)

        });

        const datos = await respuesta.json();

        console.log("PUT:", datos);

    } catch (error) {

        console.error("Error PUT:", error);

    }
}


// ==========================
// DELETE
// ==========================

async function eliminarProductoAPI(id) {

    try {

        const respuesta = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        console.log("DELETE:", respuesta);

    } catch (error) {

        console.error("Error DELETE:", error);

    }
}


// ==========================
// BOTÓN SINCRONIZAR
// ==========================

syncBtn.addEventListener("click", () => {

    obtenerProductosAPI();

});


// ==========================
// INICIAR APP
// ==========================

cargarProductos();
