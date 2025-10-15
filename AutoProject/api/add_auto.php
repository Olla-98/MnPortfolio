<?php
header("Access-Control-Allow-Origin: *"); // Geeft toegang tot alle domeinen
header("Content-Type: application/json; charset=UTF-8"); // Geeft aan dat de inhoud JSON is

/*JSON is een manier om gegevens netjes te versturen, bijvoorbeeld { "naam": "Auto", "prijs": 1000 }.*/

include 'db.php';
// Haalt de JSON-gegevens op uit de aanvraag, gegevens ontvangen die een ander programma naar jouw code stuurt in het JSON-formaat
$data = json_decode(file_get_contents("php://input"), true);  // Decodeert de JSON-gegevens naar een PHP-array
$merk = $data['merk'] ?? '';
$prijs = $data['prijs'] ?? 0;
//json_decode(..., true) betekent: "Vertaal die JSON-gegevens naar iets wat PHP kan begrijpen, namelijk een lijst (array)."
if ($merk && $prijs > 0) {
    $stmt = $conn->prepare("INSERT INTO autos (merk, prijs) VALUES (?, ?)"); // prepare (bescherming tegen hackers), voorbereiden van een SQL-opdracht
    $stmt->bind_param("sd", $merk, $prijs);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Auto toegevoegd"]); // Geeft een succesbericht terug in JSON-formaat
} else {
    echo json_encode(["success" => false, "message" => "Ongeldige invoer"]);
}

$conn->close();
?>
