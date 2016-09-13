/**
 * escapeGame IOT demo
 * @author Charles GALLARD, David PERRAI 
 */

var socket = null;


$(document).ready(function() {


  socket = io.connect('http://digitalweek-escapegameiot.rhcloud.com:8000');
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
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/wsescapestopanimation",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("Animation launched");      
         }
			});
        
}

function startAnimation(){
  	$.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/wsescapestartanimation",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("Animation launched");      
         }
			});        
}

function welcomeAnimation(){
  	$.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/wescapewelcomeanimation",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("Animation launched");      
         }
			});        
}

function debug(id){
    $.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/wsescape/"+id,
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	  console.log("debug of the pin id"+id);      
         }
			});     
}

