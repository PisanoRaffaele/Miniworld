<!DOCTYPE html>
<html lang="it">

<?php
include 'head.php';
?>

<body>
    <main>
        <?php
        include "header.php";

        $php_page = $page . '.php';

        if (file_exists($php_page)) {
            include $php_page;
        } else {
            include '404.php';
        }
        ?>
    </main>

    <?php
    include 'footer.php';
    ?>

</body>

</html>
