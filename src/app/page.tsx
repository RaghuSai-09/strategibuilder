import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { TargetMarket } from '@/components/sections/TargetMarket'
import { SocialProof } from '@/components/sections/SocialProof'
import { AuthBanner } from '@/components/sections/AuthBanner'
import { Faq } from '@/components/sections/FAQ'
import { Cta } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Process />
      <TargetMarket />
      <SocialProof />
      <AuthBanner />
      <Faq />
      <Cta />
      <Footer />
    </main>
  )
}
