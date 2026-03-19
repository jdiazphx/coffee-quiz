'use client';

import { useState, useEffect } from 'react';
import Results, { PersonalityResult } from './Results';

type PersonalityId = 'cozy' | 'zen' | 'health' | 'artisan' | 'pragmatist';

const personalities: Record<
  PersonalityId,
  { name: string; drink: string; tagline: string; description: string }
> = {
  cozy: {
    name: 'Cozy Classic',
    drink: 'Medium Roast Drip',
    tagline: 'Comfort in every cup',
    description:
      'You value warmth, routine, and the simple pleasure of a familiar cup. Coffee is your cozy corner of the day — reliable, comforting, and just right.',
  },
  zen: {
    name: 'Zen Minimalist',
    drink: 'Black Coffee, Single Origin',
    tagline: 'Simple. Clean. Perfect.',
    description:
      'You appreciate quality over complexity. You let the coffee speak for itself — no distractions, no frills. Just pure, clean flavor.',
  },
  health: {
    name: 'Health Nut',
    drink: 'Oat Milk Americano',
    tagline: 'Wellness in every sip',
    description:
      'You care about what goes into your body. Coffee is fuel for a balanced life — you want the energy boost without compromising your values.',
  },
  artisan: {
    name: 'Artisan Snob',
    drink: 'Pour-Over, Single Origin',
    tagline: 'You know what you like',
    description:
      'You know your origin stories, your brew ratios, your tasting notes. Coffee is a craft, and you respect the process from farm to cup.',
  },
  pragmatist: {
    name: 'Practical Pragmatist',
    drink: "Large Drip, Whatever's Fresh",
    tagline: 'Just make it work',
    description:
      "Coffee is a tool, and you use it well. You don't need ceremony — you need results. Hot, caffeinated, and ready to go. That's all.",
  },
};

