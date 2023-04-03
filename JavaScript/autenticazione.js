window.onload = function() {
    var isLoggedIn = true; // Definisci una variabile per indicare se l'utente è loggato o no. In questo esempio, l'utente non è loggato.

    if (isLoggedIn) { // Se l'utente è loggato, mostra il link al proprio profilo.
        document.getElementsByName("personal")[0].innerHTML = "Profilo";
		document.getElementsByName("personal")[0].href = "/profilo";
    } else { // Altrimenti, mostra il link per registrarsi o accedere.
        document.getElementsByName("personal")[0].innerHTML = "Registrati/Login";
		document.getElementsByName("personal")[0].href = "/registrazione";
    }
}

function menuTend() {
    var header = document.getElementsByClassName("header")[0];
    var navbar = document.getElementsByClassName("navbar")[0];
    var nav = document.getElementsByClassName("nav")[0];
    var logoDiv = document.getElementsByName("logo-div")[0];
    var hamburger = document.getElementsByName("hamburger")[0];

    header.style.display = "flex";
    header.style.backgroundColor = "#00001f";
    header.style.backdropFilter = "blur(5px)";
    header.style.opacity = "0.7";
    header.style.transition = "0.7s";
    header.style.height = "100%";
    header.style.width = "100%";
    header.style.position = "absolute";

    navbar.style.maxWidth = "100%";
    navbar.style.width = "100%";
    navbar.style.height = "100%";

    nav.style.display = "grid";
    nav.style.gridTemplateRows = "0fr 1fr 1fr 1fr 1fr";
    nav.style.width = "100%";
    nav.style.height = "100%";
    nav.style.zIndex = "4";

    logoDiv.style.display = "none";

    hamburger.style.position = "absolute";
    hamburger.style.top = "25px";
    hamburger.style.right = "15px";
}
