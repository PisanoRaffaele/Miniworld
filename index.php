<!DOCTYPE html>
<html lang="it">

<?php
include 'head.php';
?>

<body>
    <main>
        <?php
        include "header.php";

        switch ($page) {
            case 'home':
                include 'home.php';
                break;
            case 'memory':
                include 'memory.php';
                break;
            case 'dot':
                include 'dot.php';
                break;
            case 'simon':
                include 'simon.php';
                break;
            case 'guess_the_word':
                include 'guess_the_word.php';
                break;
            case 'about':
                include 'about.php';
                break;
            case 'login':
                include 'login.php';
                break;
            case 'registration':
                include 'registration.php';
                break;
            default:
                include '404.php';
                break;
        }

        ?>
    </main>
    <?php
    include 'footer.php';
    ?>
</body>

</html>