import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const NAV_SECTIONS = [
  ['#about', 'nav.about'],
  ['#skills', 'nav.skills'],
  ['#experience', 'nav.experience'],
  ['#education', 'nav.education'],
  ['#contact', 'nav.contact'],
]

function getT(data, key) {
  const parts = key.split('.')
  let cur = data?.ui
  for (const p of parts) {
    if (!cur) return key
    cur = cur[p]
  }
  return cur ?? key
}

function smoothScrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navigation() {
  const { lang, data, switchLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.slice(1)
    smoothScrollTo(id)
    if (history.pushState) history.pushState(null, null, href)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, null, window.location.pathname)
  }

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="navigation__container container">

        <a href="#" className="navigation__logo" aria-label="Home" onClick={handleLogoClick}>
          <span className="navigation__logo-text">Jakub Szczepek</span>
        </a>

        <ul
          className={`navigation__menu${menuOpen ? ' navigation__menu--open' : ''}`}
          role="menubar"
        >
          {NAV_SECTIONS.map(([href, tKey]) => (
            <li key={href} className="navigation__item" role="none">
              <a
                href={href}
                className="navigation__link"
                role="menuitem"
                onClick={(e) => handleNavClick(e, href)}
              >
                {getT(data, tKey)}
              </a>
            </li>
          ))}
        </ul>

        <div className="navigation__actions">
          <button
            className="language-toggle"
            aria-label="Switch language"
            onClick={() => switchLanguage(lang === 'pl' ? 'en' : 'pl')}
          >
            <span className={`language-toggle__option${lang === 'pl' ? ' language-toggle__option--active' : ''}`}>PL</span>
            <span className="language-toggle__divider">/</span>
            <span className={`language-toggle__option${lang === 'en' ? ' language-toggle__option--active' : ''}`}>EN</span>
          </button>

          <button
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(m => !m)}
          >
            <span className="mobile-menu-toggle__line" />
            <span className="mobile-menu-toggle__line" />
            <span className="mobile-menu-toggle__line" />
          </button>
        </div>

      </div>
    </nav>
  )
}
