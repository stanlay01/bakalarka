<!DOCTYPE html>
<html>
<head>
	<title>Editor rolí</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<!--<link rel="stylesheet" type="text/css" href="css/style.css">-->
	<link rel="stylesheet" type="text/css" href="css/roles_style.css">
	
	
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>-->
	<!--
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">-->
	<!--<script src="javascript/jquery-1.11.0.min.js"></script>-->

	<script src="libraries/jquery-1.11.0.min.js"></script>
	<script>var $_GET = <?php echo json_encode($_GET); ?>;</script>
	<script src="javascript/roles_script.js"></script>
	<script src="javascript/user_scripts.js"></script>
</head>
<body>






<?php 
	include "connect.php";


	$idcko_firmy = $_GET['firma'];
	/*
	//overíme či je admin
	
	$query = "	SELECT admin_permission FROM ROLES INNER JOIN
				USERS_X_ROLE ON USERS_X_ROLE.role_id = ROLES.role_id
				WHERE USERS_X_ROLE.user_id = 1 AND ROLES.firm_id = '$idcko_firmy'
			";


	$result = $conn->query($query);

	$isAdmin = mysqli_fetch_object($result)->admin_permission;


	//ak nie je admin
	if($isAdmin == 0)
		header("Location: myPage.php");
	*/

	$query = "		SELECT ROLES.role_id,role_name FROM ROLES 
				INNER JOIN ROLES_X_FIRM ON ROLES.role_id = ROLES_X_FIRM.role_id
				WHERE ROLES_X_FIRM.firm_id = '$idcko_firmy' 
			";


	$result = $conn->query($query);

	while($row = $result->fetch_assoc()) {
		 $role_array[] = $row; 
	}


	$query = "	SELECT firm_name FROM FIRMS 
				WHERE firm_id = '$idcko_firmy' 
			";

	$result =  $conn->query($query);

	$nazovFirmy = mysqli_fetch_object($result)->firm_name ;

?>


	<div id="transparent"></div>
	<div id="popup">
		<div id="popup_heading"> Nadpis</div>
		<div id="popup_wrapper">
			
			<div id="popup_text"></div><br><br>
			<button id="popup_cancel">cancel
				
			</button>
			<button id="popup_ok">ok
			</button>
		</div>
	</div>
	

	<div id="page-wrapper">
			<header></header>
			
			<div id="content">
					<div id="left_panel">
						<h3>Manažment firmy</h3>
						<ul class="letter-space">
							
							<li><a href="#">Pridať proces</a></li>
							<li><a href="#">Editovať procesy</a></li>
							<li><a href="#">Zmazať procesy</a></li>
							<li ><a href="#" class="link-selected">Manažment rolí</a></li>
							<li><a href="#">Manažment userov</a></li>
							<li><a href="#">Zrušenie firmy</a></li>
						</ul>

						
					</div>


					<div id="right_panel">
						<div class="float-right">
							
							<div class="hoverbubble-container"><a  id="info" href="#" class="hoverbubble"> <img src="images/info_icon.png" alt="import"> <span>info o aplikácii</span></a></div>
							<div class="hoverbubble-container"><a href="#" class="hoverbubble" id="role_import"> <img src="images/import_icon.png"  alt="import"><span>importovať role</span></a>	</div>


						</div>
						<div>
							<h2 style="font-size:28px;"><?php echo $nazovFirmy ?></h2>
							<div class="role_options">
								<b>Filtre všeobecne:</b> <span class="role selected"><input type="hidden" value="-1">Všetci</span> |
								<span class="role"><input type="hidden" value="-2"> Nepriradení</span><br>

								<b>Filtre podľa rolí:</b> <?php

									foreach ($role_array as $key => $value) {

										echo "<span class='role'><input type='hidden' value='".$value["role_id"]."'>".$value["role_name"]."</span>  ";

										if($key != (sizeof($role_array)-1))
											echo " | ";
									}
								?><br>
							</div>
						</div>
						<br>
			
						<table id="tableUsers">
							<thead>
								<tr>
									<th><input type="checkbox" id="c1" name="cc" /><span></span>Označiť</th>
									<th>Id</th>
									<th>Meno</th>
									<th>Priezvisko</th>
									<th>E-mail</th>
								</tr>
							</thead>
						
							<tbody id="users_data">
							</tbody>

						</table>
						<br><br>
						

					<div id="role_actions">

						<div  class="select-parent">
							<select id="action" class="dropdown">
							  	<option value="addToRole">priradiť do role</option>
		  						<option value="deleteFromRole">vymazať z role</option>
							</select><div class="overlay-arrow">&#9660;</div>
						</div>

						<div class="select-parent">
							<select id="role_select" class="dropdown">
							  <?php
								foreach ($role_array as $key => $value) {
									echo "<option value='".$value["role_id"]."'>".$value["role_name"]."</option>";
								}
							?>	
							</select><div class="overlay-arrow">&#9660;</div>
						</div>

						<button type="submit" id="button_action">Vykonaj</button>


						<img id="loadingGif" alt="loading" src="images/squares.gif" width="40">
						<span id="successAlert"><img id="doneImg" alt="hotovo" src="images/done.png" height="20">Operácie sa úspešne vykonali</span>


					</div>

					

			</div>

			<div style="clear:both"></div>
		
			
		</div>
		<footer></footer>
		</div>
		
	</body>
</html>
