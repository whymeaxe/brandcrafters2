import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { destinations } from '../lib/data.js'

export default function DestinationsTeaser() {
  return (
    <section className="border-t hairline py-28 md:py-36">
      <div className="container-edge">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-6">Where we work</p>
            <h2 className="font-display font-semibold text-[clamp(2.15rem,4vw,3.75rem)] leading-[1.1] max-w-xl">
              Destinations &amp; visa categories.
            </h2>
          </div>
          <Link
            to="/destinations"
            className="text-sm font-medium text-ink/80 underline decoration-hairline underline-offset-4 hover:text-violet shrink-0"
          >
            View all destinations
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {destinations.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <Link
                to={`/destinations/${d.slug}`}
                className="group block bg-white h-full p-8 transition-colors hover:bg-brand-yellow-soft/60"
              >
                <h3 className="font-display font-medium text-xl mb-3 group-hover:text-violet transition-colors">
                  {d.name}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed mb-5">{d.summary}</p>
                <span className="text-xs font-mono text-violet/80">
                  {d.categories.length} categor{d.categories.length === 1 ? 'y' : 'ies'} →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
