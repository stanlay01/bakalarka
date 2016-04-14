		$(document).ready(function(){

			
			var firm_id = $_GET['firma']; //id_firmy (môže byť hrozba bezpečnosti /// treba prešpekulovať :D)



			update_roles_in_firm($_GET['firma']);
			updateData(firm_id);


			var markedAllchecks =false; //pomocná premenná na určenie či sú políčka označené
				 
			//označovanie jednotlivých užívateľov
			$("#tableUsers tbody").delegate("tr", "click", function(e) {
				$(this).find("input[type=checkbox]").prop('checked', !$(this).find("input[type=checkbox]").prop('checked' ) );
			});

			//označí všetkých užívateľov
			$("#tableUsers thead").delegate("tr span", "click", function(e) {
				markedAllchecks= !markedAllchecks;

				$("#tableUsers tbody").find("input[type=checkbox]").each(function(){
					$(this).prop('checked',markedAllchecks);
				});

			});


			//
			// information popup
			//
			$("#info").on("click",function(){
				popupInfo("verzia 0.5",null,true);
			});

			//
			// import roles with xml
			//
			$("#role_import").on("click", function(){
				btn_role_import();
			});

			

			//
			// select users by role
			//
			$( ".role" ).on("click", function(){
					var id_roly =  $(this).children("input")[0].value;

					get_users_from_role_in_firm(id_roly,firm_id);

					$(".role").each(function(index){
						$(this).removeClass("selected");
					});

					$(this).addClass("selected");

			});



			$("#btn_role_administration").on("click", function()
			{
				poput_role_administration();
			});

			$("body").delegate("#role_administration #add_role", "click", function(e) {
				btn_create_new_role(firm_id);
			});

			$("body").delegate("#role_administration a.remove_role", "click", function(e) {
					btn_delete_role_in_firm($(this),firm_id);
									
			})


			//action button click
			$("#button_action").on("click",function(){
				btn_role_actions(firm_id);
			});

			//
			//searching people 
			//
			$(document).on('keyup', '#search_column', function(e) {
			   $id_role = $(".role_options .selected > input").val();
			   $searchedText = $(this).val();

			   if (e.which == 13){
		        	search_users_from_role_in_firm($searchedText,$id_role,firm_id);
		        }
		        
			});				

	});


			function get_users_from_role_in_firm(role_id,firm_id)
			{
				var users = ajax_sort_by_role(role_id,firm_id);
				$("#users_data").hide(100);
				$("#users_data").html(users);
				$("#users_data").fadeIn(200);

			}

			function search_users_from_role_in_firm(searchedText, role_id,firm_id)
			{
				var users = ajax_sort_by_role(searchedText, role_id,firm_id);
				$("#users_data").hide(100);
				$("#users_data").html(users);
				$("#users_data").fadeIn(200);

			}



			function poput_role_administration(){

				var roles = get_roles_array();
				var text = "<div id='role_administration'>";

				$.each( roles, function( key, role ) {	
					text += "<div class='roleRow'><input type='hidden' value='"+role.role_id+"'>"+role.role_name+"  ";
					text += "<a href='#' alt='vymazat rolu' id='"+role.role_id+"' class='remove_role'><i  class='float-right icon icon-trash'></i></a></div><br><br>";	
				});
				text+= "<a href='#' alt='pridat rolu' id='add_role'>pridať novú rolu</a><br><br>";
				text+="</div>";
				
				popupInfo(text, null,true);
			}


			function btn_create_new_role(firm_id)
			{
				var text1 = "<label for='newRoleInput'>Zadaj názov role<br><br><input type='text' id='newRoleInput'>"
					
					popup("Pridaj do firmy novú rolu",text1,"pridaj", function(){

						var role = $("#popup").find("#newRoleInput").val();

						ajax_create_role_in_firm(role, firm_id);

						update_roles_in_firm(firm_id);
						
						poput_role_administration();

				},function(){
						poput_role_administration()
				},false)	;
			}

			function btn_delete_role_in_firm(toto,firm_id)
			{
				console.log(toto);
				var id_role = toto.attr("id");
				var okno_role = toto.parent();

				console.log(toto);
					

				popupConfirm("vymazanie role","Naozaj chcete túto rolu z firmy odstrániť?", function(){
					poput_role_administration();
						

					if( ajax_remove_role_from_firm(firm_id, id_role) == "true" ){
						$(".roleRow:has(a#"+id_role+")").slideUp(200);
						update_roles_in_firm(firm_id);
					}
					else{
						popupErrorShow("Rola nemôže byť vymazaná");
					}	

						
				}, function(){ poput_role_administration() },false);

			}

			


			function btn_role_import(firm_id)
			{
				text = '<br><input type="file" id="fileinput" />';

				var roleFile = $("#popup_text").find("#fileinput");;//.files[0];

				popup("Vyber súbor",text,"nahraj", function(){
					
					var roleFile = $("#popup_text").find("#fileinput");

					if( add_roles_from_file(roleFile,firm_id))
						popup_close();
					
				},popup_close,true);
			}

			
			

			function btn_role_actions(firm_id)
			{
				var ids_of_users = new Array(); 
				ids_of_users = hlp_get_all_selected_users_ids();
				var id_of_role = $("#role_actions").find('#role_select').val(); //select roly
				var firm_id = $_GET['firma'];

				$("#loadingGif").show();

				//select action
				$action = $("#role_actions").find('#action').val();

				//priradiť rolu užívateľom
				if($action ==  "addToRole")
				{
					 ajax_add_users_to_role(firm_id,ids_of_users,id_of_role);
					
				}
				else if($action = "deleteFromRole")
				{ //odobrať rolu užívateľom
					 ajax_delete_users_from_role(firm_id,ids_of_users,id_of_role);
				}
				else{
					//TODO (pre prípadné iné akcie)
				}
			}



			function hlp_get_all_selected_users_ids(){
				var ids_of_users = new Array();
				//get all users id
				$("input[name='check']:checked").each( function () {
					ids_of_users.push($(this).parent().next().text()); // pridá označených ľudí do poľa
				});

				return ids_of_users;
			}

			//@param object 
			//
			//
			function add_roles_from_file(object,firm_id) {

			    var file = object.prop('files')[0];
			    var roles = {};


			    
			    if (!file) {
			    	popupErrorShow('nenahral sa súbor');
			      	return false;
			    }
			    console.log("fasd");

			    var filename = file.name;
			    var extension =  filename.substr(filename.lastIndexOf('.')+1)

				if( (extension != 'xml') && (extension != 'pflow') ) {
					popupErrorShow("Nenahrali ste správny typ súboru");
					return false;
				}
			    
			    var file_reader = new FileReader();
			    file_reader.onload = function(e) {
			      	
			      var contents = file_reader.result;
			       var xmlDoc = $.parseXML(contents);
			      var roles =  $(xmlDoc).find('role');;
			      //ajax_save_roleXml_to_database(contents);
			      
				    if(roles.length == 0) {
				        	popupErrorShow('V súbore sa nenachádzajú žiadne role.');
				        	return false;
				    }

					roles.each(function(){
					        //var id = $(this).find('id').text();
					        var name = $(this).find('name').text();
					        ajax_create_role_in_firm(name, firm_id);
					});

					return true;

			    };
			    
			    file_reader.readAsText(file);	    
			}


			function get_roles_array(){
				var roles = JSON.parse( $("#saved_roles_hidden").val());
				return  roles;
			}

			function save_roles_in_html(roles){
				var input = $("#saved_roles_hidden");
				roles = JSON.stringify(roles);
				input.val(roles);
			}
		

			function update_roles_in_firm(firm_id){

				var roles = ajax_get_roles_in_firm(firm_id);

				save_roles_in_html(roles);

				var text = '<b>Filtre všeobecne:</b> <span class="role selected"><input type="hidden" value="-1">Všetci</span> |';
				text += '<span class="role"><input type="hidden" value="-2"> Nepriradení</span><br><b>Filtre podľa rolí:</b> ';

				var text2="";
				$.each( roles, function( key, role ) {	
					    text += "<span class='role'><input type='hidden' value='"+ role["role_id"]+"'>"+role["role_name"]+"</span>  ";
					    text += " | ";
					    text2 += "<option value='"+ role.role_id+"'>"+role.role_name+"</option>";
					
					
				});
 
				$(".role_options").html(text);

				$("#role_select").html(text2);


			}


			//
			// update data in table
			//
			function updateData(firm_id){
				$id_role = $(".role_options .selected > input").val();
				get_users_from_role_in_firm($id_role,firm_id);
			}


			//----------------------------------AJAX VOLANIA----------------------------------
			//deploy roles to database 
			//TODO ... 
			//





			
			//
			//show users by role
			//
			function ajax_sort_by_role(id_roly,firm_id){

				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_get_users_in_firm.php?firma='+$_GET['firma'], 
				      async: false,                   
				      data: "id_roly="+id_roly,                       

				      success: function(data)        
				      {
				      		retour = data;
				      } ,
		       		  error:function(exception){alert('Exeption:'+exception);
		       		  		console.log(exception);
		       		  		retour = null;
		       		  }
				 });

				return retour;
			}


			function ajax_show_data_by_searched_text($searchedText,role_id,firm_id){
				$.ajax({         
					      type: 'POST',                             
					      url: 'ajax/ajax_get_users_in_firm.php?firma='+$_GET['firma'], 
					      async: false,                    
					      data: {id_roly:$id_role , searchedText: $searchedText },                       

					      success: function(data)        
					      {
					      		retour=data;
					      } ,
			       		  error:function(exception){alert('Exeption:'+exception);
			       		  		console.log(exception);
			       		  		retour=null;
			       		  }
					 });

				return retour;
			}


			function  ajax_save_roleXml_to_database(xml){

				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_save_roles_for_petri_net.php',
				      async: false,    
				      data: "xml_file="+xml,                       

				      success: function(data)        
				      {
				      		retour = true;
				      		console.log(data); 
				      } ,
		       		  error:function(exception){
		       		  	retour = false;
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  }
				 });

				return true;

			}


			function ajax_delete_users_from_role(firm_id, user_ids, role_id)
			{	
				var ourObj ={};
				ourObj.id_role = role_id;
				ourObj.user_ids = user_ids;
				ourObj.firm_id = firm_id;

				 $.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_remove_users_from_role_in_firm.php?firma='+$_GET['firma'], 
				      async: false, 
    				  data: { "dataPackage" : JSON.stringify(ourObj) },                  	                   

				      success: function(data)        
				      {
				      		retour =true;
				       		updateData(firm_id);
				       		$("#loadingGif").hide();
				       		$("#successAlert").show(200).delay(2000).hide(1000);
				      } ,
		       		  error:function(exception){
		       		  	retour = false;
		       		  	$("#loadingGif").hide();
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  }
				    });
				 return retour;
			}


			function ajax_add_users_to_role(firm_id,user_ids,role_id)
			{
				var ourObj ={};
				ourObj.id_role = role_id;
				ourObj.user_ids = user_ids;
				ourObj.firm_id = firm_id;
				
				 $.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_add_users_to_role_in_firm.php?firma='+$_GET['firma'],  
				      async: false,
    				  data: { "dataPackage" : JSON.stringify(ourObj) },                  	                   

				      success: function(data)        
				      {
				      		retour = true;
				       		updateData(firm_id);
				       		$("#loadingGif").hide();
				       		$("#successAlert").show(200).delay(2000).hide(1000);
				      } ,
		       		  error:function(exception){
		       		  	$("#loadingGif").hide();
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  	 retour = false;
		       		  }
				    });
				return retour;
			}

			function ajax_remove_role_from_firm(firm_id,role_id)
			{
				 $.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_remove_role_from_firm.php', 
				      async: false,
    				  data: { firm_id: firm_id , role_id: role_id},                  	                   

				      success: function(data)        
				      {
				      		 retour = data;

				      } ,
		       		  error:function(exception){
		       		  	
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  	retour= false;
		       		  }
				    });
				 console.log(retour);
				 return retour;

			}

			function ajax_create_role_in_firm(role, firm_id){
				 $.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_create_role_in_firm.php', 
				      async: false, 
    				  data: { role_name: role, firm_id:firm_id},                  	                   

				      success: function(data)        
				      {
							retour = true;

				      } ,
		       		  error:function(exception){
		       		  	
		       		  	alert('Exeption:'+exception);
		       		  	retour = false;
		       		  	
		       		  }
				   });

				 return retour;
			}



			function ajax_get_roles_in_firm(firm_id)
			{
				 $.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_get_roles_in_firm.php',
				      async: false,
				      dataType: 'json',
    				  data: { firm_id:firm_id},                  	                   

				      success: function(data)        
				      {
							//console.log(data);
							roles = data;

				      } ,
		       		  error:function(exception){
		       		  	
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  	roles =null;
		       		  	
		       		  }
				    });

				 return roles;
			}


