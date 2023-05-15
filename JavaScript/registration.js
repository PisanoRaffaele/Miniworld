$(function () {
	$('body').hide();
	if (localStorage.getItem('isLoggedIn') === 'true') {
		window.location.href = '?p=home';
	}
	$('body').show();
});

$(".toggle-password").click(function () {
	$(this).find('i').toggleClass("fa-eye-slash fa-eye");
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

$(".toggle-re_password").click(function () {
	$(this).find('i').toggleClass("fa-eye-slash fa-eye");
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

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
	if (!username) {
		$('#username').removeClass('error');
		$('#username').next('small').text('');
		return;
	}
	$.ajax({
		type: 'POST',
		url: 'handle_db.php',
		data: { username: username, funzione: 'check_username' },
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

$("#password").on({
	"blur": function () {
		var password = $(this).val();
		if (password && password.length < 8) {
			$(this).addClass('error');
			$(this).next('small').addClass('error');
			$(this).next('small').text('La password deve essere lunga almeno 8 caratteri');
		}
	},
	focus: function () {
		$(this).removeClass('error');
		$(this).next('small').removeClass('error');
		$(this).next('small').text('');
	}
});

$("#re_password").on({
	"blur": function () {
		var firstPassword = $("#password").val();
		if ($(this).val() && $(this).val() != firstPassword) {
			$(this).addClass('error');
			$(this).next('small').addClass('error');
			$(this).next('small').text('Le password non coincidono');
		}
	},
	focus: function () {
		$(this).removeClass('error');
		$(this).next('small').removeClass('error');
		$(this).next('small').text('');
	}
});

$('#registration_form').submit(function (event) {
	event.preventDefault();

	var email = $(this).find('#email').val();
	var username = $(this).find('#username').val();
	var password = $(this).find('#password').val();
	var re_password = $(this).find('#re_password').val();

	// controlla campi
	if ($(this).find('#username').hasClass("error"))
		return false;

	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		$('#email').addClass('error');
		$('#email').next('small').removeClass('available').addClass('error');
		$('#email').next('small').text('insierisci una email valida');
		return false;
	}

	if (password.length < 8) {
		$(password).addClass('error');
		$(password).next('small').addClass('error');
		$(password).next('small').text('La password deve essere lunga almeno 8 caratteri');
		return false;
	}

	var passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
	if (!passwordRegex.test(password)) {
		console.log('Password non valida')
		$(password).addClass('error');
		$(password).next('small').addClass('error');
		$(password).next('small').text('La password deve contenere almeno un carattere maiuscolo e un numero');
		return false;
	}

	if (password != re_password) {
		$(re_password).addClass('error');
		$(re_password).next('small').addClass('error');
		$(re_password).next('small').text('Le password non coincidono');
		return false;
	}

	$.ajax({
		type: $(this).attr('method'),
		url: 'handle_db.php',
		data: { email: email, username: username, password: password, funzione: 'registration' },
		success: function (data) {
			/*
				se l'utente è già registrato con questa email allora non lo registra e lo manda al login
				altrimenti lo registra e lo manda alla home, data.length > 1 è necessario in quanto se utente non registrato
				e non presente nel DB la risposta è una stringa vuota di lenght = 1 se invece è già registrato la risposta
				è un array di lunghezza > 1 che resituisce l'errore rimandato dal DB (email già presente)
			*/
			if (data.trim() === '0') {
				already_exist();
			} else {
				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('username', username);
				localStorage.setItem('email', email);
				window.location.href = '?p=home';
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
