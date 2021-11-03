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

            user.classList.add("notValid"); 
            msj.innerHTML="Dato requerido";
            msj.classList.add("notValid");            
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

    function desconectar(){
        localStorage.clear(); // Para limpiar 
        signOut(); // Google
        location.href = "index.html";
    }
