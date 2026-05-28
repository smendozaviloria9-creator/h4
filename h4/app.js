const API_URL = "https://jsonplaceholder.typicode.com/posts";
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productList = document.getElementById("productList");
const syncBtn = document.getElementById("syncBtn");
let productos = [];

function cargarProductos() {

    const datosGuardados = localStorage.getItem("productos");

    if (datosGuardados) {

        productos = JSON.parse(datosGuardados);

        renderProductos();
    }
}



function guardarProductos() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}



function renderProductos() {


    productList.innerHTML = "";


    productos.forEach((producto, index) => {


        const li = document.createElement("li");

        const texto = document.createElement("span");

      texto.textContent = `
      ${index + 1}. ${producto.nombre} - $${producto.precio}
      `
        const btnEliminar = document.createElement("button");

        btnEliminar.textContent = "Eliminar";


        btnEliminar.addEventListener("click", () => {

            eliminarProducto(index);

        });

        li.appendChild(texto);

        li.appendChild(btnEliminar);

        productList.appendChild(li);

    });
}




productForm.addEventListener("submit", async (e) => {


    e.preventDefault();


    const nombre = productName.value.trim();

    const precio = productPrice.value.trim();

    if (nombre === "" || precio === "") {

        alert("Todos los campos son obligatorios");

        console.error("Campos vacíos");

        return;
    }

    const nuevoProducto = {

        nombre: nombre,

        precio: precio

    };


    productos.push(nuevoProducto);

    guardarProductos();

    renderProductos();

    await agregarProductoAPI(nuevoProducto);

    console.log("Producto agregado");

    productName.value = "";

    productPrice.value = "";

});



function eliminarProducto(index) {

    // Eliminar del arreglo
    productos.splice(index, 1);

    // Actualizar localStorage
    guardarProductos();

    // Renderizar nuevamente
    renderProductos();

    console.log("Producto eliminado");
}




async function obtenerProductosAPI() {

    try {

        const respuesta = await fetch(API_URL);

        const datos = await respuesta.json();

        console.log("GET:", datos);

    } catch (error) {

        console.error("Error GET:", error);

    }
}




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



syncBtn.addEventListener("click", () => {

    obtenerProductosAPI();

});

cargarProductos();
