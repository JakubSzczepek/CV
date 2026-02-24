import { useLanguage } from '../context/LanguageContext'
import { IconEducation } from './Icons'

function EducationCard({ edu, index }) {
  return (
    <div className="education-card card" style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="education-card__icon" aria-hidden="true">
        <IconEducation size={32} />
      </div>
      <div className="education-card__content">
        <span className="education-card__period">{edu.period}</span>
        <h3 className="education-card__degree">{edu.degree}</h3>
        <p className="education-card__school">{edu.school}</p>
        {edu.specialization && (
          <p className="education-card__specialization">{edu.specialization}</p>
        )}
      </div>
    </div>
  )
}

export default function Education() {
  const { data } = useLanguage()
  const ui = data?.ui ?? {}
  const education = data?.education ?? []

  return (
    <section className="education section" id="education">
      <div className="education__container container">
        <h2 className="section__title">{ui.education?.title}</h2>
        <div className="education__grid">
          {education.map((edu, i) => (
            <EducationCard key={i} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
