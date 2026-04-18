import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const BEST_KEY    = "11plus_personal_bests";
const HISTORY_KEY = "11plus_history";

function localBests()   { try { return JSON.parse(localStorage.getItem(BEST_KEY))    || {}; } catch { return {}; } }
function localHistory() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || {}; } catch { return {}; } }

function isBetter(a, b) {
  if (!b) return true;
  return a.stars > b.stars ||
    (a.stars === b.stars && a.wrong < b.wrong) ||
    (a.stars === b.stars && a.wrong === b.wrong && (a.time ?? 0) < (b.time ?? 0));
}

// On sign-in: pull cloud data and merge into localStorage (best score wins)
export async function mergeFromCloud(userId) {
  try {
    const snap = await getDoc(doc(db, "users", userId));
    if (!snap.exists()) return;

    const { bests: cloudBests = {}, history: cloudHistory = {} } = snap.data();

    // Merge bests — keep whichever is better
    const merged = { ...localBests() };
    for (const [key, cloud] of Object.entries(cloudBests)) {
      if (isBetter(cloud, merged[key])) merged[key] = cloud;
    }
    localStorage.setItem(BEST_KEY, JSON.stringify(merged));

    // History — cloud is authoritative; merge any local runs not yet uploaded
    const localH = localHistory();
    const mergedH = { ...cloudHistory };
    for (const [key, runs] of Object.entries(localH)) {
      if (!mergedH[key]) mergedH[key] = runs;
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(mergedH));
  } catch (e) {
    console.error("mergeFromCloud:", e);
  }
}

// After each game: push current localStorage state to Firestore
export async function pushToCloud(userId) {
  try {
    await setDoc(
      doc(db, "users", userId),
      { bests: localBests(), history: localHistory(), updatedAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (e) {
    console.error("pushToCloud:", e);
  }
}
