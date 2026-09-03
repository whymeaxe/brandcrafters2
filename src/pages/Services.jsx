import PageHeader from '../components/PageHeader.jsx'
import ServicesList from '../components/ServicesList.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import VideoPlate from '../components/VideoPlate.jsx'
import Seo from '../components/Seo.jsx'

export default function Services() {
  return (
    <>
      <Seo page="services" />
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden brand-tint-purple">
        <div className="container-edge grid md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12 items-center min-h-[55vh]">
          <PageHeader
            eyebrow="Visa services"
            title="Support at every stage of the case."
            lede="From first assessment to interview day, each service below can stand alone or combine into a full case-preparation engagement — scoped to what your specific application actually needs."
            embedded
          />
          <div className="relative h-[42vh] md:h-[56vh] min-h-[260px] md:min-h-[390px] flex items-center justify-center">
            <VideoPlate src="videos/services-passport.mp4" className="h-full w-full" />
          </div>
        </div>
      </section>
      <ServicesList showHeader={false} />
      <FinalCTA />
    </>
  )
}
