import React, { useState } from "react";

const ENGLISH_GAMES = [
  { id: "wordMatch", label: "Word Match", icon: "📚", subPages: true },
  { id: "grammar",   label: "Grammar",    icon: "✏️", subPages: true },
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

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24" width="14" height="14"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Sidebar({
  selectedGame,
  onSelectGame,
  gameType,
  onGameTypeChange,
  grammarType,
  onGrammarTypeChange,
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) {
  const [expanded, setExpanded] = useState(
    () => selectedGame === "wordMatch" ? ["wordMatch"] : []
  );

  function toggleExpand(id) {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleSelect(g) {
    if (g.subPages) {
      onSelectGame(g.id);
      toggleExpand(g.id);
      // keep sidebar open so user can pick sub-page
    } else {
      onSelectGame(g.id);
      onClose();
    }
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
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <polyline points="12 9 16 12 12 15" />
              </svg>
            ) : (
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
          {ENGLISH_GAMES.map((g) => {
            const isActive   = selectedGame === g.id;
            const isExpanded = expanded.includes(g.id);
            return (
              <React.Fragment key={g.id}>
                <button
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  onClick={() => handleSelect(g)}
                  title={isCollapsed ? g.label : undefined}
                >
                  <span className="sidebar-item-icon">{g.icon}</span>
                  {!isCollapsed && <span className="sidebar-item-label">{g.label}</span>}
                  {!isCollapsed && g.subPages && <ChevronIcon open={isExpanded} />}
                </button>

                {g.id === "wordMatch" && isExpanded && !isCollapsed && (
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

                {g.id === "grammar" && isExpanded && !isCollapsed && (
                  <div className="sidebar-sub-options">
                    <button
                      className={`sub-opt ${grammarType === "punctuation" ? "active" : ""}`}
                      onClick={() => { onGrammarTypeChange("punctuation"); onClose(); }}
                    >
                      🔤 Punctuation
                    </button>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {!isCollapsed && <div className="sidebar-section-label">Maths</div>}
          {MATHS_GAMES.map((g) => (
            <button
              key={g.id}
              className={`sidebar-item ${selectedGame === g.id ? "active" : ""}`}
              onClick={() => handleSelect(g)}
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
