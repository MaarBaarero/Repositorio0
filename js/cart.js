const URL = "http://japdevdep.github.io/ecommerce-api/cart/654.json"
let carritoArray = "";
let total = "";
let subtotal = "";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});

    // Json Carrito
    getJSONData(URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        carritoArray = resultObj.data;
        mostrarCarrito(carritoArray);
        console.log(carritoArray);
      }else{
      
      }
    
    });


function mostrarCarrito(carritoArray){

    let articulos = "";
    let i=0;

    for (art of carritoArray.articles){
    i++;
    articulos += `
    <tr class="container justify-content-center justify-content-between text-center" style="margin-block: auto;width: auto;">
      
      <td class="col" style="margin-top: auto; margin-bottom: auto;width:150px">
        <div class="flex">
          <img src="${art.src}" class="card flex" style="margin-top: 10px; margin-bottom: 10px;min-width: 150px;max-width: 150px">
        </div>
      </td>
      <td class="col" style="margin-top: auto; margin-bottom: auto;min-width: 400px">
        <div class="col" style="margin-top: auto; margin-bottom: auto;">
          <span class="subtitle is-5" style="margin-top: 10px; margin-bottom: 10px;">${art.name}</span>
        </div>
      </td>
      
      <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:150px">
        <input type="number" id="cantidad${i}" onChange="calcular();" class="input number is-rounded is-warning" value=${art.count} style="margin-top: auto; margin-bottom: auto;width: 100px;">
      </td>

      <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:50px">
        <span class="text-muted" style="margin-top: auto; margin-bottom: auto;">${art.currency}</span>
      </td> 
      <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:150px">
        <span id="precio${i}" class="text-muted" style="margin-top: auto; margin-bottom: auto;">${art.unitCost}</span>
      </td>
      
      <td class="col" style="margin-top: auto; margin-bottom: auto;min-width:150px">
        <span id="subtotal${i}" class="text-muted" style="margin-top: auto; margin-bottom: auto;"></span>
      </td>
    </tr>
    `;
  }
  document.getElementById("carrito").innerHTML = articulos;
  calcular();

}

function calcular(){
  let precios = "";
  let cantidad = "";
  let total = "";
  let subtotal = "";
  let subtotalF = "";
  let i=0;
  

  for (articulo of carritoArray.articles){
    precios = parseFloat(document.getElementById("precio"+i));
    cantidad = parseFloat(document.getElementById("cantidad"+i));
    console.log(precios[i]);
    console.log(cantidad[i]);
    console.log(`llega-------------------`);

    subtotal += parseFloat(precios[i] * cantidad);
    subtotalF += parseFloat(subtotal);
    total += parseFloat(subtotal);
    
    document.getElementById("subtotal"+i).innerHTML = parseFloat(precios[i] * cantidad);
    i++;
  }

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