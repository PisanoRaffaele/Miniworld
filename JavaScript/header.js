$(function () {
    // Definisci una variabile per indicare se l'utente è loggato o no. In questo esempio, l'utente non è loggato.
    if (localStorage.getItem('isLoggedIn') == null) {
        localStorage.setItem('isLoggedIn', false);
    }
    
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    $('[name="personal"]').each(function () {
        var elem = $(this);
        if (isLoggedIn == 'true') {
            elem.html('Profilo');
        }
    });
});

window.onload = function () {
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

