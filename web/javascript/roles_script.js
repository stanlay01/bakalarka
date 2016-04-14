		$(document).ready(function(){

			var markedAllchecks =false;
			 

			 //označovanie jednotlivých užívateľov
			$("#tableUsers tbody").delegate("tr", "click", function(e) {
			  //rest of the code here
			  $(this).find("input[type=checkbox]").prop('checked', !$(this).find("input[type=checkbox]").prop('checked' ) );
			  console.log($(this));
			});


			//oznací všetkých užívateľov
			$("#tableUsers thead").delegate("tr span", "click", function(e) {
			  markedAllchecks= !markedAllchecks;

			  $("#tableUsers tbody").find("input[type=checkbox]").each(function(){
			  	$(this).prop('checked',markedAllchecks);
			  });

			});


			//
			// select users by role
			//
			$( ".role" ).on("click", function(){
					var id_roly =  $(this).children("input")[0].value;

					ajax_sort_by_role(id_roly);

					$(".role").each(function(index){
						$(this).removeClass("selected");
					});

					$(this).addClass("selected");

			});

			

			//
			// import roles with xml
			//
			$("#role_import").on("click", function(){
				text = '<br><input type="file" id="fileinput" />';

				var roleFile = $("#popup_text").find("#fileinput");;//.files[0];

				popup("Vyber súbor",text,"nahraj", function(){
					
					var roleFile = $("#popup_text").find("#fileinput");
					console.log(roleFile);

					load_roles_from_xml(roleFile);
				});

			});

			

			//
			//@param object 
			//
			//
			function load_roles_from_xml(object) {

			    var file = object.prop('files')[0];
			    var roles = {};

			    if (!file) {
			      return;
			    }
			    
			    var file_reader = new FileReader();

			    file_reader.onload = function(e) {
			      	
			      var contents = file_reader.result;

			      var roles = hlp_parse_load_xml(contents);


				    if(roles.length == 0) {
				        	popupInfo('V súbore sa nenachádzajú žiadne role.');
				        	return;
				    }

					roles.each(function(){
					        //var id = $(this).find('id').text();
					        var name = $(this).find('name').text();
					        console.log(name);
					        ajax_add_new_role(name, $_GET['firma']);
					});

					var text="Role sa úspešne pridali. Pre načítanie nových rolí je potrebné refreshnúť stránku. Prajete si refreshnúť stránku?";
				      
					popupConfirm("",text,function(){
					   	reloadPage();
					});

					return;

			    };
			    
			    file_reader.readAsText(file);

			    
			}

			//
			// find roles in xml
			//						
			function hlp_parse_load_xml(xml) {

			    var xmlDoc = $.parseXML(xml);
			    xml_file = $(xmlDoc);   
			    var new_roles = xml_file.find('role');

			    return new_roles; 
			}
			
			
			//
			//deploy roles to database 
			//TODO ... 
			//
			function ajax_add_new_role(role_name, firm_id){
				var ourObj = {};
				ourObj.firm_id = firm_id;
				ourObj.role_name = role_name;


				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/deployRole.php',  
    				  data: { "dataPackage" : JSON.stringify(ourObj) },                  	                   

				      success: function(data)        
				      {
				        	//$("#loadingGif").hide();
				       		//$("#successAlert").show(200).delay(2000).hide(1000);
				      } ,
		       		  error:function(exception){
		       		  	$("#loadingGif").hide();
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  }
				    });

			}

			
			//
			//show users by role
			//
			function ajax_sort_by_role(id_roly){
				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/zobraz_data.php?firma='+$_GET['firma'],                    
				      data: "id_roly="+id_roly,                       

				      success: function(data)        
				      {
				      		$("#users_data").hide(0);
				       		$("#users_data").html(data);
				       		$("#users_data").fadeIn(200);
				      } ,
		       		  error:function(exception){alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  }
				 });
			}

			//
			// update data in table
			//
			function updateData(){
				$id_role = $(".role_options .selected > input").val();
				ajax_sort_by_role($id_role);
			}

			//
			// information popup
			//
			$("#info").on("click",function(){
				popupInfo("verzia 0.5");
			});


			function hlp_get_all_selected_users_ids(){
				var ids_of_users = new Array();
				//get all users id
				$("input[name='check']:checked").each( function () {
					ids_of_users.push($(this).parent().next().text()); // pridá označených ľudí do poľa
				});

				return ids_of_users;
			}



			//
			//
			//action button click
			// [input name=check -> selected users 
			//
			//
			$("#button_action").on("click",function(){
				var ourObj = {};

				var ids_of_users = new Array(); 

				ids_of_users = hlp_get_all_selected_users_ids();

				

				//select roly
				var id_of_role = $("#role_actions").find('#role_select').val();
				//select action
				$action = $("#role_actions").find('#action').val();

				ourObj.id_role = id_of_role;
				ourObj.user_ids = ids_of_users;
				ourObj.firm_id = $_GET['firma'];

				$("#loadingGif").show();

				//priradiť rolu užívateľom
				if($action ==  "addToRole")
				{
					 $.ajax({         
				      type: 'POST',                             
				      url: 'ajax/addUsersToRole.php?firma='+$_GET['firma'],  
    				  data: { "dataPackage" : JSON.stringify(ourObj) },                  	                   

				      success: function(data)        
				      {
				       		updateData();
				       		$("#loadingGif").hide();
				       		$("#successAlert").show(200).delay(2000).hide(1000);
				      } ,
		       		  error:function(exception){
		       		  	$("#loadingGif").hide();
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  }
				    });
					
				}
				else if($action = "deleteFromRole")
				{ //odobrať rolu užívateľom
					  $.ajax({         
				      type: 'POST',                             
				      url: 'ajax/removeUsersFromRole.php?firma='+$_GET['firma'],  
    				  data: { "dataPackage" : JSON.stringify(ourObj) },                  	                   

				      success: function(data)        
				      {
				       		updateData();
				       		$("#loadingGif").hide();
				       		$("#successAlert").show(200).delay(2000).hide(1000);
				      } ,
		       		  error:function(exception){
		       		  	$("#loadingGif").hide();
		       		  	alert('Exeption:'+exception);
		       		  	console.log(exception);
		       		  }
				    });
				}
				else{
					//TODO
				}

			});




			//
			//searching people 
			//
			$(document).on('keyup', '#search_column', function(e) {
			   $id_role = $(".role_options .selected > input").val();
			   $searchedText = $(this).val();

			   if (e.which == 13){
		        	$.ajax({         
					      type: 'POST',                             
					      url: 'ajax/zobraz_data.php?firma='+$_GET['firma'],                    
					      data: {id_roly:$id_role , searchedText: $searchedText },                       

					      success: function(data)        
					      {

					       		$("#tableUsers").html(data);
					      } ,
			       		  error:function(exception){alert('Exeption:'+exception);
			       		  	console.log(exception);
			       		  }
					 });

		        }
		        
			});

		    
		   
		
    		
			updateData();
			

	});
