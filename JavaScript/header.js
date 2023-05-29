// applica stile css al menu hamburger e al menu dropdown quando si clicca sull'icona del menu
// setta la variabile isLoggedIn a true se l'utente è loggato, altrimenti a false
// aggiorna il testo e l'href del link al profilo se l'utente è loggato
$(() => {
    $('#hamburger').on('click', function () {
        $('.animated-togglebutton').toggleClass('open');
        $('.dropdown-nav-container').toggleClass('show');
        $('#search-btn').toggleClass('show');
    });

    if (localStorage.getItem('isLoggedIn') == null) {
        localStorage.setItem('isLoggedIn', false);
    }

    var isLoggedIn = localStorage.getItem('isLoggedIn');

    $('[name="personal"]').each(function () {
        var elem = $(this);
        if (isLoggedIn == 'true') {
            elem.html('Profilo');
            elem.attr('href', '?p=profile');
        }
    });
});

// al ridimensionamento della pagina, se la larghezza è maggiore di 991px, rimuove le classi open e show
// per far scomparire il menu hamburger e il menu dropdown
$(window).on('resize', function () {
    if ($(window).innerWidth() > 991) {
        $('.fa-search').removeClass('open');
        $('.dropdown-nav-container').removeClass('show');
        $('.animated-togglebutton').removeClass('open');
    }
});

// fa apparire il search dropdown quando si clicca sull'icona della ricerca e nasconde l'header e il menu hamburger 
$('#search-btn2, #search-btn').on('click', function () {
    $('.dropdown-search-container').toggleClass('show');
    $("header").css('visibility', 'hidden');
    $(".animated-togglebutton, .animated-togglebutton span").css('transition', '0s');
    $('.video-container').css('margin-top', '0');
    get_game('');
});

// all input nella barra di ricerca, chiama la funzione get_game() che ottiene i giochi dal database
$('.search-input').on('input', function () {
    get_game($(this).val());
});

// al click del bottone chiudi, nasconde il search dropdown e fa riapparire l'header e il menu hamburger
$('.close-search').on('click', function () {
    $('.dropdown-search-container').removeClass('show');
    $("header").css('visibility', 'visible');
    $(".animated-togglebutton").css('transition', '0.5s');
    $(".animated-togglebutton span").css('transition', '0.25s');
    $('.video-container').css('margin-top', '80');
});

// ottiene i giochi dal database e li aggiunge al search dropdown in base all'input dell'utente 
// crea dinamicamente gli elementi html per ogni gioco trovato e li aggiunge al search dropdown
function get_game(input_data) {
    $.ajax({
        type: 'POST',
        url: 'fetch.php',
        dataType: "json",
        success: function (data) {
            var html = data
                .filter(function (value) {
                    return input_data === '' || value.title.toLowerCase().startsWith(input_data.toLowerCase());
                })
                .map(function (value) {
                    return `
                            <div class="dropdown-game-container">
                                <a class="d-flex search-game-link" href="${value.link}">
                                    <div class="search-game-img">
                                        <img src="${value.image}" alt="${value.image}">
                                    </div>
                                    <div class="search-game-text">
                                        <h4 class="search-game-title">${value.title}</h4>
                                        <div class="search-game-description">${value.description}</div>
                                    </div>
                                </a>
                            </div>
                            <div class="dropdown-separator-search"></div>
                        `;
                }).join("");
            $(".search-game-result").html(html);
        },
        error: function (xhr, status, error) {
            console.log("Errore: " + xhr.responseText);
        }
    });
}
