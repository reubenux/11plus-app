const KEY = "11plus_personal_bests";

export function getAllBests() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

export function getBest(level, gameType) {
  return getAllBests()[`${level}-${gameType}`] || null;
}

// Saves if this run is better. Returns true if a new best was set.
export function saveIfBest(level, gameType, stars, wrong) {
  const all  = getAllBests();
  const key  = `${level}-${gameType}`;
  const prev = all[key];
  const isNew =
    !prev ||
    stars > prev.stars ||
    (stars === prev.stars && wrong < prev.wrong);

  if (isNew) {
    all[key] = { stars, wrong, date: new Date().toLocaleDateString("en-GB") };
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
  }
  return isNew;
}
