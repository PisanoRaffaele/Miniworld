<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    // Imposta le variabili di connessione al database
    $dbname = "Miniworld";
    $host = "localhost";
    $port = "5432";
    $user = "postgres";
    $password = "password";

    // Crea la connessione al database
    $conn = pg_connect("dbname=$dbname host=$host port=$port user=$user password=$password");

    // Esegui la query utilizzando la connessione esplicita
    $query = "SELECT * FROM relazione ORDER BY classifica, posizione";
    $result = pg_query_params($conn, $query, []);

    // Scopri se la query è stata eseguita con successo
    if (!$result) {
        echo "Errore nella query.\n";
        exit;
    }

    // Elabora i risultati
    while ($row = pg_fetch_row($result)) {
        // echo "Colonna 1: $row[0] Colonna 2: $row[1] <br>";
        foreach ($row as $line) {
            echo "$line | ";
        }
        echo "<br>";
    }

    // Chiudi la connessione al database
    pg_close($conn);
    ?>

</body>

</html>