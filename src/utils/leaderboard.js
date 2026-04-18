const BEST_KEY    = "11plus_personal_bests";
const HISTORY_KEY = "11plus_history";

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ── Personal best ────────────────────────────────────────────────
export function getAllBests() {
  try { return JSON.parse(localStorage.getItem(BEST_KEY)) || {}; }
  catch { return {}; }
}

export function getBest(level, gameType) {
  return getAllBests()[`${level}-${gameType}`] || null;
}

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
    all[key] = { stars, wrong, time, date: new Date().toLocaleDateString("en-GB") };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(all)); } catch {}
  }
  return isNew;
}

// ── Run history ───────────────────────────────────────────────────
function getAllHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || {}; }
  catch { return {}; }
}

export function saveRun(level, gameType, stars, wrong, time) {
  const all = getAllHistory();
  const key = `${level}-${gameType}`;
  const runs = all[key] || [];
  runs.push({ stars, wrong, time, date: new Date().toLocaleDateString("en-GB") });
  // Keep only last 50 runs to cap storage
  all[key] = runs.slice(-50);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(all)); } catch {}
}

export function getTopRuns(level, gameType, n = 5) {
  const all  = getAllHistory();
  const runs = all[`${level}-${gameType}`] || [];
  return [...runs]
    .sort((a, b) =>
      b.stars - a.stars ||
      a.wrong - b.wrong ||
      a.time  - b.time
    )
    .slice(0, n);
}
