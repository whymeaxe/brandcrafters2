import { motion } from 'framer-motion'

const factors = [
  'Eligibility',
  'Visa category',
  'Documentation',
  'Financial circumstances',
  'Purpose of travel, study or work',
  'Application consistency',
  'Interview preparation',
  'Immigration history, where relevant',
]

export default function NarrativeSection() {
  return (
    <section className="border-t hairline py-28 md:py-36 brand-tint-purple">
      <div className="container-edge grid md:grid-cols-2 gap-16 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-6">The reframe</p>
          <h2 className="font-display font-semibold text-[clamp(2.15rem,4vw,3.75rem)] leading-[1.1] max-w-lg">
            A visa application isn't paperwork. It's a case.
          </h2>
          <p className="mt-7 text-charcoal leading-relaxed max-w-md">
            Consular officers aren't reading a stack of forms — they're
            evaluating a case for or against approval. Every factor below
            contributes to that case, and each one needs to be understood on
            its own terms before an application goes in.
          </p>
        </motion.div>

        <ul className="divide-y hairline border-t hairline">
          {factors.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-5 py-5"
            >
              <span className="font-mono text-xs text-violet/70">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-lg md:text-xl text-ink">{f}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
