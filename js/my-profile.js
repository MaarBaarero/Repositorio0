let usuario = JSON.parse(localStorage.getItem("usuario"));
let nombreCompleto;
let nuevoAvatar;
let correo;
let telefono;
let edad;
let nacimiento;


let datos;


// probando mas weas que no funcionaron

// const imagenInput = document.getElementById("imagen");
//   imagenInput.onchange = () => {
//     if (imagenInput.files.length > 0) {
//       const fileName = document.querySelector('#file-js-example .file-name');
//       fileName.textContent = imagenInput.files[0].name;
//     }
//   }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("vista-previa").src = usuario.avatar;
    document.getElementById("vista-previa-zoom").src = usuario.avatar;
    document.getElementById("foto-perfil").src = usuario.avatar;
    document.getElementById("nombre-perfil").innerText = usuario.nombre;
    document.getElementById("nombre-usuario").value = usuario.nombre;
    mostrarInfo();
    

    
    
    // Mostrar ventana de actualizar datos
    document.getElementById("actualizar").addEventListener("click", () => {
        document.getElementById("ventana-actualizar").style.display = "block"
    })
    // Cerrar ventana de actualizar datos
    document.getElementById("cerrar-actualizar").addEventListener("click", () => {
        document.getElementById("ventana-actualizar").style.display = "none"
    })
    
    // Mostrar ventana de actualizar datos
    document.getElementById("info-cuenta").addEventListener("click", () => {
        mostrarInfo();
        document.getElementById("ventana-info").style.display = "block"
    })
    // Cerrar ventana de info personal 
    document.getElementById("cerrar-info").addEventListener("click", () => {
        document.getElementById("ventana-info").style.display = "none"
    })
    
    // probando weas
    document.getElementById("imagen").addEventListener("change", () => {
        nuevoAvatar = document.getElementById("imagen").value;   
        console.log(nuevoAvatar);
        document.getElementById("vista-previa").src = nuevoAvatar;
        document.getElementById("vista-previa-zoom").src = nuevoAvatar;  
    });
    
    console.log(usuario);

});

function guardarCambios(){

    usuario.avatar = nuevoAvatar;
    
    nombreCompleto = String(document.getElementById("nombres").value+" "+document.getElementById("apellidos").value);
    usuario.nombreCompleto = nombreCompleto; 
    console.log(usuario.nombreCompleto);
    usuario.nombre = String(document.getElementById("nombre-usuario").value);
    console.log(usuario.nombre);
    usuario.correo = String(document.getElementById("correo").value);
    console.log(usuario.correo);
    usuario.pais = String(document.getElementById("pais").value);
    console.log(usuario.pais);
    usuario.telefono = parseFloat(document.getElementById("telefono").value);
    console.log(usuario.telefono);
    usuario.edad = parseFloat(document.getElementById("edad").value);
    console.log(usuario.edad);

    localStorage.setItem('usuario',JSON.stringify(usuario));
    sessionStorage.setItem('usuario',JSON.stringify(usuario));
    alert("Done")
}

function mostrarInfo(){
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    datos =`
        <div class="column text-right">
            <div class="table list">
                <div class="content">
                    <span class="subtitle text-muted"> Nombre completo</span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted"> Usuario </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted subtitle"> Correo electrónico </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted"> Teléfono </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted"> Pais </span>
                </div>
                <div class="content">
                    <span class="subtitle text-muted"> Edad </span>
                </div>  
            </div>
        </div>
        <div class="column text-left">
            <div class="table list">
                <div class="content">
                    <span class="subtitle">${usuario.nombreCompleto}</span>
                </div>
                <div class="content">
                    <span class="subtitle">${usuario.nombre}</span>
                </div>
                <div class="content">
                    <span class="subtitle">${usuario.correo}</span>
                </div>
                <div class="content">
                    <span class="subtitle">${usuario.telefono}</span>
                </div>
                <div class="content">
                    <span class="subtitle">${usuario.pais}</span>
                </div>
                <div class="content">
                    <span class="subtitle">${usuario.edad} años.</span>
                </div>  
            </div>
        </div>


        






    `;

    document.getElementById("mostrar-info").innerHTML = datos;
}




