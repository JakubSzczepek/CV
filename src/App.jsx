import { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

// ── Loading / Error screen ────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(11,15,20,0.96)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', zIndex: 9999, gap: '1rem', color: '#fff',
    }}>
      <div style={{
        width: 48, height: 48, border: '4px solid rgba(255,255,255,0.1)',
        borderLeftColor: '#33D17A', borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span>Ładowanie...</span>
    </div>
  )
}

// ── Inner app (uses context) ──────────────────────────────────────────────────

function CVApp() {
  const { loading, error } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search)
    }
  }, [])

  if (loading) return <LoadingScreen />
  if (error) return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#0B0F14', color: '#fff',
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Błąd ładowania danych</h2>
        <p style={{ color: '#A0AEC0', margin: '1rem 0' }}>{error}</p>
        <button onClick={() => location.reload()} style={{
          padding: '0.75rem 1.5rem', background: '#33D17A', color: '#0B0F14',
          border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600,
        }}>Spróbuj ponownie</button>
      </div>
    </div>
  )

  return (
    <>
      {/* SVG gradient for circular progress */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      <Navigation />

      <main className="main" id="main">
        <Hero />
        <About />
        <Skills type="skills" />
        <Skills type="tools" />
        <Experience />
        <Education />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <LanguageProvider>
      <CVApp />
    </LanguageProvider>
  )
}
