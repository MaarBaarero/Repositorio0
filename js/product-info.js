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
    <div class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-center">                           
            <h1 class="row justify-content-center ">
            ${infoProducto.name} 
            </h1> 
        </div><hr><br>
              
        <div class="row">
            <div class="col">
                <img src="
                ${infoProducto.images[0]}
                " alt="" class="img-fluid"><hr>
            </div>

            <div class="col">
                <hr><br>
                <div class="d-flex w-100 justify-content-between">
                <p class="mb-1">
                ${infoProducto.description}
                </p>
            </div><hr><br>
            
            <div class="d-flex w-100 justify-content-between">                           
                <small class="text">
                ${infoProducto.soldCount}
                 artículos vendidos</small>
                <h3 class="text-muted">
                ${infoProducto.currency}                 
                ${infoProducto.cost}
                 </h3>
            </div>
        </div>
    </div>
    <hr><br>  
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
    <div class="list-group-item list-group-item-action">
        <div class="card">
            <div class="row justify-content-center">

                <div class="zoom col d-block">
                    <img src="${infoProducto.images[4]}" class="d-block w-100">                    
                    <div class="zoom-content">
                        <img src="${infoProducto.images[4]}" class="rounded mx-auto d-block" style="width: 500px;">
                        <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
                            <h1 style="color: white;text-shadow: 2px 2px 4px black;">Diseño único a tu alcance</h1>                            
                        </div>
                    </div>
                </div>

                <div class="zoom col d-block">
                    <img src="${infoProducto.images[2]}" class="rounded d-block w-100">
                    <div class="zoom-content">
                        <img src="${infoProducto.images[2]}" class="rounded mx-auto d-block" style="width: 500px;">
                        <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
                            <h1 style="color: white;text-shadow: 2px 2px 4px black;">Más comodidad al viajar</h1>                          
                        </div>
                    </div>
                </div>

                <div class="zoom col d-block">
                    <img src="${infoProducto.images[1]}" class="d-block w-100">
                    <div class="zoom-content">
                        <img src="${infoProducto.images[1]}" class="rounded mx-auto d-block" style="width: 500px;">
                        <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
                        <h1 style="color: white;text-shadow: 2px 2px 4px black;">Rendimiento a toda prueba</h1>                        
                        </div>
                    </div>
                </div>

                <div class="zoom col d-block">
                    <img src="${infoProducto.images[3]}" class="d-block w-100">
                    <div class="zoom-content">
                        <img src="${infoProducto.images[3]}" class="rounded mx-auto d-block" style="width: 500px;">
                        <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
                            <h1 style="color: white;text-shadow: 2px 2px 4px black;">Seguridad por todos los caminos</h1>                            
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
      
        <a class="relacionados"><div  class="justify-content-center" style="width: 500px;">
        
          <div class="card justify-content-center" style="width: 500px;">
            <img src="${productosArray[rel].imgSrc}" style="width: 500px;">
          </div>

          <div class="row justify-content-center" style="width: 500px; margin-top:15px">
            <h3 class="text-muted justify-content-center">${productosArray[rel].name}</h3>                
          </div>

        </div></a>
        <hr>

         

      `;

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

// <div class="carousel slide" data-ride="carousel" data-bs-ride="carousel" data-bs-interval="500">
// <div class="carousel-inner">
//     <div class="carousel-item active">
//         <img class="d-block w-100" src="
//         ${infoProducto.images[1]}
//         " alt="">
//         <div class="carousel-caption d-none d-md-block"></div>
//     </div>

//     <div class="carousel-item">
//         <img class="d-block w-100"  src="
//         ${infoProducto.images[2]}
//         " alt="">
//         <div class="carousel-caption d-none d-md-block"></div>
//     </div>

//     <div class="carousel-item">
//         <img class="d-block w-100" src="
//         ${infoProducto.images[3]}
//         " alt="" >
//         <div class="carousel-caption d-none d-md-block"></div>
//     </div>

//     <div class="carousel-item">
//         <img class="d-block w-100" src="
//         ${infoProducto.images[4]}
//         " alt="">
//         <div class="carousel-caption d-none d-md-block"></div>
//     </div>
// </div>
// </div>

// <br><br><br>
// <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
//     <div class="carousel-indicators">
//         <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" aria-label="Slide 1" class="active" aria-current="true"></button>
//         <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
//         <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
//         <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide "></button>
//     </div>

//     <div class="carousel-inner">
//         <div class="carousel-item active" data-bs-interval="10000">
//             <img src="${infoProducto.images[1]}" class="d-block w-100">
//             <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
//                 <h1 style="color: white;text-shadow: 2px 2px 4px black;">Diseño único a tu alcance</h1>
//                 <p>Nueva carrocería totalmente renovada. El Chevrolet Joy viene con detalles en la grilla frontal y retrovisores en negro “High Gloss”. Mientras que el parachoques es pintado del color del vehículo, el farol viene con máscara negra con detalles cromados.</p>
//             </div>
//         </div>

//         <div class="carousel-item" data-bs-interval="2000">
//             <img src="${infoProducto.images[2]}" class="d-block w-100">
            // <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
            //     <h1 style="color: white;text-shadow: 2px 2px 4px black;">Seguridad por todos los caminos</h1>
            //     <p>Con el Chevrolet Joy, vos vas a manejar un auto con mucha más seguridad, con la luz de posición LED, doble airbag, frenos ABS con EBD, aviso sonoro para cinturón de seguridad del conductor y sistema Isofix & Top Tether para fijar a los más pequeños.</p>
            // </div>
//         </div>

//         <div class="carousel-item">
//             <img src="${infoProducto.images[3]}" class="d-block w-100">
//             <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
                // <h1 style="color: white;text-shadow: 2px 2px 4px black;">Más comodidad al manejar</h1>
//                 <p>Ahora, tu también podés tener más tecnología en tu día a día. El Chevrolet Joy tiene panel de instrumentos con múltiples informaciones al conductor, cinturones delanteros regulables en altura y dirección eléctrica progresiva para que tengas el control total del
//                 vehículo.</p>
//             </div>
//         </div>

//         <div class="carousel-item">
//             <img src="${infoProducto.images[4]}" class="d-block w-100">
//             <div class="carousel-caption d-none d-md-block" style="opacity:0.9">
                // <h1 style="color: white;text-shadow: 2px 2px 4px black;">Rendimiento a toda prueba</h1>
//                 <p>Chevrolet Joy viene con un motor 1.0 preparado para llevarte a donde quieras con un increíble rendimiento: en carretera 14,7 km/l y en ciudad 12,8 km/l.</p>
//             </div>
//         </div>
//     </div>

//     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
//         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span class="visually-hidden"></span>
//     </button>
//     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
//         <span class="carousel-control-next-icon" aria-hidden="true"></span>
//         <span class="visually-hidden"></span>
//     </button>
// </div>
