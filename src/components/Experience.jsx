import { useLanguage } from '../context/LanguageContext'

function TimelineItem({ exp, index }) {
  return (
    <div className="timeline__item" style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="timeline__marker" aria-hidden="true" />
      <div className="timeline__content card">
        <span className="timeline__period">{exp.period}</span>
        <h3 className="timeline__title">{exp.title}</h3>
        <p className="timeline__company">{exp.company}</p>
        {Array.isArray(exp.tasks) && exp.tasks.length > 0 && (
          <ul className="timeline__tasks">
            {exp.tasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const { data } = useLanguage()
  const ui = data?.ui ?? {}
  const experience = data?.experience ?? []

  return (
    <section className="experience section" id="experience">
      <div className="experience__container container">
        <h2 className="section__title">{ui.experience?.title}</h2>
        <div className="timeline">
          {experience.length === 0 ? (
            <div className="timeline__empty">Brak doświadczenia do wyświetlenia.</div>
          ) : (
            experience.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
