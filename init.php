<!--
    1. apri terminale
    2. vai alla directory con i file
    3. esegui "php -S localhost:<port>"
    4. apri il browser e vai a localhost:<port>/<pagine.php>
 -->

<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>miniworld</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- CSS include -->
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/home.css">

</head>
<body>
    <?php
        include "html/header.html";
        include "html/home.html";
    ?>

    <!-- Javascript Include -->
    <script src="JavaScript/header.js"></script>
    <script src="JavaScript/home.js"></script>

</body>
</html>
