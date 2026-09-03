import { motion } from 'framer-motion'
import { caseStudies } from '../lib/data.js'

export default function CaseStudies() {
  return (
    <section className="border-t hairline py-28 md:py-36 brand-tint-purple">
      <div className="container-edge">
        <p className="eyebrow mb-6">Case studies</p>
        <div className="flex items-baseline justify-between gap-6 mb-16 flex-wrap">
          <h2 className="font-display font-semibold text-[clamp(2.15rem,4vw,3.75rem)] leading-[1.1] max-w-xl">
            Real cases, told honestly.
          </h2>
          <p className="text-sm text-charcoal max-w-xs">
            The entries below are structural placeholders — we replace them
            with verified client outcomes as they're documented.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((c, i) => (
            <motion.article
              key={c.category + c.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white border hairline p-8 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-display font-medium text-lg">{c.category}</h3>
                <span className="font-mono text-xs text-violet/80">{c.country}</span>
              </div>
              <dl className="space-y-5 text-sm flex-1">
                <div>
                  <dt className="eyebrow mb-1.5">Challenge</dt>
                  <dd className="text-charcoal leading-relaxed">{c.challenge}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Approach</dt>
                  <dd className="text-charcoal leading-relaxed">{c.approach}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5">Outcome</dt>
                  <dd className="text-charcoal leading-relaxed italic">{c.outcome}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
