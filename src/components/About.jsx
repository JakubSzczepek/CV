import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { data } = useLanguage()
  const ui = data?.ui ?? {}
  const about = data?.about ?? ''

  const paragraphs = about.split(/\n\n+/).map(p => p.trim()).filter(Boolean)

  return (
    <section className="about section" id="about">
      <div className="about__container container">
        <h2 className="section__title">{ui.about?.title}</h2>
        <div className="card">
          <div className="about__content">
            {paragraphs.map((p, i) => (
              <p key={i} className="about__text">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
