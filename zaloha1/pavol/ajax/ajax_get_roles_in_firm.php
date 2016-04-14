<?php 
	session_start();
	include "../connect.php";

	$idcko_firmy = $_POST['firm_id'];


	$query = "	SELECT * FROM ROLES 
				INNER JOIN ROLES_X_FIRM ON ROLES.role_id = ROLES_X_FIRM.role_id
				WHERE ROLES_X_FIRM.firm_id = '$idcko_firmy' 
			";


	$result = $conn->query($query);

	while($row = $result->fetch_assoc()) {
		 $role_array[] = $row; 
	}
	$conn->close();

	echo json_encode(($role_array)) ;


?>
