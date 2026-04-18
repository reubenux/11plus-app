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
  isCollapsed,
  onToggleCollapse,
}) {
  function handleSelect(id) {
    onSelectGame(id);
    onClose();
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed && <span className="sidebar-logo">🎓</span>}
          {!isCollapsed && (
            <div>
              <div className="sidebar-title">11+ Prep</div>
              <div className="sidebar-sub">Grammar &amp; Maths</div>
            </div>
          )}
          <button
            className="sidebar-toggle"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              /* Expand: chevron points right */
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <polyline points="12 9 16 12 12 15" />
              </svg>
            ) : (
              /* Collapse: chevron points left */
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <polyline points="16 9 12 12 16 15" />
              </svg>
            )}
          </button>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          {!isCollapsed && <div className="sidebar-section-label">English</div>}
          {ENGLISH_GAMES.map((g) => (
            <React.Fragment key={g.id}>
              <button
                className={`sidebar-item ${selectedGame === g.id ? "active" : ""}`}
                onClick={() => handleSelect(g.id)}
                title={isCollapsed ? g.label : undefined}
              >
                <span className="sidebar-item-icon">{g.icon}</span>
                {!isCollapsed && <span className="sidebar-item-label">{g.label}</span>}
              </button>

              {g.id === "wordMatch" && selectedGame === "wordMatch" && !isCollapsed && (
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

          {!isCollapsed && <div className="sidebar-section-label">Maths</div>}
          {MATHS_GAMES.map((g) => (
            <button
              key={g.id}
              className={`sidebar-item ${selectedGame === g.id ? "active" : ""}`}
              onClick={() => handleSelect(g.id)}
              title={isCollapsed ? g.label : undefined}
            >
              <span className="sidebar-item-icon">{g.icon}</span>
              {!isCollapsed && <span className="sidebar-item-label">{g.label}</span>}
              {!isCollapsed && <span className="coming-pill">Soon</span>}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
