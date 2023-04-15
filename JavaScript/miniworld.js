window.onload = function () {
    var isLoggedIn = false; // Definisci una variabile per indicare se l'utente è loggato o no. In questo esempio, l'utente non è loggato.
    var elemList = document.getElementsByName("personal");
    for (var i = 0; i < elemList.length; i++) {
        var elem = elemList[i];
        if (isLoggedIn) {
            elem.href = "";
            elem.innerHTML = "Profilo";
        }
        else {
            elem.href = "";
            elem.innerHTML = "Registrati/Login";
        }
    }

    document.querySelector('#hamburger').addEventListener('click', function () {
        document.querySelector('.animated-togglebutton').classList.toggle('open');
        document.querySelector('#dropdown-menu').classList.toggle('show');
    });

    window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
        // Attiva la funzione quando la larghezza della finestra > 991px
        document.querySelector('.animated-togglebutton').classList.remove('open');
        document.querySelector('#dropdown-menu').classList.remove('show');
    }
    });
}


