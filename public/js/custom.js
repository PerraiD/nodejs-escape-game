/**
 * escapeGame IOT demo
 * @author Charles GALLARD, David PERRAI 
 */

var endTimeBomb = null;
var socket = null;
var tid = null;
var speed = 1000;
var init = false;
var step = 0;
var hidingNumber = false;
var finalEndTime = 0;


           

$(document).ready(function() {
  
   addEventListener('touchstart', function (e) {
        $('#lowBtmSound')[0].play();
       $('#lowBtmSound')[0].pause();
    });

  CSSstopTimer();
  
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
    console.log("number of user errors  :" + obj.userErrors);
    if(!obj.validate && !obj.fatal){
       switch (obj.userErrors) {
         case 1:
           speed = 500;
           finalEndTime = (endTimeBomb - Date.now())/2;              
           break;
        case  2:
           endTimeBomb = removeMinutes(endTimeBomb,1);
           finalEndTime = removeMinutes(finalEndTime,0.5);        
           if(finalEndTime < 0){
             setTimerToNull();
           }
           break;
        case  3:
           hidingNumber = true;
           break;
         case  4:
           setTimerToNull();
 
       }
      
    }else if(obj.fatal || step === 4){
         setTimerToNull();       
    }


  });

  socket.on('stopBombAnimation', function() 
  {
    location.reload();
  });

  socket.on('stopwin' , function(){
      $('#lowBtmSound')[0].pause();
      $('#highBtmSound')[0].pause();
      $("body").css("background","#228B22");
      $('.container-timer').html('');
      $('.container-timer').html('<h1>Desarmed</h1>');
     

  });

  socket.on('stopfail' , function(){
      $('#lowBtmSound')[0].pause();
      $('#highBtmSound')[0].pause();

      setTimerToNull();
  });


  socket.on('endtimechange', function (data)
  {
    console.log("endTimeCalled");

    if(data !== 'none'){ //we restart the timer
        CSSstartTimer();
        if(tid !== null){
          clearInterval(tid); 
        }
        endTimeBomb = Date.parse(data);
        tid = setInterval(getTimeRemaining, 33);
       

    }else{
      CSSstopTimer();     
    }

  });

  	 
});

function setTimerToNull(){

      $('#lowBtmSound')[0].pause();
      $('#highBtmSound')[0].pause();
      clearInterval(tid);
      $('.time-minutes').html('00');
      $('.time-seconds-texte').html('00');
      $('.time-milliseconds').html('00');
      hidingNumber = false;

       $.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/timeelapsed",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction stop");
        //  timeAction = setTimeout(phase1,1000);
				 	 }
			})  
     
}

function CSSstartTimer(){

     $('body').css('background','#e11937');
     $('#centered-div-stop').hide();
     $('#particles').show();     
     $('#particles').particleground({
      dotColor: '#5cbdaa',
      lineColor: '#5cbdaa',
    });
}

function CSSstopTimer(){
      //black screen setting
      $('#particles').hide();
      $('#centered-div-stop').show();
      $("#centered-mesg-stop").attr("data-text", "PROJECT");
      $("#centered-mesg-stop").addClass('parasite');         
      $('body').css('background','black');
}



function addMinutes(date, minutes) {
  var d = new Date();
  console.log(d);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}


function removeMinutes(date, minutes) {
    return date - (minutes*60)*1000;
}


function screenError(){

}

function screenReussi(){
  
}

var currentSecond=0;
function getTimeRemaining(){
 
  
  var t = endTimeBomb - Date.now();
  
   
  if(finalEndTime >= t){
    console.log(finalEndTime);
    t  = finalEndTime - t;
    setTimerToNull();
        
  }
 
  var milliseconds = Math.floor( (t) % 60 );
  
  if (milliseconds < 10){
    milliseconds = '0'+milliseconds;
  }
  var seconds = Math.floor( (t/speed) % 60 );
  if (seconds < 10){
    seconds = '0'+seconds;
  }
  if(seconds !== currentSecond){   
    fakeClick(function() {
        $('#lowBtmSound')[0].load();
        $('#lowBtmSound')[0].play();
    });            
    currentSecond = seconds;
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
 
 if(parseInt(seconds) <= 1 && parseInt(minutes) == 0){
        
    $.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/timeelapsed",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction stop");
        //  timeAction = setTimeout(phase1,1000);
				 	 }
			}) 
      setTimerToNull();
  

  }else{
    if(!hidingNumber){
      $('.time-minutes').html(minutes);
      $('.time-seconds-texte').html(seconds);
      $('.time-milliseconds').html(milliseconds);
    }else{
      $('.time-minutes').html("??");
      $('.time-seconds-texte').html("??");
      $('.time-milliseconds').html("??");
    }
  }
}

function fakeClick(fn) {
            var $a = $('<a href="#" id="fakeClick"></a>');
                $a.bind("click", function(e) {
                    e.preventDefault();
                    fn();
                });

            $("body").append($a);

            var evt, 
                el = $("#fakeClick").get(0);

            if (document.createEvent) {
                evt = document.createEvent("MouseEvents");
                if (evt.initMouseEvent) {
                    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    el.dispatchEvent(evt);
                }
            }

            $(el).remove();
        }
        
