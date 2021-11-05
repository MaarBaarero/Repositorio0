const URL = "http://japdevdep.github.io/ecommerce-api/cart/654.json"
let carritoArray = "";
let articulos = "";
let total = 0;
let subtotal = 0;
let envioSeleccionado = 0;
let envio = 0;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  // let botoncitos = document.getElementsByClassName("eliminarArticulo");
  // console.log("botoncitos: "+botoncitos);

  // for(boton of botoncitos){
  //   console.log("boton: "+boton);

  //   boton.addEventListener("click", function (){
  //     alert("a");
  //     console.log("AAAAAAAAAAAA");
  //   });
  // }

  // Json Carrito
  getJSONData(URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carritoArray = resultObj.data;
      mostrarCarrito(carritoArray);
      console.log(carritoArray);
      resumen(carritoArray);
    }
  });


});

function resumen(carritoArray){

  for (art of carritoArray.articles){
    articulos += `
    <div class="row">
      <div class="col text-muted text-left">
      <span class="content"> ${art.name} </span>
      </div>
      <div class="col-1 text-muted text-left">
        <span class="content"> x${art.count} </span>
      </div>
      <div class="col-4 text-muted text-left">
        <span class="content"> ${art.currency}  ${art.unitCost} </span>
      </div>
    </div>
    <br>

    `;
  }

  document.getElementById("resumen").innerHTML = articulos;

  // slice
}

function mostrarCarrito(carritoArray){

  let articulos = "";
  let i=0;

  for (art of carritoArray.articles){
    articulos += `  
    <div class="block box" id="articulo${i}">
    <div id="eliminar${i}" style="position:absolute; left: 60%; border-radius: 50%; opacity: 50%;" class="eliminarArticulo sombritaHover" aria-label="close"><i class="far fa-trash-alt fa-2x" style="size: 2x; color:red;"></i></div>
      <div class="content text-center">                           
        <span class="title is-5">${art.name}</span>
      </div>
      <hr><br>
              
      <div class="columns justify-content-center">
        <div class="column is-3">
          <figure class="image">    
            <img class="sombritaImagen" src="${art.src}">
          </figure>
        </div>
        <div class="column">
          <small class="text-muted text-center">Precio por unidad</small><br><br>
          <span class="text-muted text-center">${art.currency}</span>
          <span id="precio${i}" class="text-muted">${art.unitCost}</span>
        </div>
        
        <div class="column justify-content-center">
          <small class="text-muted text-center">Cantidad de artículos</small><br><br>
          <input type="number" id="cantidad${i}" onChange="calcular();" class="input number is-rounded is-warning justify-content-center" value=${art.count} style="width: 60%">
        </div>
        <div class="column">
          <small class="text-muted text-center">Subtotal</small><br><br>
          <div id="subtotal${i}"></div>        
        </div>
      </div>
    </div>
    `;
    i++;

  }
  
  
  document.getElementById("carrito").innerHTML = articulos;
  calcular();
  
  
}



function calcular(){
  let precio = 0;
  let cantidad = 0;
  let total = 0;
  let subtotal = 0;
  let subtotalF = 0;
  let envio = 0;
  let i=0;  

  for (articulo of carritoArray.articles){

    precio = parseFloat(articulo.unitCost);
    // console.log("Precio : "+articulo.unitCost);    
    cantidad = parseFloat(document.getElementById("cantidad"+i).value);
    // console.log("cantidad : "+cantidad);
    subtotal = precio * cantidad;
    // console.log("subtotal : "+subtotal);
    subtotalF += parseInt(subtotal);
    // console.log("el otro subtotal final: "+subtotalF);
    
    document.getElementById("subtotal"+i).innerHTML = `<span  class="text-muted" style="margin-top: auto; margin-bottom: auto;">${articulo.currency} ${subtotal}</span>`;
    
    i++;
  }
  
  total = parseFloat(subtotalF);
  total = parseInt(subtotalF) + parseInt(envioSeleccionado);

  // Calculos de envio
  document.getElementById("envio-seleccionado").addEventListener("change", () =>{
    envioSeleccionado = document.getElementById("envio-seleccionado").value;
    total = parseInt(subtotalF) + parseInt(envioSeleccionado);
    console.log("Envio: "+envioSeleccionado);
    console.log("Total despues de envio: "+total);
    calcular();
  })

  // Mostrar resultados 
  document.getElementById("envio").innerHTML = envioSeleccionado;
  document.getElementById("subtotal").innerHTML = (subtotalF).toFixed(2);
  document.getElementById("total").innerHTML = (total).toFixed(2);
  
  // consola
  console.log("------ TOTALES -------");
  console.log("Subtotal: "+subtotalF);
  console.log("Total: "+total);

}



// JSON a mano para trabajar
// {
//     "articles": [
//     {
//     "name": "Pino de olor para el auto",
//     "count": 2,
//     "unitCost": 100,
//     "currency": "UYU",
//     "src": "img/tree1.jpg"
//     },

//     {
//     "name": "Suzuki Celerio",
//     "count": 1,
//     "unitCost": 12500,
//     "currency": "USD",
//     "src": "img/prod3.jpg"
//     }
//     ]
//     }  
  