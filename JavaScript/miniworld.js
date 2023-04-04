window.onload = function() {
    var isLoggedIn = false; // Definisci una variabile per indicare se l'utente è loggato o no. In questo esempio, l'utente non è loggato.
    var elemList = document.getElementsByName("personal");
    for (var i = 0; i < elemList.length; i++)
    {
        var elem = elemList[i];
        if (isLoggedIn)
        {
            elem.href = "";
            elem.innerHTML = "Profilo";
        }
        else
        {
            elem.href = "";
            elem.innerHTML = "Registrati/Login";
        }
    }
}

function menu()
{
    document.querySelector('.animated-togglebutton').classList.toggle('open');
    document.querySelector('#dropdown-menu').classList.toggle('show');
}

