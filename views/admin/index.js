(async() => {
    try {
        const admin = await axios.get('/api/admin')
    } catch (error) {
        const notAdmin = error.response.data.error
        window.location.pathname = '/';
    }
})();
//selectores
const nameProductInput = document.querySelector('#nameAdded');
const descriptionProductInput = document.getElementById('descriptionAdded');
const valueProductInput = document.getElementById('valueAdded');
const existProductInput = document.getElementById('existAdded');
const imageProductInput = document.getElementById('imageAdded');

const btn = document.querySelector('#btnAdded');

function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
    /*lo convertimos aqui a Json*/
}

/*recuperar los datos que hemos almacenados*/
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
    /*de Json a objeto*/
}

/*extraemos del html*/
let productos = obtenerAlmacenamientoLocal('productos') || [];
const mensaje = document.getElementById('mensaje')

//Añadir un producto//extraemos del HTML
const añadirProducto = document.getElementById('nameAdded')
const añadirDescripcion = document.getElementById('descriptionAdded')
const añadirValor = document.getElementById('valueAdded')
const añadirExistencia = document.getElementById('existAdded')
const añadirImagen = document.getElementById('imageAdded')

/*cuanod hace click para que se ejecute*/
document.getElementById("btnAdded").addEventListener("click", async function (event) {
    event.preventDefault()
    let productoAñadir = añadirProducto.value
    let descripcionAñadir = añadirDescripcion.value
    let valorAñadir = añadirValor.value
    let existenciaAñadir = añadirExistencia.value
    let imagenAñadir = añadirImagen.value
    console.log(añadirProducto.value);
    let van = true

    /*notificaciones*/
    if (productoAñadir == '' || descripcionAñadir == '' || valorAñadir == '' || existenciaAñadir == '' || imagenAñadir == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
        van = false
    }
    else {
        try {
            // Creamos un nuevo producto en MongoDB
            const newItem = {
                name: productoAñadir,
                description: descripcionAñadir,
                value: valorAñadir,
                exist: existenciaAñadir,
                image: imagenAñadir
            };
            // console.log('newItem', newItem);
            const { data } = await axios.post('/api/items', newItem);
            if (data === 'Producto agregado exitosamente') {
                mensaje.classList.add('Realizado')
                setTimeout(() => {
                    mensaje.classList.remove('repetidoError')
                    window.location.reload()
                }, 1500)
            } else {
                van = false;
            }
        } catch (error) {
            console.error('Error al crear el producto en MongoDB:', error);
            van = false;
        }
    }

    /*sino hay error se agrega*/
    if (van == true) {
        mensaje.classList.add('Realizado')
        setTimeout(() => {
            mensaje.classList.remove('repetidoError')
            window.location.reload()
        }, 1500)
    }
})

// // Editar
// const productoEd = document.getElementById('productoEditar')
// const atributoEd = document.getElementById('atributoEditar')
// const nuevoAtributoEd = document.getElementById('nuevoAtributo')

// document.getElementById("botonEditar").addEventListener("click", function (event) {
//     event.preventDefault()
//     let productoEditar = productoEd.value
//     let atributoEditar = atributoEd.value
//     let nuevoAtributo = nuevoAtributoEd.value
//     let van = false

//     if (productoEditar == '' || atributoEditar == '' || nuevoAtributo == '') {
//         mensaje.classList.add('llenarCampos')
//         setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
//     }
//     else {
//         for (let i = 0; i < productos.length; i++) {
//             if (productos[i].nombre == productoEditar) {
//                 productos[i][atributoEditar] = nuevoAtributo
//                 van = true
//             }
//         }
//         /*notificacion*/
//         if (van == true) {
//             mensaje.classList.add('Realizado')
//             setTimeout(() => {
//                 mensaje.classList.remove('Realizado')
//                 window.location.reload()
//             }, 1500);
//         }
//         else {
//             mensaje.classList.add('noExisteError')
//             setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
//         }
//         guardarAlmacenamientoLocal('productos', productos);
//     }
// })

// // Eliminar
// const productoE = document.getElementById('productoEliminar')

// document.getElementById("botonEliminar").addEventListener("click", function (event) {
//     event.preventDefault()
//     let productoEliminar = productoE.value
//     let van = false

//     for (let i = 0; i < productos.length; i++) {
//         if (productos[i].nombre == productoEliminar) {
//             productos.splice(i, 1)
//             van = true
//         }
//     }

//     if (van == false) {
//         mensaje.classList.add('noExsiteError')
//         setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
//     }
//     else {
//         mensaje.classList.add('Realizado')
//         setTimeout(() => {
//             mensaje.classList.remove('Realizado')
//             window.location.reload()
//         }, 1500);
//     }
//     guardarAlmacenamientoLocal('productos', productos);
// })

// // mostrar productos
// window.addEventListener("load", () => {
//     const productoEd = document.getElementById('productoEditar')
//     const productoEl = document.getElementById('productoEliminar')
//     for (let i = 0; i < productos.length; i++) {
//         productoEd.innerHTML += `<option>${productos[i].nombre}</option>`
//         productoEl.innerHTML += `<option>${productos[i].nombre}</option>`
//     }
//     Object.keys(productos[0]).forEach(element => {
//         atributoEd.innerHTML += `<option>${element}</option>`
//     });

//     let mostraProductos = document.getElementById('mostrarProductos')
//     mostraProductos.innerHTML = ''
//     for (let i = 0; i < productos.length; i++) {
//         mostraProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p>${productos[i].descripcion}</p><p class="precio"><span>Precio: ${productos[i].valor}$</span></p> Existencia: ${productos[i].existencia}<p></p></div></div>`
//     }
// })



