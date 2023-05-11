<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location:init.php");
} else {
    $dbname = "MiniworldDB";
    $host = "localhost";
    $port = "5432";
    $user = "postgres";
    $password = "erfede0106";

    // Crea la connessione al database
    $dbconn = pg_connect("dbname=$dbname host=$host port=$port user=$user password=$password") or die("Could not connect:" . pg_last_error());

    main($dbconn);
}
?>

<?php
function registration($dbconn)
{
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $email = $_POST["email"];

    // Esegui la query utilizzando la connessione esplicita
    $query = "INSERT INTO Persona (username, password, email) VALUES ($1, $2, $3)";
    $result = pg_query_params($dbconn, $query, [$username, $password, $email]);

    // Chiudi la connessione al database
    pg_close($dbconn);
}

function login($dbconn)
{
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $query = "SELECT * FROM Persona WHERE (username = $1 or email = $1) and password = $2";
    $result = pg_query_params($dbconn, $query, [$username, $password]);

    if (pg_num_rows($result) > 0) {
        echo "true";
    } else {
        echo "error";
    }

    pg_close($dbconn);
}
?>

<?php

function main($dbconn)
{
    $page = $_GET["p"];

    switch ($page) {
        case 'registration':
            registration($dbconn);
            break;
        case 'login':
            login($dbconn);
            break;
    }
}

?>
