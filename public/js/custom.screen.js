/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */
var endTimeBomb = null;
var timeAction;
var socket = null;
var phase = 1;

$(document).ready(function() {
  
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });

   
  endTimeBomb = addMinutes(Date.parse(new Date()),10);
  var tid = setInterval(getTimeRemaining, 33);
 // launchTimer(endTimeBomb);
  $('.container-bas-secu').html('');
  $('.logo-escape-container').hide();
  rundelay();

  socket = io.connect('ws://digitalweek-escapegameiot.rhcloud.com:8091/');
  socket.on('messageescape', function (data)
  {
  var obj = JSON.parse(data);
  waitingresponse(obj);
  
  console.log(obj.id);

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
  if(data.id == 1){
    timeAction = setTimeout(screenreponsewrong,5000);
  }else{
    timeAction = setTimeout(screenreponsegood,5000);
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
 $('#txtparasite').html("INTRUSION DETECTÉ");
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
				url: "http://digitalweek-escapegameiot.rhcloud.com:8091/api/wsescaperestoptimer",
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
				url: "http://digitalweek-escapegameiot.rhcloud.com:8091/api/wsescaperestarttimer",
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
//  timeAction = setTimeout(phase2,2000);
}

function phase2(){
    $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-2.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 2/5</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});
   timeAction = setTimeout(phase3,2000);
}

function phase3(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-3.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 3/5</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});
  timeAction = setTimeout(phase4,2000);
}

function phase4(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-4.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 4/5</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});
  timeAction = setTimeout(secureDesactive,2000);
}

function secureDesactive(){
  $("body").css("background-color","#228B22");
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-5.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Bravo sécurité activé</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});

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