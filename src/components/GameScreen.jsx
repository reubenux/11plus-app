import React, { useState, useMemo, useEffect } from "react";
import { wordData } from "../data/words";

const PAIRS_PER_ROUND = 6;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GameScreen({ level, gameType, onHome }) {
  const allPairs = wordData[level][gameType];

  const [bank, setBank] = useState(() => shuffle([...allPairs]));
  const [startIdx, setStartIdx] = useState(0);
  const [roundNum, setRoundNum] = useState(1);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matchedLeft, setMatchedLeft] = useState({});
  const [matchedRight, setMatchedRight] = useState({});
  const [wrongPair, setWrongPair] = useState(null);
  const [score, setScore] = useState(0);

  const pairs = useMemo(
    () => bank.slice(startIdx, startIdx + PAIRS_PER_ROUND),
    [bank, startIdx]
  );

  const leftCards = useMemo(
    () => shuffle(pairs.map((p, i) => ({ ...p, origIdx: i }))),
    [pairs]
  );
  const rightWords = useMemo(() => shuffle(pairs.map((p) => p.match)), [pairs]);

  useEffect(() => {
    if (score > 0 && score === pairs.length) {
      setRoundComplete(true);
      setTotalCorrect((t) => t + score);

      const t = setTimeout(() => {
        const nextIdx = startIdx + PAIRS_PER_ROUND;
        const newBank = nextIdx >= bank.length ? shuffle([...allPairs]) : bank;
        const newStart = nextIdx >= bank.length ? 0 : nextIdx;

        setBank(newBank);
        setStartIdx(newStart);
        setScore(0);
        setSelectedLeft(null);
        setMatchedLeft({});
        setMatchedRight({});
        setWrongPair(null);
        setRoundComplete(false);
        setRoundNum((r) => r + 1);
      }, 1200);

      return () => clearTimeout(t);
    }
  }, [score, pairs.length]);

  function handleLeftTap(card) {
    if (matchedLeft[card.origIdx]) return;
    setSelectedLeft(card);
  }

  function handleRightTap(word) {
    if (!selectedLeft) return;
    if (matchedRight[word]) return;

    if (selectedLeft.match === word) {
      setMatchedLeft((prev) => ({ ...prev, [selectedLeft.origIdx]: true }));
      setMatchedRight((prev) => ({ ...prev, [word]: true }));
      setScore((s) => s + 1);
      setSelectedLeft(null);
    } else {
      setTotalWrong((w) => w + 1);
      setWrongPair({ left: selectedLeft.origIdx, right: word });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
      }, 600);
    }
  }

  const typeLabel = gameType === "synonyms" ? "Synonyms" : "Antonyms";

  return (
    <div className="game-screen">
      {roundComplete && (
        <div className="round-overlay">
          <div className="round-msg">🎉 Round {roundNum} Complete!</div>
        </div>
      )}

      <div className="game-header">
        <button className="back-btn" onClick={onHome}>← Home</button>
        <span className="level-badge">Level {level}</span>
        <span className="type-badge">{typeLabel}</span>
        <span className="correct-badge">✓ {totalCorrect}</span>
        <span className="wrong-badge">✗ {totalWrong}</span>
      </div>

      <p className="game-instruction">
        {gameType === "synonyms"
          ? "Match each word with its synonym (same meaning)"
          : "Match each word with its antonym (opposite meaning)"}
      </p>

      <div className="columns">
        <div className="column">
          {leftCards.map((card) => {
            const isMatched = matchedLeft[card.origIdx];
            const isSelected = selectedLeft?.origIdx === card.origIdx;
            const isWrong = wrongPair?.left === card.origIdx;
            return (
              <button
                key={card.origIdx}
                className={`word-card left-card ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""} ${isWrong ? "wrong" : ""}`}
                onClick={() => handleLeftTap(card)}
                disabled={isMatched}
              >
                {card.word}
              </button>
            );
          })}
        </div>

        <div className="column-divider">
          {Array.from({ length: pairs.length }).map((_, i) => (
            <div key={i} className="divider-dot" />
          ))}
        </div>

        <div className="column">
          {rightWords.map((word) => {
            const isMatched = matchedRight[word];
            const isWrong = wrongPair?.right === word;
            return (
              <button
                key={word}
                className={`word-card right-card ${isMatched ? "matched" : ""} ${isWrong ? "wrong" : ""}`}
                onClick={() => handleRightTap(word)}
                disabled={isMatched}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
