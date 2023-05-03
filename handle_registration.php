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
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $email = $_POST["email"];

    // Esegui la query utilizzando la connessione esplicita
    $query = "INSERT INTO Persona (username, password, email) VALUES ($1, $2, $3)";
    $result = pg_query_params($dbconn, $query, [$username, $password, $email]);

    // Scopri se la query è stata eseguita con successo
    if (!$result) {
        echo "Errore nella query.\n";
        exit;
    }

    // Chiudi la connessione al database
    pg_close($dbconn);
?>