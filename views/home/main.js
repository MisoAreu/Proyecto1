// btn selectores
const btnLogin = document.getElementById('btn-login')
const btnSignup = document.getElementById('btn-signup')
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
      //el array que trae mongo de los productos
      const productos = response.data;
      console.log(productos);
      for (let i = 0; i < productos.length; i++) {
        if (productos[i].exist > 0) {
          console.log(productos[i]);
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

// Llama a la función para visualizar los productos al cargar la página
window.addEventListener('load', () => {
    visualizarProductos();
    contenedorCompra.classList.add("none")
  });
/*carrito*/
function comprar(indice) {
    lista.push({ nombre: productos[indice].nombre, precio: productos[indice].valor })

    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].nombre == productos[indice].nombre) {
            productos[i].existencia -= 1
            if (productos[i].existencia == 0) {
                visualizarProductos()
            }
            van = false
        }
        guardarAlmacenamientoLocal("productos", productos)
        i += 1
    }
    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")
    return lista
}
/*ejecuta*/
carrito.addEventListener("click", function(){
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarElemtrosLista()
})

/*recorrido*/ 
function mostrarElemtrosLista() {
    productosCompra.innerHTML = ""
    valortotal = 0
    for (let i = 0; i < lista.length; i++){
        productosCompra.innerHTML += `<div><div class="img"><button onclick=eliminar(${i}) class="botonTrash"><img src="/img/trash.png"></button><p>${lista[i].nombre}</p></div><p> $${lista[i].precio}</p></div>`
        valortotal += parseInt(lista[i].precio)
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`
}

function eliminar(indice){
    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].nombre == lista[indice].nombre) {
            productos[i].existencia += 1
            lista.splice(indice, 1)
            van = false
        }
        i += 1
    }
    guardarAlmacenamientoLocal("productos", productos)

    numero.innerHTML = lista.length
    if (lista.length == 0){
        numero.classList.remove("diseñoNumero")
    }
    visualizarProductos()
    mostrarElemtrosLista()
}

x.addEventListener("click", function(){
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})

btnLogin.addEventListener('click', () => {
    window.location.pathname = '/login';
})

btnSignup.addEventListener('click', () => {
    window.location.pathname = '/signup';
})