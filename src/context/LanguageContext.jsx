import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LANGUAGE_PREFERENCE_KEY = 'cv_language_preference'
const SUPPORTED_LANGUAGES = ['pl', 'en']
const DEFAULT_LANGUAGE = 'pl'

export const LanguageContext = createContext(null)

// ── Data helpers ─────────────────────────────────────────────────────────────

function mergeData(commonData, langData) {
  const personal = { ...commonData.personal, ...langData.personal }

  const skills = commonData.skills.map(skill => ({
    name: langData.skill_names?.[skill.name_key] ?? skill.name_key,
    level: skill.level,
  }))

  const experience = commonData.experience.map(exp => ({
    period: langData.experience_data[exp.period_key],
    title: langData.experience_data[exp.title_key],
    company: exp.company,
    tasks: langData.experience_data[exp.tasks_key],
  }))

  const education = commonData.education.map(edu => ({
    period: edu.period,
    degree: langData.education_data[edu.degree_key],
    school: langData.education_data[edu.school_key],
    specialization: langData.education_data[edu.specialization_key],
  }))

  const certificates = commonData.certificates_keys.map(key => langData.certificates_data[key])

  return {
    ui: langData.ui_translations,
    personal,
    hero_description: langData.hero_description,
    about: langData.about,
    skills,
    tools: commonData.tools,
    experience,
    education,
    certificates,
    consent: langData.consent,
  }
}

async function fetchData(lang) {
  const base = import.meta.env.BASE_URL
  const [commonRes, langRes] = await Promise.all([
    fetch(`${base}data/common.json`),
    fetch(`${base}data/${lang}.json`),
  ])
  if (!commonRes.ok) throw new Error(`Failed to load common.json (${commonRes.status})`)
  if (!langRes.ok) throw new Error(`Failed to load ${lang}.json (${langRes.status})`)
  const commonData = await commonRes.json()
  const langData = await langRes.json()
  return mergeData(commonData, langData)
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }) {
  const detectLang = () => {
    try {
      const saved = localStorage.getItem(LANGUAGE_PREFERENCE_KEY)
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved
    } catch (_) { /* ignore */ }
    const browser = navigator.language?.split('-')[0]
    if (browser && SUPPORTED_LANGUAGES.includes(browser)) return browser
    return DEFAULT_LANGUAGE
  }

  const [lang, setLang] = useState(detectLang)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchData(lang)
      .then(d => {
        setData(d)
        setLoading(false)
        document.documentElement.lang = lang
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [lang])

  const switchLanguage = useCallback((newLang) => {
    if (!SUPPORTED_LANGUAGES.includes(newLang)) return
    try { localStorage.setItem(LANGUAGE_PREFERENCE_KEY, newLang) } catch (_) { /* ignore */ }
    setLang(newLang)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, data, loading, error, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
