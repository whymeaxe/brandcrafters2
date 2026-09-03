import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { Link } from 'react-router-dom'
import FinalCTA from '../components/FinalCTA.jsx'
import { visaCategories } from '../lib/data.js'
import Seo from '../components/Seo.jsx'

export default function VisaCategories() {
  return (
    <>
      <Seo page="visaCategories" />
      <PageHeader
        eyebrow="Visa categories"
        title="The category shapes everything after it."
        lede="Eligibility, required documentation and interview focus all follow from the category you apply under. This is a general orientation — your actual requirements depend on destination and individual circumstances."
      />

      <section className="py-24 md:py-32">
        <div className="container-edge">
          <div className="divide-y hairline border-t hairline">
            {visaCategories.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="grid md:grid-cols-2 gap-4 py-10"
              >
                <h2 className="font-display font-semibold text-2xl md:text-3xl leading-tight">
                  {c.name}
                </h2>
                <p className="text-charcoal leading-relaxed max-w-md">{c.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-14 text-sm text-charcoal/70 max-w-lg">
            Requirements and available sub-categories vary by destination —
            see <Link to="/destinations" className="underline decoration-hairline underline-offset-4 hover:text-violet">destinations</Link> for country-specific detail.
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
