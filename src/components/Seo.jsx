import { useEffect } from 'react'

const SITE_URL = 'https://embassyofeducation.co.in'
const BRAND = 'Embassy of Education'

export const seoPages = {
  home: {
    title: 'Visa Agency in Vadodara | Embassy of Education',
    description: 'Embassy of Education is a visa agency in Vadodara offering visa assessment, application preparation, DS-160 review, documentation support and interview preparation.',
    path: '/',
  },
  services: {
    title: 'Visa Services in Vadodara | Embassy of Education',
    description: 'Explore visa assessment, application preparation, documentation review, DS-160 support, interview preparation and student visa assistance in Vadodara.',
    path: '/services',
  },
  destinations: {
    title: 'Visa Agency for USA, UK, Canada & Australia | Vadodara',
    description: 'Explore visa guidance for the United States, United Kingdom, Canada, Australia and Schengen destinations from Embassy of Education in Vadodara.',
    path: '/destinations',
  },
  about: {
    title: 'About Embassy of Education | Visa Consultants in Vadodara',
    description: 'Learn about Embassy of Education, a Vadodara-based visa strategy and education consultancy focused on assessment, documentation and interview preparation.',
    path: '/about',
  },
  visaCategories: {
    title: 'Visa Categories | Student, Visitor, Business & Work Visas',
    description: 'Understand common student, visitor, business, work, exchange and immigrant visa categories before you apply.',
    path: '/visa-categories',
  },
  resources: {
    title: 'Visa Guides, DS-160 & Interview Resources | Embassy of Education',
    description: 'Practical visa guides covering DS-160, documentation, proof of funds, visa interviews, refusals and category selection.',
    path: '/resources',
  },
  contact: {
    title: 'Contact a Visa Agency in Vadodara | Embassy of Education',
    description: 'Contact Embassy of Education in Vadodara for visa assessment, case preparation and education guidance.',
    path: '/contact',
  },
}

function setMeta(name, content) {
  if (!content) return
  let node = document.head.querySelector(`meta[name="${name}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute('name', name)
    document.head.appendChild(node)
  }
  node.setAttribute('content', content)
}
function setProperty(property, content) {
  if (!content) return
  let node = document.head.querySelector(`meta[property="${property}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute('property', property)
    document.head.appendChild(node)
  }
  node.setAttribute('content', content)
}

export default function Seo({ page = 'home', title, description, path, type = 'website', schema }) {
  const defaults = seoPages[page] || seoPages.home
  const resolvedTitle = title || defaults.title
  const resolvedDescription = description || defaults.description
  const resolvedPath = path || defaults.path
  const canonical = `${SITE_URL}${resolvedPath === '/' ? '/' : resolvedPath}`

  useEffect(() => {
    document.title = resolvedTitle
    document.documentElement.lang = 'en'
    setMeta('description', resolvedDescription)
    setMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    setProperty('og:title', resolvedTitle)
    setProperty('og:description', resolvedDescription)
    setProperty('og:type', type)
    setProperty('og:url', canonical)
    setProperty('og:site_name', BRAND)
    setProperty('og:image', `${SITE_URL}/logo.png`)
    setProperty('twitter:card', 'summary_large_image')
    setProperty('twitter:title', resolvedTitle)
    setProperty('twitter:description', resolvedDescription)
    setProperty('twitter:image', `${SITE_URL}/logo.png`)

    let canonicalNode = document.head.querySelector('link[rel="canonical"]')
    if (!canonicalNode) {
      canonicalNode = document.createElement('link')
      canonicalNode.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalNode)
    }
    canonicalNode.setAttribute('href', canonical)

    document.getElementById('dynamic-seo-schema')?.remove()
    const payload = schema || {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      isPartOf: { '@type': 'WebSite', name: BRAND, url: SITE_URL },
    }
    const node = document.createElement('script')
    node.id = 'dynamic-seo-schema'
    node.type = 'application/ld+json'
    node.textContent = JSON.stringify(payload)
    document.head.appendChild(node)
    return () => document.getElementById('dynamic-seo-schema')?.remove()
  }, [resolvedTitle, resolvedDescription, canonical, type, schema])
  return null
}

export { SITE_URL, BRAND }
