import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";
import ComingSoon from "./components/ComingSoon";
import "./App.css";

const WORD_MATCH_ID = "wordMatch";

export default function App() {
  const [selectedGame, setSelectedGame] = useState(WORD_MATCH_ID);
  const [gameType, setGameType] = useState("synonyms");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [screen, setScreen] = useState("home");
  const [config, setConfig] = useState(null);
  const [playKey, setPlayKey] = useState(0);

  function handleSelectGame(id) {
    setSelectedGame(id);
    setScreen("home");
  }

  function handlePlay(cfg) {
    setConfig(cfg);
    setPlayKey((k) => k + 1);
    setScreen("game");
  }

  function handleHome() {
    setScreen("home");
  }

  const isWordMatch = selectedGame === WORD_MATCH_ID;

  return (
    <div className="app-layout">
      <Sidebar
        selectedGame={selectedGame}
        onSelectGame={handleSelectGame}
        gameType={gameType}
        onGameTypeChange={(t) => { setGameType(t); setScreen("home"); }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      <div className="main-area">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className="main-content">
          {!isWordMatch && <ComingSoon gameId={selectedGame} />}

          {isWordMatch && screen === "home" && (
            <HomeScreen gameType={gameType} onPlay={handlePlay} />
          )}

          {isWordMatch && screen === "game" && config && (
            <GameScreen
              key={playKey}
              level={config.level}
              gameType={gameType}
              totalQuestions={config.totalQuestions}
              onHome={handleHome}
            />
          )}
        </div>
      </div>
    </div>
  );
}
