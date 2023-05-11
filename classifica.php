<?php
    //connectio to the database
    $host = "localhost";
    $port = "5432";
    $dbname = "miniworld";
    $user = "";
    $password = "";

    // Create connection
    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");


    // Check connection
    if (!$conn) {
        die("Connessione al database fallita");
    }

    
    
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
    
    

    function richiedi_classifica($dbconn) 
    {
        $gioco = $_POST["gioco"];

        $query = "SELECT * FROM Statistiche WHERE (gioco = $1) ORDER BY punteggio LIMIT 10";
        $result = pg_query_params($dbconn, $query, [$gioco]);

        // Creazione di un array per i risultati
        $classifica = array();
        while ($row = pg_fetch_assoc($result)) {
            $classifica[] = $row;
        }

        // Restituzione dei risultati in formato JSON
        header('Content-Type: application/json');
        echo json_encode($classifica);
            
        pg_close($dbconn);
    }
?>
