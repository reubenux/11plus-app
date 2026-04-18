const KEY = "11plus_personal_bests";

export function getAllBests() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

export function getBest(level, gameType) {
  return getAllBests()[`${level}-${gameType}`] || null;
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Returns true if this run sets a new personal best
export function saveIfBest(level, gameType, stars, wrong, time) {
  const all  = getAllBests();
  const key  = `${level}-${gameType}`;
  const prev = all[key];
  const isNew =
    !prev ||
    stars > prev.stars ||
    (stars === prev.stars && wrong < prev.wrong) ||
    (stars === prev.stars && wrong === prev.wrong && time < prev.time);

  if (isNew) {
    all[key] = {
      stars,
      wrong,
      time,
      date: new Date().toLocaleDateString("en-GB"),
    };
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
  }
  return isNew;
}
