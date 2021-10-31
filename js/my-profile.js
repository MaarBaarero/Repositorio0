//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    document.getElementById("foto-perfil").src = usuario.avatar;
    document.getElementById("nombre-perfil").innerText = usuario.nombre;
    document.getElementById("nombre-usuario").value = usuario.nombre;

});

function cerrarVentana(){
    document.getElementsByClassName("ventanita").classList("display:none");
}