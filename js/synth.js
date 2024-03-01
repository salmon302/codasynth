// create audio context 
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//create buttons and controls
var mute = document.querySelector('.mute');

//create oscillator, gain node, etc.
var oscillator = audioCtx.createOscillator();
var oscGain = audioCtx.createGain();
var gainNode = audioCtx.createGain();
var lfo = audioCtx.createOscillator();
var lfoGain = audioCtx.createGain();

//get buttons

// var lfoButton = document.getElementById("#lfoButton");


//connect oscillator, through everything, to output (speakers)
oscillator.connect(oscGain);
oscGain.connect(gainNode);
// gainNode.connect(lfoGain);
lfo.connect(gainNode.gain);
gainNode.connect(audioCtx.destination);

//set oscillator
oscillator.type = 'square';
oscillator.frequency.value = 440;
oscillator.detune.value = 100;
// oscillator.start(0);

//set LFO
lfo.frequency.value = 0;
lfo.start(0);
console.log(lfo.frequency.value);

oscillator.oneded = function() {
	console.log('The synth is silent');
}

function initOscillator() {
    oscillator.start(0);
    oscGain.gain.value = 0;
}

initOscillator();
// gainNode.gain.value = 0.01;


$(document).ready(function(){
    $("#lfoButton").click(function lfoOn() {
        if(lfo.frequency.value == 0){
            lfo.frequency.value = 2;
            lfoButton.class = "activated";
            lfoButton.innerHTML = "DUBSTEP ON";
            console.log('LFO ON!');
        } else {
            lfo.frequency.value = 0;
            lfoButton.class = "unactivated";
            lfoButton.innerHTML = "DUBSTEP";
            console.log('LFO OFF!');
        }
    });
});



// function voiceMute() {
//   if(mute.id == "") {
//     gainNode.gain.value = 0;
//     mute.id = "activated";
//     mute.innerHTML = "Unmute";
//   } else {
//     gainNode.gain.value = 1;
//     mute.id = "";
//     mute.innerHTML = "Mute";
//   }
// }





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
                oscGain.gain.value = 1;
                // oscillator.start(0);

            };
 keyboard.keyUp = function (note, frequency) {
                oscGain.gain.value = 0;
            };


// lfoOn();
