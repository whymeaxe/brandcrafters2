import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'Preparation before submission.',
    detail:
      'We assess eligibility and category fit before any form is filled out, so the application reflects a considered strategy rather than a guess.',
  },
  {
    title: 'Documentation before confusion.',
    detail:
      'Every required and supporting document is identified up front and checked for consistency against the rest of the case.',
  },
  {
    title: 'Strategy before application.',
    detail:
      'Financial circumstances, travel history and purpose are worked through as a coherent narrative before submission — not patched together after a question comes back.',
  },
]

export default function WhyUs() {
  return (
    <section className="brand-tint-yellow border-t hairline py-28 md:py-36">
      <div className="container-edge">
        <p className="eyebrow mb-6">Why us</p>
        <div className="space-y-16 md:space-y-0 md:divide-y hairline md:border-t hairline">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-2 gap-4 md:gap-10 py-0 md:py-10"
            >
              <h3 className="font-display font-semibold text-[clamp(1.65rem,2.9vw,2.35rem)] leading-tight">
                {p.title}
              </h3>
              <p className="text-charcoal leading-relaxed max-w-md">{p.detail}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-16 text-sm text-charcoal/80 max-w-xl">
          We don't make outcome guarantees — no agency honestly can. What we
          commit to is a documented, considered process behind every case we
          take on.
        </p>
      </div>
    </section>
  )
}
