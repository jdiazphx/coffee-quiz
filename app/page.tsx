import Quiz from './components/Quiz';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5ebe0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px 64px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '480px', width: '100%' }}>
        {/* Logo */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontSize: '22px' }}>⛺</span>
          <span
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#3d2b1f',
              letterSpacing: '0.5px',
            }}
          >
            Basecamp Coffee
          </span>
        </div>
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#b07d4f',
            fontWeight: 600,
            marginBottom: '12px',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Basecamp Rewards
        </p>
        <h1
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '30px',
            fontWeight: 700,
            color: '#3d2b1f',
            lineHeight: '1.25',
            marginBottom: '10px',
          }}
        >
          What&rsquo;s Your Coffee Personality?
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: '#7a5540',
            lineHeight: '1.6',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          6 questions. Your full coffee identity. Find your perfect cup.
        </p>
      </div>

      {/* Quiz card */}
      <div
        style={{
          background: '#fffaf5',
          borderRadius: '20px',
          padding: '32px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 4px 24px rgba(100, 60, 20, 0.10), 0 1px 4px rgba(100, 60, 20, 0.06)',
        }}
      >
        <Quiz />
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: '32px',
          fontSize: '13px',
          color: '#a08060',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        Happy sipping ☕ — your local Basecamp · 45 locations across the PNW · Chief Experience Officer
      </p>
      <a
        href="/leadership-one-pager.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#b07d4f',
          fontFamily: "'Inter', system-ui, sans-serif",
          textDecoration: 'underline',
          opacity: 0.7,
        }}
      >
        Program Overview →
      </a>
    </div>
  );
}
