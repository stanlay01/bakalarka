var firma = $_GET['firma'];;

function getRolesFromFirm(){
	var rolesArray = {};
	$.ajax({         
		    type: 'POST',                             
			url: '/Pavol/ajax/ajax_get_roles_in_firm.php',  
	    	data:  "firm_id="+firma,                  	                   

			success: function(data)        
				{	
					rolesArray = data;
					console.log(data);
					       		
				} ,
			error:function(exception){
			       		  	
			     console.log(exception);
			}
	});

	return rolesArray;
}



 //funkcia na uloženie xml-ka do databázy
function  ajax_save_roleXml_to_database(xml){

	$.ajax({         
		type: 'POST',                             
		url: '/Pavol/ajax/save_roles.php',
		data: "xml_file="+xml,                       

		success: function(data)        
		{
			console.log(data); 
		} ,
		error:function(exception){
		    console.log(exception);
		       		  }
		});

}

