<?php
session_start();
include "../connect.php";

if (isset($_POST["dataPackage"])) {

		$dataPackage = json_decode($_POST["dataPackage"]);
		$id_role = $dataPackage->role_name;
		$firm_id = $dataPackage->firm_id;



		$stmt = $conn->prepare('INSERT IGNORE INTO `ROLES` (role_name, firm_id) VALUES (?,?)');

		if (!$stmt) {
	        throw new Exception($conn->error, $conn->errno);
	    }


		$stmt->bind_param('ss', $id_role, $firm_id);


		/*
		foreach ($ids_of_users as $key => $value) {
			$id_user= $value;
			$stmt->execute();
		}*/
		

		$stmt->close();
		$conn->close();
}

?>