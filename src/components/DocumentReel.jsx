import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { documents } from '../lib/data.js'

const baseUrl = import.meta.env.BASE_URL

gsap.registerPlugin(ScrollTrigger)

const SEGMENTS = documents.length
const VH_PER_DOC = 62 // scroll distance dedicated to each document, in vh

export default function DocumentReel() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  useEffect(() => {
    if (reduced) return
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let duration = 0
    const onMeta = () => {
      duration = video.duration || 0
    }
    video.addEventListener('loadedmetadata', onMeta)
    if (video.readyState >= 1) onMeta()

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${VH_PER_DOC * SEGMENTS}%`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress
        if (duration) {
          video.currentTime = progress * duration
        }
        const i = Math.min(SEGMENTS - 1, Math.floor(progress * SEGMENTS))
        setIndex((prev) => (prev === i ? prev : i))
      },
    })

    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
      st.kill()
    }
  }, [reduced])

  const doc = documents[index]

  if (reduced) {
    return (
      <section className="py-28 border-t hairline">
        <div className="container-edge">
          <p className="eyebrow mb-4">The paperwork, understood</p>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,3.4vw,2.6rem)] max-w-xl mb-14">
            Every document in a visa case has a specific purpose.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((d) => (
              <div key={d.code + d.name} className="border-t hairline pt-5">
                <div className="font-mono text-xs text-violet mb-2">{d.code} — {d.tier}</div>
                <h3 className="font-display font-medium text-lg mb-2">{d.name}</h3>
                <p className="text-sm text-charcoal leading-relaxed">{d.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative border-t hairline brand-tint-purple">
      <div className="relative h-[100svh] overflow-hidden flex items-center">
        <div className="container-edge w-full grid md:grid-cols-2 gap-8 items-center">
          <div className="relative order-2 md:order-1 min-h-[220px]">
            <p className="eyebrow mb-5">
              Document {index + 1} of {SEGMENTS}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={doc.code + doc.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-mono text-xs tracking-wide text-violet-bright mb-3">
                  {doc.tier === 'Core' ? 'Core document' : doc.tier === 'Category-specific' ? 'Category-specific' : 'Supporting evidence'}
                </div>
                <h3 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.7rem)] leading-tight mb-1">
                  {doc.code}
                </h3>
                <p className="font-display text-lg text-charcoal mb-5">{doc.name}</p>
                <p className="text-[0.98rem] leading-relaxed text-charcoal max-w-md mb-6">
                  {doc.blurb}
                </p>
                <dl className="space-y-3 text-sm max-w-md">
                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 text-charcoal/70">Used for</dt>
                    <dd className="text-ink">{doc.usedFor}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 text-charcoal/70">Why it matters</dt>
                    <dd className="text-ink">{doc.whyItMatters}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-1.5">
              {documents.map((d, i) => (
                <span
                  key={d.code + d.name + i}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                    i === index ? 'bg-violet' : 'bg-hairline'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative order-1 md:order-2 h-[42vh] md:h-[58vh]">
            <video
              ref={videoRef}
              className="video-plate__media video-plate__media--scroll h-full w-full object-contain"
              src={`${baseUrl}videos/documents-scroll.mp4`}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <div className="video-plate__feather" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
