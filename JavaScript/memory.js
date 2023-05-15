const images = [
	'../assets/memory/1.png',
	'../assets/memory/2.png',
	'../assets/memory/3.png',
	'../assets/memory/4.png',
	'../assets/memory/5.png',
	'../assets/memory/6.png',
	'../assets/memory/7.png',
	'../assets/memory/8.png',
];

let firstCard = null;
let secondCard = null;
let cardsMatched = 0;
let generatedNumbers = [];
let time = 0.0;
let countdown;
let gameStarted = false;

const gridItems = $('.grid-item');

function generateRandomNumber() {
	let randomNumber = 0;

	if (generatedNumbers.length === 16) {
		alert("Errore: non ci sono più numeri da generare");
		return -1;
	}

	do {
		// genera un numero casuale da 0 a 8
		randomNumber = Math.floor(Math.random() * 8);
	} while (generatedNumbers.filter(n => n === randomNumber).length >= 2);

	// aggiungi il numero generato all'array
	generatedNumbers.push(randomNumber);

	return randomNumber;
}

// Funzione per mescolare le carte
function shuffle(array) {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Funzione per impostare l'immagine di una carta
function setImage(card, index) {
	const img = $('<img>').attr('src', images[index]);
	card.append(img);
}

// Funzione per girare una carta
function flipCard(card) {
	card.removeClass('hidden').addClass('visible');
}

// Funzione per nascondere una carta
function hideCard(card) {
	card.removeClass('visible').addClass('hidden');
}

// Funzione per controllare se due carte sono uguali
function cardsMatch(card1, card2) {
	const img1 = card1.find('img');
	const img2 = card2.find('img');
	return img1.attr('src') === img2.attr('src');
}

// Funzione per gestire il click su una carta
function handleCardClick(event) {
	const card = $(event.currentTarget);

	if (!gameStarted) {
		gameStarted = true;
		countdown = setInterval(function () {
			time += 0.1;
			time = parseFloat(time.toFixed(2));
			$('#time').text(time);
		}, 100);
	}

	if (!card.hasClass('hidden') || firstCard === card || secondCard) {
		// La carta è già stata girata o è la stessa carta cliccata in precedenza
		return;
	}

	flipCard(card);

	if (!firstCard) firstCard = card;
	else {
		secondCard = card;
		if (cardsMatch(firstCard, secondCard)) {
			// Le due carte sono uguali
			cardsMatched += 2;
			firstCard = null;
			secondCard = null;
			if (cardsMatched === 16) vittoria();
		}
		else {
			// Le due carte non sono uguali
			setTimeout(() => {
				hideCard(firstCard);
				hideCard(secondCard);
				firstCard = null;
				secondCard = null;
			}, 1000);
		}
	}
}

function initGame() {
	gridItems.each(function (i) {
		const card = $(this);
		const index = generateRandomNumber();

		hideCard(card);
		setImage(card, index);
		card.on('click', handleCardClick);
	});
	shuffle(images);
}

function resetGame() {
	firstCard = null;
	secondCard = null;
	cardsMatched = 0;
	generatedNumbers = [];
	gameStarted = false;
	clearInterval(countdown);
	time = 0;
	$('#time').text(time);
	gridItems.each(function () {
		const card = $(this);
		card.find('img').remove();
	});
	initGame();
}

function vittoria() {
	//salva il tempo
	gameStarted = false;
	clearInterval(countdown);
	setTimeout(function () {
		aggiornaClassifica();
		//alert("Complimenti, hai vinto in " + time + " secondi !");
	}, 1000);
}


$(function () {
	$('#reset-btn').on('click', resetGame);
});

initGame();

$(function () {
	get_classifica();
});


/****************************** Gestione Classifica ******************************/

function get_classifica() {
	$.ajax({
		type: "POST",
		url: "handle_db.php",
		data: { gioco: "MEMORY", funzione: "richiedi_classifica", order: "reverse" },
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
			alert("Errore: " + xhr.responseText);
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
		data: { gioco: "MEMORY", order: "reverse", funzione: "aggiorna_classifica", punteggio: time, username: username, email: email },
		success: function (data) {
			get_classifica();
		},
		error: function (xhr, status, error) {
			alert("Errore: " + xhr.responseText);
		},
		failure: function (response) {
			alert("Failure: " + response);
		}
	});
}



