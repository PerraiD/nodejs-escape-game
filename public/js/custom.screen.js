/**
 * escapeGame IOT demo
 * @author Charles GALLARD, David PERRAI 
 */
var endTimeBomb = null;
var timeAction;
var socket = null;
var phase = 1;
var stateReady = false;

$(document).ready(function() {
  
   toggleFullScreen();

  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });

  stoppedCSSBombAnimation();

  socket = io.connect('https://escape-inno.herokuapp.com');


  socket.on('stopBombAnimation', function(){
    location.reload(); //reloading to be in waiting state
  });
  

  socket.on('welcomeBombAnimation',function() {
    //launching welcomesound;
    $('#introductionSound')[0].loop = true;
    $('#introductionSound')[0].play();

    startCSSBombAnimation();
    $('.logo-escape-container').css('height','0%'); 
    runFistDelay();
  });

  socket.on('startBombAnimation', function(){ 

    $('#introductionSound')[0].pause();
    $('#alertSound')[0].play();


    endTimeBomb = addMinutes(Date.parse(new Date()),10);
    var tid = setInterval(getTimeRemaining, 33);
    
    $('.container-bas-secu').html('');
    $('.logo-escape-container').hide();
    
    runSecondDelay();
  })

  socket.on('messageescape', function (data)
  {
    if(stateReady){
        var obj = JSON.parse(data);
        waitingresponse(obj);
        if(obj.step >= phase){
           phase = obj.step;
        }
        console.log(phase);       
        console.log(obj.step);
    }
  });

  socket.on('timeElapsed',function(data){
    console.log("time elapsed");
    explosion();
  });

  socket.on('endtimechange', function (data)
  {
    console.log(data);
  });	 

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

   $('#failSound')[0].play();

   $("body").css("background-color",'#FF0000');
   $('.logo-escape-container').css("background-image", "url(../img/wrong.png)");
   $('.container-bas-secu').html('<p>TIME ERROR X00F3566</p>'); 
   timeAction = setTimeout(changePhase,4000);
}

function welldone(){

   $('#successSound')[0].play();   

   $('.logo-escape-container').css("background-image", "url(../img/welldone.png)");
   $("body").css("background-color","#228B22");
   $('.container-bas-secu').html('<p>Bien joué !</p>'); 
   timeAction = setTimeout(changePhase,3000);
}

function changePhase(){
  $('#failSound')[0].pause();
  $('#ambianceSound')[0].play();

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
  $('#ambianceSound')[0].pause();
  
  
  $("#heartSound")[0].play();

  if(data.fatal){
      timeAction = setTimeout(function(){
          stopHeart()
          explosion();          
      }
      ,5000);
  }else{
    if(!data.validate){
      if(data.step < 4){

        timeAction = setTimeout(function(){
          stopHeart();
          screenreponsewrong();
        },5000);

      }else if(data.id === 48){
         timeAction = setTimeout(function(){
          stopHeart();
          explosion();          
        }
        ,5000);
      }      
    }else{
        if(data.step < 4){
          timeAction = setTimeout(function(){
           stopHeart();
           screenreponsegood();
          }
          ,5000);
        }else if(data.id === 49){
          timeAction = setTimeout(function(){
            stopHeart();
            secureDesactive();
          }
          ,5000);
        }      
      }
  }
  
}

function stopHeart(){
   $("#heartSound")[0].load(); //reloading sound
}

function addparticle(){
  
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',
    density : 10000
  });

}

function runFistDelay(){
  
  console.log('run');
  $('#container-bas-secu-id').hide();

  timeAction = setTimeout(firstAction,3000);
}

function runSecondDelay(){
  
  console.log('run');
  timeAction = setTimeout(fourAction,3000);
}


function firstAction(){
 
 $('#txtparasite').html('A');
 $("#txtparasite").attr("data-text", "A");
  timeAction = setTimeout(secondAction,2000);
}

function secondAction(){
 $("#txtparasite").attr("data-text", "L'INAUGURATION DE L'ETAGE");
 $('#txtparasite').html("L'INAUGURATION DE L'ETAGE");
 timeAction = setTimeout(thirdAction,3000);
}

function thirdAction(){
 $('#txtparasite').html("DANGER");
 $('#container-bas-secu-id').show();
}


function fourAction(){
  //déclanchement du son parasite
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
 $('#txtparasite').html("SNCF SECURITY ACTIVATED");
 timeAction = setTimeout(lastAction,4000);
}

function lastAction(){
  stateReady = true; // we can start receiving pin messages 
  $('#ambianceSound')[0].play();
  $('#ambianceSound')[0].loop = true;

  $("body").css("background-color","#a01937");
  $('#txtparasite').hide();
 
  startTimer();
  
}

function stopTimerWin(){
  	$.ajax({
				url: "https://escape-inno.herokuapp.com/api/wescapestopwin",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction stop with win");     
				 	 }
			}) 

}

function stopTimerFail(){
  	$.ajax({
				url: "https://escape-inno.herokuapp.com/api/wescapestopfail",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction stop with fail");       
				 	 }
			}) 
}


function startTimer()
{

			$.ajax({
				url: "https://escape-inno.herokuapp.com/api/wsescaperestarttimer",
				dataType: 'html',
				jsonpCallback: 'callback',
				 success: function() { 
				 	console.log("timeAction restart");
          timeAction = setTimeout(phase1,1000);
				 	 }
			}) 
			
}; 

function phase1(){
  $('.logo-escape-container').css('height','100%'); 
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-1.png)"); 
  $('.container-bas-secu').html('<p>Sécurité active 1/4</p>');
  $(".logo-escape-container" ).fadeTo( 1500 , 1, function() {});

}

function phase2(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-2.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 2/4</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});

}

function phase3(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-3.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 3/4</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});

}

function phase4(){
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-4.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Sécurité active 4/4</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});

}

function secureDesactive(){
  $('#ambianceSound')[0].pause();
  $('#shutdownSound')[0].play();
 
  $("body").css("background-color","#228B22");
  $('.logo-escape-container').css("background-image", "url(../img/logo-escape-phase-5.png)"); 
  $(".logo-escape-container").css('opacity', '0');
  $('.container-bas-secu').html('<p>Bravo sécurité désactivée</p>');
  $(".logo-escape-container").fadeTo( 1000 , 1, function() {});
  stopTimerWin();
}

function explosion(){
  
  $('#ambianceSound')[0].pause();
  $('#explosionSound')[0].loop = false;
  $('#explosionSound')[0].play();

  $('.container-bas-secu').html('<p></p>');
  $("body").css("background-color","#FF0000");  
  $("#txtparasite").addClass('parasitec');
  $("#txtparasite").attr("data-text", "System Failure");
  $('#txtparasite').html("Bombe explosée !");
  $('#txtparasite').show();

  stopTimerFail();
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

    $("body").css("background","rgba(160, 25, 55, 1)");

    $('#txtparasite').removeClass('parasite');
    $('#txtparasite').removeClass('parasiteb');
    $('#txtparasite').removeClass('parasitec');
    $('#txtparasite').html('BIENVENUE');      
    $('#txtparasite').show();

    $('#particles').show();
        
}

function stoppedCSSBombAnimation() {
    //black screen setting
    $('#particles').hide();    
    $('body').css('background','black');

}