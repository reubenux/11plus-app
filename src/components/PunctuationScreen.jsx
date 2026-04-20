import React, { useState } from "react";
import { getBest, getTopRuns, formatTime, formatDate } from "../utils/leaderboard";

const LEVELS = [
  { id: "A", label: "Level A", desc: "Easiest",      emoji: "🌱" },
  { id: "B", label: "Level B", desc: "Intermediate", emoji: "⚡" },
  { id: "C", label: "Level C", desc: "Hardest",      emoji: "🔥" },
];

const Q_OPTIONS = [5, 10, 20, 30];
const MEDALS = ["🥇", "🥈", "🥉", "4", "5"];

export default function PunctuationScreen({ onPlay, initialConfig }) {
  const [level, setLevel]          = useState(initialConfig?.level ?? "A");
  const [totalQuestions, setTotal] = useState(initialConfig?.totalQuestions ?? 20);

  const maxStars = totalQuestions * 3;
  const best     = getBest(level, "punctuation", totalQuestions);
  const topRuns  = getTopRuns(level, "punctuation", totalQuestions, 5);

  return (
    <div className="home-screen">
      <div className="home-card">

        <div className="home-title">
          <span className="home-emoji">✏️</span>
          <h1>Punctuation</h1>
          <p className="home-subtitle">🔤 Grammar</p>
        </div>

        <p className="game-type-desc">
          Learn how to use commas, full stops, apostrophes, question marks and more correctly in sentences.
        </p>

        <div className="home-columns">

          {/* ── Left: controls ── */}
          <div className="home-col home-col-controls">
            <div className="section-label">Choose Level</div>
            <div className="level-group">
              {LEVELS.map((l) => {
                const lb = getBest(l.id, "punctuation", totalQuestions);
                return (
                  <button
                    key={l.id}
                    className={`level-btn ${level === l.id ? "active" : ""}`}
                    onClick={() => setLevel(l.id)}
                  >
                    <span className="level-emoji">{l.emoji}</span>
                    <span className="level-label">{l.label}</span>
                    <span className="level-desc">{l.desc}</span>
                    {lb && (
                      <span className="level-best">⭐ {lb.stars}/{maxStars}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="section-label">Number of Questions</div>
            <div className="q-bar">
              {Q_OPTIONS.map((q, i) => {
                const activeIdx  = Q_OPTIONS.indexOf(totalQuestions);
                const isFilled   = i <= activeIdx;
                const isSelected = q === totalQuestions;
                return (
                  <button
                    key={q}
                    className={`q-segment ${isFilled ? "filled" : ""} ${isSelected ? "selected" : ""}`}
                    onClick={() => setTotal(q)}
                  >
                    {q}
                  </button>
                );
              })}
            </div>

            <button className="play-btn" onClick={() => onPlay({ level, totalQuestions })}>
              Play! 🎮
            </button>
          </div>

          {/* ── Right: scores ── */}
          <div className="home-col home-col-scores">
            <div className="section-label">🏆 Personal Best</div>
            {best ? (
              <div className="home-best">
                <span className="home-best-score">⭐ {best.stars}/{maxStars}</span>
                <span className="home-best-detail">{best.wrong} wrong · ⏱ {formatTime(best.time ?? 0)} · {formatDate(best.date)}</span>
              </div>
            ) : (
              <div className="home-best home-best--empty">No score yet — be the first! 🎯</div>
            )}

            <div className="section-label">Your Best Runs</div>
            {topRuns.length > 0 ? (
              <table className="lb-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Stars</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {topRuns.map((r, i) => (
                    <tr key={i} className={i === 0 ? "lb-row lb-top" : "lb-row"}>
                      <td className="lb-rank">{i + 1}</td>
                      <td>⭐ {r.stars}/{maxStars}</td>
                      <td>{formatTime(r.time ?? 0)}</td>
                      <td className="lb-date">{formatDate(r.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="home-best home-best--empty">Play a game to see your best runs here! 🎯</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
