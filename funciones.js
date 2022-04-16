
let carrito = []

let carritoLS = JSON.parse(localStorage.getItem('carrito'))

if (carritoLS) {  
    carrito = carritoLS
    actCar()
}


function agregarCar(id) {
    
    const pElegido = productos.find(el => el.id === id) //Se indica que lo elegido tomará el valor del id seleccionado

    if ( pElegido) {
        carrito.push( pElegido) //Se ingresa al carrito
    }
    actCar() //Se actualiza con lo que tenga

    localStorage.setItem('carrito', JSON.stringify(carrito)) //Se guarda en el local lo seleccionado. Al refrescar toma lo que habia y comienza a agregar si el usuario elige mas productos
}

//ELIMINAR PRODUCTO

function eliminarProducto(id) {
    const quitarP = carrito.find(el => el.id == id)
    const indice = carrito.indexOf(quitarP)
    carrito.splice(indice, 1)
    
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actCar()
}

//ACTUALIZAR CARRITO

function actCar() {
    
    const contCarrito = document.getElementById('contenedor-carrito')
    
    const pTotal = document.getElementById('precio-total')
    const pIva = document.getElementById('precio-iva')
    const pPagar = document.getElementById('aPagar')
    const contadorCarrito = document.getElementById('contador-carrito')

    contCarrito.innerHTML = ''

    carrito.forEach((producto) => {
        contCarrito.innerHTML += `
        <div class="producto-carrito">
            <p>${producto.desc}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        </div>
    
        `
    })
    
    let sumaProductos = carrito.reduce((acum, el) => acum += el.precio, 0)
    let ivaProductos = carrito.reduce((acum, el) => acum += el.precio * 0.21, 0)
    
    pTotal.innerText = sumaProductos.toFixed(2)
    pIva.innerText = ivaProductos.toFixed(2)
    precioConDecimal = sumaProductos + ivaProductos
    pPagar.innerText = precioConDecimal.toFixed(2)
    localStorage.setItem('precioConDecimal', JSON.stringify(precioConDecimal))
    

    contadorCarrito.innerText = carrito.length
    localStorage.setItem('contadorCarrito', JSON.stringify(carrito.length))
}

function eliminarTodo() {
    localStorage.clear(carrito)
    carrito = []
    actCar()
}