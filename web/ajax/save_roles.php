<?php

	include "../connect.php";


	function insertRoleIntoDatabase($name,$conn){

		$stmt = $conn->prepare('INSERT IGNORE INTO `ROLES` (role_name) VALUES (?)');

		if (!$stmt) {
	        throw new Exception($conn->error, $conn->errno);
	    }


		$stmt->bind_param('i', $name);
		

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
		echo $transitionId;
		echo " ";
		echo $value;

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
	function connectRoleWithTransition($pn_id,$role, $xml_id)
	{

		$query = ("SELECT id FROM transition WHERE id_pn='$pn_id' AND id_in_xml='$xml_id'");
		$result = mysqli_query($conn, $query);
		$row = mysqli_fetch_assoc($result);


		$transitionId = $row['id'];
		

		$stmt = $conn->prepare('INSERT INTO `TRANSITIONS_X_ROLE` (transition_id,role_id) VALUES (?,(SELECT role_id FROM ROLES WHERE role_name=?) )');

		$stmt->bind_param('is', $transitionId ,$role_name );

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


		$pn_id=21;



		$roles_obj = simplexml_load_string('<?xml version="1.0" encoding="UTF-8"?>
									<document>
									  <roles>
									    <role>
									      <id>0</id>
									      <name>kuchár</name>
      									   <transitionId>12</transitionId>
      									   <transitionId>13</transitionId>
									    </role>

									    <role>
									      <id>1</id>
									      <name>čašník</name>
									    </role>

									  </roles>
									  <references>
									      <reference>
									          <transitionId>25</transitionId>
									          <value>12</value>
									      </reference>
									      <reference>
									          <transitionId>12</transitionId>
									          <value>false</value>
									      </reference>
									      <reference>
									          <transitionId>19</transitionId>
									          <value>false</value>
									      </reference>
									  </references>
									</document>');




		foreach($roles_obj->roles->role as $role){
           	
           	$result = insertRoleIntoDatabase($role->name,$conn);

           	foreach ($role->transitionId as $transitionID) {
           		
           		//connectRoleWithTransition($pn_id,$role->name, $transitionID);

           	}


           	if($result == true){
           	}           		//echo "vloženie role do databázy bolo úspešné";
           	else{
           		//echo "nepodarilo sa vložiť do databázy role";
           	}
        }



        foreach($roles_obj->references->reference as $reference){
            $result = InsertReferencesIntoDatabase($reference->transitionId, $reference->value, $pn_id,$conn);
            if($result == true)
           		echo " vloženie referencie do databázy bolo úspešné\n";
           	else{
           		echo " nepodarilo sa vložiť do databázy referencie\n";
           	}
        }



?>