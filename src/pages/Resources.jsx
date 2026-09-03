import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import Seo from '../components/Seo.jsx'

const guides = [
  { title: 'Reading a visa refusal letter', tag: 'Guide' },
  { title: 'DS-160: field-by-field notes', tag: 'Guide' },
  { title: 'What consular officers actually assess', tag: 'Insight' },
  { title: 'Proof of funds, explained', tag: 'Guide' },
  { title: 'Interview day: what to expect', tag: 'Guide' },
  { title: 'Choosing between visitor and student categories', tag: 'Insight' },
  { title: 'How to choose a visa agency in Vadodara', tag: 'Local guide' },
]

const faqs = [
  {
    q: 'Can you guarantee my visa will be approved?',
    a: 'No — no agency can honestly guarantee a consular decision. What we can do is make sure your case is prepared as thoroughly and consistently as possible.',
  },
  {
    q: 'Do I need every document listed in your resources?',
    a: 'No. Required documentation depends on your visa category and personal circumstances. We confirm your specific list during assessment.',
  },
  {
    q: 'How long does the process take?',
    a: 'It depends on the category, destination and your starting point. We give a realistic timeline once we understand your case.',
  },
  {
    q: 'What should I look for in a visa agency in Vadodara?',
    a: 'Look for clear category guidance, careful documentation review, transparent communication and realistic advice. No agency can guarantee a consular decision, so the quality of preparation and the clarity of the process matter more than promises.',
  },
  {
    q: 'What if I\u2019ve been refused before?',
    a: 'A prior refusal is important context, not a disqualifier. We review the refusal reason as part of the assessment.',
  },
]

export default function Resources() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <Seo page="resources" />
      <PageHeader
        eyebrow="Resources"
        title="Guides and answers, not a sales pitch."
        lede="Educational content on documents, categories and the process itself. Use it to understand what you're walking into before you talk to anyone."
      />

      <section className="py-24 md:py-32 border-b hairline">
        <div className="container-edge">
          <p className="eyebrow mb-6">Guides</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
            {guides.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="bg-white p-8"
              >
                <span className="font-mono text-xs text-violet/80">{g.tag}</span>
                <h3 className="font-display font-medium text-lg mt-3 leading-snug">{g.title}</h3>
                <p className="text-xs text-charcoal/60 mt-4">Practical guidance on documents, categories and interview preparation.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-edge max-w-2xl">
          <p className="eyebrow mb-6">Frequently asked</p>
          <div className="divide-y hairline border-t hairline">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={f.q}>
                  <button
                    className="w-full flex items-center justify-between gap-6 py-6 text-left focus-ring"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg">{f.q}</span>
                    <span className={`text-violet text-xl leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-charcoal leading-relaxed max-w-lg">{f.a}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
