let url = PRODUCTS_URL;
let productosArray = [];

// Mostrar listado de productos
function showProductsList(productosArray) {
  showSpinner();

  let htmlContentToAppend = "";
  // let mensaje = `<h1 style="color: grey" class="justify-content-between" >No se encontraron productos.</h1>`;

  let min = document.getElementById("min").value;
  let max = document.getElementById("max").value;
  if (min == "") {
    min = 0;
  }
  if (max == "") {
    max = 1000000000;
  }

  for (producto of productosArray) {
    if (producto.cost >= min && producto.cost <= max) {
      htmlContentToAppend +=
        `
        <div class="block" style="padding:1%">
          <div class="columns sombritaHover box">

            <div class="column is-5">
              <img class="sombritaImagen" src="${producto.imgSrc}">
            </div>

            <div class="column">
              <div class="justify-content-between">
                <h4 class="title is-3">${producto.name}</h4> 
                <div class="block">
                  <p class="mb-1"> `+ producto.description +` </p>
                </div>
                <hr>
                <div class="content in-line">
                  <small class="text"> ${producto.soldCount} artículos vendidos</small> 
                  <span class="subtitle is-3 text-muted" style="margin-left:250px">` +producto.currency +` `+ producto.cost +` </span>
                </div>
              </div>
            </div>

          </div>
        </div> `;
    }

    document.getElementById("tabla-productos").innerHTML = htmlContentToAppend;
    hideSpinner();
  }
}

// Ordenar por precio o relevancia
function ordenar() {
  let aux = [];

  // Precio
  if (document.getElementById("asc").checked == true) {
    aux = productosArray.sort(function (a, b) {
      return a.cost - b.cost;
    });
    showProductsList(aux);
  }
  if (document.getElementById("des").checked == true) {
    aux = productosArray.sort(function (a, b) {
      return b.cost - a.cost;
    });
    showProductsList(aux);
  }

  // Relevancia
  if (document.getElementById("menos-rel").checked == true) {
    aux = productosArray.sort(function (a, b) {
      return a.soldCount - b.soldCount;
    });
    showProductsList(aux);
  }
  if (document.getElementById("mas-rel").checked == true) {
    aux = productosArray.sort(function (a, b) {
      return b.soldCount - a.soldCount;
    });
    showProductsList(aux);
  }
}

// Buscar producto por nombre o descripción

function buscar() {
  let textoAbuscar = document.getElementById("buscar").value;
  let aux = productosArray.filter((producto) => {
    return (
      (producto.name.toLowerCase().indexOf(textoAbuscar.toLowerCase()) ||
        producto.description
          .toLowerCase()
          .indexOf(textoAbuscar.toLowerCase())) > -1
    );
  });
  showProductsList(aux);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  // Obtengo los productos del json y los muestro
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productosArray = resultObj.data;
      //Muestro los productos
      showProductsList(productosArray);
    }
  });

  // Leer teclado en el buscador
  document.getElementById("buscar").addEventListener("keyup", () => {
    buscar();
  });

  // Redirrecionar a la pagina de informacion del producto
  document.getElementById("tabla-productos").addEventListener("click", () => {
    location.href = "product-info.html";
  });
});
