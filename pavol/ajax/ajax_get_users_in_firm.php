

<?php 
	session_start();
	include "../connect.php";

	$idcko_firmy = $_POST['firm_id'];
	$id_roly = $_POST['id_roly'];
	
	$items_per_page = $_POST['items_per_page'];
	$page = $_POST['page'];

	$OFFSET = (($page-1) * $items_per_page);

	$limit= " LIMIT ".$OFFSET.", ".$items_per_page ;




	if(isset($_POST['searchedText'])){
		$searchedText = $_POST['searchedText'];

		$searchQuery = "AND ((USERS.user_id LIKE '$searchedText%') OR (LOWER(first_name) LIKE LOWER('$searchedText%')) OR (LOWER(last_name) LIKE LOWER('$searchedText%')) OR (email LIKE '$searchedText%'))	";
	}


	// ak chcem zobraziť všetkých , zadám id= -1
	if($id_roly == -1)
	{
		$query = "SELECT USERS.user_id,first_name as meno,last_name as priezvisko,email FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id= USERS_X_FIRM.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' ";
		//všetci
		if(isset($searchedText)){
			$query .= $searchQuery;
		}


		$query .= "GROUP BY USERS.user_id";
	}
	else if($id_roly == -2) //nepriradený
	{	
		$query = "SELECT a.user_id,a.meno,a.priezvisko,a.email FROM 
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

		$query .= " GROUP BY a.user_id";


		
	}else  //zobrazenie užívateľov priradených v danej role
	{
		$query = "SELECT USERS.user_id,first_name AS meno,last_name AS priezvisko,email FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id = USERS_X_FIRM.user_id
			INNER JOIN USERS_X_ROLE ON USERS.user_id = USERS_X_ROLE.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' AND USERS_X_ROLE.role_id='$id_roly' AND USERS_X_ROLE.firm_id='$idcko_firmy'";

		if(isset($searchedText))
			$query.=$searchQuery;

		$query .= "GROUP BY USERS.user_id";		
	}

	$query .= $limit;

	


	
	$result = $conn->query($query);                   

  	if ($result->num_rows > 0) {
	    // output data of each row
	    	
	    while($row = $result->fetch_assoc()) {
	       
	    	echo '
	    		<tr>
					<td width="15%">
						<input type="checkbox"   name="check"><span></span>
					</td>
					<td width="15%" class="user-id">'.$row["user_id"].'</td>
					<td width="20%">'.$row["meno"].'</td>
					<td width="20%">'.$row["priezvisko"].'</td>
					<td width="20%">'.$row["email"].'</td>
					<td width="10%">
					<span class="hoverbubble-container"><a href="#" data-id="'.$row["user_id"].'"  class="hoverbubble user-info"><i class="icon  icon-edit"></i><span>o užívateľovi</span></a>	</span>
					<span class="hoverbubble-container"><a href="#" data-id="'.$row["user_id"].'" class="hoverbubble delete-user"><i class="icon icon-trash"></i><span>odstrániť z role</span></a>	</span>
					</td>

				</tr>
				';


	    }
	} else {
	    
	}
	
?>
