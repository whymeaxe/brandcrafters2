import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import NotFound from './NotFound.jsx'
import { destinations } from '../lib/data.js'
import Seo from '../components/Seo.jsx'

export default function DestinationDetail() {
  const { slug } = useParams()
  const destination = destinations.find((d) => d.slug === slug)

  if (!destination) return <NotFound />

  return (
    <>
      <Seo title={`${destination.name} Visa Guidance | Embassy of Education`} description={`Visa guidance and case preparation for ${destination.name} applications from Embassy of Education in Vadodara.`} path={`/destinations/${slug}`} />
      <PageHeader
        eyebrow="Destination"
        title={destination.name}
        lede={destination.summary}
      />

      <section className="py-24 md:py-32 border-b hairline">
        <div className="container-edge grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-6">Visa categories we support here</p>
            <ul className="divide-y hairline border-t hairline">
              {destination.categories.map((c) => (
                <li key={c} className="py-5 font-display text-lg">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 text-charcoal leading-relaxed max-w-md">
            <p>
              Eligibility, required documentation and processing timelines
              for {destination.name} are set by the relevant consulate or
              immigration authority and change over time. What's shown here
              is a starting orientation, not a guarantee of requirements.
            </p>
            <p className="text-sm text-charcoal/70">
              Practical guidance for this destination and the visa pathways we support,
              with current processing times, consulate-specific notes and category
              eligibility summaries verified against official sources.
            </p>
            <Link
              to="/contact"
              className="brand-button"
            >
              Ask about {destination.name}
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
