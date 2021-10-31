const URL = "http://japdevdep.github.io/ecommerce-api/cart/654.json"
let carritoArray = "";
let total = "";
let subtotal = "";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  // Json Carrito
  getJSONData(URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carritoArray = resultObj.data;
      mostrarCarrito(carritoArray);
      console.log(carritoArray);
    }
  
  });

});


function mostrarCarrito(carritoArray){

    let articulos = "";
    let i=0;

    for (art of carritoArray.articles){
      articulos += `
    <tr class="container justify-content-center justify-content-between text-center" style="margin-block: auto;width: auto;">
    
    <td class="col" style="margin-top: auto; margin-bottom: auto;width:150px">
        <div class="flex">
        <img class="sombritaImagen" src="${art.src}" style="margin-top: 10px; margin-bottom: 10px;min-width: 150px;max-width: 150px">
        </div>
        </td>
        <td class="col" style="margin-top: auto; margin-bottom: auto;min-width: 400px">
        <div class="col" style="margin-top: auto; margin-bottom: auto;">
        <span class="subtitle is-5" style="margin-top: 10px; margin-bottom: 10px;">${art.name}</span>
        </div>
        </td>
        
        <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:150px">
        <input type="number" name="cantidad" id="cantidad${i}" onChange="calcular();" class="input number is-rounded is-warning" value=${art.count} style="margin-top: auto; margin-bottom: auto;width: 100px;">
        </td>
        
        <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:50px">
        <span class="text-muted" style="margin-top: auto; margin-bottom: auto;">${art.currency}</span>
        </td> 
        <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:150px">
        <span id="precio${i}" class="text-muted" style="margin-top: auto; margin-bottom: auto;">${art.unitCost}</span>
        </td>
        
        <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:150px">
          <div id="subtotal${i}"></div>        
        </td>
        </tr>
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

    // Guardo el precio y cantidad en variables
    precio = parseFloat(articulo.unitCost);
    console.log("Precio : "+articulo.unitCost);    
    cantidad = parseFloat(document.getElementById("cantidad"+i).value);
    console.log("cantidad : "+cantidad);
    
    subtotal = precio * cantidad;
    console.log("subtotal : "+subtotal);
    
    document.getElementById("subtotal"+i).innerHTML = `<span  class="text-muted" style="margin-top: auto; margin-bottom: auto;">${subtotal}</span>`;
    
    console.log(`------- ARTICULO -------`);    
    
    // el otro subtotal final: 20012500
    subtotalF += parseInt(subtotal);
    console.log("el otro subtotal final: "+subtotalF);

    
    total += parseFloat(subtotalF);
    i++;
  }
  
  // Envios
  if(document.getElementById("envio-normal").checked == true){
    envio = 150
    total += parseFloat(envio);  
    console.log("Total con envio: "+total)
  }
  if(document.getElementById("envio-express").checked == true){
    envio = 350
    total += parseFloat(envio);  
    console.log("Total con envio: "+total)
  }
  if(document.getElementById("sin-envio").checked == true){
    envio = 0 //Por si tocan otro antes me aseguro de que vuelva a cero
    total += parseFloat(envio);  
    console.log("Total con envio: "+total)
  }
  console.log("Envio: "+envio)

  document.getElementById("envio").innerHTML = envio
  document.getElementById("subtotal").innerHTML = (subtotalF).toFixed(2);
  document.getElementById("total").innerHTML = (total).toFixed(2);
  
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