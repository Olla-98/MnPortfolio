<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
error_reporting(0);
 

$severname = "localhost";
$username = "root";
$passworrd = "";
$dbname = "autodb";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error) {
    die("Verdieping mislukt: ".$conn->connect_error);
}

?>