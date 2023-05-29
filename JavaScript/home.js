// crea dinamicamente gli elementi html per ogni gioco trovato e li aggiunge alla pagina home 
$(function () {
    $.ajax({
        url: "fetch.php",
        dataType: "json",
        success: function (data) {
            var html = data.map(function (value) {
                var X = Math.floor(Math.random() * 30); 
                var Y = Math.floor(Math.random() * 30);
                return `
                <div class="card" style="background-position: ${X}% ${Y}%;">
                    <img src="assets/cardFoto.png" class="jumping-foto">
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
        error: function (xhr, status, error) {
            console.log("Errore: " + xhr.responseText);
            console.log(status, error);
        }
    });
});