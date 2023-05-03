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
    }
?>

<?php

    $username = $_POST["username"];

    // Esegui la query utilizzando la connessione esplicita
    $query = "SELECT * FROM Persona WHERE username = $1";
    $result = pg_query_params($dbconn, $query, [$username]);

    if (pg_num_rows($result) == 0) {
        echo 0;
    } else {
        echo 1;
    }
    
    // Chiudi la connessione al database
    pg_close($dbconn);
?>