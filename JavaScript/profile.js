$(function () {

    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');

    $('#user-profile').text(username);
    $('#email-profile').text(email);
});

$('#edit-profile').click(function () {
    $('.setting-container').html(
        `
        <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
            </div>
            <form class="" method="POST" id="edit-profile-form">
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Username</label>
                        <input type="text" id="newUsername" class="form-control" placeholder="Username" value="" required>
                    </div>
                    <div class="col-md-6"><label class="labels">Email</label>
                        <input type="text" id="newEmail" class="form-control" placeholder="Email" value="" required>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label>
                        <input type="text" class="form-control" placeholder="Enter phone number" value="">
                    </div>
                </div>
                <div class="mt-5 text-center save-button px-5">
                    <button class="btn btn-primary profile-button" type="submit">Save Profile</button>
                    <small class="text-availabilty"></small>
                </div>
            </form>
        </div>
        `
    )
});

$('#edit-profile-form').submit(function (event) {
    event.preventDefault();

    var newUsername = $(this).find('#newUsername').val();
    var newEmail = $(this).find('#newEmail').val();
    var oldUsername = localStorage.getItem('username');
    var oldEmail = localStorage.getItem('email');

    $.ajax({
        type: $(this).attr('method'),
        url: 'handle_db.php',
        data: { newUsername: newUsername, newEmail: newEmail, oldUsername: oldUsername, oldEmail: oldEmail, funzione: 'edit_profile' },
        success: function (data) {
            if (data.trim() === '0') {
                $('.text-availabilty').removeClass('available').addClass('error');
                $('.text-availabilty').text('Errore');
            } 
            else {
                alert('username has been changed to ' + newUsername + ' and email has been changed to ' + newEmail);
                localStorage.setItem('username', newUsername);
                localStorage.setItem('email', newEmail);
                $('.text-availabilty').removeClass('error').addClass('available');
                $('.text-availabilty').text('Profilo modificato con successo');
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

$('#reset-password').click(function () {
    $('.setting-container').html(
        `
        <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Reset Password</h4>
            </div>
            <form class="form row mt-3" method="POST" id="reset-pass-form">
                <div class="col-md-12">
                    <label class="labels">Old Password</label>
                    <input type="text" class="form-control" placeholder="Enter Old Password" value="" required>
                </div>
                <div class="col-md-12">
                    <label class="labels">New Password</label>
                    <input type="text" class="form-control" placeholder="Enter New Password" value="" required>
                </div>
                <div class="col-md-12">
                    <label class="labels">Repeat Password</label>
                    <input type="text" class="form-control" placeholder="Repeat Password" value="" required>
                </div>
                <div class="mt-5 text-center save-button px-5">
                    <button class="btn btn-primary profile-button" type="button">Save Profile</button>
                    <small class="text-availabilty"></small>
                </div>
            </form>
        </div>
        `
    )
});



$('#logout').click(function () {
    // fai in modo che quando clicco su logout mi rimandi alla pagina di home e setta la variabile di sessione a null in localstorage 
    localStorage.setItem('isLoggedIn', null);
    window.location.href = '?p=home';
});