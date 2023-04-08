<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- CSS include -->
	<link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/memory.css">

</head>
<body>
    <?php
        include "header.html";
        include "memory.html";
    ?>
    <script>
        document.querySelector('#hamburger').addEventListener('click', function () {
                document.querySelector('.animated-togglebutton').classList.toggle('open');
                document.querySelector('#dropdown-menu').classList.toggle('show');
            });
    </script>

    <!-- Javascript Include -->
    <script src="JavaScript/miniworld.js"></script>
	<script src="JavaScript/memory.js"></script>
</body>
</html>