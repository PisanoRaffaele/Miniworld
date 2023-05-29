var words = [
	"banana",
	"chocolate",
	"computer",
	"pizza",
	"programming",
	"sunglasses",
	"watermelon",
	"ao"
];

var word;
var letters;
var underscores;
var guessesRemaining;
var time = 0.0;
var countdown;
var Started = false;


// fa partire il gioco e il tempo trascorso, sceglie una parola random da words e la mostra come underscores
function initGame() {
	$('#reset-btn').text('Reset');

	$('#guess-btn').removeClass('unvisible');


	guessesRemaining = 6;
	$("#guesses").text("Tentativi rimasti: " + guessesRemaining);
	word = words[Math.floor(Math.random() * words.length)];
	letters = word.split("");
	underscores = [];
	for (var i = 0; i < letters.length; i++) {
		underscores.push("_");
	}
	$("#word").text(underscores.join(" "));

	Started = true;

	time = 0.0;
	countdown = setInterval(function () {
		time += 0.1;
		time = parseFloat(time.toFixed(2));
		$('#time').text(time);
	}, 100);
}



// verifica la lettera inserita è contenuta nella parola, se è contenuta la mostra al posto degli underscores
// se il numero di tentativi rimasti è 0 o se non ci sono più underscores, il gioco finisce
$("#guess-btn").on("click", function () {
	if (Started) {
		var letter = $("#letter").val().toLowerCase();
		if (letter && /^[a-z]$/.test(letter)) {
			var found = false;
			for (var i = 0; i < letters.length; i++) {
				if (letters[i] === letter) {
					underscores[i] = letter;
					found = true;
				}
			}
			if (!found) {
				guessesRemaining--;
				$("#guesses").text("Tentativi rimasti: " + guessesRemaining);
			}
			$("#word").text(underscores.join(" "));
			if (underscores.indexOf("_") === -1) {
				aggiornaClassifica()
				clearInterval(countdown);
				$('#guess-btn').addClass('unvisible');
			} else if (guessesRemaining === 0) {
				console.log("You lose. The word was '" + word + "'.");
				clearInterval(countdown);
				$('#guess-btn').addClass('unvisible');
			}
			$("#letter").val("");
		}
	}
});


// resetta il gioco e le variabili di gioco
$("#reset-btn").on("click", function () {
	if (Started) {
		$('#reset-btn').text('Start');
		Started = false;
		time = 0;
		$('#time').text(time);
		clearInterval(countdown);
		$('#guess-btn').addClass('unvisible');
	}
	else {
		initGame();
	}
});


// ottiene la classifica dal database e la aggiunge alla pagina
$(() => {
	get_classifica();
});


/****************************** Gestione Classifica ******************************/

// ottiene la classifica dal database, crea una tabella html e l'aggiunge all'oggetto con id specificato
function get_classifica() {
	$.ajax({
		type: "POST",
		url: "handle_db.php",
		data: { gioco: "GTW", funzione: "richiedi_classifica", order: "reverse" },
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
		data: { gioco: "GTW", order: "reverse", funzione: "aggiorna_classifica", punteggio: time, username: username, email: email },
		success: function (data) {
			get_classifica();
		},
		error: function (xhr, status, error) {
			console.log("Errore: " + xhr.responseText);
		}
	});
}
