window.onload = function () {
    var isLoggedIn = false; // Definisci una variabile per indicare se l'utente è loggato o no. In questo esempio, l'utente non è loggato.
    $('[name="personal"]').each(function () {
        var elem = $(this);
        if (isLoggedIn) {
            elem.attr('href', '');
            elem.html('Profilo');
        }
        else {
            elem.attr('href', '');
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
$.ajax({
    url: "fetch.php",
    dataType: "json",
    success: function (data) {
        var html = data.map(function (value) {
            var X = Math.floor(Math.random() * 30); // genera un numero casuale compreso tra 0 e 100
            var Y = Math.floor(Math.random() * 30); // genera un numero casuale compreso tra 0 e 100
            return `
                <div class="card" style="background-position: ${X}% ${Y}%;">
                    <div class="logo-container">
                        <img src="${value.image}" alt="${value.title}">
                    </div>
                    <div class="title-container">
                        <h4 class="card-title">${value.title}</h4>
                    </div>
                    <div class="description-container">
                        <p class="card-text">${value.description}</p>
                        <a class="play-button" href="${value.link}">Let's play</a>
                    </div>
                </div>
            `;
        }).join("");

        $(".game-list").html(html);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
});



