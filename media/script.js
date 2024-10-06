Split(['#left', '#staff', '#right'], {
  sizes: [10, 80, 10]
})

// Create renderer
VexFlow.setFonts('Bravura');
let { Factory } = VexFlow;
const vf = new Factory({
  renderer: { elementId: 'staff', width: 500, height: 200 },
});

const score = vf.EasyScore();
const system = vf.System();

system
  .addStave({
    voices: [
      score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
      score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
    ],
  })
  .addClef('treble')
  .addTimeSignature('4/4');

vf.draw();

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
