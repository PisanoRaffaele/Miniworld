// Array of words to choose from
var words = [
	"banana",
	"chocolate",
	"computer",
	"pizza",
	"programming",
	"sunglasses",
	"watermelon"
  ];
  var word;
  var letters;
  var underscores;
  var guessesRemaining;
  var time;
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

	time = 0;
	countdown = setInterval(function() {
		time += 0.1;
		time = parseFloat(time.toFixed(2));
		$('#time').text(time);
	}, 100);


}



  // Handle the form submission when the user guesses a letter
  document.getElementById("guess-btn").addEventListener("click", function() {
	if (Started)
	{
		var letter = document.getElementById("letter").value.toLowerCase();
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
				alert("You win!");
				//stop the timer
				clearInterval(countdown);
				$('#guess-btn').addClass('unvisible');
			} else if (guessesRemaining === 0) {
				alert("You lose. The word was '" + word + "'.");
				clearInterval(countdown);
				$('#guess-btn').addClass('unvisible');
			}
			// Clear the input field
			document.getElementById("letter").value = "";
			}
	}
  	});


// use the reset button to reset the game
$("#reset-btn").on("click", function() {
	if(Started)
	{
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


