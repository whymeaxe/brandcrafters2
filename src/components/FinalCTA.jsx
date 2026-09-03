import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import VideoPlate from './VideoPlate.jsx'
const baseUrl = import.meta.env.BASE_URL

export default function FinalCTA() {
  return (
    <section className="relative border-t hairline py-28 md:py-40 overflow-hidden brand-tint-yellow">
      <div className="absolute inset-0 -z-10 opacity-[0.9] pointer-events-none flex items-center justify-center">
        <div className="h-[70vh] w-[70vh] max-w-[90vw]">
          <VideoPlate src={`${baseUrl}videos/passport-hero.mp4`} className="h-full w-full opacity-30" feather />
        </div>
      </div>
      <div className="container-edge text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display font-semibold text-[clamp(2.35rem,5.5vw,4rem)] leading-[1.05] max-w-2xl mx-auto">
            Start with the right application.
          </h2>
          <p className="mt-6 text-charcoal max-w-md mx-auto leading-relaxed">
            A short assessment tells you which category fits, what it
            requires, and whether now is the right time to apply.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              to="/contact"
              className="brand-button"
            >
              Book a consultation
            </Link>
            <Link
              to="/visa-categories"
              className="text-[0.92rem] font-medium text-ink/80 underline decoration-hairline underline-offset-4 hover:text-violet focus-ring"
            >
              Check your visa pathway
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
