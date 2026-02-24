import { useLanguage } from '../context/LanguageContext'
import { IconLocation, IconEmail, IconArrow, IconGitHub, IconLinkedIn } from './Icons'

const BASE = import.meta.env.BASE_URL

function extractCity(address) {
  if (!address) return ''
  const parts = address.split(',')
  if (parts.length >= 2) {
    return parts[parts.length - 1].trim().replace(/^\d{2}-\d{3}\s+/, '')
  }
  return address
}

function getInitials(name) {
  if (!name) return 'JS'
  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 0) return 'JS'
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function svgFallback(initials) {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%2333D17A' width='200' height='200'/%3E%3Ctext fill='%23ffffff' font-family='sans-serif' font-size='80' dy='130' font-weight='600' x='50%25' text-anchor='middle'%3E${initials}%3C/text%3E%3C/svg%3E`
}

export default function Hero() {
  const { data } = useLanguage()
  const personal = data?.personal ?? {}
  const ui = data?.ui ?? {}
  const hero = ui.hero ?? {}
  const socialLinks = personal.social_links ?? {}

  const city = extractCity(personal.address)
  const initials = getInitials(personal.name)
  const nameParts = (personal.name ?? '').split(' ')
  const firstname = nameParts[0] ?? ''
  const lastname = nameParts.slice(1).join(' ')

  const avatarSrc = personal.profile_picture
    ? BASE + personal.profile_picture
    : svgFallback(initials)

  const smoothScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero section" id="hero">
      <div className="hero__container container">
        <div className="hero__grid">

          {/* ── Profile Card ── */}
          <div className="hero__profile">
            <div className="profile-card card">
              <div className="profile-card__avatar-wrapper">
                <img
                  src={avatarSrc}
                  alt={personal.name ?? 'Profile picture'}
                  className="profile-card__avatar"
                  onError={(e) => { e.target.src = svgFallback(initials) }}
                />
                <div className="profile-card__status" aria-label="Available for work" />
              </div>

              <h1 className="profile-card__name">
                <span className="profile-card__firstname">{firstname}</span>
                <span className="profile-card__lastname">{lastname}</span>
              </h1>

              <p className="profile-card__role">{hero.role}</p>

              <div className="profile-card__info">
                <div className="profile-card__info-item">
                  <IconLocation />
                  <span>{hero.location ?? city}</span>
                </div>
                <div className="profile-card__info-item">
                  <IconEmail />
                  <a href={`mailto:${personal.email ?? ''}`} className="profile-card__link">
                    {personal.email}
                  </a>
                </div>
              </div>

              <a
                href="#contact"
                className="btn btn--primary btn--block"
                onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); if(history.pushState) history.pushState(null,null,'#contact') }}
              >
                <span>{hero.cta}</span>
                <IconArrow />
              </a>
            </div>
          </div>

          {/* ── Hero Content ── */}
          <div className="hero__content">
            <div className="hero__headline">
              <span className="hero__greeting">{hero.greeting}</span>
              <h2 className="hero__title">
                <span className="hero__title-line">{hero.title1}</span>
                <span className="hero__title-line hero__title-line--accent">{hero.title2}</span>
              </h2>
            </div>

            <p className="hero__description">{data?.hero_description}</p>

            <div className="hero__social" id="hero-social-links">
              {socialLinks.github && (
                <a href={socialLinks.github} className="icon-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <IconGitHub size={24} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="icon-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <IconLinkedIn size={24} />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
