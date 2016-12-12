/**
 * escapeGame IOT demo
 * @author Charles GALLARD, David PERRAI 
 */

var socket = null;


$(document).ready(function() {


  socket = io.connect('https://escape-inno.herokuapp.com');
  socket.on('statesChanges', function (data)
  {
		console.log(data);
    var objStates = JSON.parse(data);
		console.log(objStates);

    for(var key in objStates) { 
		var obj = objStates[key];
		if(obj.state){
			$('#state'+obj.id).css("font-weight","normal");
			$('#state'+obj.id).html('connected');      
			$('#state'+obj.id).parent().removeClass('danger');

			$('#badge-'+obj.id).html('OK');
			
		}else{
			$('#state'+obj.id).css("font-weight","bold");
			$('#state'+obj.id).html('disconnected');
			$('#state'+obj.id).parent().addClass('danger');
		
			$('#badge-'+obj.id).html('X');
			}
		};	
	});
});


function stopAnimation(){
  	$.ajax({
				url: "https://escape-inno.herokuapp.com/api/wsescapestopanimation",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("Animation launched");      
         }
			});
        
}

function startAnimation(){
  	$.ajax({
				url: "https://escape-inno.herokuapp.com/api/wsescapestartanimation",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("Animation launched");      
         }
			});        
}

function welcomeAnimation(){
  	$.ajax({
				url: "https://escape-inno.herokuapp.com/api/wescapewelcomeanimation",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("Animation launched");      
         }
			});        
}

function debug(id){
    $.ajax({
				url: "https://escape-inno.herokuapp.com/api/wsescape/"+id,
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("debug of the pin id"+id);      
         }
			});     
}

