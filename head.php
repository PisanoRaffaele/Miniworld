<head>
<meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>miniworld</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- CSS include -->
    <link rel="stylesheet" href="css/header.css">
    <?php 
        $page = $_GET['p'];
        echo "<link rel='stylesheet' href='css/$page.css'>";
    ?>

</head>