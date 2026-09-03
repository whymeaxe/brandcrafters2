import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../lib/data.js'

export default function ServicesList({ showHeader = true }) {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="border-t hairline py-28 md:py-36">
      <div className="container-edge">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow mb-6">What we do</p>
              <h2 className="font-display font-semibold text-[clamp(2.15rem,4vw,3.75rem)] leading-[1.1] max-w-xl">
                Services built around your case, not a fixed package.
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-medium text-ink/80 underline decoration-hairline underline-offset-4 hover:text-violet shrink-0"
            >
              View all services
            </Link>
          </div>
        )}

        <div className="border-t hairline">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group border-b hairline py-7 md:py-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-10 transition-colors"
            >
              <div className="flex items-baseline gap-5 md:w-[22rem] shrink-0">
                <span className="font-mono text-xs text-violet/70">{String(i + 1).padStart(2, '0')}</span>
                <h3
                  className={`font-display font-medium text-2xl md:text-3xl tracking-tight transition-transform duration-300 ${
                    hovered === i ? 'translate-x-2 text-violet' : 'text-ink'
                  }`}
                >
                  {s.name}
                </h3>
              </div>
              <p className="text-charcoal max-w-lg leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
