import React, { useState } from "react";
import { getBest, getTopRuns, formatTime } from "../utils/leaderboard";

const LEVELS = [
  { id: "A", label: "Level A", desc: "Easiest",      emoji: "🌱" },
  { id: "B", label: "Level B", desc: "Intermediate", emoji: "⚡" },
  { id: "C", label: "Level C", desc: "Hardest",      emoji: "🔥" },
];

const TYPE_INFO = {
  synonyms: {
    emoji: "🟣",
    label: "Synonyms",
    description: "Synonyms are words that have the same or very similar meaning — e.g. Happy and Joyful.",
  },
  antonyms: {
    emoji: "🟠",
    label: "Antonyms",
    description: "Antonyms are words that have opposite meanings — e.g. Happy and Sad.",
  },
};

const Q_OPTIONS = [5, 10, 20, 30];
const MAX_STARS = 60;
const MEDALS = ["🥇", "🥈", "🥉", "4", "5"];

export default function HomeScreen({ gameType, onPlay }) {
  const [level, setLevel]               = useState("A");
  const [totalQuestions, setTotal]      = useState(20);
  const info    = TYPE_INFO[gameType];
  const best    = getBest(level, gameType);
  const topRuns = getTopRuns(level, gameType, 5);

  return (
    <div className="home-screen">
      <div className="home-card">
        <div className="home-title">
          <span className="home-emoji">📚</span>
          <h1>Word Match</h1>
          <p className="home-subtitle">
            {info.emoji} {info.label}
          </p>
        </div>

        <p className="game-type-desc">{info.description}</p>

        <div className="section-label">Choose Level</div>
        <div className="level-group">
          {LEVELS.map((l) => {
            const lb = getBest(l.id, gameType);
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
                  <span className="level-best">⭐ {lb.stars}/{MAX_STARS}</span>
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

        {best ? (
          <div className="home-best">
            <span className="home-best-label">🏆 Personal Best</span>
            <span className="home-best-score">⭐ {best.stars}/{MAX_STARS}</span>
            <span className="home-best-detail">{best.wrong} wrong · ⏱ {formatTime(best.time ?? 0)} · {best.date}</span>
          </div>
        ) : (
          <div className="home-best home-best--empty">
            No score yet — be the first! 🎯
          </div>
        )}

        {topRuns.length > 0 && (
          <div className="leaderboard">
            <div className="section-label">🏆 Top {topRuns.length} Scores</div>
            <table className="lb-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Stars</th>
                  <th>Wrong</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {topRuns.map((r, i) => (
                  <tr key={i} className={i === 0 ? "lb-row lb-top" : "lb-row"}>
                    <td className="lb-rank">{MEDALS[i]}</td>
                    <td>⭐ {r.stars}/{MAX_STARS}</td>
                    <td className={r.wrong === 0 ? "lb-zero" : ""}>{r.wrong}</td>
                    <td>{formatTime(r.time ?? 0)}</td>
                    <td className="lb-date">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button className="play-btn" onClick={() => onPlay({ level, totalQuestions })}>
          Play! 🎮
        </button>
      </div>
    </div>
  );
}
