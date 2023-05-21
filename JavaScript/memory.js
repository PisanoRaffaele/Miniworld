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

// Variabili globali per gestire il gioco 
let firstCard = null; // prima carta cliccata
let secondCard = null; // seconda carta cliccata
let cardsMatched = 0; // numero di carte abbinate
let generatedNumbers = []; // array contenente i numeri generati per le carte 
let time = 0.0; // tempo di gioco
let countdown; // timer
let gameStarted = false; // indica se il gioco è iniziato o meno

const gridItems = $('.grid-item'); // array contenente le carte del gioco

// Funzione per generare un numero casuale da 0 a 8 (inclusi) che non sia già stato generato in precedenza 
function generateRandomNumber() {
	let randomNumber = 0; // numero casuale da generare 

	if (generatedNumbers.length === 16) {
		console.log("Errore: non ci sono più numeri da generare");
		return -1;
	}

	do {
		randomNumber = Math.floor(Math.random() * 8); // genera un numero casuale da 0 a 8 (inclusi)
	} while (generatedNumbers.filter(n => n === randomNumber).length >= 2); // controlla che il numero non sia già stato generato in precedenza 

	// aggiungi il numero generato all'array
	generatedNumbers.push(randomNumber); 

	return randomNumber;
}

// Funzione per mescolare le carte
function shuffle(array) {
	// algoritmo di Fisher-Yates per mescolare un array 
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// finché ci sono elementi da mescolare 
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

// Funzione per gestire il click su una carta prende come parametro l'evento che ha scatenato la funzione
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

	// La carta è già stata girata o è la stessa carta cliccata in precedenza o è già stata trovata un'altra carta 
	if (!card.hasClass('hidden') || firstCard === card || secondCard) { 
		return;
	}

	flipCard(card);

	if (!firstCard) firstCard = card;
	else {
		secondCard = card;
		// Le due carte sono uguali
		if (cardsMatch(firstCard, secondCard)) { 
			cardsMatched += 2;
			firstCard = null;
			secondCard = null; 
			if (cardsMatched === 16) vittoria();
		}
		// Le due carte non sono uguali
		else {
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
	gameStarted = false;
	clearInterval(countdown);
	setTimeout(function () {
		aggiornaClassifica();
	}, 1000);
}

$(function () {
	get_classifica();
	initGame();
	$('#reset-btn').on('click', resetGame);
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
		data: { gioco: "MEMORY", order: "reverse", funzione: "aggiorna_classifica", punteggio: time, username: username, email: email },
		success: function (data) {
			get_classifica();
		},
		error: function (xhr, status, error) {
			console.log("Errore: " + xhr.responseText);
		}
	});
}



