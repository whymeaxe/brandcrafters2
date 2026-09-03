import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'

const categoryOptions = ['B1/B2', 'F-1', 'Visa refusal / reapplication', 'DS-160', 'Interview readiness', 'Study in USA', 'Other']

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Seo page="contact" />
      <PageHeader
        eyebrow="Private case review"
        title="Tell us about your case."
        lede="A short intake helps us understand your situation before we speak. Please do not send passport numbers, financial account details or other sensitive documents through this form."
      />

      <section className="py-24 md:py-32">
        <div className="container-edge grid md:grid-cols-[1fr_1.2fr] gap-16">
          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-3">Office</p>
              <p className="text-charcoal leading-relaxed text-sm">
                GF-15, Sharnam Fortune, Opp. Inox, Beside Sterling Hospital,<br />
                Race Course, Vadodara 390007, Gujarat, India.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Reach us directly</p>
              <p className="text-charcoal leading-relaxed text-sm">
                +91 96389 55666<br />
                embassyofedu@gmail.com
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Hours</p>
              <p className="text-charcoal leading-relaxed text-sm">Monday–Saturday, 9:45 AM–6:45 PM</p>
            </div>
            <p className="text-xs text-charcoal/70 max-w-sm leading-relaxed">
              Embassy of Education is an independent advisory and education consultancy. Visa decisions are made solely by the relevant Embassy or Consulate. No service can guarantee a visa decision.
            </p>
          </div>

          <div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border hairline p-10 bg-white/50">
                <h2 className="font-display font-semibold text-2xl mb-3">Request received.</h2>
                <p className="text-charcoal leading-relaxed">
                  Thank you. We have your initial enquiry and will follow up to discuss the next step.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-7">
                  <Field label="Phone" name="phone" type="tel" required />
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="category">Visa category</label>
                    <select id="category" name="category" className="w-full border-b hairline bg-transparent py-2.5 text-[0.95rem] focus:outline-none focus:border-brand-purple">
                      {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="message">Briefly describe your situation</label>
                  <textarea id="message" name="message" rows={5} className="w-full border-b hairline bg-transparent py-2.5 text-[0.95rem] resize-none focus:outline-none focus:border-brand-purple" />
                </div>
                <label className="flex items-start gap-3 text-xs text-charcoal leading-relaxed">
                  <input type="checkbox" required className="mt-0.5 accent-brand-purple" />
                  <span>I agree to be contacted about my enquiry and understand that this form is not for submitting passports, financial statements or other sensitive documents.</span>
                </label>
                <button type="submit" className="brand-button">Book a private case review</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, name, type = 'text', required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} required={required} className="w-full border-b hairline bg-transparent py-2.5 text-[0.95rem] focus:outline-none focus:border-brand-purple" />
    </div>
  )
}
