<?php

	include "../connect.php";


	function insertRoleIntoDatabase($name,$conn){

		$stmt = $conn->prepare('INSERT IGNORE INTO `ROLES` (role_name) VALUES (?)');

		if (!$stmt) {
	        throw new Exception($conn->error, $conn->errno);
	    }


		$stmt->bind_param('s', $name);
		

		if($stmt->execute())
		{
			$stmt->close();
			return true;
		}
		else
		{
			$stmt->close();
			return false;
		}

	}



	function InsertReferencesIntoDatabase($xml_id, $value, $pn_id,$conn)
	{
		$query = ("SELECT id FROM transition WHERE id_pn='$pn_id' AND id_in_xml='$xml_id'");
		$result = mysqli_query($conn, $query);
		$row = mysqli_fetch_assoc($result);


		$transitionId = $row['id'];

		if($value != false){

			$query = ("SELECT id FROM transition WHERE id_pn='$pn_id' AND id_in_xml='$value'");
			$result = mysqli_query($conn, $query);
			$row = mysqli_fetch_assoc($result);
			$referenced_transition_id = $row['id'];
			$value = true;
		}
		else{
			$referenced_transition_id = null;
			$value = false;
		}



		$stmt = $conn->prepare('INSERT INTO `REFERENCES` (transition_id,referenced_transition_id,PN_id,value) VALUES (?,?,?,?)');

		$stmt->bind_param('iiib', $transitionId ,$referenced_transition_id,$pn_id, $value  );

		if($stmt->execute())
		{
			$stmt->close();
			return true;
		}
		else
		{
			$stmt->close();
			return false;
		}

	}


		//TODO
	function connectRoleWithTransition($pn_id,$role, $xml_id,$conn)
	{

		$query = ("SELECT id FROM transition WHERE id_pn='$pn_id' AND id_in_xml='$xml_id'");
		$result = mysqli_query($conn, $query);
		$row = mysqli_fetch_assoc($result);


		$transitionId = $row['id'];

		echo $transitionId."\n";
		

		$stmt = $conn->prepare('INSERT INTO `TRANSITIONS_X_ROLE` (transition_id,role_id) VALUES (?,(SELECT role_id FROM ROLES WHERE role_name=?) )');

		$stmt->bind_param('is', $transitionId ,$role );

		if($stmt->execute())
		{
			$stmt->close();
			return true;
		}
		else
		{
			$stmt->close();
			return false;
		}

	}


	function insertRoleWhichCanStartTheCase($pn_id,$role_name,$conn)
	{
		$stmt = $conn->prepare('INSERT INTO `ROLES_START_CASES` (pn_id,role_id) VALUES (?,(SELECT role_id FROM ROLES WHERE role_name=?) )');

		$stmt->bind_param('is', $pn_id ,$role_name );

		if($stmt->execute())
		{
			$stmt->close();
			return true;
		}
		else
		{
			$stmt->close();
			return false;
		}
	}




		$xml = $_POST['xml_file'];
		$roles_obj = simplexml_load_string($xml);
		$pn_id = $roles_obj->petri_net_id;


		$logs="";
		$error_logs ="";


		/**
		 * pre všetky role uloží rolu a prechody na ktoré je naviazaná
		 */
		foreach($roles_obj->roles->role as $role){
           	
           	if ( insertRoleIntoDatabase($role->name,$conn))
           		$logs.= "vloženie role ".$role->name." bolo úspešné\n";
           	else
           		$error_logs .= "vloženie role ".$role->name." nebolo úspešné\n";

           	if($role->start_case == "true"){
           		if(insertRoleWhichCanStartTheCase($pn_id,$role->name,$conn))
           			$logs.= "role ".$role->name." boli pridelené práva na spúštanie nových case-ov\n";
           		else
           			$error_logs.= "role ".$role->name." neboli pridelené práva na spúštanie nových case-ov\n";

            }

           	foreach ($role->transitionId as $transitionID) {
           		
           		if(connectRoleWithTransition($pn_id,$role->name, $transitionID,$conn))
           			$logs.= "rola ".$role->name." môže spúšťať prechod".$transitionID."\n";
           		else
           			$error_logs.= "roli ".$role->name." sa nepodarilo priradiť prechod ".$transitionID."\n";

           	}
        }



        /**
         *  uloží všetky referencie
         */
        foreach($roles_obj->references->reference as $reference){
            $result = InsertReferencesIntoDatabase($reference->transitionId, $reference->value, $pn_id,$conn);
            if($result == true)
           		$logs.= "prechod ".$reference->transitionId."referencuje " . $reference->value."\n" ;
           	else{
           		$error_logs.= "prechod ".$reference->transitionId."sa nenareferencoval na  " . $reference->value."\n" ;           	
           	}
        }



        echo "ID petriho siete: ".$pn_id."\n";
        echo "xml: \n".$xml."\n\n";

        echo "Logy: \n";
        echo $logs;
        echo "\n";

        echo "Chyby: \n";
        echo $error_logs;

        $conn->close();

?>