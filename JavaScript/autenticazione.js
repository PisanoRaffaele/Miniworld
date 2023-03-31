window.onload = function() {
    var isLoggedIn = false; // Definisci una variabile per indicare se l'utente è loggato o no. In questo esempio, l'utente non è loggato.

    if (isLoggedIn) { // Se l'utente è loggato, mostra il link al proprio profilo.
        document.getElementsByName("personal")[0].innerHTML = "Profilo";
		document.getElementsByName("personal")[0].href = "/profilo";
    } else { // Altrimenti, mostra il link per registrarsi o accedere.
        document.getElementsByName("personal")[0].innerHTML = "Registrati/Login";
		document.getElementsByName("personal")[0].href = "/registrazione";
    }
}
