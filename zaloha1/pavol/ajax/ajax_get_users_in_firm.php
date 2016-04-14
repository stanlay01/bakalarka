

<?php 
	session_start();
	include "../connect.php";

	$idcko_firmy = $_GET['firma'];
	$id_roly = $_POST['id_roly'];

	if(isset($_POST['searchedText']))
		$searchedText = $_POST['searchedText'];


	// ak chcem zobraziť všetkých , zadám id= -1
	if($id_roly == -1)
	{
		//všetci
		if(isset($searchedText)){
			$query = "SELECT USERS.user_id,first_name as meno,last_name as priezvisko,email FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id= USERS_X_FIRM.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' 
			AND
			((USERS.user_id LIKE '$searchedText%') OR (LOWER(first_name) LIKE LOWER('$searchedText%')) OR (LOWER(last_name) LIKE LOWER('$searchedText%')) OR (email LIKE '$searchedText%'))	

			GROUP BY  USERS.user_id
			" ;

		}
		else{
		$query = "SELECT USERS.user_id,first_name as meno,last_name as priezvisko,email FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id= USERS_X_FIRM.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' 
			GROUP BY USERS.user_id
			" ;
		}
	}
	else if($id_roly == -2) //nepriradený
	{	
		if(isset($searchedText)){
			$query = "SELECT a.user_id,a.meno,a.priezvisko,a.email FROM 
        			(	SELECT USERS.user_id,first_name AS meno,last_name AS priezvisko,email FROM USERS 
    
        				INNER JOIN USERS_X_FIRM ON USERS.user_id = USERS_X_FIRM.user_id 
           
        			WHERE USERS_X_FIRM.firm_id=1 
   					) a
            
        			LEFT JOIN 
        
			         ( SELECT user_id, role_id  FROM USERS_X_ROLE) b
			        
			        ON a.user_id = b.user_id

			        WHERE b.role_id IS NULL
			        		AND
							((a.user_id LIKE '$searchedText%') OR (LOWER(a.meno) LIKE LOWER('$searchedText%')) OR (LOWER(a.priezvisko) LIKE LOWER('$searchedText%')) OR (email LIKE '$searchedText%'))			
			        		GROUP BY a.user_id
			        	" ;

		}
		else{
		$query = "SELECT a.user_id,a.meno,a.priezvisko,a.email FROM 
        (	SELECT USERS.user_id,first_name AS meno,last_name AS priezvisko,email FROM USERS 
    
        	INNER JOIN USERS_X_FIRM ON USERS.user_id = USERS_X_FIRM.user_id 
           
        	WHERE USERS_X_FIRM.firm_id=1 
   		) a
            
        LEFT JOIN 
        
         ( SELECT user_id, role_id  FROM USERS_X_ROLE) b
        
        ON a.user_id = b.user_id

        WHERE b.role_id IS NULL
        		GROUP BY  a.user_id
        " ;
    	}
	}else  //zobrazenie užívateľov priradených v danej role
	{
		if(isset($searchedText)){
			$query = "SELECT USERS.user_id,first_name AS meno,last_name AS priezvisko,email FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id = USERS_X_FIRM.user_id
			INNER JOIN USERS_X_ROLE ON USERS.user_id = USERS_X_ROLE.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' AND USERS_X_ROLE.role_id='$id_roly' AND USERS_X_ROLE.firm_id='$idcko_firmy'
			AND
			((USERS.user_id LIKE '$searchedText%') OR (LOWER(first_name) LIKE LOWER('$searchedText%')) OR (LOWER(last_name) LIKE LOWER('$searchedText%')) OR (email LIKE '$searchedText%'))	
			GROUP BY USERS.user_id
			" ;

		}
		else{
			$query = "SELECT USERS.user_id,first_name AS meno,last_name AS priezvisko,email FROM USERS 
			INNER JOIN USERS_X_FIRM ON USERS.user_id = USERS_X_FIRM.user_id
			INNER JOIN USERS_X_ROLE ON USERS.user_id = USERS_X_ROLE.user_id 
			WHERE USERS_X_FIRM.firm_id = '$idcko_firmy' AND USERS_X_ROLE.role_id='$id_roly' AND USERS_X_ROLE.firm_id='$idcko_firmy'
			GROUP BY USERS.user_id
			" ; 
		}
	}


	
	$result = $conn->query($query);                   

  	if ($result->num_rows > 0) {
	    // output data of each row
	    	
	    while($row = $result->fetch_assoc()) {
	       
	    	echo '
	    		<tr>
					<td width="15%">
						<input type="checkbox"   name="check"><span></span>
					</td>
					<td width="15%">'.$row["user_id"].'</td>
					<td width="20%"">'.$row["meno"].'</td>
					<td width="25%"">'.$row["priezvisko"].'</td>
					<td width="25%"">'.$row["email"].'</td>

				</tr>
				';


	    }
	} else {
	    
	}
	
?>
