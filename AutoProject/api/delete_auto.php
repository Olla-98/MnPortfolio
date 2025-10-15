<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true); // Haalt de JSON-gegevens op uit de aanvraag, leest de ruwe invoer en decodeert deze naar een PHP-array
$id = intval($data['id']); // Zorgt ervoor dat de ID een geheel getal is

if ($id > 0) {
    $stmt = $conn->prepare("DELETE FROM autos WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Auto verwijderd"]);
} else {
    echo json_encode(["success" => false, "message" => "Ongeldige ID"]);
}

$conn->close();
?>
