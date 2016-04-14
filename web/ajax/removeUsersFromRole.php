<?php 
	session_start();
	include "../connect.php";

	if (isset($_POST["dataPackage"])) {

		$dataPackage = json_decode($_POST["dataPackage"]);
		$id_role = $dataPackage->id_role;
		$ids_of_users = $dataPackage->user_ids;
		$id_user=1;
		$firm_id = $_GET['firma'];
		

		$stmt = $conn->prepare('DELETE FROM `USERS_X_ROLE` WHERE user_id=? AND role_id=? AND firm_id=?');

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