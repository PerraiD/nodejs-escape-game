/**
 * escapeGame IOT demo
 * @author Charles GALLARD, David PERRAI 
 */

var socket = null;


$(document).ready(function() {


  socket = io.connect('http://digitalweek-escapegameiot.rhcloud.com:8000');
  socket.on('stateChange', function (data)
  {
    var obj = JSON.parse(data);
    console.log(obj);
    if(obj.state){
        $('#state'+obj.pinId).css("font-weight","normal");
        $('#state'+obj.pinId).html('connected');      
        $('#state'+obj.pinId).parent().removeClass('danger');

        $('#badge-'+obj.pinId).html('OK');
        
    }else{
        $('#state'+obj.pinId).css("font-weight","bold");
        $('#state'+obj.pinId).html('disconnected');
        $('#state'+obj.pinId).parent().addClass('danger');
    
        $('#badge-'+obj.pinId).html('X');
    }
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

