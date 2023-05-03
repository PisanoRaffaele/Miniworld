// Array di immagini da utilizzare
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

	const gridItems = document.querySelectorAll('.grid-item');

	function generateRandomNumber() {
 		let randomNumber = 0;

		if (generatedNumbers.length == 16) {
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
		const img = document.createElement('img');
		img.src = images[index];
		card.appendChild(img);
	}

	// Funzione per girare una carta
	function flipCard(card) {
		card.classList.remove('hidden');
		card.classList.add('visible');
	}

	// Funzione per nascondere una carta
	function hideCard(card) {
		card.classList.remove('visible');
		card.classList.add('hidden');
	}

	// Funzione per controllare se due carte sono uguali
	function cardsMatch(card1, card2) {
		const img1 = card1.querySelector('img');
		const img2 = card2.querySelector('img');
		return img1.src === img2.src;
	}

	// Funzione per gestire il click su una carta
	function handleCardClick(event) {
		const card = event.currentTarget;

		if (!card.classList.contains('hidden') || firstCard === card || secondCard) {
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
				if (cardsMatched == 16) vittoria();
			}
			else {
				// Le due carte non sono uguali
				setTimeout(() => {
					hideCard(firstCard);
					hideCard(secondCard);
					firstCard = null;
					secondCard = null;
				}, 1200);
			}
		}
	}

	// Funzione per inizializzare il gioco
	function initGame() {
		for (let i = 0; i < gridItems.length; i++) {
			const card = gridItems[i];
			let index = generateRandomNumber();

			hideCard(card);
			setImage(card, index);
			card.addEventListener('click', handleCardClick);
		}
		shuffle(images);
	}

	function resetGame() {
		firstCard = null;
		secondCard = null;
		cardsMatched = 0;
		generatedNumbers = [];
		for (let i = 0; i < gridItems.length; i++) {
			const card = gridItems[i];
			card.removeChild(card.querySelector('img'));
		}
		initGame();
	}

	function vittoria() {
		alert("Complimenti, hai vinto!");
	}
	const resetButton = document.getElementById('reset');
	resetButton.addEventListener('click', resetGame);

	initGame();

window.onload = function () {
	document.querySelector('#hamburger').addEventListener('click', function () {
		document.querySelector('.animated-togglebutton').classList.toggle('open');
		document.querySelector('#dropdown-menu').classList.toggle('show');
	});
}
