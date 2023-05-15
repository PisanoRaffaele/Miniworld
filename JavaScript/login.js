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

function already_exist() {
	$('#username_email').addClass('error');
	$('#username_email').next('small').addClass('error');
	$('#username_email + small').text('Email o Username non validi');
}

$('#username_email').on('input', function () {
	var username = $(this).val();
	if (!username) {
		$('#username_email').removeClass('error');
		$('#username_email').next('small').text('');
		return;
	}
});


$('#login_form').submit(function (event) {
	event.preventDefault();

	var email_username = $(this).find('#username_email').val();
	var password = $(this).find('#password').val();


	$.ajax({
		type: $(this).attr('method'),
		url: 'handle_db.php',
		data: { email_username: email_username, password: password, funzione: 'login' },
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
				var userData = JSON.parse(data);
				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('username', userData.username);
				localStorage.setItem('email', userData.email);
				window.location.href = '?p=home';
			}
		},
		error: function (xhr, status, error) {
			already_exist();
			alert("Errore: " + xhr.responseText);
		},
		failure: function (response) {
			alert("Failure: " + response);
		}
	});
});
