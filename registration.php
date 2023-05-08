<div class="register-body">
	<div class="main">
		<section class="signup">
			<div class="container">
				<div class="signup-content">
					<form method="POST" id="registration_form" class="signup-form">
						<h2 class="form-title">Create account</h2>
						<div class="form-group">
							<label for="name" class="form-label">Name</label>
							<input type="text" class="form-input" name="username" id="username" placeholder="Your Name" />
							<small class="text-availabilty"></small>
						</div>
						<div class="form-group">
							<label for="email" class="form-label">Email</label>
							<input type="email" class="form-input" name="email" id="email" placeholder="Your Email" />
							<small class="text-availabilty"></small>
						</div>
						<div class="form-group">
							<label for="password" class="form-label">Password</label>
							<input type="password" class="form-input" name="password" id="password"
								placeholder="Password" />
							<!-- <span toggle="#password" class="zmdi zmdi-eye field-icon toggle-password"></span> -->
							<span toggle="#password" class="field-icon toggle-password">
								<i class="fa fa-eye-slash"></i>
							</span>
							<small class="text-availabilty"></small>
						</div>
						<div class="form-group">
							<label for="re_password" class="form-label">Repeat Password</label>
							<input type="password" class="form-input" name="re_password" id="re_password"
								placeholder="Repeat your password" />
							<span toggle="#re_password" class="field-icon toggle-re_password">
								<i class="fa fa-eye-slash"></i>
							</span>
							<small class="text-availabilty"></small>
						</div>
						<div class="form-group" id="form-group-submit">
							<input type="submit" name="submit" id="submit" class="form-submit mt-3" value="Sign up" />
						</div>
					</form>
					<p class="loginhere">
						Have already an account ? <a href="?p=login" class="loginhere-link">Login here</a>
					</p>
				</div>
			</div>
		</section>
	</div>
</div>
