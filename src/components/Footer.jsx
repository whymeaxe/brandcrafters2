import { Link } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

const designerWhatsApp = 'https://wa.me/917340159100?text=Hi%20Himanshu%2C%20I%20found%20your%20work%20on%20the%20Embassy%20of%20Education%20website.'

export default function Footer() {
  return (
    <footer className="border-t hairline brand-tint-purple">
      <div className="container-edge py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <BrandMark />
          <p className="mt-5 text-sm text-charcoal max-w-sm leading-relaxed">
            U.S. visa strategy, case preparation and education guidance — with clarity before submission.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link className="hover:text-brand-purple" to="/services">Services</Link></li>
            <li><Link className="hover:text-brand-purple" to="/destinations">Destinations</Link></li>
            <li><Link className="hover:text-brand-purple" to="/visa-categories">Visa Categories</Link></li>
            <li><Link className="hover:text-brand-purple" to="/resources">Resources</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Embassy of Education</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link className="hover:text-brand-purple" to="/about">About</Link></li>
            <li><Link className="hover:text-brand-purple" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-brand-purple" to="/contact">Book a consultation</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-edge py-6 border-t hairline flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-charcoal">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span>© {new Date().getFullYear()} Embassy of Education. All rights reserved.</span>
          <span>Embassy of Education is an independent advisory and education consultancy. Visa decisions are made solely by the relevant authority; no service guarantees an outcome.</span>
        </div>
        <a
          href={designerWhatsApp}
          target="_blank"
          rel="noreferrer"
          className="site-credit focus-ring shrink-0"
          aria-label="Site by Himanshu Khandelwal — contact on WhatsApp"
        >
          <span>Site by</span>
          <strong>Himanshu Khandelwal</strong>
        </a>
      </div>
    </footer>
  )
}
