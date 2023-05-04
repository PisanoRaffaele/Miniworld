$(document).ready(function() {
	var score = 0;
	var time = 10;
	var countdown;
	var gameStarted = false;

	function startGame() {
	  gameStarted = true;

	  $('#dot').click(function() {
		score++;
		$('#score').text(score);
	  });

	  countdown = setInterval(function() {
		time--;
		$('#time').text(time);

		if (time == 0) {
		  clearInterval(countdown);
		  $('#dot').unbind();
		  setTimeout(function() {
		  	alert('Time is up! Your score is ' + score + '.');
		  }, 100);
		  gameStarted = false;
		}
	  }, 1000);
	}

	$('#reset-btn').click(function() {
	  score = 0;
	  time = 10;
	  $('#score').text(score);
	  $('#time').text(time);
	  clearInterval(countdown);
	  $('#dot').unbind();
	  gameStarted = false;
	  $('#dot').click(function() {
		if (!gameStarted) {
		  startGame();
		}
	  });
	});

	$('#dot').click(function() {
	  if (!gameStarted) {
		score++;
		$('#score').text(score);
		startGame();
	  }
	});
});

