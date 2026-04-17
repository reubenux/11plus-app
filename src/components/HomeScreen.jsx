import React, { useState } from "react";

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

export default function HomeScreen({ gameType, onPlay }) {
  const [level, setLevel] = useState("A");
  const info = TYPE_INFO[gameType];

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
          {LEVELS.map((l) => (
            <button
              key={l.id}
              className={`level-btn ${level === l.id ? "active" : ""}`}
              onClick={() => setLevel(l.id)}
            >
              <span className="level-emoji">{l.emoji}</span>
              <span className="level-label">{l.label}</span>
              <span className="level-desc">{l.desc}</span>
            </button>
          ))}
        </div>

        <button className="play-btn" onClick={() => onPlay({ level })}>
          Play! 🎮
        </button>
      </div>
    </div>
  );
}
