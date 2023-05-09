<?php
    //connectio to the database
    $host = "localhost";
    $port = "5432";
    $dbname = "miniworld";
    $user = "carlo1700";
    $password = "tib2O6pNuxnR";

    // Create connection
    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");


    // Check connection
    if (!$conn) {
        die("Connessione al database fallita");
    }

    // preparing the query for the insertion of the data in the results table
    $query = "INSERT INTO risultati (giocatore1, giocatore2, risultato) VALUES ($1, $2, $3)";
    $result = pg_prepare($conn, "insert_query", $query);

    // assigning the values to the parameters of the query
    $giocatore1 = "Nome giocatore 1";
    $giocatore2 = "Nome giocatore 2";
    $risultato = $result;

    // execution of the query for the insertion of the data in the results table
    $result = pg_execute($conn, "insert_query", array($giocatore1, $giocatore2, $risultato));

    // check of the result of the operation
    if (!$result) {
        die("Errore durante l'inserimento dei dati nella tabella dei risultati");
    }

    // closing the connection to the database
    pg_close($conn);
?>
