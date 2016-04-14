<?php 
	session_start();
	include "../connect.php";

	$firm_id = $_POST['firm_id'];
	$role_id = $_POST['role_id'];

	$message = false;


	$query = "SELECT COUNT(*) FROM `ROLES`
			INNER JOIN `TRANSITIONS_X_ROLE` as `TR` ON TR.role_id = ROLES.role_id
			INNER JOIN transition ON transition.id = TR.transition_id 
			INNER JOIN petri_net ON petri_net.id = transition.id_pn 
			INNER JOIN `PN_X_FIRM` ON petri_net.id = `PN_X_FIRM`.pn_id
			WHERE `PN_X_FIRM`.firm_id =?  AND `ROLES`.role_id=?";




	if ($stmt = $conn->prepare($query)) {


		$stmt->bind_param('ii', $firm_id ,$role_id);
	    /* execute statement */
	    $stmt->execute();

	    /* bind result variables */
	    $stmt->bind_result($result);

	    echo $result;
	    /* fetch values */
	 	$stmt->fetch();
	 	$stmt->close();
	 	
	 	if($result == 0){
	 		deleteRoleFromFirm($role_id, $firm_id ,$conn );
	 		deleteUsersFromRole($role_id, $firm_id ,$conn);
	 		$message =true;
	 	}

	    /* close statement */
	   
	    $conn-> close();

	    echo json_encode($message);
	}



	function deleteRoleFromFirm($id_role, $firm_id, $conn ){
		$stmt = $conn->prepare('DELETE FROM `ROLES_X_FIRM` WHERE role_id=? AND firm_id=?');

		if (!$stmt) {
		    throw new Exception($conn->error, $conn->errno);
		}


		$stmt->bind_param('ii', $id_role, $firm_id);

		$stmt->execute();

		$stmt->close();
	}

	function deleteUsersFromRole($id_role, $firm_id, $conn){
		$stmt = $conn->prepare('DELETE FROM `USERS_X_ROLE` WHERE  role_id=? AND firm_id=?');

		if (!$stmt) {
	        throw new Exception($conn->error, $conn->errno);
	    }


		$stmt->bind_param('ii',  $id_role, $firm_id);

		
		$stmt->execute();

		$stmt->close();
	}

	


?>