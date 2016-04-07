<?php 
include "../connect.php";



$user_id = $_POST['id_user'];
$firm_id = $_POST['id_firm'];


$query = "SELECT  u.user_id , u.first_name, u.last_name, u.email FROM USERS AS u 
			INNER JOIN USERS_X_FIRM ON u.user_id= USERS_X_FIRM.user_id 
			WHERE USERS_X_FIRM.firm_id = ?  AND u.user_id = ?";


$stmt = $conn->prepare($query);

if (!$stmt) {
	throw new Exception($conn->error, $conn->errno);
}
$stmt->bind_param('ii',$firm_id,$user_id);
$stmt->execute();

$result = $stmt->get_result();

$row = $result->fetch_array();



echo json_encode($row) ;

$stmt->close();
$conn->close();


 ?>