var sequence;
var sequence_show;
var sequence_check;
var puntos;
var sounds = [];
var backgroundAudio;
/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
var imageRepository = new function() {
  // Define images
  this.button1off = new Image();
  this.button2off = new Image();
  this.button3off = new Image();
  this.button4off = new Image();
  this.button1on = new Image();
  this.button2on = new Image();
  this.button3on = new Image();
  this.button4on = new Image();
  
  this.led_0 = new Image();
  this.led_1 = new Image();
  this.led_2 = new Image();
  this.led_3 = new Image();
  this.led_4 = new Image();
  this.led_5 = new Image();
  this.led_6 = new Image();
  this.led_7 = new Image();
  this.led_8 = new Image();
  this.led_9 = new Image();
  this.led_empty = new Image();

  // Ensure all images have loaded before starting the game
  var numImages = 19;
  var numLoaded = 0;
  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
        init();
    }
  }
  
  this.button1off.onload = function() {
    imageLoaded();
  }
  
  this.button2off.onload = function() {
    imageLoaded();
  }
  
  this.button3off.onload = function() {
    imageLoaded();
  }
  
  this.button4off.onload = function() {
    imageLoaded();
  }
  
  this.button1on.onload = function() {
    imageLoaded();
  }
  
  this.button2on.onload = function() {
    imageLoaded();
  }
  
  this.button3on.onload = function() {
    imageLoaded();
  }
  
  this.button4on.onload = function() {
    imageLoaded();
  }

  this.led_0.onload = function() {
    imageLoaded();
  }

  this.led_1.onload = function() {
    imageLoaded();
  }

  this.led_2.onload = function() {
    imageLoaded();
  }

  this.led_3.onload = function() {
    imageLoaded();
  }

  this.led_4.onload = function() {
    imageLoaded();
  }

  this.led_5.onload = function() {
    imageLoaded();
  }

  this.led_6.onload = function() {
    imageLoaded();
  }

  this.led_7.onload = function() {
    imageLoaded();
  }

  this.led_8.onload = function() {
    imageLoaded();
  }

  this.led_9.onload = function() {
    imageLoaded();
  }

  this.led_empty.onload = function() {
    imageLoaded();
  }
  
  // Set images src
  this.button1off.src = "css/images/button1off.jpg";
  this.button2off.src = "css/images/button2off.jpg";
  this.button3off.src = "css/images/button3off.jpg";
  this.button4off.src = "css/images/button4off.jpg";
  this.button1on.src = "css/images/button1on.jpg";
  this.button2on.src = "css/images/button2on.jpg";
  this.button3on.src = "css/images/button3on.jpg";
  this.button4on.src = "css/images/button4on.jpg";

  this.led_0.src = "css/images/led_0.png";
  this.led_1.src = "css/images/led_1.png";
  this.led_2.src = "css/images/led_2.png";
  this.led_3.src = "css/images/led_3.png";
  this.led_4.src = "css/images/led_4.png";
  this.led_5.src = "css/images/led_5.png";
  this.led_6.src = "css/images/led_6.png";
  this.led_7.src = "css/images/led_7.png";
  this.led_8.src = "css/images/led_8.png";
  this.led_9.src = "css/images/led_9.png";
  this.led_empty.src = "css/images/led_empty.png";
}


function SoundPool(maxSize) {
  var size = maxSize; // Max sounds allowed in the pool
  var pool = [];
  this.pool = pool;
  var currSound = 0;
 
  this.init = function(object) {
      for (var i = 0; i < size; i++) {
        // Initalize the sound
        sound = new Audio();
        source= document.createElement('source');
        if (sound.canPlayType('audio/ogg;')) {
            source.type= 'audio/ogg';
            source.src= 'media/audio/'+object+'.ogg';
        } else {
            source.type= 'audio/mpeg';
            source.src= 'media/audio/'+object+'.mp3';
        }
        sound.appendChild(source);


        /*sound.volume = .12;*/
        sound.load();
        pool[i] = sound;
      }
  };
 
  this.get = function() {
    if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
      pool[currSound].play();
    }
    currSound = (currSound + 1) % size;
  };
}

function displayLed(n) {
	 
	 var digit = Math.floor(n / (Math.pow(10, 0)) % 10) 
	 
	 $('#uni').attr("src","css/images/led_"+ digit +".png");
	 digit = Math.floor(n / (Math.pow(10, 1)) % 10) 
	 if (digit>0) {
		$('#dec').attr("src","css/images/led_"+ digit +".png");
	 } else {
	    $('#dec').attr("src","");
	 }
}

function launchUserTurn() {
    sessionStorage.setItem('turn', 'player');
	$('div#blocked').hide();
	$('div#human_msg').show();
}

function newround() {
	$('div#blocked').show();
	puntos++;
	displayLed(puntos);
	if(localStorage.getItem('best') < puntos) {
		$('div#best').html('your best: ' + puntos);
	}
	var randombutton = 1 + Math.floor(Math.random() * 4);
	sequence.push(randombutton);
	sequence_show= sequence.slice(0);
    sequence_check= sequence.slice(0);
	sessionStorage.setItem('turn', 'machine');
    setTimeout(function(){
    	$('div#machine_msg').show();
    },1000);	
    setTimeout(function(){
    	showSequence();
    },2000);	
}


function showSequence() {
	var idbutton = sequence_show.shift();
	
	$('#button'+idbutton).addClass('on');
    sounds[idbutton].get();          
		   
	setTimeout(function(){
        $('#button'+idbutton).removeClass('on'); 
	    $('div#machine_msg').fadeOut( "fast", function() {});
	},400, false);	

	if (sequence_show.length > 0) {     		   
		setTimeout(function(){
			showSequence(sequence_show);
		},800);
	} else {
	    setTimeout(function(){
	   		launchUserTurn();
	    },1000);
	}						 		 
}

