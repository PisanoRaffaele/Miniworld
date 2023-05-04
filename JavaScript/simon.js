var colors = ["red", "blue", "green", "yellow"];
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
  var interval = setInterval(function() {
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
  setTimeout(function() {
    element.removeClass("highlight");
  }, 500);
}

// gestore evento click sul pulsante "Start"
$("#start-btn").on("click", function() {
	var status = $(this).text();
	if (!playing) {
		if (status == "Next Level")
		{
			level++;
			$('#level').text(level);
			playing = true;
			sequence = generateSequence(level + 1);
			playSequence(sequence);
			$(this).text("Playing...");
		}
		else if (status == "Start")
		{
			playing = true;
			sequence = generateSequence(level + 1);
			playSequence(sequence);
			$(this).text("Playing...");
		}
		else if (status == "Game Over")
		{
			level = 0;
			$('#level').text(level);
			$(this).text("Start");
		}
	}
});

// gestore evento click sui colori
$(".color").on("click", function() {
  if (playing) {
    var color = $(this).attr("class").split(" ")[1];
    highlight(color);
    // confrontiamo il colore corrente con la sequenza
    if (color === sequence[0]) {
      sequence.shift();
      if (sequence.length === 0) {
        // la sequenza è stata completata con successo

		// salva il livello raggiunto

        playing = false;
        $("#start-btn").text("Next Level");

      }
    } else {
      // hai perso
      playing = false;
      $("#start-btn").text("Game Over");
    }
  }
});
