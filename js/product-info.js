// Variables globales
let infoProducto = "";
let productosArray = "";
let galeria = "";
let comentarios = "";
let relacionados = "";    
let mostrar = "";
let nuevoComentario = "";
let puntuacion = "";
let hoy = new Date();
let fechaActual = (hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDay()+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds());
let usuario = JSON.parse(localStorage.getItem("usuario"));
let nombre = usuario.nombre;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  
  // Json info
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoProducto = resultObj.data;
      mostrarInfoProducto(infoProducto);
      mostrarGaleria(infoProducto);
      
      // Json productos
      getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          productosArray = resultObj.data;
          productosRelacionados(infoProducto.relatedProducts);
        }
      });

    }
  });
  // Json comentarios
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentarios = resultObj.data;
      mostrarComentarios(comentarios);
    }
  });
  
  console.log(fechaActual);
  
});

// Mostrar toda la informacion del producto
function mostrarInfoProducto(infoProducto) {

  informacion = `
    <div class="block box content center">

      <div class="content text-center">                           
        <h1 class="title is-3 text-center">${infoProducto.name}</h1> 
      </div>
      <hr><br>
              
      <div class="columns">
        <div class="column">
          <img class="sombritaImagen" src="${infoProducto.images[0]}">
          <hr>
        </div>

        <div class="column">
          <hr>
          <div class="d-flex w-100 justify-content-between">
          <span class="content">${infoProducto.description}</span>
          <hr>
        </div>
        
        <div class="columns content">
          <div class="column is-7 content">
            <small class="text">${infoProducto.soldCount} artículos vendidos</small>
          </div>
          <div class="column content">
            <span class="subtitle is-3 text-muted" > ${infoProducto.currency}${infoProducto.cost}</span>
          </div>
        </div>

      </div>
    </div>
    `;

    document.getElementById("info-productos").innerHTML = informacion;

  hideSpinner();
}

//Mostrar comentarios
function mostrarComentarios(comentarios) {
  for (coment of comentarios) {
    puntos = parseInt(coment.score);
    mostrar += `
        <div class="list-group-item list-group-item-action">
            <div class="justify-content-center"> 
                <h4>${coment.user}</h4>
                <div id="puntuacion" style="margin-bottom: 10px"> ${mostrarEstrellas(
                  puntos
                )}</div>
                <p class="">${coment.description}</p>
                <small class="text">${coment.dateTime}</small>
            </div>
        </div> `;
  }
  document.getElementById("comentarios").innerHTML = mostrar;
}

// Agregar comentario
function comentar() {
  // Traigo el comentario de la caja de texto
  coment = document.getElementById("texto-comentario").value;
  confirmacion = "";

  // Me fijo para cada radio, si esta seleccionado, y guardo la puntuacion con el valor del radio
  for (let i = 1; i < 6; i++) {
    if (document.getElementById(i).checked) {
      puntuacion = document.getElementById(i).value;
    }
  }

  // Agrego toda la informacion del comentario al array ya existente y lo muestro
  comentarios.push({
    score: puntuacion,
    description: coment,
    user: nombre,
    dateTime: fechaActual,
  });
  console.log(comentarios)
  mostrarComentarios(comentarios);

  // Mensajito de confirmación todo bonito c:
  confirmacion = `
  <div class="animate__zoomIn">
    <div class="container justify-content-center">
      <div style="margin-bottom:50px"></div>
      <h1 class="row justify-content-center">¡ Hemos publicado tu comentario ! </h1>      
      <div class="row justify-content-center">        
        <h5 class="row justify-content-center" style="color: gray"> Podrás verlo más arriba junto a los demás comentarios </h5>        
      </div>
      <div class="row justify-content-center">
        <lottie-player class="container justify-content-center" src="https://assets1.lottiefiles.com/packages/lf20_kfzgxkvq.json"  background="transparent"  speed="0.3"  style="width: 200px; height: 200px; opacity:0.5"  loop  autoplay></lottie-player>      
      </div>
    </div>
    <div class="container justify-content-center">
      <lottie-player class="container justify-content-center" src="https://assets9.lottiefiles.com/packages/lf20_y2hxPc.json"  background="transparent"  speed="0.5"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
      <div style="margin-bottom:300px"></div>
    </div>
  </div>  
  `;
  document.getElementById("confirmacion").innerHTML = confirmacion;
  location.href="#ancla"

}  

// Calificacion
function mostrarEstrellas(puntos) {
  let estrellas = "";
  for (let i = 1; i < 6; i++) {
    if (i <= puntos) {
      estrellas += `<i class='fas fa-star' style='color:orange'></i>`;
    } else {
      estrellas += `<i class='far fa-star' style='color:gray'></i>`;
    }
  }
  return estrellas;
}

