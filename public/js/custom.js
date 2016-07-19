/**
 * escapeGame IOT demo
 * @author Charles GALLARD 
 */
var endTimeBomb = null;
var socket = null;
var tid = null;
  var speed = 1000;
$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',

  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });

  endTimeBomb = addMinutes(Date.parse(new Date()),10);
  socket = io.connect('ws://digitalweek-escapegameiot.rhcloud.com:8091/');
  socket.on('messageescape', function (data)
  {
  var obj = JSON.parse(data);
  console.log(obj.id);
  if(obj.id == 1){
    speed = 500;
  }

  });	
  socket.on('endtimechange', function (data)
  {
    console.log(data);

    if(data != 'null'){
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
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}


function removeMinutes(date, minutes) {
  var d = new Date();
  d.setMinutes(d.getMinutes() - minutes);
  return d;
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
  
    $('.time-minutes').html(minutes);
    $('.time-seconds-texte').html(seconds);
    $('.time-milliseconds').html(milliseconds);

  }else{

    clearInterval(tid);
    $('.time-minutes').html('--');
    $('.time-seconds-texte').html('--');
    $('.time-milliseconds').html('--');

  }
  


}