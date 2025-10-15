<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$result = $conn->query("SELECT * FROM autos ORDER BY id ASC");// Voer een SQL-query uit om alle auto's op te halen, gesorteerd op ID

$autos = [];

while ($row = $result->fetch_assoc()) { // Haal elke rij op als een associatieve array
    $autos[] = $row; // Voeg de rij toe aan de lijst van auto's
}

echo json_encode($autos);
$conn->close();
?>
