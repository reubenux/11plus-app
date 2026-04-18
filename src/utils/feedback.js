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

  // Sound — ascending two-note chime (C5 → E5)
  try {
    const c   = audioCtx();
    const now = c.currentTime;
    tone(523, now,        0.18);  // C5
    tone(659, now + 0.12, 0.22);  // E5
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
