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
            $('.fa-search').removeClass('open');
            $('#dropdown-menu').removeClass('show');
        }
    });

    $('#search-btn2, #search-btn').on('click', function () {
        $('#dropdown-search').toggleClass('show');
        $("header").css('visibility', 'hidden');
        $('.video-container').css('margin-top', '0');
    });

    $('.close-search').on('click', function () {
        $('#dropdown-search').removeClass('show');
        $("header").css('visibility', 'visible');
        $('.video-container').css('margin-top', '80');
    });

}

