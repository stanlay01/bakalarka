			function popupInfo(text){
				popup_close();

				$("#popup").fadeIn(200);
				$("#transparent").fadeIn(200);

				$("#popup_text").html(text);
				$("#popup_ok").html("ok");

				$("#popup_cancel").css("display","none");
				$("#popup_heading").css("display","none");

				$("#popup_ok").on("click", function(){
					popup_close();
				});

			}

			//vyskakovanie okienko na potvrdenie
			function popupConfirm(heading, text ,functionOk){
				popup_close();	

				$("#popup").fadeIn(200);
				$("#transparent").fadeIn(200);

				$("#popup_heading").html(heading);
				$("#popup_text").html(text);

				$("#popup_ok").html("áno");
				$("#popup_cancel").html("nie");
				$("#popup_heading").css("display","none");

				$("#popup_ok").on("click", function(){
					popup_close();
					functionOk();	
				});

				$("#popup_cancel").on("click", function(){
					popup_close();
				});
			}


			function popup(heading, text , button_name , button_function){
				popup_close();

				$("#popup").fadeIn(200);
				$("#transparent").fadeIn(200);

				$("#popup_heading").html(heading);
				$("#popup_text").html(text);
				$("#popup_ok").html(button_name);
				$("#popup_cancel").html("cancel");
				



				$("#popup_ok").on("click", function(){
					popup_close();
					button_function();
				});

				$("#popup_cancel").on("click", function(){
					popup_close();
				});
			}

			function popup_close(){

				$("#popup").css("display","none");
				$("#transparent").css("display","none");

				$("#popup_ok").css("display","block");
				$("#popup_cancel").css("display","block");
				$("#popup_text").css("display","block");
			    $("#popup_heading").css("display","block");

			    $( "#popup_ok").unbind( "click" );
			}

			var reloadPage = function (){
				
				 location.reload();

			}

			function stopPropagation(delay){
				setTimeout(
				  function() 
				  {
				    //do something special
				  }, delay);
			}

