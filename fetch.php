<?php

$elementi = array(
    array('id' => 1, 'title' => 'Memory', 'description' => 'Metti alla prova la tua memoria', 'image' => 'assets/Logo.png', 'link' => 'memory.php'),
    array('id' => 2, 'title' => 'Dot', 'description' => 'Quanti click riesci a fare in 10 secondi?', 'image' => 'assets/Logo.png', 'link' => 'dot.php'),
    array('id' => 3, 'title' => 'Titolo Gioco 3', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 4, 'title' => 'Titolo Gioco 4', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 5, 'title' => 'Titolo Gioco 5', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 6, 'title' => 'Titolo Gioco 6', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 7, 'title' => 'Titolo Gioco 7', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 8, 'title' => 'Titolo Gioco 8', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 9, 'title' => 'Titolo Gioco 9', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 10, 'title' => 'Titolo Gioco 10', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => '')
);

// Istruzioni inutili
$random = array_rand($elementi, 10); // selezioniamo 3 elementi casuali dall'array

$response = array(); // array vuoto che conterrà la risposta

foreach ($random as $index) {
    $response[] = $elementi[$index]; // aggiungiamo l'elemento casuale all'array di risposta
}
// fino qui


header('Content-Type: application/json'); // specifica il tipo di risposta come JSON
echo json_encode($elementi); // restituisce l'array di risposta come JSON

?>
