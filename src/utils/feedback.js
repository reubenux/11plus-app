let _ctx = null;

function audioCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  return _ctx;
}

function tone(freq, start, duration, vol = 0.28) {
  const c = audioCtx();
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
  // Haptic — short single pulse
  try { if (navigator.vibrate) navigator.vibrate(40); } catch (_) {}

  // Sound — soft bowl arpeggio (C5 → G5 → C6), slow decay, low volume
  try {
    const c   = audioCtx();
    const now = c.currentTime;
    tone(523,  now,        0.6,  0.18);  // C5
    tone(784,  now + 0.12, 0.55, 0.12);  // G5
    tone(1047, now + 0.24, 0.7,  0.08);  // C6
  } catch (_) {}
}

export function playWrong() {
  // Haptic — two short pulses
  try { if (navigator.vibrate) navigator.vibrate([40, 60, 40]); } catch (_) {}

  // Sound — low short buzz
  try {
    const c   = audioCtx();
    const now = c.currentTime;
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
  } catch (_) {}
}
