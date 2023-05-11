<div class="login-body">
	<div class="main">
		<section class="signin">
			<div class="container">
				<div class="signin-content">
					<form method="POST" id="login_form" class="signin-form">
						<h2 class="form-title">Login</h2>

						<div class="form-group">
							<label for="username_email" class="form-label">Name or Email</label>
							<input type="text" class="form-input" name="username_email" id="username_email"
								placeholder="Your Name or Email" required />
							<small class="text-availabilty"></small>
						</div>

						<div class="form-group">
							<label for="password" class="form-label">Password</label>
							<input type="password" class="form-input" name="password" id="password"
								placeholder="Password" required />
							<span toggle="#password" class="field-icon toggle-password">
								<i class="fa fa-eye-slash"></i>
							</span>
							<small class="text-availabilty"></small>
						</div>
						<div class="form-group" id="form-group-submit">
							<input type="submit" name="submit" id="submit" class="form-submit mt-3" value="Sign In" />
						</div>
					</form>
					<p class="registerhere">
						Don't have already an account ? <a href="?p=registration" class="registerhere-link">Register
							here</a>
					</p>
				</div>
			</div>
		</section>
	</div>
</div>