const questions = [
  {
    id: 1,
    text: 'It\'s Saturday morning. What does your ideal start look like?',
    options: [
      { emoji: '🛋️', label: 'Slow morning on the couch with something cozy', personality: 'cozy' as PersonalityId },
      { emoji: '🧘', label: 'Quiet meditation, then a peaceful breakfast', personality: 'zen' as PersonalityId },
      { emoji: '🏃', label: 'Morning run followed by a healthy breakfast', personality: 'health' as PersonalityId },
      { emoji: '📖', label: 'Reading about something you\'re obsessed with', personality: 'artisan' as PersonalityId },
      { emoji: '✅', label: 'Knocking out your to-do list before noon', personality: 'pragmatist' as PersonalityId },
    ],
  },
  {
    id: 2,
    text: 'You\'re picking out a new bag. What matters most?',
    options: [
      { emoji: '🤎', label: 'It feels familiar and broken-in', personality: 'cozy' as PersonalityId },
      { emoji: '⬜', label: 'Clean lines, no unnecessary pockets', personality: 'zen' as PersonalityId },
      { emoji: '♻️', label: 'Sustainable materials and ethical brand', personality: 'health' as PersonalityId },
      { emoji: '🎨', label: 'Handmade, artisan quality with a story', personality: 'artisan' as PersonalityId },
      { emoji: '💼', label: 'It fits everything and doesn\'t slow you down', personality: 'pragmatist' as PersonalityId },
    ],
  },
  {
    id: 3,
    text: 'A friend asks for a restaurant recommendation. You suggest...',
    options: [
      { emoji: '🏠', label: 'Your favorite neighborhood spot you\'ve been going to for years', personality: 'cozy' as PersonalityId },
      { emoji: '🍜', label: 'That understated place with only a few things on the menu', personality: 'zen' as PersonalityId },
      { emoji: '🥗', label: 'A farm-to-table place with locally sourced ingredients', personality: 'health' as PersonalityId },
      { emoji: '🌟', label: 'A chef-driven spot where you know the sourcing story', personality: 'artisan' as PersonalityId },
      { emoji: '⚡', label: 'Wherever is close, has good reviews, and accepts reservations tonight', personality: 'pragmatist' as PersonalityId },
    ],
  },
  {
    id: 4,
    text: 'How do you approach a new hobby?',
    options: [
      { emoji: '💛', label: 'You ease into it — comfortable and no pressure', personality: 'cozy' as PersonalityId },
      { emoji: '🎯', label: 'Learn the fundamentals deeply before adding complexity', personality: 'zen' as PersonalityId },
      { emoji: '📊', label: 'Research the health benefits first, then commit fully', personality: 'health' as PersonalityId },
      { emoji: '🔬', label: 'Go deep immediately — you want mastery, not just basics', personality: 'artisan' as PersonalityId },
      { emoji: '🚀', label: 'Figure it out as you go — you\'ll optimize later', personality: 'pragmatist' as PersonalityId },
    ],
  },
  {
    id: 5,
    text: 'Your workspace looks like...',
    options: [
      { emoji: '🕯️', label: 'Cozy clutter — candles, plants, a soft throw blanket', personality: 'cozy' as PersonalityId },
      { emoji: '📐', label: 'Minimal and intentional — only what you need', personality: 'zen' as PersonalityId },
      { emoji: '🌿', label: 'Standing desk, diffuser, natural light, clean air', personality: 'health' as PersonalityId },
      { emoji: '🖼️', label: 'Curated with meaningful objects that have a story', personality: 'artisan' as PersonalityId },
      { emoji: '🖥️', label: 'Functional chaos — you know where everything is', personality: 'pragmatist' as PersonalityId },
    ],
  },
  {
    id: 6,
    text: 'It\'s been a hard day. How do you decompress?',
    options: [
      { emoji: '📺', label: 'Comfort TV, a warm drink, and your favorite blanket', personality: 'cozy' as PersonalityId },
      { emoji: '🌙', label: 'Quiet time alone — no screens, just stillness', personality: 'zen' as PersonalityId },
      { emoji: '🧗', label: 'A solid workout to reset your body and mind', personality: 'health' as PersonalityId },
      { emoji: '🎵', label: 'Diving into something you love — music, art, a craft project', personality: 'artisan' as PersonalityId },
      { emoji: '🗂️', label: 'Clearing your inbox so tomorrow starts fresh', personality: 'pragmatist' as PersonalityId },
    ],
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<PersonalityId, number>>({
    cozy: 0,
    zen: 0,
    health: 0,
    artisan: 0,
    pragmatist: 0,
  });
  const [selectedOption, setSelectedOption] = useState<PersonalityId | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<PersonalityResult[]>([]);
  const [animState, setAnimState] = useState<'enter' | 'exit'>('enter');

  const handleSelect = (personality: PersonalityId) => {
    setSelectedOption(personality);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newScores = { ...scores, [selectedOption]: scores[selectedOption] + 1 };

    // Start exit animation, then advance after it completes
    setAnimState('exit');
    setTimeout(() => {
      setScores(newScores);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        const total = questions.length;
        const sorted = (Object.keys(newScores) as PersonalityId[])
          .map((id) => ({
            id,
            ...personalities[id],
            percentage: Math.round((newScores[id] / total) * 100),
          }))
          .sort((a, b) => b.percentage - a.percentage);
        setResults(sorted);
        setShowResults(true);
      }
      setAnimState('enter');
    }, 280);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setScores({ cozy: 0, zen: 0, health: 0, artisan: 0, pragmatist: 0 });
    setSelectedOption(null);
    setShowResults(false);
    setResults([]);
  };

  const q = questions[currentQuestion];

  if (showResults) {
    return <Results results={results} onRetake={handleRetake} />;
  }

  const animStyle: React.CSSProperties =
    animState === 'exit'
      ? { opacity: 0, transform: 'translateX(-24px)', transition: 'opacity 0.28s ease, transform 0.28s ease' }
      : { opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.3s ease, transform 0.3s ease' };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Progress */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', color: '#8a6a52' }}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span style={{ fontSize: '13px', color: '#b07d4f', fontWeight: 600 }}>
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ background: '#e8d5c0', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
          <div
            style={{
              background: '#b07d4f',
              height: '100%',
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              borderRadius: '999px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '10px', justifyContent: 'center' }}>
          {questions.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentQuestion ? '20px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: i <= currentQuestion ? '#b07d4f' : '#e8d5c0',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Question + Options (animated) */}
      <div style={animStyle}>
      <h2
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '22px',
          fontWeight: 600,
          color: '#3d2b1f',
          marginBottom: '20px',
          lineHeight: '1.4',
        }}
      >
        {q.text}
      </h2>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {q.options.map((option) => {
          const isSelected = selectedOption === option.personality;
          return (
            <button
              key={option.personality}
              onClick={() => handleSelect(option.personality)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                background: isSelected ? '#fdf0e4' : '#fffaf5',
                border: `2px solid ${isSelected ? '#b07d4f' : '#e8d5c0'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                width: '100%',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#c9a07a';
                  (e.currentTarget as HTMLButtonElement).style.background = '#fdf8f3';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#e8d5c0';
                  (e.currentTarget as HTMLButtonElement).style.background = '#fffaf5';
                }
              }}
            >
              <span style={{ fontSize: '22px', flexShrink: 0 }}>{option.emoji}</span>
              <span
                style={{
                  fontSize: '14px',
                  color: isSelected ? '#5c3d2e' : '#5c3d2e',
                  fontWeight: isSelected ? 500 : 400,
                  lineHeight: '1.4',
                }}
              >
                {option.label}
              </span>
              {isSelected && (
                <span
                  style={{
                    marginLeft: 'auto',
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    background: '#b07d4f',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fffaf5',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
      </div>{/* end animated wrapper */}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!selectedOption}
        style={{
          width: '100%',
          padding: '15px',
          background: selectedOption ? '#b07d4f' : '#e8d5c0',
          border: 'none',
          borderRadius: '12px',
          color: selectedOption ? '#fffaf5' : '#b09070',
          fontSize: '16px',
          fontWeight: 600,
          cursor: selectedOption ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See My Results →'}
      </button>
    </div>
  );
}
