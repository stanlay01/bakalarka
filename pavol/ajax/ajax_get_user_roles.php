<?php 
include "../connect.php";


$user_id = $_POST['id_user'];
$firm_id = $_POST['id_firm'];

	$role_array = [];

$query = "SELECT ROLES.*, 
    case when EXISTS ( SELECT NULL
                     	FROM USERS_X_ROLE ur 
                      	WHERE ur.user_id = ? AND ur.role_id =  ROLES.role_id AND ur.firm_id=?
                     )
        then 'true'
        else 'false'
    end priradeny

FROM ROLES 

INNER JOIN ROLES_X_FIRM rf ON rf.role_id= ROLES.role_id

WHERE  rf.firm_id = ?

ORDER BY priradeny DESC
		";


$stmt = $conn->prepare($query);

if (!$stmt) {
	throw new Exception($conn->error, $conn->errno);
}
$stmt->bind_param('iii',$user_id,$firm_id,$firm_id);
$stmt->execute();

$result = $stmt->get_result();

while($row = $result->fetch_assoc()) {
	$role_array[] = $row; 
}
	


echo json_encode($role_array)  ;

$stmt->close();
$conn->close();



/*


SELECT ROLES.*, 
    case when EXISTS ( SELECT NULL
                     	FROM USERS_X_ROLE ur 
                      	WHERE ur.user_id = 1 AND ur.role_id =  ROLES.role_id AND ur.firm_id=1
                     )
        then 'true'
        else 'false'
    end priradeny

FROM ROLES 

INNER JOIN ROLES_X_FIRM rf ON rf.role_id= ROLES.role_id

WHERE  rf.firm_id = 1







SELECT ROLES.* FROM ROLES 

		INNER JOIN USERS_X_ROLE ur ON ur.role_id = ROLES.role_id

		WHERE ur.user_id = ? AND ur.firm_id = ?

*/
	?>