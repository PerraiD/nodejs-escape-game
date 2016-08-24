/**
 * escapeGame IOT demo
 * @author Charles GALLARD 
 */
var endTimeBomb = null;
var socket = null;
var tid = null;
var speed = 1000;
var init = false;
var step = 0;
var hidingNumber = false;



$(document).ready(function() {

function requestFullScreen(elem){
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    }
 }
  requestFullScreen(document.body);



  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',

  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });

  endTimeBomb = addMinutes(Date.parse(new Date()),10);
  socket = io.connect('http://digitalweek-escapegameiot.rhcloud.com:8000');
  socket.on('messageescape', function (data)
  {
    var obj = JSON.parse(data);
    step = obj.step;
    console.log("validation of pin step :" + obj.validate);
    if(!obj.validate){
       switch (step) {
         case 1:
           speed = 500;
           break;
        case  2:
           endTimeBomb = removeMinutes(endTimeBomb,2);
           break;
        case  3:
           hidingNumber = true;
           break;
         case  4:
           $('.time-minutes').html('--');
           $('.time-seconds-texte').html('--');
           $('.time-milliseconds').html('--');
       }
      
    }

  });	
  socket.on('endtimechange', function (data)
  {
    console.log("endTimeCalled");

    if(data !== 'none'){
        if(tid !== null){
          clearInterval(tid); 
        }
        endTimeBomb = Date.parse(data);
        tid = setInterval(getTimeRemaining, 33);
    }else{
      $('.time-minutes').html('--');
      $('.time-seconds-texte').html('--');
      $('.time-milliseconds').html('--');
    }

  });

  	
});


function addMinutes(date, minutes) {
  var d = new Date();
  console.log(d);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}


function removeMinutes(date, minutes) {
    return date - 120000;
}


function screenError(){

}

function screenReussi(){
  
}


function getTimeRemaining(){
 

  
  var t = endTimeBomb - Date.now();


  var milliseconds = Math.floor( (t) % 60 );
  if(milliseconds > -1 || (Math.floor( (t/speed) % 60 ) == 0)){
    
    if (milliseconds < 10){
    milliseconds = '0'+milliseconds;
    }
    var seconds = Math.floor( (t/speed) % 60 );
    if (seconds < 10){
      seconds = '0'+seconds;
    }
    var minutes = Math.floor((t/speed/60) % 60);
    if(speed != 1000){
      minutes = minutes/2;
      if(minutes % 1 === 0){
        minutes = minutes-1;
      }else{
        minutes = Math.floor(minutes);
      }
  
    }
    if (minutes < 10){
        minutes = '0'+minutes;
    }
    if(!hidingNumber){
      $('.time-minutes').html(minutes);
      $('.time-seconds-texte').html(seconds);
      $('.time-milliseconds').html(milliseconds);
    }else{
      $('.time-minutes').html("??");
      $('.time-seconds-texte').html("??");
      $('.time-milliseconds').html("??");
    }
    

  }else{

    $.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/timeelapsed",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction stop");
        //  timeAction = setTimeout(phase1,1000);
				 	 }
			}) 
    clearInterval(tid);
    $('.time-minutes').html('--');
    $('.time-seconds-texte').html('--');
    $('.time-milliseconds').html('--');

  }
  


}