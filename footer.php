<div class="container container-footer">
  <footer>
    <div class="container d-flex justify-content-center pt-5">
      <button type="button" class="btn btn-warning btn-lg btn-floating mx-2" id="btn-footer">
        <i class="fab fa-facebook-f"></i>
      </button>
      <button type="button" class="btn btn-warning btn-lg btn-floating mx-2" id="btn-footer">
        <i class="fab fa-youtube"></i>
      </button>
      <button type="button" class="btn btn-warning btn-lg btn-floating mx-2" id="btn-footer">
        <i class="fab fa-instagram"></i>
      </button>
      <button type="button" class="btn btn-warning btn-lg btn-floating mx-2" id="btn-footer">
        <i class="fab fa-twitter"></i>
      </button>
    </div>

    <!-- Copyright -->
    <div class="text-center text-white py-4 px-2">
      © 2023 Copyright:
      <a class="text-white" href="#">miniworld.com</a>
    </div>
  </footer>
</div>


<!-- Javascript Include -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="JavaScript/header.js"></script>
<?php
    $js_file = "JavaScript/$page.js";
    if (file_exists($js_file))
        echo "<script src='$js_file'></script>";
?>
