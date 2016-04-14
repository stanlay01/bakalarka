<!DOCTYPE html>
<html>
<head>
	<title>Bakalarka-prihlasenie</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" href="css/footer-distributed.css">
	<link rel="stylesheet" href="css/header-fixed.css">
		<link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'>
			<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
</head>

<?php require_once "header.php" ?>

	<h2>Zoznam firiem</h2>

	<?php 
		session_start();

		include "connect.php";

	 	$user_id = $_SESSION['user_id'];

		$query = "SELECT FIRMS.firm_name,FIRMS.firm_id FROM FIRMS INNER JOIN USERS_X_FIRM
				ON USERS_X_FIRM.firm_id = FIRMS.firm_id
	    		WHERE USERS_X_FIRM.user_id = $user_id ";

		$result = $conn->query($query);

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	echo "<div class='riadok'>".$row["firm_name"]."<a href='spravovatFirmu.php?firma=".$row["firm_id"] ." '  > <button> vstúp </button></a></div>";
		    }
		} else {
		    echo "0 results";
		}
	?>


 <?php require_once "footer.php" ?>