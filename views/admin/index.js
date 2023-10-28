(async() => {
    try {
        const admin = await axios.get('/api/admin')
    } catch (error) {
        const notAdmin = error.response.data.error
        window.location.pathname = '/';
    }
})();
const productoEd = document.getElementById('productoEditar')
const productoE = document.getElementById('productoEliminar')

async function productoData() {
    const productos = await axios.get('/api/items');
    const data = productos.data

    data.forEach((producto) => {
        const option = document.createElement('option');
        option.value = producto.id; // El valor de la opción es el nombre del producto
        option.text = producto.name; // El texto de la opción también es el nombre del producto
        productoEd.appendChild(option); // Agregar la opción al select
    });
}
async function productoDataE() {
    const productos = await axios.get('/api/items');
    const data = productos.data
    data.forEach((producto) => {
        const option = document.createElement('option');
        option.value = producto.id; // El valor de la opción es el nombre del producto
        option.text = producto.name; // El texto de la opción también es el nombre del producto
        productoE.appendChild(option); // Agregar la opción al select
    });
}


//selectores
const nameProductInput = document.querySelector('#nameAdded');
const descriptionProductInput = document.getElementById('descriptionAdded');
const valueProductInput = document.getElementById('valueAdded');
const existProductInput = document.getElementById('existAdded');
const imageProductInput = document.getElementById('imageAdded');

const btnPanel = document.getElementById('btn-panel');
const btnPay = document.getElementById('btn-pay');

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
        // van = false
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
})

// Editar
const atributoEd = document.getElementById('atributoEditar')
const nuevoAtributoEd = document.getElementById('nuevoAtributo')
const btnEditar = document.getElementById('botonEditar');

btnEditar.addEventListener("click", async function (event) {
    event.preventDefault();
    let productoEditar = productoEd.value;
    let atributoEditar = atributoEd.value;
    let nuevoAtributo = nuevoAtributoEd.value;

    if (productoEditar === '' || atributoEditar === '' || nuevoAtributo === '') {
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500);
        return;
    }

    try {
        // Enviar una solicitud para actualizar el producto en el servidor
        const updatedData = {
            producto: productoEditar,
            atributo: atributoEditar,
            nuevoValor: nuevoAtributo
        };
        const { data } = await axios.patch('/api/items', updatedData);
        console.log('data me dio:', data);
        if (data === 'Producto actualizado exitosamente') {
            productoData()
            mensaje.classList.add('Realizado');
            setTimeout(() => {
                mensaje.classList.remove('Realizado');
                window.location.reload();
            }, 1500);
        } else {
            mensaje.classList.add('noExisteError');
            setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
        }
    } catch (error) {
        console.error('Error al actualizar el producto en MongoDB:', error);
    }
});

// Eliminar
const btnEliminar = document.getElementById('botonEliminar')

btnEliminar.addEventListener("click", async function (event) {
    event.preventDefault()
    let productoEliminar = productoE.value
    console.log(productoE.value);
    if (productoEliminar == '') {
        mensaje.classList.add('noExsiteError')
        setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
        return
    }
    const data = await axios.delete(`/api/items/${productoEliminar}`);
    console.log('data me da', data.data);
    if (data.data === 'Producto eliminado exitosamente') {
        productoDataE()
        mensaje.classList.add('eliminado')
        setTimeout(() => {
            mensaje.classList.remove('eliminado')
            window.location.reload()
        }, 1500);
    }
})

// mostrar productos
window.addEventListener("load", async () => {
    productoData()
    productoDataE()
    const items = await axios.get('/api/items');
    const data = items.data;
    console.log(data);

    let mostraProductos = document.getElementById('mostrarProductos')
    mostraProductos.innerHTML = ''
    data.forEach((producto) => {
        mostraProductos.innerHTML += `
        <div class="contenedorProductos">
            <img src="${producto.image}">
            <div class="informacion">
                <p>${producto.name}</p>
                <p>${producto.description}</p>
                <p class="precio">
                    <span>Precio: ${producto.value}$</span>
                </p> Existencia: ${producto.exist}
                <p></p>
            </div>
        </div>`
    })
})

btnPanel.addEventListener('click', () => {
    window.location.pathname = '/paneladmin';
})

btnPay.addEventListener('click', () => {
    window.location.pathname = '/payment';
})


