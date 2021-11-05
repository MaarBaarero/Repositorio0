//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});

function verificar(){
    let user = document.getElementById("user");
    let pass = document.getElementById("pass");
    let msj = document.getElementById ("msj");
    let usuario = {};

    if ( user.value.trim() === '' || pass.value.trim() === '' ){
        if(user.value.trim() === ''){
            user.classList.remove("is-link"); 
            user.classList.add("is-danger"); 
        }
        else{
            user.classList.remove("is-danger"); 
            user.classList.add("is-success"); 
            pass.classList.remove("is-link"); 
            pass.classList.add("is-danger"); 
        }
        msj.innerText="-----   Dato requerido   -----";
        msj.classList.add("is-danger");                
    }
    else{
        
        usuario.nombre = user.value;
        usuario.estado = "Conectado";
        usuario.avatar = "https://yca.org.ar/wp-content/uploads/sites/4/2019/06/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"
        
        localStorage.setItem('usuario',JSON.stringify(usuario));
        sessionStorage.setItem('usuario',JSON.stringify(usuario));

        location.href="index.html";
    
    }
}
    
function onLoad(){
    gapi.load('auth2', function(){
        gapi.auth2.init();            
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {});
}

function desconectar(){
    localStorage.clear(); // Para limpiar 
    signOut(); // Google
    location.href = "login.html";
}
  