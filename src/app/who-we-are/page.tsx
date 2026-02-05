import { Navigation } from '@/components/sections/Navigation'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { Footer } from '@/components/sections/Footer'

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <WhoWeAre />
      <Footer />
    </main>
  )
}
