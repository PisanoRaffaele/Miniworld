<footer class="container-fluid footer row justify-content-between mt-3 mb-2">
    <div class="col-auto logo ml-5">
        <a class="navbar-logo" href="#">
            <img src="assets/Logo.png" class="d-inline-block align-top" id="logoimg">
        </a>
    </div>
    <div class="d-flex">
        <a class="footer-link nav-link" href="#">About Us</a>
        <a class="footer-link nav-link" href="#">Classifiche</a>
        <a class="footer-link nav-link" href="#">Supporto</a>
        <a class="footer-link nav-link" href="#" name="personal"></a>
    </div>
</footer>


<!-- Javascript Include -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="JavaScript/header.js"></script>
<?php
    $js_file = "css/$page.css";
    if (file_exists($js_file))
        echo "<script src='JavaScript/$js_file.js'></script>";
    else
        echo "<script src='JavaScript/404.js'></script>";
?>