import { Navigation } from '@/components/sections/Navigation'
import { HeroBackup } from '@/components/sections/HeroBackup'
import { Services } from '@/components/sections/Services'
import { Team } from '@/components/sections/Team'
import { Process } from '@/components/sections/Process'
import { SolutionsByStage } from '@/components/sections/SolutionsByStage'
import { SocialProof } from '@/components/sections/SocialProof'
import { Faq } from '@/components/sections/FAQ'
import { Cta } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroBackup />
      <Team />
      <Services />
      <Process />
      <SolutionsByStage />
      <SocialProof />
      
      <Faq />
      <Cta />
      <Footer />
    </main>
  )
}
