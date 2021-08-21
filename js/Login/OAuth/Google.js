function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log(googleUser.getBasicProfile());
    /*console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());*/

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);//------fin
    
    let usuario = {};
    usuario.nombre = profile.getName();
    usuario.estado = "Conectado";
    usuario.avatar = profile.getImageUrl();
    
    localStorage.setItem('usuario',JSON.stringify(usuario));
    sessionStorage.setItem('usuario',JSON.stringify(usuario));

    location.href="index.html";

 
  }