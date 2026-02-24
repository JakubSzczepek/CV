import { useEffect, useRef } from 'react'

function getSkillLevelLabel(pct) {
  if (pct >= 90) return 'Expert'
  if (pct >= 75) return 'Advanced'
  if (pct >= 60) return 'Proficient'
  if (pct >= 40) return 'Intermediate'
  return 'Beginner'
}

function getProgressColor(pct) {
  if (pct >= 90) return '#33D17A'
  if (pct >= 75) return '#4ADE80'
  if (pct >= 60) return '#F6A53A'
  if (pct >= 40) return '#FB923C'
  if (pct >= 20) return '#F87171'
  return '#EF4444'
}

export default function SkillCard({ name, level, maxLevel = 5, index = 0 }) {
  const fillRef = useRef(null)
  const cardRef = useRef(null)
  const percentage = Math.round((level / maxLevel) * 100)
  const labelText = getSkillLevelLabel(percentage)
  const color = getProgressColor(percentage)

  useEffect(() => {
    const fill = fillRef.current
    const card = cardRef.current
    if (!fill || !card) return

    // Reset to 0 on each render (language switch)
    fill.style.setProperty('--progress', 0)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => {
            fill.style.setProperty('--progress', percentage)
          }, index * 50)
          observer.disconnect()
          return () => clearTimeout(t)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [percentage, index])

  return (
    <div ref={cardRef} className="skill-card card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="skill-card__header">
        <h3 className="skill-card__name">{name}</h3>
        <span className="skill-card__level">{labelText}</span>
      </div>

      <div
        className="circular-progress"
        data-progress={percentage}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency: ${percentage}%`}
      >
        <svg className="circular-progress__svg" viewBox="0 0 120 120" aria-hidden="true">
          <circle className="circular-progress__track" cx="60" cy="60" r="54" />
          <circle
            ref={fillRef}
            className="circular-progress__fill"
            cx="60"
            cy="60"
            r="54"
            style={{ '--progress': 0, '--progress-color': color }}
          />
        </svg>
        <span className="circular-progress__value">{percentage}%</span>
      </div>
    </div>
  )
}
