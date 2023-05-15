<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Miniworld</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css">

    <link rel="icon" type="image/png" href="assets/favicon.png">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- CSS include -->
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <?php
    if (isset($_GET['p']))
        $page = $_GET['p'];
    else
        $page = 'home';

    $css_file = "css/$page.css";
    if (file_exists($css_file))
        echo "<link rel='stylesheet' href='css/$page.css'>";
    else
        echo "<link rel='stylesheet' href='css/404.css'>";
    ?>
</head>