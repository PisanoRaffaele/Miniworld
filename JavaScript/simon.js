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
  alert(sequence);
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
  var element = document.querySelector(".color." + color);
  element.classList.add("highlight");
  setTimeout(function() {
    element.classList.remove("highlight");
  }, 500);
}

// gestore evento click sul pulsante "Start"
document.getElementById("start-btn").addEventListener("click", function() {
	var status = document.getElementById("start-btn").innerHTML;
	if (!playing) {
		if (status == "Next Level" || status == "Start")
		{
			level++;
			$('#level').text(level);
			playing = true;
			sequence = generateSequence(level + 1);
			playSequence(sequence);
			document.getElementById("start-btn").innerHTML = "Playing...";
		}
		else if (status == "Game Over")
		{
			level = 0;
			$('#level').text(level);
			document.getElementById("start-btn").innerHTML = "Start";
		}
	}
});

// gestore evento click sui colori
document.querySelectorAll(".color").forEach(function(element) {
  element.addEventListener("click", function() {
    if (playing) {
      var color = element.classList[1];
      highlight(color);
      // confrontiamo il colore corrente con la sequenza
      if (color === sequence[0]) {
        sequence.shift();
        if (sequence.length === 0) {
          // la sequenza è stata completata con successo

		  // salva il livello raggiunto

          playing = false;
          document.getElementById("start-btn").innerHTML = "Next Level";

        }
      } else {
        // hai perso
        playing = false;
        document.getElementById("start-btn").innerHTML = "Game Over";
      }
    }
  });
});
