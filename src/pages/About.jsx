import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import Seo from '../components/Seo.jsx'

const baseUrl = import.meta.env.BASE_URL

const values = [
  {
    title: 'We work the case, not the calendar.',
    detail:
      'A rushed application is how avoidable refusals happen. We scope timelines around what a case actually needs, not around a fixed turnaround promise.',
  },
  {
    title: 'Every claim is checked against evidence.',
    detail:
      'Financial, academic and professional claims in an application are only as strong as the documentation behind them. We test consistency before submission, not after a query comes back.',
  },
  {
    title: 'Categories aren\u2019t interchangeable.',
    detail:
      'The right visa category depends on genuine purpose and eligibility — not on which one seems fastest. We say so plainly, even when it means a longer runway.',
  },
]

export default function About() {
  return (
    <>
      <Seo page="about" schema={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Embassy of Education',
        description: 'About Embassy of Education, a visa strategy and education consultancy in Vadodara.',
        url: 'https://embassyofeducation.co.in/about',
        mainEntity: { '@type': 'Person', name: 'Avdhesh Brahmbhatt', jobTitle: 'Founder', worksFor: { '@type': 'Organization', name: 'Embassy of Education' } },
      }} />
      <PageHeader
        eyebrow="About the studio"
        title="A methodology, not a shortcut."
        lede="We are a visa strategy and case-preparation practice. Our work sits before the paperwork — in assessment, documentation and preparation — because that is where most outcomes are actually decided."
      />

      <section className="py-24 md:py-32 border-b hairline">
        <div className="container-edge grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-6">Approach</p>
            <h2 className="font-display font-semibold text-3xl leading-tight max-w-md">
              Founded on a simple observation: most refusals trace back to preparation, not eligibility.
            </h2>
          </div>
          <div className="space-y-6 text-charcoal leading-relaxed max-w-lg">
            <p>
              Over repeated cases, a pattern became clear — applicants with
              genuinely strong eligibility were still being refused, because
              the application itself didn't present that eligibility clearly
              or consistently.
            </p>
            <p>
              That gap between "eligible" and "well-presented" is where our
              work sits. We assess the underlying case first, then build the
              application, documentation and interview preparation around it.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-b hairline">
        <div className="container-edge">
          <p className="eyebrow mb-6">What guides the work</p>
          <div className="divide-y hairline border-t hairline">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="grid md:grid-cols-2 gap-4 py-10"
              >
                <h3 className="font-display font-medium text-2xl leading-tight">{v.title}</h3>
                <p className="text-charcoal leading-relaxed max-w-md">{v.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 brand-tint-purple border-b hairline">
        <div className="container-edge">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
            <div className="relative max-w-sm"><div className="absolute -inset-3 rounded-[2rem] bg-brand-yellow/20 blur-2xl" /><img src={`${baseUrl}founder-avdhesh-bhrambhatt.jpg`} alt="Avdhesh Brahmbhatt, Founder of Embassy of Education" className="relative w-full aspect-[4/5] object-cover rounded-[1.5rem] shadow-[0_30px_80px_rgba(57,49,134,.15)]" /></div>
            <div><p className="eyebrow mb-6">Founder</p><h2 className="font-display font-semibold text-4xl md:text-5xl leading-[1.02] max-w-xl">Avdhesh Brahmbhatt</h2><p className="mt-5 text-lg text-charcoal leading-relaxed max-w-xl">Founder, Embassy of Education. The practice is built around a straightforward principle: applicants deserve clear assessment, careful documentation and preparation before they submit a visa application.</p><div className="mt-8 inline-flex items-center gap-3 rounded-full border border-hairline bg-white/80 px-4 py-2 text-xs font-mono text-brand-purple"><span className="h-2 w-2 rounded-full bg-brand-yellow" />Embassy of Education · Vadodara</div></div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-edge">
          <div className="flex items-end justify-between gap-8 mb-10"><div><p className="eyebrow mb-5">Gallery</p><h2 className="font-display font-semibold text-3xl md:text-4xl max-w-lg">The people and moments behind the work.</h2></div><span className="hidden md:block text-xs font-mono text-charcoal/60">Embassy of Education · Vadodara</span></div>
          <div className="gallery-grid">
            {[['embassy-gallery-01.jpg','Embassy of Education — community moment'],['embassy-gallery-02.jpg','Embassy of Education — community event'],['embassy-gallery-03.jpg','Embassy of Education — visit and ceremony'],['embassy-gallery-04.jpg','Embassy of Education — founder and guests']].map(([src,alt],i)=>(<motion.figure key={src} className={`gallery-card gallery-card--${i+1}`} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-10%'}} transition={{duration:.6,delay:i*.05}}><img src={`${baseUrl}gallery/${src}`} alt={alt} loading="lazy" /></motion.figure>))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
