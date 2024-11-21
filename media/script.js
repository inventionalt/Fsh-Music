import { FMusic } from './engine.js'

// Dynamic splits
Split(['#left', '#staff', '#right'], {
  sizes: [10, 80, 10]
})

// Create engine
let engine = new FMusic();

engine.setTrack(0, {
  clef: 'g',
  text: 'Piano',
  inner: 't:4/4,n:w/6,b,n:h/7,n:h/6,b,n:q/4/d,n:e/5,n:h/4,b,n:sw/4'
});

engine.paint('staff')

/*
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(note) {
  let oscillator = audioCtx.createOscillator();
  let gainNode = audioCtx.createGain();

  oscillator.frequency.setValueAtTime(note, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();

  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1);
}
*/
