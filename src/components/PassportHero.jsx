import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import VideoPlate from './VideoPlate.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const copy = {
  en: {
    eyebrow: 'Visa agency in Vadodara · Visa strategy & case preparation',
    titleA: 'Your visa was declined',
    titleB: 'before you applied.',
    body: 'Visa outcomes are decided long before a form is submitted — in the category you choose, the documentation you gather, the eligibility you understand and the case you present. We build that case with you, from the first assessment to the interview.',
    primary: 'Start your visa assessment',
    secondary: 'Explore visa services',
    scroll: 'Scroll',
  },
  gu: {
    eyebrow: 'વડોદરાની વિઝા એજન્સી · વિઝા સ્ટ્રેટેજી અને કેસ તૈયારી',
    titleA: 'તમે અરજી કરો તે પહેલાં જ',
    titleB: 'તમારો વિઝા નકારી દેવામાં આવ્યો હતો.',
    body: 'વિઝાનું પરિણામ ફોર્મ સબમિટ કરતાં ઘણાં પહેલાં નક્કી થવા લાગે છે — તમે પસંદ કરેલી કેટેગરી, એકત્રિત કરેલા દસ્તાવેજો, સમજેલી પાત્રતા અને રજૂ કરેલા કેસમાં. પ્રથમ મૂલ્યાંકનથી ઇન્ટરવ્યૂ સુધી અમે તમારી સાથે કેસ તૈયાર કરીએ છીએ.',
    primary: 'તમારા વિઝા કેસનું મૂલ્યાંકન શરૂ કરો',
    secondary: 'વિઝા સેવાઓ જુઓ',
    scroll: 'સ્ક્રોલ',
  },
}

export default function PassportHero() {
  const { language } = useLanguage()
  const t = copy[language]

  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-14 overflow-hidden hero-eoe">
      <div className="hero-brand-glow" aria-hidden="true" />
      <div className="container-edge w-full grid md:grid-cols-2 gap-8 md:gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 order-1 md:order-1"
        >
          <p className="eyebrow mb-6">{t.eyebrow}</p>
          <h1 className="font-display font-semibold tracking-tight text-[clamp(2.55rem,6vw,5rem)] leading-[1.03] text-ink max-w-2xl">
            {t.titleA}
            <br className="hidden sm:block" /> {t.titleB}
          </h1>
          <p className="hero-copy mt-7 text-[1.08rem] leading-relaxed max-w-xl">
            {t.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/contact" className="brand-button">
              {t.primary}
            </Link>
            <Link to="/services" className="brand-text-link hero-secondary">
              {t.secondary}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative order-2 md:order-2 h-[34vh] min-h-[270px] md:h-[64vh]"
        >
          <VideoPlate src="videos/passport-hero.mp4" className="h-full w-full" />
        </motion.div>
      </div>

      <div className="hero-scroll absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="eyebrow">{t.scroll}</span>
        <span className="hero-scroll-line h-9 w-px animate-pulse" />
      </div>
    </section>
  )
}
