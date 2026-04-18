let _ctx = null;

function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  return _ctx;
}

// On iOS Safari, AudioContext starts suspended — resume it first, then schedule tones
function playTones(schedule) {
  try {
    const c = getCtx();
    const run = () => {
      const now = c.currentTime;
      schedule(c, now);
    };
    if (c.state === "suspended") {
      c.resume().then(run);
    } else {
      run();
    }
  } catch (_) {}
}

function tone(c, freq, start, duration, vol = 0.28) {
  const osc  = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.start(start);
  osc.stop(start + duration);
}

export function playCorrect() {
  try { if (navigator.vibrate) navigator.vibrate(40); } catch (_) {}

  playTones((c, now) => {
    tone(c, 523,  now,        0.6,  0.18);  // C5
    tone(c, 784,  now + 0.12, 0.55, 0.12);  // G5
    tone(c, 1047, now + 0.24, 0.7,  0.08);  // C6
  });
}

export function playWrong() {
  try { if (navigator.vibrate) navigator.vibrate([40, 60, 40]); } catch (_) {}

  playTones((c, now) => {
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = "square";
    osc.frequency.value = 160;
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.start(now);
    osc.stop(now + 0.18);
  });
}
