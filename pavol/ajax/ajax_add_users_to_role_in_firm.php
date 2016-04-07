<?php 
	session_start();
	include "../connect.php";

	if (isset($_POST["dataPackage"])) { 

		$dataPackage = json_decode($_POST["dataPackage"]);


		$id_role = $dataPackage->id_role; //
		$ids_of_users = $dataPackage->user_ids; //id-čka užívateľov
		$firm_id = $dataPackage->firm_id;

		$id_user=1; //toto je len inicializácia



		$stmt = $conn->prepare('INSERT IGNORE INTO `USERS_X_ROLE` (user_id, role_id, firm_id) VALUES (?,?,?)');

		if (!$stmt) {
	        throw new Exception($conn->error, $conn->errno);
	    }


		$stmt->bind_param('sss', $id_user, $id_role, $firm_id);

		

		//prepare
		foreach ($ids_of_users as $key => $value) {
			$id_user= $value;
			$stmt->execute();
		}

		$stmt->close();
		$conn->close();
	}
?>