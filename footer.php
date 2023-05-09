<footer class="d-flex align-items-center justify-content-between p-3">
	<div class="text-white">
		© 2023 Copyright: miniworld.com
	</div>
	<div class="d-flex justify-content-center">
		<ul class="footer-list px-0 py-2">
			<li class="footer-item">
				<a href="#" class="footer-link"><i class="fab fa-facebook-f"></i></a>
			</li>
			<li class="footer-item">
				<a href="#" class="footer-link"><i class="fab fa-twitter"></i></a>
			</li>
			<li class="footer-item">
				<a href="#" class="footer-link"><i class="fab fa-google-plus-g"></i></a>
			</li>
			<li class="footer-item">
				<a href="#" class="footer-link"><i class="fab fa-youtube"></i></a>
			</li>
			<li class="footer-item">
				<a href="#" class="footer-link"><i class="fab fa-linkedin-in"></i></a>
			</li>
		</ul>
	</div>
</footer>

<!-- Javascript Include -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="JavaScript/header.js"></script>
<?php
$js_file = "JavaScript/$page.js";
if (file_exists($js_file))
	echo "<script src='$js_file'></script>";
?>