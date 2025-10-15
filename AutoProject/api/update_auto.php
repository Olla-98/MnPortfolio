<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);
$merk = $data['merk'] ?? '';
$prijs = $data['prijs'] ?? 0;

if ($id > 0 && $merk && $prijs > 0) { // Controleer of de ID geldig is en merk en prijs niet leeg zijn
    $stmt = $conn->prepare("UPDATE autos SET merk = ?, prijs = ? WHERE id = ?");// Prepare (bescherming tegen hackers) van een SQL-opdracht
    $stmt->bind_param("sdi", $merk, $prijs, $id);
    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Auto aangepast"]);
} else {
    echo json_encode(["success" => false, "message" => "Ongeldige gegevens"]);
}

$conn->close();
?>
