import PassportHero from '../components/PassportHero.jsx'
import DocumentReel from '../components/DocumentReel.jsx'
import NarrativeSection from '../components/NarrativeSection.jsx'
import ServicesList from '../components/ServicesList.jsx'
import WhyUs from '../components/WhyUs.jsx'
import ProcessJourney from '../components/ProcessJourney.jsx'
import DestinationsTeaser from '../components/DestinationsTeaser.jsx'
import CaseStudies from '../components/CaseStudies.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import Seo from '../components/Seo.jsx'

export default function Home() {
  return (
    <>
      <Seo page="home" schema={{ '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': 'https://embassyofeducation.co.in/#business', name: 'Embassy of Education', url: 'https://embassyofeducation.co.in/', image: ['https://embassyofeducation.co.in/logo.png'], telephone: '+919638955666', email: 'embassyofedu@gmail.com', address: { '@type': 'PostalAddress', streetAddress: 'GF-15, Sharnam Fortune, Opp. Inox, Beside Sterling Hospital, Race Course', addressLocality: 'Vadodara', postalCode: '390007', addressRegion: 'Gujarat', addressCountry: 'IN' }, areaServed: ['Vadodara','Ahmedabad','Gujarat','India'], knowsAbout: ['Visa applications','U.S. visas','B1/B2 visas','F-1 student visas','DS-160','Visa interview preparation','Study abroad'], description: 'Visa agency in Vadodara providing visa assessment, application preparation, documentation review and interview preparation.' }} />
      <PassportHero />
      <DocumentReel />
      <NarrativeSection />
      <ServicesList />
      <WhyUs />
      <ProcessJourney />
      <DestinationsTeaser />
      <CaseStudies />
      <FinalCTA />
    </>
  )
}
