import { LensIntro } from "@/components/lens-intro"
import { VisionSection } from "@/components/vision-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { CollaborationsSection } from "@/components/collaborations-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="relative">
      {/* Section 1 - Camera Lens Intro */}
      <LensIntro />
      
      {/* Section 2 - Entering the Vision */}
      <VisionSection />
      
      {/* Section 3 - Portfolio */}
      <PortfolioSection />
      
      {/* Section 4 - About */}
      <AboutSection />
      
      {/* Section 5 - Services */}
      <ServicesSection />
      
      {/* Section 6 - Collaborations */}
      <CollaborationsSection />
      
      {/* Section 7 - Contact */}
      <ContactSection />
    </main>
  )
}
