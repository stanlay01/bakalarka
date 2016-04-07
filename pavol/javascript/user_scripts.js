


			function popupInfo(text,functionOK=null,closeAfter=true){
				popupReset();

				$("#popup").fadeIn(200);
				$("#transparent").fadeIn(200);
				$("#content").addClass("blur");

				$("#popup_text").html(text);
				$("#popup_ok").html("ok");

				$("#popup_cancel").css("display","none");
				$("#popup_heading").css("display","none");

				$("#popup_ok").on("click", function(){
					if(closeAfter){
						popup_close();
						$("#transparent").css("display","none");
					}
					if(functionOK != null)
						functionOK();
				});

			}


			//vyskakovanie okienko na potvrdenie
			function popupConfirm(heading, text , functionOK=null ,functionCancel =null,closeAfter=true){
				popupReset();	

				$("#popup").fadeIn(200);
				$("#transparent").fadeIn(200);
				$("#content").addClass("blur");

				$("#popup_heading").html(heading);
				$("#popup_text").html(text);

				$("#popup_ok").html("áno");
				$("#popup_cancel").html("nie");
				$("#popup_heading").css("display","none");

				$("#popup_ok").on("click", function(){
					if(closeAfter){
						popup_close();
					}
					if(functionOK != null)
						functionOK();
				});

				$("#popup_cancel").on("click", function(){
					if(closeAfter){
						popup_close();
					}
					if(functionCancel!= null)
						functionCancel();
				});
			}






			function popup(heading, text , button_name , functionOK=null, functionCancel=null,closeAfter=true){
				popupReset();

				$("#popup").fadeIn(200);
				$("#transparent").fadeIn(200);
				$("#content").addClass("blur");

				$("#popup_heading").html(heading);
				$("#popup_text").html(text);
				$("#popup_ok").html(button_name);
				$("#popup_cancel").html("cancel");
				



				$("#popup_ok").on("click", function(){
					if(closeAfter){
						popup_close();
					}
					if(functionOK != null)
						functionOK();
				});

				$("#popup_cancel").on("click", function(){
					if(closeAfter){
						popup_close();
					}
					if(functionCancel != null)
						functionCancel();
				});
			}




			function popupReset(){
				popupErrorClose();
				$("#popup_ok").css("display","inline-block");
				$("#popup_cancel").css("display","inline-block");
				$("#popup_text").css("display","inline-block");
			    $("#popup_heading").css("display","inline-block");

			    $( "#popup_ok").unbind( "click" );
			}

			function popup_close(){
				$("#content").removeClass("blur");
				$("#popup").css("display","none");
				$("#transparent").css("display","none");
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


			function popupErrorClose()
			{
				$("#popup_error").hide();
			}

			function popupErrorShow(text)
			{
				$("#popup_error").show(500);
				$("#popup_error").find("span").text(text);
			}

