window.onload = function () {
    var isLoggedIn = false; // Definisci una variabile per indicare se l'utente è loggato o no. In questo esempio, l'utente non è loggato.
    
    $('[name="personal"]').each(function () {
        var elem = $(this);
        if (isLoggedIn) {
            elem.html('Profilo');
        }
        else {
            elem.html('Registrati/Login');
        }
    });

    $('#hamburger').on('click', function () {
        $('.animated-togglebutton').toggleClass('open');
        $('#dropdown-menu').toggleClass('show');
    });

    $(window).on('resize', function () {
        if ($(window).innerWidth() > 991) {
            // Attiva la funzione quando la larghezza della finestra > 991px
            $('.animated-togglebutton').removeClass('open');
            $('#dropdown-menu').removeClass('show');
        }
    });

    // fetch game elements from server with ajax
}

