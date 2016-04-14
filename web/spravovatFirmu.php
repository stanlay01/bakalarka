<!DOCTYPE html>
<html>
<head>
	<title>Bakalarka-prihlasenie</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" href="css/footer-distributed.css">
	<link rel="stylesheet" href="css/header-fixed.css">
		<link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'>
			<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">

			<style>
				a.button {
			    height:60px;
			    padding: 10px 15px;
			    background: #4479BA;
			    color: #FFF;
			    -webkit-border-radius: 4px;
			    -moz-border-radius: 4px;
			    border-radius: 4px;
			    border: solid 1px #20538D;
			    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
			    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
			    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
			    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
			}
			a.button:hover{
			    background: #356094;
			    border: solid 1px #2A4E77;
			    text-decoration: none;
			}
			</style>
</head>
<?php require_once "header.php" ?>


	

	<div id="left_panel">
		

		
		<h2>Moje hlavné úlohy</h2>
	
		<h2> Ďaľšie úlohy</h2>
		

		<h2>Create new tasks</h2>
		
	</div>

	<div id="right_panel">
		<?php
			echo "<br><br><a  class='button' href='sprava_roli.php?firma=". $_GET['firma'] ." '  > Správa rolí a užívateľov  </a><br><br>";
			
		?>
	</div>
		


<?php require_once "footer.php" ?>



</body>
</html>