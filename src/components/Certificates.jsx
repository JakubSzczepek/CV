import { useLanguage } from '../context/LanguageContext'
import { IconStar } from './Icons'

function CertBadge({ cert, index }) {
  const text = cert?.name || cert?.type || 'Certificate'
  return (
    <div className="badge" style={{ animationDelay: `${index * 0.1}s` }}>
      <IconStar size={20} />
      <span className="badge__text">{text}</span>
    </div>
  )
}

export default function Certificates() {
  const { data } = useLanguage()
  const ui = data?.ui ?? {}
  const certificates = data?.certificates ?? []

  return (
    <section className="certificates section" id="certificates">
      <div className="certificates__container container">
        <h2 className="section__title">{ui.certificates?.title}</h2>
        <div className="certificates__list">
          <div className="badge-list">
            {certificates.map((cert, i) => (
              <CertBadge key={i} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
