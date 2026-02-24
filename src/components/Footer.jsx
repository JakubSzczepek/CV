import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { data } = useLanguage()
  const ui = data?.ui ?? {}
  const consent = data?.consent ?? ''

  return (
    <footer className="footer">
      <div className="footer__container container">
        <p className="footer__text">
          &copy; 2026 Jakub Szczepek. {ui.footer?.rights}
        </p>
        {consent && (
          <p className="footer__consent" style={{ fontSize: '0.75rem', marginTop: '1rem', opacity: 0.7 }}>
            {consent}
          </p>
        )}
      </div>
    </footer>
  )
}
