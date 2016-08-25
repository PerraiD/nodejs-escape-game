/**
 * escapeGame IOT demo
 * @author Charles GALLARD 
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
        $('#state'+obj.pinId).fadeTo( 1500 , 1, function() {});
        $('#state'+obj.pinId).parent().removeClass('danger');
        
    }else{
        $('#state'+obj.pinId).css("font-weight","bold");
        $('#state'+obj.pinId).html('disconnected');
        $('#state'+obj.pinId).fadeTo( 1500 , 1, function() {});
        $('#state'+obj.pinId).parent().addClass('danger');
    }
  });	
  	
});


