function already_exist() {
	$('#email').addClass('error');
	$('#email').next('small').addClass('error');
	$('#email + small').text('Utente già registrato con questa email. Prova a fare il login');
	$('#username').removeClass('error');
	$('#username').next('small').removeClass('error');
	$('#username').next('small').text('');
}

$('#username').on('input', function () {
	var username = $(this).val();
	if (username === '') {
		$('#username').removeClass('error');
		$('#username').next('small').text('');
		return;
	}
	$.ajax({
		type: 'POST',
		url: 'check_username.php',
		data: { username: username },
		success: function (data) {
			if (data == 1) {
				$('#username').addClass('error');
				$('#username').next('small').removeClass('available').addClass('error');
				$('#username').next('small').text('Username già in uso');
			}
			else {
				$('#username').removeClass('error');
				$('#username').next('small').removeClass('error').addClass('available');
				$('#username').next('small').text('Username disponibile');
			}
		},
		error: function (xhr, status, error) {
			alert("Errore: " + xhr.responseText);
		},
		failure: function (response) {
			alert("Failure: " + response);
		}
	});
});

$('#email').on('input', function () {
	var email = $(this).val();
	if (email === '') {
		$('#email').removeClass('error');
		$('#email').next('small').text('');
		return;
	}
});

$('#registration_form').submit(function (event) {
	event.preventDefault();

	var email = $(this).find('#email').val();
	var username = $(this).find('#username').val();
	var password = $(this).find('#password').val();

	// controlla campi
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		$('#email').addClass('error');
		$('#email').next('small').removeClass('available').addClass('error');
		$('#email').next('small').text('insierisci una email valida');
		return false;
	}

	if (password.length < 1) {
		alert('La password deve essere lunga almeno 8 caratteri');
		return false;
	}

	$.ajax({
		type: $(this).attr('method'),
		url: 'handle_registration.php',
		data: { email: email, username: username, password: password },
		success: function (data) {
			if (data.length > 1)
				already_exist();
			else
				window.location.href = '?p=home';
		},
		error: function (xhr, status, error) {
			// gestisci l'errore qui
			alert("Errore: " + xhr.responseText);
		},
		failure: function (response) {
			alert("Failure: " + response);
		}
	});
});