// Galeria
function mostrarGaleria(infoProducto) {
    
    galeria =`
    <div class="block content center text-center">
        <div class="table is-hoverable">
            <div class="columns content center text-center">
                
              <div class="column zoom">
                <img class="sombritaImagen" src="${infoProducto.images[1]}">
                <hr>
                <div class="zoom-content">
                  <img class="sombritaImagen" src="${infoProducto.images[1]}">
                  <div class="carousel-caption text-center" style="opacity:0.9;margin-top:50%;">
                    <hr>
                    <span class="subtitle is-3" style="color: white;margin-top:30%;text-shadow: 2px 2px 4px black;">Rendimiento a toda prueba</span>                            
                  </div>
                </div>
              </div>  

              <div class="column zoom">
                <img class="sombritaImagen" src="${infoProducto.images[2]}">
                <hr>
                <div class="zoom-content">
                  <img class="sombritaImagen" src="${infoProducto.images[2]}">
                  <div class="carousel-caption text-center" style="opacity:0.9;margin-top:30%;">
                  <hr><br>
                    <span class="subtitle is-3" style="color: white;margin-top:30%;text-shadow: 2px 2px 4px black;">Más comodidad al viajar</span>                            
                  </div>
                </div>
              </div>  

              <div class="column zoom">
                <img class="sombritaImagen" src="${infoProducto.images[3]}">
                <hr>
                <div class="zoom-content">
                  <img class="sombritaImagen" src="${infoProducto.images[3]}">
                  <div class="carousel-caption text-center" style="opacity:0.9;margin-top:30%;">
                  <hr><br>
                    <span class="subtitle is-3" style="color: white;margin-top:30%;text-shadow: 2px 2px 4px black;">Seguridad por todos los caminos</span>                            
                  </div>
                </div>
              </div>  

              <div class="column zoom">
                <img class="sombritaImagen" src="${infoProducto.images[4]}">
                <hr>
                <div class="zoom-content">
                  <img class="sombritaImagen" src="${infoProducto.images[4]}">
                  <div class="carousel-caption text-center" style="opacity:0.9;margin-top:30%;">
                  <hr><br>
                    <span class="subtitle is-3" style="color: white;margin-top:30%;text-shadow: 2px 2px 4px black;">Diseño único a tu alcance</span>                            
                  </div>
                </div>
              </div>  

        </div>
      </div>
    </div>
    `;

    document.getElementById("galeria").innerHTML = galeria;

}

// Mostrar los productos relacionados
function productosRelacionados(array){
    array.forEach(rel => {

      relacionados += `
      
      <div  class="column sombritaHover justify-content-center" style="width: 60%; padding:3%">
      
        <div class="block content center" style="width: 100%;">
          <figure class="image">
            <img class="sombritaImagen" src="${productosArray[rel].imgSrc}" style="width: 100%;">
          </figure>
        </div>
          
        <div class="block content center text-center" style="width: 100%;">
          <hr>
          <h3 class="subtitle is-3 text-muted">${productosArray[rel].name}</h3>                
        </div>
          
      </div>
        `;
        // <a class="relacionados" style="width: 100%;">
            
    });
    document.getElementById("productos-relacionados").innerHTML = relacionados;
}



// Json a mano para trabajarlo

// document.querySelectorAll('[Type=radio]').forEach((x) => x.checked=false);     deselecciona todos los radio

// info

// "name": "Chevrolet Onix Joy",
// "description": "Potenciá tu actitud con Onix Joy que, además de destacarse por su diseño juvenil y moderno, te ofrecé una óptima autonomía, un desempeño equilibrado y el máximo confort interior. <br>Ya sea un viaje largo o un simple paseo por la ciudad, el confort es uno de los puntos fuertes del Onix. Esta versión incluye aire acondicionado, asientos tapizados en tela y gran espacio interior que te garantiza el máximo confort.",
// "cost": 13500,
// "currency": "USD",
// "soldCount": 14,
// "category": "Autos",
// "images": [
// "img/prod1.jpg",
// "img/prod1_1.jpg",
// "img/prod1_2.jpg",
// "img/prod1_3.jpg",
// "img/prod1_4.jpg"
// ],
// "relatedProducts": [
// 1,
// 3
// ]

// comentarios

// [
//     {
//     "score": 3,
//     "description": "Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas",
//     "user": "juan_pedro",
//     "dateTime": "2020-02-25 18:03:52"
//     },
//     {
//     "score": 5,
//     "description": "Es un auto muy cómodo y en relación precio/calidad vale la pena!",
//     "user": "maria_sanchez",
//     "dateTime": "2020-01-17 13:42:18"
//     },
//     {
//     "score": 4,
//     "description": "Casi todo bien!, excepto por algún detalle de gusto personal",
//     "user": "paola_perez",
//     "dateTime": "2020-03-14 09:05:13"
//     },
//     {
//     "score": 5,
//     "description": "Un espectáculo el auto!",
//     "user": "pablo_gomez",
//     "dateTime": "2020-02-21 15:05:22"
//     }
//     ]
