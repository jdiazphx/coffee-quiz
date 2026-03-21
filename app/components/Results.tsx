'use client';

import { useState, useEffect } from 'react';

export type PersonalityResult = {
  id: string;
  name: string;
  drink: string;
  tagline: string;
  description: string;
  percentage: number;
};

type ResultsProps = {
  results: PersonalityResult[];
  onRetake: () => void;
};

export default function Results({ results, onRetake }: ResultsProps) {
  const top = results[0];
  const [visible, setVisible] = useState(false);
  const [barsReady, setBarsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setBarsReady(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleShare = async () => {
    const text = `I'm a ${top.name}! My perfect cup: ${top.drink}. Find your coffee personality ☕`;
    const url = 'https://mainelycoolers.com';
    if (navigator.share) {
      await navigator.share({ title: "What's Your Coffee Personality?", text, url });
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Top result */}
      <div
        style={{
          background: 'linear-gradient(135deg, #b07d4f 0%, #8a5d35 100%)',
          borderRadius: '16px',
          padding: '32px',
          color: '#fffaf5',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '8px' }}>
          Your Coffee Personality
        </p>
        <h2
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '4px',
          }}
        >
          {top.name}
        </h2>
        <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px', opacity: 0.9 }}>
          {top.drink}
        </p>
        <p style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.8, marginBottom: '16px' }}>
          &ldquo;{top.tagline}&rdquo;
        </p>
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '8px',
            padding: '12px 16px',
          }}
        >
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{top.description}</p>
        </div>
        <div
          style={{
            marginTop: '16px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '999px',
            height: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: '#fffaf5',
              height: '100%',
              width: barsReady ? `${top.percentage}%` : '0%',
              borderRadius: '999px',
              transition: 'width 1s ease',
            }}
          />
        </div>
        <p style={{ fontSize: '13px', marginTop: '6px', opacity: 0.8 }}>{top.percentage}% match</p>
      </div>

      {/* All personalities breakdown */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '18px',
            fontWeight: 600,
            color: '#3d2b1f',
            marginBottom: '16px',
          }}
        >
          Your Full Blend
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {results.map((p, i) => (
            <div
              key={p.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(16px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.08}s, transform 0.4s ease ${0.3 + i * 0.08}s`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#3d2b1f' }}>
                  {i === 0 && (
                    <span
                      style={{
                        background: '#b07d4f',
                        color: '#fffaf5',
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '999px',
                        marginRight: '6px',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                      }}
                    >
                      TOP
                    </span>
                  )}
                  {p.name}
                </span>
                <span style={{ fontSize: '14px', color: '#b07d4f', fontWeight: 600 }}>{p.percentage}%</span>
              </div>
              <div
                style={{
                  background: '#e8d5c0',
                  borderRadius: '999px',
                  height: '6px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    background: i === 0 ? '#b07d4f' : '#c9a07a',
                    height: '100%',
                    width: barsReady ? `${p.percentage}%` : '0%',
                    borderRadius: '999px',
                    transition: `width 0.9s ease ${0.4 + i * 0.1}s`,
                    opacity: i === 0 ? 1 : 0.6 + (0.4 * (results.length - i)) / results.length,
                  }}
                />
              </div>
              <p style={{ fontSize: '12px', color: '#8a6a52', marginTop: '3px' }}>{p.drink}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: '#fdf6ee',
          border: '1px solid #e8d5c0',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <p style={{ fontSize: '14px', color: '#5c3d2e', marginBottom: '4px', fontWeight: 500 }}>
          Ask your barista for your perfect match
        </p>
        <p style={{ fontSize: '13px', color: '#8a6a52' }}>
          Show them your results and earn bonus Basecamp Rewards points!
        </p>
      </div>

      <button
        onClick={handleShare}
        style={{
          width: '100%',
          padding: '15px',
          background: '#b07d4f',
          border: 'none',
          borderRadius: '12px',
          color: '#fffaf5',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '10px',
          fontFamily: "'Inter', system-ui, sans-serif",
          transition: 'background 0.2s ease',
        }}
      >
        {copied ? 'Copied to clipboard! ✓' : 'Share My Results ↗'}
      </button>

      <button
        onClick={onRetake}
        style={{
          width: '100%',
          padding: '14px',
          background: 'transparent',
          border: '2px solid #b07d4f',
          borderRadius: '12px',
          color: '#b07d4f',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = '#b07d4f';
          (e.target as HTMLButtonElement).style.color = '#fffaf5';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = 'transparent';
          (e.target as HTMLButtonElement).style.color = '#b07d4f';
        }}
      >
        Retake the Quiz
      </button>
    </div>
  );
}