function wrongbutton() {
	$('div#blocked').show();
	 gameover.get();
     $('div#gameover_msg').show();
	 var extratime = 0;
	 if (localStorage.getItem("best") < puntos) {
		localStorage.setItem("best", puntos);
		setTimeout(function(){ 
            $('div#gameover_msg').fadeOut( "fast", function() {});
            $('div#newbest_msg').show();
            newbest.get();       
		},2000);
	    extratime = 2000;
	 } 
	 
	 setTimeout(function(){
			if (extratime > 0) {
				$('div#newbest_msg').fadeOut( "fast", function() {});
			} else {
				$('div#gameover_msg').fadeOut( "fast", function() {});
			}
			$('div#gameover').show();
			$('div#start').show();
			$('div#logo').show();
			backgroundAudio.play();
	 },3000 + extratime);
}

function start() {
	 backgroundAudio.pause();
	 backgroundAudio.currentTime = 0;
	 sequence = new Array();
	 puntos = -1;
	 gamestart.get();
	 $('div#gameover').fadeOut( "fast", function() {newround();});
 }

function init() {
 	$('div#human_msg').html('...ok, it\'s your turn');
	$('div#machine_msg').html('computer turn, wait...');
	$('div#gameover_msg').html('game over');
	$('div#newbest_msg').html('new best score!');
	sounds[1] = new SoundPool(10);
	sounds[1].init("sound1");
	sounds[2] = new SoundPool(10);
	sounds[2].init("sound2");
	sounds[3] = new SoundPool(10);
	sounds[3].init("sound3");
	sounds[4] = new SoundPool(10);
	sounds[4].init("sound4");
	gameover = new SoundPool(1);
	gameover.init("gameover");
	newbest = new SoundPool(1);
	newbest.init("newbest");
	gamestart = new SoundPool(1);
	gamestart.init("gamestart");
  backgroundAudio = new Audio();
	source= document.createElement('source');
  if (backgroundAudio.canPlayType('audio/ogg;')) {
      source.type= 'audio/ogg';
      source.src= 'media/audio/music.ogg';
  } else {
      source.type= 'audio/mpeg';
      source.src= 'media/audio/music.mp3';
  }
  backgroundAudio.appendChild(source);
	backgroundAudio.loop = true;
	backgroundAudio.volume = .35;
	backgroundAudio.load();
    $('div#loading').hide();
    $('div#start').show();
	backgroundAudio.play();
}


/****************************************************************************/
$(function() {
    //start();
    

    if(localStorage.getItem("best") == null) {
         localStorage.setItem("best", 0);
	} else {
          $('div#best').html('your best: ' + localStorage.getItem("best"));
	      $('div#best').show();
	};

    $('div#start').click(function(){
          $(this).fadeOut( "fast", function() {
          	$('div#logo').fadeOut( "fast", function() {start();});
          });
    }); 


	$('#button1').bind('touchstart click', function(event){
		event.stopPropagation();
    event.preventDefault();
    if(event.type == 'touchstart') {
        $(this).addClass('on');
    }
		if(sessionStorage.getItem('turn')=='player') {
			 $('div#human_msg').fadeOut( "fast", function() {});
			 if(sequence_check[0]==1){
		         sounds[1].get(); 
				 sequence_check.shift();
				 if(sequence_check.length == 0) {
					  newround();
				 }
			 }	else {
                  wrongbutton();
             }			 
		} 
	}).bind('touchend', function(){
		$(this).removeClass('on');
	});


	
	$('#button2').bind('touchstart click', function(event){
		event.stopPropagation();
    event.preventDefault();
    if(event.type == 'touchstart') {
        $(this).addClass('on');
    }
		if(sessionStorage.getItem('turn')=='player') {
			 $('div#human_msg').fadeOut( "fast", function() {});
			 if(sequence_check[0]==2){
		         sounds[2].get(); 
				 sequence_check.shift();
				  if(sequence_check.length == 0) {
					newround();
				 }
			 }	else {
                  wrongbutton();
             }			 
		} 
	}).bind('touchend', function(){
		$(this).removeClass('on');
		
	});
	
	$('#button3').bind('touchstart click', function(event){
		event.stopPropagation();
    event.preventDefault();
    if(event.type == 'touchstart') {
        $(this).addClass('on');
    }
		if(sessionStorage.getItem('turn')=='player') {
			 $('div#human_msg').fadeOut( "fast", function() {});
			 if(sequence_check[0]==3){
				sounds[3].get();
				 sequence_check.shift();
				  if(sequence_check.length == 0) {
					newround();
				 }
			 }	else {
                  wrongbutton();
             }			 
		} 
	}).bind('touchend', function(){
		$(this).removeClass('on');
		
	});
	
	$('#button4').bind('touchstart click', function(event){
		event.stopPropagation();
    event.preventDefault();
    if(event.type == 'touchstart') {
        $(this).addClass('on');
    }
		if(sessionStorage.getItem('turn')=='player') {
			 $('div#human_msg').fadeOut( "fast", function() {});
			 if(sequence_check[0]==4){
		         sounds[4].get(); 
				 sequence_check.shift();
				  if(sequence_check.length == 0) {
					newround();
				 }
			 }	else {
                  wrongbutton();
             }			 
		} 
	}).bind('touchend', function(){
		$(this).removeClass('on');

	});

});
