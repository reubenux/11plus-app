import React from "react";

const ENGLISH_GAMES = [
  { id: "wordMatch", label: "Word Match", icon: "📚" },
  { id: "grammar",   label: "Grammar",    icon: "✏️" },
];

const MATHS_GAMES = [
  { id: "romanNumbers",    label: "Roman Numbers",                        icon: "🏛️" },
  { id: "placeValue",      label: "Place Value",                          icon: "🔢" },
  { id: "fracDecPerc",     label: "Equivalent, Decimal, Fraction & %",    icon: "🔣" },
  { id: "mathSymbols",     label: "Mathematical Symbols",                 icon: "➕" },
  { id: "periodsOfTime",   label: "Periods of Time",                      icon: "📅" },
  { id: "timeConversion",  label: "Time Conversion",                      icon: "⏱️" },
  { id: "measurement",     label: "Units of Measurement",                 icon: "📏" },
  { id: "typesOfAngles",   label: "Types of Angles",                      icon: "📐" },
  { id: "pairsOfAngles",   label: "Pairs of Angles",                      icon: "🔺" },
  { id: "probability",     label: "Probability",                          icon: "🎲" },
  { id: "vennDiagrams",    label: "Venn Diagrams",                        icon: "⭕" },
];

export default function Sidebar({
  selectedGame,
  onSelectGame,
  gameType,
  onGameTypeChange,
  isOpen,
  onClose,
}) {
  function handleSelect(id) {
    onSelectGame(id);
    onClose();
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🎓</span>
          <div>
            <div className="sidebar-title">11+ Prep</div>
            <div className="sidebar-sub">Grammar &amp; Maths</div>
          </div>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">English</div>
          {ENGLISH_GAMES.map((g) => (
            <React.Fragment key={g.id}>
              <button
                className={`sidebar-item ${selectedGame === g.id ? "active" : ""}`}
                onClick={() => handleSelect(g.id)}
              >
                <span className="sidebar-item-icon">{g.icon}</span>
                <span className="sidebar-item-label">{g.label}</span>
              </button>

              {g.id === "wordMatch" && selectedGame === "wordMatch" && (
                <div className="sidebar-sub-options">
                  <button
                    className={`sub-opt ${gameType === "synonyms" ? "active" : ""}`}
                    onClick={() => { onGameTypeChange("synonyms"); onClose(); }}
                  >
                    🟣 Synonyms
                  </button>
                  <button
                    className={`sub-opt ${gameType === "antonyms" ? "active" : ""}`}
                    onClick={() => { onGameTypeChange("antonyms"); onClose(); }}
                  >
                    🟠 Antonyms
                  </button>
                </div>
              )}

            </React.Fragment>
          ))}

          <div className="sidebar-section-label">Maths</div>
          {MATHS_GAMES.map((g) => (
            <button
              key={g.id}
              className={`sidebar-item ${selectedGame === g.id ? "active" : ""}`}
              onClick={() => handleSelect(g.id)}
            >
              <span className="sidebar-item-icon">{g.icon}</span>
              <span className="sidebar-item-label">{g.label}</span>
              <span className="coming-pill">Soon</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
