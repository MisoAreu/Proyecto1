// btn selectores
const btnBlog = document.getElementById('btn-blog')
const btnLogout = document.getElementById('btn-logout')
///////////
// Variables que traemos de nuestro html
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x')

// Variables que vamos a usar en nuestoro proyecto
let productos = [];
let lista = []
let valortotal = 0
// Scroll de nuestra pagina cambio de color
// window.addEventListener("scroll", function () {
//     if (contenedor.getBoundingClientRect().top<10) {
//         header.classList.add("scroll")
//     }
//     else {
//         header.classList.remove("scroll")
//     }
// })

async function visualizarProductos() {
    try {
      // Obtén los productos desde tu API (debes ajustar la URL según tu configuración)
      const response = await axios.get('/api/items');
      mostrarElemtrosLista()
      //el array que trae mongo de los productos
      productos = response.data;
      for (let i = 0; i < productos.length; i++) {
        if (productos[i].exist > 0) {
          // console.log(productos[i]);
          contenedor.innerHTML += `<div><img src="${productos[i].image}"><div class="informacion"><p>${productos[i].name}</p><p>${productos[i].description}</p><p class="precio">$${productos[i].value}</p><button onclick=comprar(${i})>Comprar</button></div></div>`
        } else {
          contenedor.innerHTML += `<div><img src="${productos[i].image}"><div class="informacion"><p>${productos[i].name}</p><p class="precio">$${productos[i].value}</p><p class="soldOut">Sold Out</p></div></div>`
        }
      }
    } catch (error) {
      console.error(error);
      // Manejo de errores si es necesario
    }
  }

/*Función para agregar un producto al carrito del usuario*/
async function comprar(indice) {
    try {
      // Obtén el producto actual
      const productoAComprar = productos[indice];
      // console.log('producto da:', productoAComprar);
  
      // Realiza una solicitud POST para agregar el producto al carrito del usuario
      const response = await axios.post('/api/itemcars', {
        item: productoAComprar.name,
        itemid: productoAComprar.id, // Ajusta según cómo se almacenan los IDs en tu base de datos
      });
  
      // Verifica si la solicitud fue exitosa y el producto se agregó al carrito
      if (response.status === 201) {
        // Agrega el producto al carrito local
        lista.push({ nombre: productoAComprar.name, precio: productoAComprar.value });
  
        // Actualiza la visualización del número de productos en el carrito
        numero.innerHTML = lista.length;
        numero.classList.add("diseñoNumero");
      } else {
        // Maneja errores si es necesario
        console.error('No se pudo agregar el producto al carrito');
      }
    } catch (error) {
      // Manejo de errores si ocurre algún problema en la solicitud
      console.error('Error al agregar el producto al carrito:', error);
    }
  }

window.addEventListener('load', () => {
    visualizarProductos();
    contenedorCompra.classList.add("none")
})

/*ejecuta*/
carrito.addEventListener("click", function(){
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarElemtrosLista()
})

/*recorrido*/ 
async function mostrarElemtrosLista() {
  try {
    // Realiza una solicitud GET para obtener los productos en el carrito del usuario
    const response = await axios.get('/api/itemcars');
    // Verifica si la respuesta contiene datos
    if (response.data && Array.isArray(response.data)) {
      // Inicializa la lista de productos local
      lista = [];
      // Recorre los objetos en la respuesta y agrega cada producto al carrito local
      for (const carritoItem of response.data) {
        // Busca el producto correspondiente en la lista de productos obtenidos previamente
        const productoEnLista = productos.find(producto => producto.name === carritoItem.item);
        // Si se encuentra el producto, agrega el nombre y el precio al carrito local
        if (productoEnLista) {
          lista.push({ nombre: carritoItem.item, precio: productoEnLista.value, id: carritoItem.id });
        }
      }
      // Actualiza la visualización del número de productos en el carrito
      numero.innerHTML = lista.length;
      numero.classList.add("diseñoNumero");
    }

    // Limpia la lista de productos del carrito en la página
    productosCompra.innerHTML = "";

    // Recorre la lista de productos en el carrito local y muestra cada producto en la página
    valortotal = 0;
    for (let i = 0; i < lista.length; i++) {
      productosCompra.innerHTML += `<div><div class="img"><button onclick=eliminar(${i}) class="botonTrash"><img src="/images/trash.svg"></button><p>${lista[i].nombre}</p></div><p> $${lista[i].precio}</p></div>`;
      valortotal += parseInt(lista[i].precio);
    }

    // Muestra el valor total en la página
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`;
  } catch (error) {
    console.error('Error al obtener los productos del carrito:', error);
  }
}


function eliminar(indice){
    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].name == lista[indice].nombre) {
          // console.log(lista[indice]);
          const productId = lista[indice].id
          // console.log(productId);
            const response = axios.delete(`/api/itemcars/${productId}`)
            productos[i].exist += 1
            lista.splice(indice, 1)
            van = false
        }
        i += 1
    }

    numero.innerHTML = lista.length
    if (lista.length == 0){
        numero.classList.remove("diseñoNumero")
    }
    mostrarElemtrosLista()
}

x.addEventListener("click", function(){
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})

btnLogout.addEventListener('click', async e => {
  try {
    await axios.get('/api/logout');
    window.location.pathname = '/login';
  } catch (error) {
    console.log(error);
  }
})

btnBlog.addEventListener('click', () => {
  window.location.pathname = '/blog';
})