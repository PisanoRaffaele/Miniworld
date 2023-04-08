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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- CSS include -->
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/home.css">

    <!-- Javascript Include -->
    <script src="JavaScript/miniworld.js"></script>

</head>
<body>
    <?php
        include "header.html";
        include "home.html";
    ?>

    <script>
        document.querySelector('#hamburger').addEventListener('click', function () {
                document.querySelector('.animated-togglebutton').classList.toggle('open');
                document.querySelector('#dropdown-menu').classList.toggle('show');
            });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 991) {
                // Attiva la funzione quando la larghezza della finestra > 991px
                document.querySelector('.animated-togglebutton').classList.remove('open');
                document.querySelector('#dropdown-menu').classList.remove('show');
            }
        });
    </script>
</body>
</html>
