$(window).on('load', function () {
    $('#hamburger').on('click', function () {
        $('.animated-togglebutton').toggleClass('open');
        $('.dropdown-nav-container').toggleClass('show');
        $('#search-btn').toggleClass('show');
  });
});

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
            elem.attr('href','?p=profile');
        }
    });
});


$(window).on('resize', function () {
    if ($(window).innerWidth() > 991) {
        $('.fa-search').removeClass('open');
        $('.dropdown-nav-container').removeClass('show');
    }
});

function get_game(input_data) {
    $.ajax({
        type: 'POST',
        url: 'fetch.php',
        dataType: "json",
        success: function (data) {
            var html = data
                .filter(function (value) {
                    // Filter games that match the input_data title or return all games if input_data is empty
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

$('#search-btn2, #search-btn').on('click', function () {
    $('.dropdown-search-container').toggleClass('show');
    $(".animated-togglebutton, .animated-togglebutton span").css('transition', '0s');
    $("header").css('visibility', 'hidden');
    $('.video-container').css('margin-top', '0');
    get_game('');
});

$('.search-input').on('input', function () {
    get_game($(this).val());
});

$('.close-search').on('click', function () {
    $('.dropdown-search-container').removeClass('show');
    $(".animated-togglebutton").css('transition', '0.5s');
    $(".animated-togglebutton span").css('transition', '0.25s');
    $("header").css('visibility', 'visible');
    $('.video-container').css('margin-top', '80');
});