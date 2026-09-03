import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, lede, embedded = false }) {
  return (
    <section className={embedded ? 'py-0' : 'pt-40 pb-20 md:pt-48 md:pb-28 border-b hairline'}>
      <div className={embedded ? '' : 'container-edge'}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
          <h1 className="font-display font-semibold text-[clamp(2.35rem,5vw,4.2rem)] leading-[1.05] max-w-2xl">
            {title}
          </h1>
          {lede && <p className="mt-6 text-charcoal leading-relaxed max-w-lg text-[1.08rem]">{lede}</p>}
        </motion.div>
      </div>
    </section>
  )
}
