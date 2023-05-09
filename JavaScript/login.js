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
	// $('#email').addClass('error');
	// $('#email').next('small').addClass('error');
	// $('#email + small').text('Utente già registrato con questa email. Prova a fare il login');
	// $('#username').removeClass('error');
	// $('#username').next('small').removeClass('error');
	// $('#username').next('small').text('');
}

$('.username_email').on('input', function () {
	var username = $(this).val();
	if (!username) {
		$('.username_email').removeClass('error');
		$('.username_email').next('small').text('');
		return;
	}
});


$('#login_form').submit(function (event) {
	event.preventDefault();

	var email_username = $(this).find('#username_email').val();
	var password = $(this).find('#password').val();


	$.ajax({
		type: $(this).attr('method'),
		url: 'login_handle.php',
		data: { email: email, username: username, password: password },
		success: function (data) {
			/*
				se l'utente è già registrato con questa email allora non lo registra e lo manda al login
				altrimenti lo registra e lo manda alla home, data.length > 1 è necessario in quanto se utente non registrato
				e non presente nel DB la risposta è una stringa vuota di lenght = 1 se invece è già registrato la risposta
				è un array di lunghezza > 1 che resituisce l'errore rimandato dal DB (email già presente)
			*/
			if (data.length > 1) {
				console.log(data);
				already_exist();
			} else {
				localStorage.setItem('isLoggedIn', true);
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