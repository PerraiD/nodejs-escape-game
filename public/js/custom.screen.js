/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */
var endTimeBomb = null;
var timeAction;
var socket = null;
var phase = 1;

$(document).ready(function() {
  
   toggleFullScreen();

  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });

   
  stoppedCSSBombAnimation();

  socket = io.connect('http://digitalweek-escapegameiot.rhcloud.com:8000');

  socket.on('startBombAnimation', function(){
    //restoring the css
    startCSSBombAnimation();

    endTimeBomb = addMinutes(Date.parse(new Date()),10);
    var tid = setInterval(getTimeRemaining, 33);
    
    $('.container-bas-secu').html('');
    $('.logo-escape-container').hide();
    
    rundelay();
  })

  socket.on('messageescape', function (data)
  {
    var obj = JSON.parse(data);
    waitingresponse(obj);
    phase = obj.step;
    console.log(obj.step);
    

  });

  socket.on('timeElapsed',function(data){
    console.log("time elapsed");
    explosion();
  });

  socket.on('endtimechange', function (data)
  {
    console.log(data);
  });	
  stopTimer();

});


function screenreponsegood(){
  $(".logo-escape-container").removeClass('heart');
  welldone();
}

function screenreponsewrong(){
  $(".logo-escape-container").removeClass('heart');
  wrongdone();
}

function wrongdone(){
   $("body").css("background-color",'#FF0000');
   $('.logo-escape-container').css("background-image", "url(../img/wrong.png)");
   $('.container-bas-secu').html('<p>TIME ERROR X00F3566</p>'); 
   timeAction = setTimeout(changePhase,4000);
}

function welldone(){
   $('.logo-escape-container').css("background-image", "url(../img/welldone.png)");
   $("body").css("background-color","#228B22");
   $('.container-bas-secu').html('<p>Bien joué !</p>'); 
   timeAction = setTimeout(changePhase,3000);
}

function changePhase(){
$("body").css("background-color","#e11937");
  switch(phase) {
      case 1:
          phase2();
          break;
      case 2:
          phase3();
          break;
      case 3:
          phase4();
          break;
  }

}

function waitingresponse(data){

  $(".logo-escape-container").addClass('heart');
  if(data.fatal){
      timeAction = setTimeout(explosion,5000);
  }else{
    if(!data.validate){
      if(data.step < 4){
        timeAction = setTimeout(screenreponsewrong,5000);
      }else{
        timeAction = setTimeout(explosion,5000);
      }      
    }else{
        if(data.step < 4){
          timeAction = setTimeout(screenreponsegood,5000);
        }else{
          timeAction = setTimeout(secureDesactive,5000);
        }      
      }
  }
  
}


function addparticle(){
  
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',
    density : 10000
  });

}

function rundelay(){
    console.log('run');
  timeAction = setTimeout(firstAction,3000);
}


function firstAction(){
 
 $('#txtparasite').html('DANS');
 $("#txtparasite").attr("data-text", "DANS");
  timeAction = setTimeout(secondAction,3000);
}

function secondAction(){
 $("#txtparasite").attr("data-text", "L'IOT ROOM");
 $('#txtparasite').html("L'IOT ROOM");
 timeAction = setTimeout(thirdAction,2000);
}

function thirdAction(){
 $("#txtparasite").addClass('parasite');
 $("#txtparasite").attr("data-text", "IOT");
 $('#txtparasite').html("L'IOT ROOM");
 timeAction = setTimeout(fourAction,3000);
}


function fourAction(){
 $("body").css("background-color","#151515");
  
 $("#txtparasite").removeClass('parasite');
 $("#txtparasite").addClass('parasiteb');
 $("#txtparasite").attr("data-text", "ERROR");
 $('#txtparasite').html("ERROR 0x52170624");
 timeAction = setTimeout(fiveAction,2000);
}

function fiveAction(){
   
 $("#txtparasite").attr("data-text", "ERROR");
 $('#txtparasite').html("INTRUSION DETECTÉE");
 timeAction = setTimeout(sixAction,2000);
}

function sixAction(){
 addparticle();
 $("#txtparasite").removeClass('parasiteb');
 $("#txtparasite").attr("data-text", "ERROR");
 $('#txtparasite').html("CGI SECURITY ACTIVATED");
 timeAction = setTimeout(lastAction,4000);
}

function lastAction(){
  
  
  $("body").css("background-color","#a01937");
  $('#txtparasite').hide();
 
  startTimer();
  

}


function stopTimer()
{

			$.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/wsescaperestoptimer",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction stop");
        //  timeAction = setTimeout(phase1,1000);
				 	 }
			}) 
			
}; 

function startTimer()
{

			$.ajax({
				url: "http://digitalweek-escapegameiot.rhcloud.com/api/wsescaperestarttimer",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction restart");
          timeAction = setTimeout(phase1,1000);
				 	 }
			}) 
			
}; 

function phase1(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-1.png)"); 
  $('.container-bas-secu').html('<p>Sécurité active 1/5</p>');
  $(".logo-escape-container" ).fadeTo( 1500 , 1, function() {});

}

function phase2(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-2.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 2/5</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});

}

function phase3(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-3.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 3/5</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});

}

function phase4(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-4.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 4/5</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});
  //TODO CHANGE SecureDesactive => CheckSecurity
  //timeAction = setTimeout(secureDesactive,2000);
}

function secureDesactive(){
  $("body").css("background-color","#228B22");
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-5.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Bravo sécurité désactivée</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});
  stopTimer();
}

function explosion(){

  $('.container-bas-secu').html('<p></p>');
  $("body").css("background-color","#FF0000");  
  $("#txtparasite").addClass('parasitec');
  $("#txtparasite").attr("data-text", "System Failure");
  $('#txtparasite').html("Désoler, bombe explosée !");
  $('#txtparasite').show();

  stopTimer();
}

function addMinutes(date, minutes) {
  var d = new Date();
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

function launchTimer(endTimeBomb){

  
}


function getTimeRemaining(){

  var t = Date.parse(endTimeBomb) - Date.now();
  var milliseconds = Math.floor( (t) % 60 );
  if (milliseconds < 10){
    milliseconds = '0'+milliseconds;
  }
  var seconds = Math.floor( (t/1000) % 60 );
  if (seconds < 10){
    seconds = '0'+seconds;
  }
  var minutes = Math.floor( (t/1000/60) % 60 );
  if (minutes < 10){
    minutes = '0'+minutes;
  }
/*
 $('.time-minutes').html(minutes);
 $('.time-seconds-texte').html(seconds);
 $('.time-milliseconds').html(milliseconds);
*/

}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function startCSSBombAnimation(){
    $("body").css("background-color","#151515");
    $('#particles').show();        
}

function stoppedCSSBombAnimation() {
    //black screen setting
    $('#particles').hide();    
    $('body').css('background','black');

}