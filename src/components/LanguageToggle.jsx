import { useLanguage } from '../context/LanguageContext.jsx'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={language === 'gu' ? 'is-active' : ''}
        onClick={() => setLanguage('gu')}
        aria-pressed={language === 'gu'}
      >
        ગુજરાતી
      </button>
    </div>
  )
}
