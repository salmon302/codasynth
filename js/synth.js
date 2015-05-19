// create audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//create buttons and controls
var mute = document.querySelector('.mute');

//create oscillator, gain node, etc.
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

//connect oscillator, through everything, to output (speakers)
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

//set oscillator
oscillator.type = 'square';
oscillator.frequency.value = 440;
oscillator.detune.value = 100;


oscillator.oneded = function() {
	console.log('The synth is silent');
}

// gainNode.gain.value = 0.01;


function voiceMute() {
  if(mute.id == "") {
    gainNode.gain.value = 0;
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.gain.value = 1;
    mute.id = "";
    mute.innerHTML = "Mute";
  }
}



var keyboard = new QwertyHancock({
                 id: 'keyboard',
                 width: 1200,
                 height: 150,
                 octaves: 4,
                 startNote: 'c3',
                 whiteNotesColour: 'white',
                 blackNotesColour: 'black',
                 hoverColour: '#f3e939'
            });

 keyboard.keyDown = function (note, frequency) {
                oscillator.frequency.value = frequency;
                gainNode.gain.value = 1;
                oscillator.start(0);

            };
 keyboard.keyUp = function (note, frequency) {
                gainNode.gain.value = 0;
            };

