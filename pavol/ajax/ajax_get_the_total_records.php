

<?php 
	include "../connect.php";

	$idcko_firmy = $_POST['id_firm'];
	$id_roly = $_POST['id_roly'];
	


	if($_POST['searchedText'] != null){
		$searchedText = $_POST['searchedText'];

		$searchQuery = "AND ((USERS.user_id LIKE '$searchedText%') OR (LOWER(first_name) LIKE LOWER('$searchedText%')) OR (LOWER(last_name) LIKE LOWER('$searchedText%')) OR (email LIKE '$searchedText%'))	";
	}


	// ak chcem zobraziť všetkých , zadám id= -1
	if($id_roly == -1)
	{
		$query = "SELECT COUNT(*) FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id= USERS_X_FIRM.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' ";
		//všetci
		if(isset($searchedText)){
			$query .= $searchQuery;
		}
	}
	else if($id_roly == -2) //nepriradený
	{	
		$query = "SELECT COUNT(*) FROM 
        			(	SELECT USERS.user_id,first_name AS meno,last_name AS priezvisko,email FROM USERS 
    
        				INNER JOIN USERS_X_FIRM ON USERS.user_id = USERS_X_FIRM.user_id 
           
        			WHERE USERS_X_FIRM.firm_id=1 
   					) a
            
        			LEFT JOIN 
        
			         ( SELECT user_id, role_id  FROM USERS_X_ROLE) b
			        
			        ON a.user_id = b.user_id

			        WHERE b.role_id IS NULL";

		
		if(isset($searchedText))
			$query .= "AND ((a.user_id LIKE '$searchedText%') OR (LOWER(a.meno) LIKE LOWER('$searchedText%')) OR (LOWER(a.priezvisko) LIKE LOWER('$searchedText%')) OR (email LIKE '$searchedText%'))	";
	
	}else  //zobrazenie užívateľov priradených v danej role
	{
		$query = "SELECT COUNT(*) FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id = USERS_X_FIRM.user_id
			INNER JOIN USERS_X_ROLE ON USERS.user_id = USERS_X_ROLE.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' AND USERS_X_ROLE.role_id='$id_roly' AND USERS_X_ROLE.firm_id='$idcko_firmy'";

		if(isset($searchedText))
			$query.=$searchQuery;	
	}

	


	
	$result = $conn->query($query);                   

  	if ($result->num_rows > 0) {

	   $result = $result->fetch_assoc();
	} else {
	    $result =0;
	}


	echo json_encode($result["COUNT(*)"]);
	
?>
