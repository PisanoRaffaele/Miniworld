var colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "white"];
var sequence = [];
var playing = false;
var level = 0;

// funzione per generare una sequenza di n colori casuali
function generateSequence(n) {
    var sequence = [];
    for (var i = 0; i < n; i++) {
        var color = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(color);
    }
    return sequence;
}

// funzione per riprodurre una sequenza di colori
function playSequence(sequence) {
    var i = 0;
    var interval = setInterval(function () {
        var color = sequence[i];
        highlight(color);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

// funzione per evidenziare un colore per un breve periodo di tempo
function highlight(color) {
    var element = $(".color." + color);
    element.addClass("highlight");
    setTimeout(function () {
        element.removeClass("highlight");
    }, 600);
}

// gestore evento click sul pulsante "Start"
$("#start-btn").on("click", function () {
    var status = $(this).text();
    if (!playing) {
        if (status != "Game Over") {
            playing = true;
            sequence = generateSequence(level + 1);
            playSequence(sequence);
            $(this).text("Playing...");
        }
        else {
            level = 0;
            $(this).text("Start");
        }
        $('#level').text(level + 1);
    }
});

// gestore evento click sui colori
$(".color").on("click", function () {
    if (playing) {
        var color = $(this).attr("class").split(" ")[1];
        highlight(color);
        if (color === sequence[0]) {
            sequence.shift();
            if (sequence.length === 0) {
                playing = false;
                level++;
                $("#start-btn").text("Next Level");
            }
        } else {
            // hai perso
            playing = false;
            $("#start-btn").text("Game Over");
            aggiornaClassifica()
        }
    }
});


$(function () {
    get_classifica();
});


/****************************** Gestione Classifica ******************************/

// ottiene la classifica dal database, crea una tabella html e l'aggiunge all'oggetto con id specificato
function get_classifica() {
    $.ajax({
        type: "POST",
        url: "handle_db.php",
        data: { gioco: "SIMON", funzione: "richiedi_classifica", order: "notReverse" },
        dataType: "json",
        success: function (response) {
            var html = '<h1 class="textSide">Classifica</h1>'
            html += '<table><thead><tr><th>Posizione</th><th>Username</th><th>Punteggio</th></tr></thead><tbody>';
            $.each(response, function (i, item) {
                html += '<tr><td>' + (i + 1) + '</td><td>' + item.username + '</td><td>' + item.punteggio + '</td></tr>';
            });
            html += '</tbody></table>';
            $('.classifica').html(html);
        },
        error: function (xhr, status, error) {
            console.log("Errore: " + xhr.responseText);
        }
    });
};

// aggiorna la classifica nel database
function aggiornaClassifica() {
    var logged = localStorage.getItem('isLoggedIn');
    if (logged == "null" || logged === "false")
        return;
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    $.ajax({
        type: "POST",
        url: "handle_db.php",
        data: { gioco: "SIMON", order: "notReverse", funzione: "aggiorna_classifica", punteggio: level, username: username, email: email },
        success: function (data) {
            get_classifica();
        },
        error: function (xhr, status, error) {
            console.log("Errore: " + xhr.responseText);
        }
    });
}