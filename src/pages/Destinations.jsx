import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import { destinations } from '../lib/data.js'
import InteractiveGlobe from '../components/InteractiveGlobe.jsx'
import Seo from '../components/Seo.jsx'

export default function Destinations() {
  return (
    <>
      <Seo page="destinations" />
      <PageHeader
        eyebrow="Destinations"
        title="Where we work."
        lede="Requirements, timelines and documentation vary by country and by consulate. Each destination below links to a dedicated overview — visa requirements themselves are set by the issuing government, not by us."
      />

      <section className="py-16 md:py-24 border-b hairline brand-panel-purple">
        <div className="container-edge grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-16 items-center">
          <div><p className="eyebrow mb-6">Global reach</p><h2 className="font-display font-semibold text-3xl md:text-5xl leading-[1.02] max-w-lg">See where your next chapter can take you.</h2><p className="mt-6 text-white/70 leading-relaxed max-w-md">Explore the destinations we support. The globe is interactive — drag it, rotate it and select a highlighted destination.</p><div className="mt-8 flex flex-wrap gap-2">{destinations.map((d)=><Link key={d.slug} to={`/destinations/${d.slug}`} className="globe-destination-chip">{d.name}</Link>)}</div></div>
          <InteractiveGlobe />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-edge">
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
                  className="group block bg-white h-full p-8 transition-colors hover:bg-lavender/50"
                >
                  <h2 className="font-display font-medium text-xl mb-3 group-hover:text-violet transition-colors">
                    {d.name}
                  </h2>
                  <p className="text-sm text-charcoal leading-relaxed mb-5">{d.summary}</p>
                  <ul className="space-y-1.5">
                    {d.categories.map((c) => (
                      <li key={c} className="text-xs font-mono text-violet/80">
                        {c}
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
