import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";
import PunctuationScreen from "./components/PunctuationScreen";
import PunctuationGame from "./components/PunctuationGame";
import ComingSoon from "./components/ComingSoon";
import AuthButton from "./components/AuthButton";
import LoginScreen from "./components/LoginScreen";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./App.css";

const WORD_MATCH_ID = "wordMatch";
const GRAMMAR_ID    = "grammar";

function AppInner() {
  const { user } = useAuth();

  // Still checking auth state
  if (user === undefined) {
    return (
      <div className="app-loading">
        <span className="app-loading-logo">🎓</span>
        <p>Loading…</p>
      </div>
    );
  }

  // Not signed in — show login
  if (user === null) return <LoginScreen />;
  const [selectedGame, setSelectedGame] = useState(WORD_MATCH_ID);
  const [gameType, setGameType]         = useState("synonyms");
  const [grammarType, setGrammarType]   = useState("punctuation");
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [screen, setScreen] = useState("home");
  const [config, setConfig] = useState(null);
  const [playKey, setPlayKey] = useState(0);
  const [lastPunctConfig, setLastPunctConfig] = useState(null);

  function handleSelectGame(id) {
    setSelectedGame(id);
    setScreen("home");
  }

  function handlePlay(cfg) {
    if (isGrammar && grammarType === "punctuation") setLastPunctConfig(cfg);
    setConfig(cfg);
    setPlayKey((k) => k + 1);
    setScreen("game");
  }

  function handleHome() {
    setScreen("home");
  }

  const isWordMatch = selectedGame === WORD_MATCH_ID;
  const isGrammar   = selectedGame === GRAMMAR_ID;

  return (
    <div className="app-layout">
      <Sidebar
        selectedGame={selectedGame}
        onSelectGame={handleSelectGame}
        gameType={gameType}
        onGameTypeChange={(t) => { setGameType(t); setScreen("home"); }}
        grammarType={grammarType}
        onGrammarTypeChange={(t) => { setGrammarType(t); setScreen("home"); }}
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
          {!isWordMatch && !isGrammar && <ComingSoon gameId={selectedGame} />}

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

          {isGrammar && grammarType === "punctuation" && screen === "home" && (
            <PunctuationScreen onPlay={handlePlay} initialConfig={lastPunctConfig} />
          )}
          {isGrammar && grammarType === "punctuation" && screen === "game" && config && (
            <PunctuationGame
              key={playKey}
              level={config.level}
              totalQuestions={config.totalQuestions}
              onHome={handleHome}
            />
          )}
          {isGrammar && grammarType !== "punctuation" && (
            <ComingSoon gameId={selectedGame} />
          )}
        </div>

        <div className="auth-bar">
          <AuthButton />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
