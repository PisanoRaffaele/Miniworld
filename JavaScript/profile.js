$('#reset-password').click(function () {
    $('.setting-container').html(
        `
        <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Reset Password</h4>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <label class="labels">Old Password</label>
                    <input type="text" class="form-control" placeholder="Enter Old Password" value="">
                </div>
                <div class="col-md-12">
                    <label class="labels">New Password</label>
                    <input type="text" class="form-control" placeholder="Enter New Password" value="">
                </div>
                <div class="col-md-12">
                    <label class="labels">Repeat Password</label>
                    <input type="text" class="form-control" placeholder="Repeat Password" value="">
                </div>
            </div>
            <div class="mt-5 text-center save-button">
                <button class="btn btn-primary profile-button" type="button">Save Profile</button>
            </div>
        </div>
        `
    )
});

$('#edit-profile').click(function () {
    $('.setting-container').html(
        `
        <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="row mt-2">
                <div class="col-md-6"><label class="labels">Username</label>
                    <input type="text" class="form-control" placeholder="Username" value="">
                </div>
                <div class="col-md-6"><label class="labels">Email</label>
                    <input type="text" class="form-control" placeholder="Email" value="">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12"><label class="labels">Mobile Number</label>
                    <input type="text" class="form-control" placeholder="Enter phone number" value="">
                </div>
            </div>
            <div class="mt-5 text-center save-button">
                <button class="btn btn-primary profile-button" type="button">Save Profile</button>
            </div>
        </div>
        `
    )
});

$('#logout').click(function () {
    // fai in modo che quando clicco su logout mi rimandi alla pagina di home e setta la variabile di sessione a null in localstorage 
    localStorage.setItem('isLoggedIn', null);
    window.location.href = '?p=home';
});