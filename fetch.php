<?php

$elementi = array(
    array('id' => 1, 'title' => 'Memory', 'description' => 'Metti alla prova la tua memoria', 'image' => 'assets/Logo.png', 'link' => '?p=memory'),
    array('id' => 2, 'title' => 'Dot', 'description' => 'Quanti click riesci a fare in 10 secondi?', 'image' => 'assets/Logo.png', 'link' => '?p=dot'),
    array('id' => 3, 'title' => 'Simon', 'description' => 'Quanta memoria hai?', 'image' => 'assets/Logo.png', 'link' => '?p=simon'),
    array('id' => 4, 'title' => 'Guess The Word', 'description' => 'Indovina la parola', 'image' => 'assets/Logo.png', 'link' => '?p=guess_the_word'),
    array('id' => 5, 'title' => '2048', 'description' => 'Riesci a fare 2048?', 'image' => 'assets/Logo.png', 'link' => '?p=2048'),
    array('id' => 6, 'title' => 'Titolo Gioco 6', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 7, 'title' => 'Titolo Gioco 7', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => ''),
    array('id' => 8, 'title' => 'Titolo Gioco 8', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'image' => 'assets/Logo.png', 'link' => '')
);

header('Content-Type: application/json'); // specifica il tipo di risposta come JSON
echo json_encode($elementi); // restituisce l'array di risposta come JSON

?>
