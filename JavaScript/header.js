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
            $('.fa-search').removeClass('open');
            $('#dropdown-menu').removeClass('show');
        }
    });

    $('#search-btn2, #search-btn').on('click', function () {
        $('#dropdown-search').toggleClass('show');
        $("header").css('visibility', 'hidden');
        $('.video-container').css('margin-top', '0');
        $.ajax({
            type: 'POST',
            url: 'fetch.php',
            dataType: "json",
            success: function (data) {
                var html = data.map(function (value) {
                    return `
                        <div class="dropdown-game-container">
                            <a class="row search-game-link" href="${value.link}">
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
                alert("Errore: " + xhr.responseText);
            }
        });
    });

    $('.close-search').on('click', function () {
        $('#dropdown-search').removeClass('show');
        $("header").css('visibility', 'visible');
        $('.video-container').css('margin-top', '80');
    });

}

