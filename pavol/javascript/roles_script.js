		var SELECT_ALL =-1;
		var SELECT_WHITHOUT_ROLE = -2;

		var selected_role;
		var isSearch = false;
		var searchedText = null;
		var markedAllchecks =false;
		var firm_id = $_GET['firma']; //id_firmy (môže byť hrozba bezpečnosti /// treba prešpekulovať :D)
		var $items_per_page = 9;
		var actual_page;


		$(document).ready(function(){
			

			update_roles_in_firm($_GET['firma']);
			updateData(firm_id);

			
				 /*
			//označovanie jednotlivých užívateľov
			$("#tableUsers tbody").delegate("tr", "click", function(e) {
				$(this).find("input[type=checkbox]").prop('checked', !$(this).find("input[type=checkbox]").prop('checked' ) );
			});*/


			$("#tableUsers tbody").delegate("tr span", "click", function(e) {
				$(this).parent().find("input[type=checkbox]").prop('checked', !$(this).find("input[type=checkbox]").prop('checked' ) );
			});


			//označí všetkých užívateľov
			$("#tableUsers thead").delegate("tr span", "click", function(e) {
				markedAllchecks= !markedAllchecks;

				$("#tableUsers tbody").find("input[type=checkbox]").each(function(){
					$(this).prop('checked',markedAllchecks);
				});

			});

			$("#tableUsers").delegate(".user-info", "click",function(e){
				e.preventDefault();
				console.log($(this));
				var user_id = $(this).attr("data-id")	;
				btn_user_info(user_id);
			});

			$("#tableUsers").delegate("tr a.delete-user", "click",function(event){
				event.preventDefault(); 
				var user_id = $(this).attr("data-id")	;
				btn_delete_user_from_role(user_id,selected_role);

			});


			$("#transparent").on("click",popup_close);


			// information popup
			$("#info").on("click",function(){
				popupInfo("verzia 0.5",null,true);
			});


			// import roles with xml
			$("#role_import").on("click", btn_role_import);


			

			
			// select users by role
			$("body").delegate(".role","click", function(){

					var id_roly =  $(this).children("input")[0].value;

					btn_role_click(id_roly);

					$(".role").each(function(index){
						$(this).removeClass("selected");
					});

					$(this).addClass("selected");

			});



			$("#btn_role_administration").on("click",poput_role_administration);


			$("body").delegate("#role_administration #add_role", "click", function(e) {
					e.preventDefault();
					btn_create_new_role(firm_id);
			});

			$("body").delegate("#role_administration a.remove_role", "click", function(e) {
					e.preventDefault();
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


			   if (e.which == 13)
			   		btn_search_role($id_role,$searchedText);
			});				

	});


		function btn_user_info(user_id){

			console.log(ajax_get_user_info(user_id, firm_id));
			console.log(ajax_get_user_roles(user_id, firm_id));
			var user_data = ajax_get_user_info(user_id, firm_id);
			var user_roles = ajax_get_user_roles(user_id, firm_id);

			text = "<div id='user_details'>";
			text += "<h2>"+ user_data.first_name +" "+user_data.last_name+"</h2>";
			text += user_data.email+"<br><br><br><br>";
			text += "<p>";
			text += "<h3>Priradené role</h3>";

			
			var count = 0;
			$.each( user_roles, function( key, role ) {	
				text += "<div class='roleRow'><input type='hidden' value='"+role.role_id+"'>"+role.role_name;
				//text += "<a href='#' data-id='"+role.role_id+"' alt='vymazat užívateľovi' class='remove_role_from_user'><i  class='float-right icon icon-trash'></i></a></div><br><br>";

				text += '<div class="switch float-right ">';
				if(role.priradeny == "true")
					text += ' <input id="cmn-toggle-'+count+'" data-id="'+role.role_id+'" class="cmn-toggle cmn-toggle-round" type="checkbox" checked>';
				else
					text += ' <input id="cmn-toggle-'+count+'" data-id="'+role.role_id+'" class="cmn-toggle cmn-toggle-round" type="checkbox">';

				text += 	'<label for="cmn-toggle-'+count+'"></label>';
				text += '</div>';	
				text += '</div>';
				count++;
			});

			text += "</p>"; 

			text+="</div>";

			popupInfo(text,null, true); 


			$("#user_details input.cmn-toggle").on("click",function(){
				var id_role = $(this).attr("data-id");
				var checked = $(this).prop("checked");

				console.log(checked);
				console.log(user_id);
				console.log(id_role);

				if(checked)
				{
					btn_add_user_into_role(user_id,id_role);
				}	
				else
				{
					btn_delete_user_from_role(user_id,id_role);
				}

			});
		}


		function setSelectParameters(role,search = false, text = null)
		{
			selected_role = role;
			isSearch = search;
			searchedText = text;
		}			

		function btn_role_click(id_roly)
		{
				setSelectParameters(id_roly);

				var total = get_count_of_records(id_roly,firm_id);

				get_users_from_role_in_firm(id_roly,firm_id);
				createPagination($items_per_page ,total);
		}

		function btn_search_role(id_role ,text){

			setSelectParameters(id_roly,true, text);

			search_users_from_role_in_firm(text,id_role,firm_id);
			
			var total = get_count_of_records(id_roly,firm_id,text);

		}


		function get_users_from_role_in_firm_pager(page){
				actual_page = page;

				if(isSearch)
				{
					search_users_from_role_in_firm(selected_role,firm_id, $searchedText,page)
				}
				else
				{
					get_users_from_role_in_firm(selected_role,firm_id,page);
				}
		}

		function btn_next_page(){
			var page = actual_page + 1;
			get_users_from_role_in_firm_pager(page);
		}

		function btn_previous_page(){
			var page = actual_page - 1 ;
			get_users_from_role_in_firm_pager(page);
		}

		function btn_first_page(){
			get_users_from_role_in_firm_pager(1);
		}

		function btn_last_page(){
			var pageCount = total_rows / items_per_page;
			pageCount = Math.ceil(pageCount);
			
			get_users_from_role_in_firm_pager(pageCount);
		}


		function get_users_from_role_in_firm(role_id,firm_id,page = 1)
			{
				var users = ajax_sort_by_role(role_id,firm_id,page);
				$("#users_data").hide(100);
				$("#users_data").html(users);
				$("#users_data").fadeIn(200);

			}




		function search_users_from_role_in_firm(searchedText, role_id,firm_id,page=1)
			{
				var users = ajax_sort_by_role(searchedText, role_id,firm_id,page);
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

		
		function btn_delete_user_from_role(user_id,role)
		{
			var ids_of_users =  [ parseInt(user_id) ];


			if(ajax_delete_users_from_role(firm_id,ids_of_users,role)){
				updateData(firm_id);
			}
		}

		function btn_add_user_into_role(user_id, role)
		{
			var ids_of_users =  [ parseInt(user_id) ];

			if(ajax_add_users_to_role(firm_id,ids_of_users,role)){
				updateData(firm_id);
			}
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
					 if(ajax_add_users_to_role(firm_id,ids_of_users,id_of_role)){
					 		updateData(firm_id);
				       		$("#loadingGif").hide();
				       		$("#successAlert").show(200).delay(2000).hide(1000);
					 }
					
				}
				else if($action = "deleteFromRole")
				{ //odobrať rolu užívateľom
					 if(ajax_delete_users_from_role(firm_id,ids_of_users,id_of_role)){
					 		updateData(firm_id);
				       		$("#loadingGif").hide();
				       		$("#successAlert").show(200).delay(2000).hide(1000);
					 }
				}
				else{
					//TODO (pre prípadné iné akcie)
				}
			}



			function hlp_get_all_selected_users_ids(){
				var ids_of_users = new Array();
				//get all users id
				$("input[name='check']:checked").each( function () {
					var id = $(this).parent().parent().find('td.user-id').text();
					ids_of_users.push(id); // pridá označených ľudí do poľa
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
				btn_role_click($id_role);
			}



			function createPagination(items_per_page, total_rows)
			{
				var pageCount = total_rows / items_per_page;
				pageCount = Math.ceil(pageCount);
				
				actual_page = 1;

				var paginator = $("#pagination");

				if(pageCount>1)
				{
					var text = '<a href="#" data-value="previous"><<</a> ';

					for($i=1;$i< (pageCount+1);$i++){
						if($i==1)
							text+= '<a href="#" class="pagination-page selected-page" data-value="'+$i+'"> '
						else
							text += '<a href="#" class="pagination-page " data-value="'+$i+'"> '
						text+= $i;
						text+= '</a>';
					}

					text += ' <a href="#" data-value="next">>></a>';

					
				}else
					text = '';


				paginator.html(text);

				$("a.pagination-page").on("click",function(event){
					event.preventDefault(); 	
					get_users_from_role_in_firm_pager( $(this).attr('data-value') );
						
					$("#pagination a.pagination-page").each(function(){
						$(this).removeClass("selected-page");
					});

					$(this).addClass("selected-page");

				})
				
			}




			function get_count_of_records(id_roly,id_firmy, hladany_text=null){
				var total_count;
				if(hladany_text != null)
					total_count = ajax_get_total_counts_of_records(id_roly,id_firmy, hladany_text);
				else
					total_count = ajax_get_total_counts_of_records(id_roly,id_firmy);

				total_count = JSON.parse(total_count);
				return total_count;
			}


			//----------------------------------AJAX VOLANIA----------------------------------

			
			//
			//show users by role
			//
			function ajax_sort_by_role(id_roly,firm_id,page=1){

				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_get_users_in_firm.php', 
				      async: false,                   
				      data: {id_roly:id_roly , firm_id: firm_id, page:page , items_per_page: $items_per_page},                       

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


			function ajax_show_data_by_searched_text($searchedText,role_id,firm_id,page=1){
				$.ajax({         
					      type: 'POST',                             
					      url: 'ajax/ajax_get_users_in_firm.php', 
					      async: false,                    
					      data: {id_roly:$role_id , searchedText: $searchedText, firm_id: firm_id, page:page},                       

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


			function ajax_get_total_counts_of_records(id_roly,id_firmy, hladany_text=null)
			{

				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_get_the_total_records.php', 
				      async: false,                   
				      data: 'json',
				      data: {id_roly:id_roly, id_firm:id_firmy, searchedText : hladany_text},                       

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


			function ajax_get_user_info(id_user,id_firm)
			{
				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_get_user_info.php', 
				      async: false,                   
				      dataType: 'json',
				      data:  { id_firm:id_firm, id_user : id_user},                       

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


			function ajax_get_user_roles(id_user,id_firm)
			{
				$.ajax({         
				      type: 'POST',                             
				      url: 'ajax/ajax_get_user_roles.php', 
				      async: false,                   
				      dataType: 'json',
				      data:  { id_firm:id_firm, id_user : id_user},                       

				      success: function(data)        
				      {
				      		retour = data;
				      } ,
		       		  error:function(exception){alert('Exeption:'+exception);
		       		  		console.log(exception["responseText"]);
		       		  		retour = null;
		       		  }
				 });

				return retour;
			}


