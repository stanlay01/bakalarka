<?php
session_start();
include "../connect.php";

$firm_id= $_POST['firm_id'];
$role_name = $_POST['role_name'];





$stmt = $conn->prepare('INSERT IGNORE INTO `ROLES` (role_name) VALUES (?)');

if (!$stmt) {
	throw new Exception($conn->error, $conn->errno);
}
$stmt->bind_param('s', $role_name);
$stmt->execute();
$stmt->close();



$query = "SELECT role_id FROM `ROLES` WHERE role_name=? ";
$stmt = $conn->prepare($query);

if (!$stmt) {
	throw new Exception($conn->error, $conn->errno);
}
$stmt->bind_param('s',$role_name);
$stmt->execute();

$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
	$role_id = $row['role_id'];
 }

echo $role_id ;

$stmt->close();


$stmt = $conn->prepare('INSERT IGNORE INTO `ROLES_X_FIRM` (role_id,firm_id) VALUES (?,?)');
if (!$stmt) {
	throw new Exception($conn->error, $conn->errno);
}
$stmt -> bind_param('ii', $role_id, $firm_id);
$stmt->execute();
		

$stmt->close();
$conn->close();





?>