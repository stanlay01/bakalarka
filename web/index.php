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
 <?php require 'header.php' ;?>
	
	<?php
		session_start();
		include "connect.php";

		
		if(isset($_POST['mail']) && isset($_POST['heslo'])){


			$mail = test_input($_POST['mail']);
					//mysql_real_escape_string(test_input($_POST['mail'])); 
			$heslo= test_input($_POST['heslo']);
					//md5(mysql_real_escape_string($_POST['heslo']));
					//mysql_real_escape_string(test_input($_POST['heslo']));

			$query = "SELECT user_id FROM USERS WHERE email='$mail' AND  heslo='$heslo'";



			$res = $conn->query($query);



		   if ($res->num_rows == 1) 
		    {
		    	$value = mysqli_fetch_object($res);
		    	$_SESSION['user_id'] = $value->user_id;

		        header("Location: myPage.php");
		    }
		    else 
		    {
		       
		        // TODO - replace message with redirection to login page
		          //header("Location: 404.php");
		    }
		}

	    function test_input($data) {
		  $data = trim($data);
		  $data = stripslashes($data);
		  $data = htmlspecialchars($data);
		  return $data;
		}
	?>

	
		<form name="formular" id="login_form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
			<ul>
			    <li>
			    	<label for="mail">e-mail</label>
					<input name="mail"  type="text" value="" placeholder="meno@web.sk">
			    </li>
			    <li>
			    	<label for="heslo">heslo</label>
			    	<input name="heslo" id="heslo" type="password">
			    </li>
			    <li>
			    	<button type="submit" class="submit" value="Odoslať"  >-- Prihlásiť sa --</button>
					<div>
						<a href="#" id='registracia_button'>registrovat sa</a>
					</div>
			    </li>
			</ul>
		</form>

	



 <?php include 'footer.php' ?>	