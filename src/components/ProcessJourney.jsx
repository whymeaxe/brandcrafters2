import { motion } from 'framer-motion'
import { process } from '../lib/data.js'

export default function ProcessJourney() {
  return (
    <section className="brand-panel-purple border-t py-28 md:py-36 overflow-hidden">
      <div className="container-edge mb-16">
        <p className="eyebrow mb-6">How it works</p>
        <h2 className="font-display font-semibold text-[clamp(2.15rem,4vw,3.75rem)] leading-[1.1] max-w-xl">
          A five-stage process, not a five-item checklist.
        </h2>
      </div>

      <div className="container-edge">
        <div className="flex flex-col md:flex-row md:divide-x hairline border-t border-b hairline">
          {process.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="process-step flex-1 py-10 md:py-14 px-1 md:px-8 border-b md:border-b-0 hairline last:border-b-0 transition-colors duration-300"
            >
              <span className="font-mono text-sm text-brand-yellow">{step.n}</span>
              <h3 className="font-display font-medium text-2xl mt-4 mb-3">{step.title}</h3>
              <p className="text-sm text-charcoal leading-relaxed">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
