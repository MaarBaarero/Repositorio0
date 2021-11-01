let nombreCompleto;
let foto;
let correo;
let telefono;
let edad;
let nacimiento;

let datos;

let ventana;
let boton;
let cruz;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    
    document.getElementById("vista-previa").src = usuario.avatar;
    document.getElementById("vista-previa-zoom").src = usuario.avatar;
    document.getElementById("foto-perfil").src = usuario.avatar;
    document.getElementById("nombre-perfil").innerText = usuario.nombre;
    document.getElementById("nombre-usuario").value = usuario.nombre;
    
    ventana = document.getElementById("ventana-actualizar");
    boton = document.getElementById("actualizar");
    cruz = document.getElementById("cerrar");

    
    
    // Cerrar ventana de actualizar datos
    document.getElementById("cerrar-actualizar").addEventListener("click", () => {
        document.getElementById("ventana-actualizar").style.display = "none"
    })
    // Cerrar ventana de info personal 
    document.getElementById("cerrar-info").addEventListener("click", () => {
        document.getElementById("ventana-info").style.display = "none"
    })
    
    document.getElementById("actualizar").addEventListener("click", () => {
        alert("a")
        document.getElementsById("ventana-actualizar").style.display = "block";
        
    })
   
   
    //probando weas
    // document.getElementById("imagen").addEventListener("onChange", () => {
    //     foto = document.getElementById("imagen");
    //     document.getElementById("vista-previa").src = foto;
    //     document.getElementById("vista-previa-zoom").src = foto;
        
    // });

    mostrarInfo();

});


// function mostrar() {             no funcó
//     document.getElementsById("ventana-actualizar").style.display = "block";
//     // modal.style.display = "block"
// }

function guardarCambios(){

    usuario.avatar = document.getElementById("imagen")
    
    nombreCompleto = document.getElementById("nombres")+" "+document.getElementById("apellidos");
    usuario.nombreCompleto = nombreCompleto; 
    // console.log(nombreCompleto);
    usuario.nombre = document.getElementById("nombre-usuario");
    // console.log(nombre-usuario);
    usuario.correo = document.getElementById("correo");
    // console.log(correo);
    usuario.pais = document.getElementById("pais");
    // console.log(pais);
    usuario.pais = document.getElementById("telefono");
    // console.log(telefono);
    usuario.edad =document.getElementById("edad")+" años.";
    // console.log(edad);

    localStorage.setItem('usuario',JSON.stringify(usuario));
    sessionStorage.setItem('usuario',JSON.stringify(usuario));
}

function mostrarInfo(){

    datos =`
    
        <div class="column is-5 text-right">
            <div class="table list">
                <div class="content">
                    <span class="subtitle"> Nombre completo</span>
                </div>
                <div class="content">
                    <span class="subtitle" for=""> Usuario</span>
                </div>
                <div class="content">
                    <span class="subtitle" for=""> Correo electrónico</span>
                </div>
                <div class="content">
                    <span class="subtitle" for=""> Teléfono</span>
                </div>
                <div class="content">
                    <span class="subtitle" for=""> Pais</span>
                </div>
                <div class="content">
                    <span class="subtitle" for=""> Edad </span>
                </div>  
            </div>
        </div>  
        <div class="column text-left">
            <div class="table list">
                <div class="content">
                    <span class="subtitle text-muted" id="m-nombre">   ${usuario.nombreCompleto} </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted" id="m-usuario">  ${usuario.nombre} </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted" id="m-corre">   ${usuario.corre} </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted" id="m-telefono">  ${usuario.telefono} </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted" id="m-pais">  ${usuario.pais} </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted" id="m-edad"> ${usuario.edad} </span>
                </div>
            </div>
        </div>
    `;

    document.getElementById("mostrar-info").innerHTML = datos;
}




