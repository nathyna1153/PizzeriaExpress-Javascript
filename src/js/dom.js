class ProductoPizza {
    constructor(codigo, nombre, ingredientes, imagen, tamanio, precio){
        this.codigo = codigo;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.tamanio = tamanio;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}
let listadoProductosMediana = [
    new ProductoPizza('001', 'vegetariana', ['Tomate', 'Pimenton', 'Aceituna', 'Champiñón'], './src/imagenes/pizzaAceituna.jpg', 'mediana', 5000),
    new ProductoPizza('002', 'italiana', ['Salsa de tomate', 'Queso', 'Orégano', 'Tomate'], './src/imagenes/pizzaSalame.jpg','mediana', 6000),
    new ProductoPizza('003', 'española', ['Salsa de tomate', 'Queso', 'Jamón', 'Choricillo', 'Albahaca'], './src/imagenes/pizzaCarne.jpg','mediana', 6500),
    new ProductoPizza('004', 'carnivora', ['Salsa de tomate', 'Queso', 'carne', 'Choricillo', 'Tocino'], './src/imagenes/pizzaAceituna.jpg','mediana', 7500),
];
let listadoProductosFamiliar = [
    new ProductoPizza('005', 'vegetariana', ['Tomate', 'Pimenton', 'Aceituna', 'Champiñón'], './src/imagenes/pizzaAceituna.jpg', 'Familiar', 8500),
    new ProductoPizza('006', 'italiana', ['Salsa de tomate', 'Queso', 'Orégano', 'Tomate'], './src/imagenes/pizzaSalame.jpg','Familiar', 8500),
    new ProductoPizza('007', 'española', ['Salsa de tomate', 'Queso', 'Jamón', 'Choricillo', 'Albahaca'], './src/imagenes/pizzaCarne.jpg','Familiar', 9500),
    new ProductoPizza('008', 'carnivora', ['Salsa de tomate', 'Queso', 'carne', 'Choricillo', 'Tocino'], './src/imagenes/pizzaAceituna.jpg','Familiar', 10500),
];

rellenaDatosUsuario();

//dibujar el contenedor de cards
const contenedorCards = document.querySelector("#contenedor-card");
rellenaCards(listadoProductosMediana, contenedorCards, "M");

const contenedorCardsFamiliares = document.querySelector("#contenedor-card-familiares");
rellenaCards(listadoProductosFamiliar, contenedorCardsFamiliares, "F");


//Dibujando el carrito
const columnaCarrito = document.querySelector(".columna-carrito");
const contenedorCarrito = document.querySelector(".contenedor-carrito") // 
//header
const cardHeader = document.createElement("div");
cardHeader.classList.add("card-header");
contenedorCarrito.appendChild(cardHeader);
//body
const cardBody = document.createElement("div");
cardBody.classList.add("card-body");
contenedorCarrito.appendChild(cardBody);
// ul-body
const listadoGrupo = document.createElement("ul");
listadoGrupo.classList.add("list-group");
listadoGrupo.classList.add("list-group-flush");
cardBody.appendChild(listadoGrupo);
//precio
const precioTotal = document.createElement("div");
precioTotal.classList.add("card-price");
cardBody.appendChild(precioTotal);
// boton comprar
const grillaBotonComprar = document.createElement("div");
grillaBotonComprar.classList.add("d-grid");
grillaBotonComprar.classList.add("gap-2");
cardBody.appendChild(grillaBotonComprar);
console.log(grillaBotonComprar);
//inyectamos a header carrito
cardHeader.innerHTML = 
`<h5 class="card-title">Tu pedido</h5>`
//cambio
function rellenaDatosUsuario(){

    if(localStorage.getItem("session") == null){
        window.location.href = "login.html";    
    }

    const sesionLogin = JSON.parse(localStorage.getItem("session"));
    
    const datosUsuario = document.querySelector("#datos-usuario");

    let nombreUsuario = document.createElement("div");
    nombreUsuario.innerHTML = 
    `
        <h5>¡Bienvenido ${sesionLogin.usuario}!</h5>
    `;
    datosUsuario.appendChild(nombreUsuario);

    let logout = document.createElement("div");
    logout.innerHTML = 
    `
        <a href="javascript:logout();" class="text-color-white">Cerrar Sesión</a>
    `;
    datosUsuario.appendChild(logout);
}

function logout(){
    localStorage.removeItem("session");
    localStorage.removeItem("listadoProductosCarrito");
    window.location.href = "login.html";
}


pintaCarrito();

function rellenaCards(listaElementos, div, tipo){
    for(elemento of listaElementos){
        let card = document.createElement("div");
        card.classList.add("col-md-6");
        card.classList.add("columna-productos");
        card.innerHTML = 
        `
            <div class="card">
                <img src="${elemento.imagen}" class="card-img-top" alt="Producto 1">
                <div class="card-body">
                    <h5 class="card-title"> ${elemento.nombre}</h5>
                    <p class="card-text"> ${elemento.ingredientes}</p>
                    <div class="card-price">
                        <p class="card-text">Precio: $ ${elemento.precio}</p>
                    </div>
                    <div class="d-grid gap-2"> 
                        <button class="btn agregar btn-warning" onclick="agregarProducto(${elemento.codigo},'${tipo}')" type="button">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        div.appendChild(card);
    
    }
}

function agregarProducto(codigo,tipo){
    //alert(codigo+"-"+tipo)
    if(tipo == "M"){
        var pizza = listadoProductosMediana.find(pizzaMediana => {return pizzaMediana.codigo == codigo});
        //alert(pizza.nombre)
        agregarACarrito(pizza);
        Swal.fire({
            icon: 'success',
            title: `Tu Pizza ${pizza.nombre} se ha agregado al carrito`
          })
    }else{
        var pizza = listadoProductosFamiliar.find(pizzaFamiliar => {return pizzaFamiliar.codigo == codigo});
        //alert(pizza.nombre)
        agregarACarrito(pizza);
        Swal.fire({
            icon: 'success',
            title: `Tu Pizza ${pizza.nombre} se ha agregado al carrito`
          })
    }
}

function agregarACarrito(pizza){
    let listadoProductosCarrito = JSON.parse(localStorage.getItem("listadoProductosCarrito"));
    if(listadoProductosCarrito == null){
        listadoProductosCarrito = [];
    }

    let existeEnCarrito = false;
    listadoProductosCarrito.forEach(element => {
        if(element.codigo == pizza.codigo){
            element.cantidad = element.cantidad + 1;
            existeEnCarrito = true;
        }
    });
    if(!existeEnCarrito){
        listadoProductosCarrito.push(pizza);
    }
    localStorage.setItem("listadoProductosCarrito", JSON.stringify(listadoProductosCarrito));
    pintaCarrito();
}

function pintaCarrito(){
    let htmlListadoGrupo = '';
    let precioFinal = 0;
    let listadoProductosCarrito = JSON.parse(localStorage.getItem("listadoProductosCarrito"));
    listadoProductosCarrito.forEach(elemento => {
        console.log(elemento.cantidad);
        let precioProducto = parseInt(elemento.precio) * parseInt(elemento.cantidad);
        precioFinal = precioFinal + precioProducto;
        htmlListadoGrupo = htmlListadoGrupo +
        `
            <li class="list-group-item"> ${elemento.nombre} 
                <span class="float-end precio">$ ${precioProducto}
                    <i class="bi bi-trash eliminar" onclick="eliminarDeCarrito(${elemento.codigo})"></i>
                </span>
                <span class="badge cantidad float-end rounded-pill bg-success"> ${elemento.cantidad}
                </span>
            </li>
        `
    });
    listadoGrupo.innerHTML = htmlListadoGrupo;

    if(precioFinal > 0){
        //inyectamos a precioTotal
        precioTotal.innerHTML = 
        `
        <p class="card-price-text">Precio total:</p>
        <p class="card-price-text card-price-total">$ ${precioFinal}</p>
        `;
        //inyectar button comprar
        grillaBotonComprar.innerHTML = 
        `
            <button type="button" onclick="confirmarCompra()" class="btn btn-success d-block  mt-3">Confirmar compra</button>
        `;
    }else{
        precioTotal.innerHTML = 
        `
        <p class="card-price-text">Carrito Vacío</p>
        `;
        //inyectar button comprar
        grillaBotonComprar.innerHTML = ``;
    }
}

function eliminarDeCarrito(codigo){
    //alert(codigo)
    let listadoProductosCarrito = JSON.parse(localStorage.getItem("listadoProductosCarrito"));
    let pizzaEncontrada = listadoProductosCarrito.find(pizza => pizza.codigo == codigo);
    console.log(pizzaEncontrada);
    if(pizzaEncontrada.cantidad > 1){
        pizzaEncontrada.cantidad = pizzaEncontrada.cantidad - 1;
    }else{
        let indice = listadoProductosCarrito.indexOf(pizzaEncontrada);
        if(indice > -1){
            listadoProductosCarrito.splice(indice, 1);
        }
    }
    localStorage.setItem("listadoProductosCarrito", JSON.stringify(listadoProductosCarrito));
    pintaCarrito();
        
}
function confirmarCompra(){

    Swal.fire({
        title: 'Pedido en camino!',
        color: '#ff9707',
        imageUrl: '../src/imagenes/vector1.jpg',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Custom image',
        background: '#fff'
      })

}

//AGREGAR funcion asincrona
//**** fetch */ 
fetch('../data.json')
.then((response)=> response.json())
.then((data)=>{
    data.forEach((post) => { //console.log(post)
        const card = document.createElement('div');
        card.classList.add("col-md-6");
        card.classList.add("columna-productos");
        card.innerHTML = 
        `
            <div class="card">
                <img src="${elemento.imagen}" class="card-img-top" alt="Producto 1">
                <div class="card-body">
                    <h5 class="card-title"> ${elemento.nombre}</h5>
                    <p class="card-text"> ${elemento.ingredientes}</p>
                    <div class="card-price">
                        <p class="card-text">Precio: $ ${elemento.precio}</p>
                    </div>
                    <div class="d-grid gap-2"> 
                        <button class="btn agregar btn-warning" onclick="agregarProducto(${elemento.codigo},'${tipo}')" type="button">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        div.appendChild(card);

    })

})

