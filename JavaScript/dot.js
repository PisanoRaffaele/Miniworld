$(document).ready(function () {
	var score = 0;
	var time = 10;
	var countdown;
	var gameStarted = false;

	function startGame() {
		gameStarted = true;
		score++;
		$('#score').text(score);

		$('#dot').click(function () {
			score++;
			$('#score').text(score);
		});

		countdown = setInterval(function () {
			time--;
			$('#time').text(time);

			if (time == 0) {
				clearInterval(countdown);
				$('#dot').unbind();
				setTimeout(function () {
					aggiornaClassifica();
				}, 100);
				gameStarted = false;
			}
		}, 1000);
	}

	$('#reset-btn').click(function () {
		score = 0;
		time = 10;
		$('#score').text(score);
		$('#time').text(time);
		clearInterval(countdown);
		$('#dot').unbind();
		gameStarted = false;
		$('#dot').click(function () {
			if (!gameStarted) {
				startGame();
			}
		});
	});

	$('#dot').click(function () {
		if (!gameStarted) {
			startGame();
		}
	});

	$(function () {
		get_classifica();
	});

	/****************************** Gestione Classifica ******************************/

	function get_classifica() {
		$.ajax({
			type: "POST",
			url: "handle_db.php",
			data: { gioco: "DOT", funzione: "richiedi_classifica", order: "notReverse" },
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
			data: { gioco: "DOT", order: "notReverse", funzione: "aggiorna_classifica", punteggio: score, username: username, email: email },
			success: function (data) {
				get_classifica();
			},
			error: function (xhr, status, error) {
				console.log("Errore: " + xhr.responseText);
			},
			failure: function (response) {
				console.log("Failure: " + response);
			}
		});
	}


});
