import { useLanguage } from '../context/LanguageContext'
import SkillCard from './SkillCard'

/**
 * Handles both the "Skills" and "Tools" sections.
 * @prop {('skills'|'tools')} type
 */
export default function Skills({ type = 'skills' }) {
  const { data } = useLanguage()
  const ui = data?.ui ?? {}

  const isSkills = type === 'skills'
  const items = isSkills ? (data?.skills ?? []) : (data?.tools ?? [])
  const title = isSkills ? ui.skills?.title : ui.tools?.title
  const sectionId = isSkills ? 'skills' : 'tools'
  const maxLevel = isSkills ? 5 : 10

  return (
    <section className={`${sectionId} section`} id={sectionId}>
      <div className={`${sectionId}__container container`}>
        <h2 className="section__title">{title}</h2>
        <div className="skills__grid">
          {items.map((item, i) => (
            <SkillCard
              key={`${item.name}-${i}`}
              name={item.name}
              level={item.level}
              maxLevel={maxLevel}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
