// Array of words to choose from
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



function initGame() {
	$('#reset-btn').text('Reset');

	//remove class unvisible
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



// Handle the form submission when the user guesses a letter
$("#guess-btn").on("click", function () {
	if (Started) {
		var letter = $("#letter").val().toLowerCase();
		if (letter && /^[a-z]$/.test(letter)) {
			// Check if the letter is in the word
			var found = false;
			for (var i = 0; i < letters.length; i++) {
				if (letters[i] === letter) {
					underscores[i] = letter;
					found = true;
				}
			}
			// If the letter was not found, decrement the number of guesses remaining
			if (!found) {
				guessesRemaining--;
				$("#guesses").text("Tentativi rimasti: " + guessesRemaining);
			}
			// Display the updated word on the page
			$("#word").text(underscores.join(" "));
			// Check if the user has won or lost
			if (underscores.indexOf("_") === -1) {
				aggiornaClassifica()
				//stop the timer
				clearInterval(countdown);
				$('#guess-btn').addClass('unvisible');
			} else if (guessesRemaining === 0) {
				console.log("You lose. The word was '" + word + "'.");
				clearInterval(countdown);
				$('#guess-btn').addClass('unvisible');
			}
			// Clear the input field
			$("#letter").val("");
		}
	}
});


// use the reset button to reset the game
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


$(() => {
	get_classifica();
});


/****************************** Gestione Classifica ******************************/

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
