import React from "react";

const GAME_META = {
  grammar:        { icon: "✏️",  title: "Grammar",                             desc: "Sharpen your grammar skills with fun exercises." },
  romanNumbers:   { icon: "🏛️", title: "Roman Numbers",                        desc: "Learn to read and write Roman numerals." },
  placeValue:     { icon: "🔢",  title: "Place Value",                          desc: "Understand units, tens, hundreds and beyond." },
  fracDecPerc:    { icon: "🔣",  title: "Equivalent, Decimal, Fraction & %",    desc: "Convert between fractions, decimals and percentages." },
  mathSymbols:    { icon: "➕",  title: "Mathematical Symbols",                 desc: "Master the symbols used in maths." },
  periodsOfTime:  { icon: "📅",  title: "Periods of Time",                      desc: "Explore days, months, years, decades and more." },
  timeConversion: { icon: "⏱️",  title: "Time Conversion",                      desc: "Convert between seconds, minutes, hours and days." },
  measurement:    { icon: "📏",  title: "Units of Measurement",                 desc: "Learn mm, cm, m, km, ml, l and more." },
  typesOfAngles:  { icon: "📐",  title: "Types of Angles",                      desc: "Identify acute, obtuse, right and reflex angles." },
  pairsOfAngles:  { icon: "🔺",  title: "Pairs of Angles",                      desc: "Discover complementary, supplementary and more." },
  probability:    { icon: "🎲",  title: "Probability",                          desc: "Predict outcomes with likelihood and chance." },
  vennDiagrams:   { icon: "⭕",  title: "Venn Diagrams",                        desc: "Sort and compare sets using overlapping circles." },
};

export default function ComingSoon({ gameId }) {
  const meta = GAME_META[gameId] ?? { icon: "🎮", title: gameId, desc: "Coming soon!" };

  return (
    <div className="coming-soon-screen">
      <div className="coming-soon-card">
        <div className="cs-icon">{meta.icon}</div>
        <h1 className="cs-title">{meta.title}</h1>
        <p className="cs-desc">{meta.desc}</p>
        <div className="cs-badge">🚧 Coming Soon</div>
      </div>
    </div>
  );
}
