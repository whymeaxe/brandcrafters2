import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BrandMark from './BrandMark.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const links = [
  { to: '/services', en: 'Services', gu: 'સેવાઓ' },
  { to: '/destinations', en: 'Destinations', gu: 'ડેસ્ટિનેશન્સ' },
  { to: '/resources', en: 'Resources', gu: 'સંસાધનો' },
  { to: '/about', en: 'About', gu: 'અમારા વિશે' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { language } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const label = (link) => language === 'gu' ? link.gu : link.en
  const consultation = language === 'gu' ? 'કન્સલ્ટેશન બુક કરો' : 'Book Consultation'

  return (
    <header
      className={`site-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHome && !scrolled ? 'site-nav--hero' : ''} ${scrolled ? 'site-nav--scrolled backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div
        className={`container-edge flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-3.5 border-b hairline' : 'py-5 md:py-6'
        }`}
      >
        <Link to="/" className="focus-ring shrink-0" onClick={() => setOpen(false)} aria-label="Embassy of Education home">
          <BrandMark compact />
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''} text-[0.9rem] font-medium transition-colors focus-ring`}
            >
              {label(l)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <LanguageToggle />
          <Link
            to="/contact"
            className="brand-button brand-button--small"
          >
            {consultation}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle />
          <button
            className="nav-menu-button relative z-50 h-9 w-9 focus-ring"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute left-1 right-1 h-[1.5px] bg-ink transition-all duration-300 ${open ? 'top-1/2 rotate-45' : 'top-[11px]'}`} />
            <span className={`absolute left-1 right-1 top-1/2 h-[1.5px] bg-ink transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-1 right-1 h-[1.5px] bg-ink transition-all duration-300 ${open ? 'top-1/2 -rotate-45' : 'top-[25px]'}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col bg-paper"
          >
            <div className="flex-1 flex flex-col justify-center gap-7 container-edge pt-20">
              <div className="mb-3"><BrandMark /></div>
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl font-medium tracking-tight text-ink"
                  >
                    {label(l)}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-3"
              >
                <Link to="/contact" onClick={() => setOpen(false)} className="brand-button">
                  {consultation}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
