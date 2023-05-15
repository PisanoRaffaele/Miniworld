<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location:init.php");
} else {
    $dbname = "MiniworldDB";
    $host = "localhost";
    $port = "5432";
    $user = "postgres";
    $password = "erfede0106";

    $dbconn = pg_connect("dbname=$dbname host=$host port=$port user=$user password=$password") or die("Could not connect:" . pg_last_error());

    main($dbconn);
}
?>

<?php
function registration($dbconn)
{
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // Esegui la query utilizzando la connessione esplicita
    $query = "INSERT INTO Persona (username, password, email) VALUES ($1, $2, $3)";
    $result = pg_query_params($dbconn, $query, [$username, $password, $email]);

    if ($result && pg_affected_rows($result) > 0)
        echo 1;
    else
        echo 0;
}

function login($dbconn)
{
    $username = $_POST["email_username"];
    $password = $_POST["password"];

    $query = "SELECT * FROM Persona WHERE (username = $1 or email = $1)";
    $result = pg_query_params($dbconn, $query, [$username]);


    if (pg_num_rows($result) > 0) {
        $row = pg_fetch_row($result);
        $hash = $row[2];
        if (password_verify($password, $hash))
            echo json_encode(array("email" => $row[0], "username" => $row[1]));
        else
            echo 0;
    } else {
        echo 0;
    }

}

function check_username($dbconn)
{
    $username = $_POST["username"];

    // Esegui la query utilizzando la connessione esplicita
    $query = "SELECT * FROM Persona WHERE username = $1";
    $result = pg_query_params($dbconn, $query, [$username]);

    if (pg_num_rows($result) == 0)
        echo 0;
    else
        echo 1;
}

function richiedi_classifica($dbconn)
{
    $gioco = $_POST["gioco"];
    $order = $_POST["order"];

    if ($order === "reverse")
        $query = "SELECT * FROM Statistiche WHERE (gioco = $1) ORDER BY punteggio LIMIT 10";
    else
        $query = "SELECT * FROM Statistiche WHERE (gioco = $1) ORDER BY punteggio DESC LIMIT 10";

    $result = pg_query_params($dbconn, $query, [$gioco]);

    // Creazione di un array per i risultati
    $classifica = array();
    while ($row = pg_fetch_assoc($result)) {
        $classifica[] = $row;
    }

    // Restituzione dei risultati in formato JSON
    header('Content-Type: application/json');
    echo json_encode($classifica);

}

function aggiorna_classifica($dbconn)
{
    $email = $_POST["email"];
    $gioco = $_POST["gioco"];
    $username = $_POST["username"];
    $punteggio = $_POST["punteggio"];
    $order = $_POST["order"];

    $query = "SELECT * FROM Statistiche WHERE (gioco = $1 AND username = $2 AND email = $3)";

    $result = pg_query_params($dbconn, $query, [$gioco, $username, $email]);
    if (pg_num_rows($result) > 0) {
        $row = pg_fetch_row($result);
        $punteggioOld = $row[3];
        if (!(($order === "reverse" && $punteggio < $punteggioOld) || ($order !== "reverse" && $punteggio > $punteggioOld)))
            return;
    }
    // Esegui la query utilizzando la connessione esplicita
    $query = "INSERT INTO Statistiche (email, username, gioco, punteggio) VALUES ($1, $2, $3, $4)";
    $result = pg_query_params($dbconn, $query, [$email, $username, $gioco, $punteggio]);

}

function reset_password($dbconn)
{
    $email = $_POST["email"];
    $username = $_POST["username"];
    $oldPassword = $_POST["oldPassword"];
    $newPassword = $_POST["newPassword"];

    $query = "SELECT * FROM Persona WHERE email = $1 AND username = $2";
    $result = pg_query_params($dbconn, $query, [$email, $username]);

    if (pg_num_rows($result) > 0) {
        $row = pg_fetch_row($result);
        $hash = $row[2];
        if (password_verify($oldPassword, $hash)) {
            $query = "UPDATE Persona SET password = $1 WHERE username = $2";
            $result = pg_query_params($dbconn, $query, [password_hash($newPassword, PASSWORD_DEFAULT), $username]);
            if ($result && pg_affected_rows($result) > 0)
                echo 1;
            else
                echo 0;
        } else {
            echo 2;
        }
    } else {
        echo 0;
    }
}

?>

<?php

function main($dbconn)
{
    $funzione = $_POST['funzione'];

    if (!function_exists($funzione)) {
        echo "Funzione non esistente";
        return;
    }

    $funzione($dbconn);

    // pg_close($dbconn);
}

?>