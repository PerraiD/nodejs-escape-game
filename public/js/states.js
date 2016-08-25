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
        $('#state'+obj.pinId).html('connected');
    }else{
         $('#state'+obj.pinId).html('<span style="font-weight:bold">disconnected<span>');
    }
  });	
  	
});


