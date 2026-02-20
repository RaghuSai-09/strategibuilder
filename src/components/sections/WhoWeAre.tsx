'use client'
import Link from 'next/link'
import React from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Target, Heart, Users, Award, TrendingUp, Shield, Globe, Lightbulb, CheckCircle, Linkedin } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

const values = [
  {
    icon: Target,
    title: 'Intention',
    description: 'We approach our work with intention because the decisions we support carry real weight. They affect people, businesses, and futures built over time. We begin by listening and taking the time to understand the full context behind each situation, including the pressures leaders are facing. This allows us to offer guidance that is thoughtful, steady, and centered on protecting what truly matters.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Integrity is where our work begins. It shapes how we show up, how we advise, and how we advocate. We are guided by honesty, accountability, and respect for the responsibility entrusted to us. Our commitment is to do what is right for our clients and to build relationships that endure because they are rooted in trust.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Lightbulb,
    title: 'Intelligence',
    description: 'We are innovative and modern in how we work, using AI and emerging tools to support an evolving risk landscape. We continue to explore new technologies and approaches that create clarity, efficiency, and better outcomes for our clients. Innovation is used in the service of people, not in place of them. Human judgment, real connection, and trusted relationships remain central as we adapt and grow alongside the businesses we support.',
    color: 'from-amber-500 to-orange-500',
  },
]

const team = [
  {
    name: 'Raghu Sai',
    role: 'Web Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Full-stack developer with expertise in building scalable web applications and seamless user experiences.',
    linkedin: 'https://www.linkedin.com/in/raghusai09/',
  },
  {
    name: 'Mamanth ',
    role: 'Web Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Creative web designer with a keen eye for aesthetics and user-centered design principles.',
    linkedin: 'https://www.linkedin.com/in/mamanth-kondapalli/',
  },
]

const stats = [
  { icon: Users, value: '500+', label: 'Clients Served', description: 'Across multiple industries' },
  { icon: Award, value: '95%', label: 'Success Rate', description: 'Client satisfaction' },
  { icon: TrendingUp, value: '50+', label: 'Industries', description: 'Specialized expertise' },
  { icon: Shield, value: '15+', label: 'Years', description: 'Industry experience' },
]

const achievements = [
  'Industry-leading insurance placement success rate',
  'Trusted by Fortune 500 companies and startups alike',
  'Recognized for innovative risk management solutions',
  'Award-winning customer service and support',
]

export const WhoWeAre: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: founderRef, isVisible: founderVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: whyUsRef, isVisible: whyUsVisible } = useScrollAnimation({ triggerOnce: true })

  return (
    <div className="bg-gold-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gold-50">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-navy-300/20 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`relative z-10 max-w-4xl mx-auto text-center scroll-animate ${heroVisible ? 'visible animate-fade-in-up' : ''}`}
        >

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-navy-900 mb-6">
            Who We Are
          </h1>
          <p className="text-xl md:text-2xl text-navy-700 max-w-3xl mx-auto leading-relaxed font-light">
            A boutique insurance brokerage dedicated to solving complex placement challenges through relationships, expertise, and innovative solutions
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <Section className="bg-gold-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            ref={storyRef}
            className={`scroll-animate ${storyVisible ? 'visible animate-slide-in-left' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-navy-900 mb-6">
              Our Mission
            </h2>
            <div className="space-y-6 text-navy-700 leading-relaxed text-lg">
              <p>
                Strategi Builder is a boutique insurance brokerage specializing in complex placements where traditional insurance solutions fall short. We focus on building deep, trusted relationships with carriers and wholesale partners to deliver thoughtful, workable coverage for businesses facing unique challenges.
              </p>
              <p>
                Our approach combines modern technology—including AI-powered tools—with traditional relationship-driven brokerage. This blend enables us to work more efficiently while maintaining the personal advocacy and market knowledge that truly matter in difficult placements.
              </p>
              <p>
                Every engagement is guided by three core principles: <strong>Intention</strong> (purposeful problem-solving), <strong>Integrity</strong> (transparent processes), and <strong>Intelligence</strong> (data-backed decisions). We don&apos;t just place policies—we protect businesses through strategic access, strong relationships, and creative insurance solutions.
              </p>
            </div>

            {/* Achievements */}
            <div className="mt-8 space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-gold-600 flex-shrink-0 mt-1" />
                  <span className="text-navy-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`scroll-animate ${storyVisible ? 'visible animate-slide-in-right' : ''}`}>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/discuss.png"
                alt="Professional team collaboration"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-serif mb-2">Building Strategic Partnerships</h3>
                <p className="text-white/90">Working together to create lasting success</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-50">
        <div 
          ref={statsRef}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-navy-900 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-navy-600 font-light">
              Proven results that speak for themselves
            </p>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={`text-center bg-gold-50/80 backdrop-blur-sm rounded-xl p-8 border border-gold-200 hover:shadow-xl hover:border-gold-400 transition-all duration-300 scroll-animate ${statsVisible ? `visible animate-scale-in stagger-${index + 1}` : ''}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-navy-800 to-navy-900 text-white mb-4 shadow-lg">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-serif font-normal text-navy-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-navy-800 font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-navy-600 text-sm font-light">
                    {stat.description}
                  </div>
                </div>
              )
            })}
          </div> 
        </div>
      </section> */}

      {/* Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gold-50">
        <div
          ref={founderRef}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
              Meet Our Founder
            </h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto font-light">
              Leadership driven by vision, experience, and unwavering commitment to excellence
            </p>
          </div>

          <div className={`grid lg:grid-cols-2 gap-12 items-start scroll-animate ${founderVisible ? 'visible animate-fade-in-up' : ''}`}>
            {/* Photo */}
            <div className="relative w-full max-w-lg mx-auto lg:mx-0 space-y-6">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-200/30 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-navy-200/30 rounded-full blur-3xl -z-10" />

                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-navy-100">
                  <Image
                    src="/Founder.png"
                    alt="Marianne Halvorsen - Founder & Chief Strategist"
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Credentials Card */}
              <div className="bg-gold-50/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gold-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-navy-900">Key Credentials</h4>
                </div>
                <ul className="space-y-3 text-sm text-navy-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0"></div>
                    <span>CPCU (Chartered Property Casualty Underwriter)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0"></div>
                    <span>AIS (Associate in Insurance Services)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0"></div>
                    <span>International Women&apos;s Day Innovation Award (2023)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0"></div>
                    <span>Turnaround Award - Professional Service of the Year</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="mb-6">
                <h3 className="text-4xl md:text-5xl font-serif font-normal text-navy-900 mb-3">
                  Marianne Halvorsen, CPCU, AIS
                </h3>
                <p className="text-2xl text-gold-700 font-semibold mb-2">
                  President, Senior Broker
                </p>
                <p className="text-lg text-navy-600 italic mb-4">
                  Business Development Executive | Strategic Partnerships | Executive Coach
                </p>
                <a
                  href="https://linkedin.com/in/halvorsen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-semibold">Connect on LinkedIn</span>
                </a>
              </div>

              <div className="space-y-4 text-navy-700 leading-relaxed text-lg mb-8">
                <p>
                  Marianne Halvorsen brings over 20 years of success driving revenue and building trusted relationships across insurance, finance, and professional services. As the President of Strategi Builder, she specializes in M&A, D&O, casualty, and complex risk solutions for private equity, high-growth, and restructuring-driven companies.
                </p>
                <p>
                  Prior to founding Strategi Builder, Marianne held senior leadership roles at major firms including Risk Strategies, Baldwin Risk Partners, Aon, Lockton, and Willis Towers Watson. She has a proven track record of originating and leading millions in new client revenue, structuring risk solutions for Fortune 500 companies, and serving as a strategic partner to private equity clients.
                </p>
                <p>
                  Beyond brokerage, Marianne is the founder of <Link href="https://kontaktsource.com" className="text-navy-800 underline font-semibold" target="_blank" rel="noopener noreferrer">Kontaktsource</Link>, a global community facilitating deal flow between private equity firms and family offices. She is also an executive coach tailored to high performers, focusing on mindset, leadership, and strategic growth.
                </p>
                <p>
                  Marianne holds master&apos;s degrees from Macquarie University and Queensland University of Technology, along with business degrees from Washington State University and BI Norwegian Business School.
                </p>
              </div>

              {/* High-level Expertise */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gold-50/80 rounded-lg p-4 border border-gold-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-gold-700" />
                    <span className="font-semibold text-navy-900">M&A Expert</span>
                  </div>
                  <p className="text-sm text-navy-700">Specializing in Due Diligence & RWI</p>
                </div>
                <div className="bg-navy-50/80 rounded-lg p-4 border border-navy-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-navy-700" />
                    <span className="font-semibold text-navy-900">Complex Risk</span>
                  </div>
                  <p className="text-sm text-navy-700">D&O, Cyber, P&C Solutions</p>
                </div>
                <div className="bg-navy-50/80 rounded-lg p-4 border border-navy-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-navy-700" />
                    <span className="font-semibold text-navy-900">Global Reach</span>
                  </div>
                  <p className="text-sm text-navy-700">International Program Experience</p>
                </div>
                <div className="bg-gold-50/80 rounded-lg p-4 border border-gold-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-gold-700" />
                    <span className="font-semibold text-navy-900">Connector</span>
                  </div>
                  <p className="text-sm text-navy-700">Founder of Kontaktsource</p>
                </div>
              </div>

              {/* Quote */}
              <div className="pl-6 border-l-4 border-navy-800">
                <p className="text-lg italic text-navy-700 mb-2">
                  &quot;I believe in protecting people, strengthening businesses, and connecting the right partners to drive transformational growth.&quot;
                </p>
                <p className="text-sm font-semibold text-navy-900">— Marianne Halvorsen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <Section className="bg-gold-100">
        <div
          ref={valuesRef}
          className={`text-center mb-16 scroll-animate ${valuesVisible ? 'visible animate-fade-in-up' : ''}`}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto font-light">
            The principles that guide every decision and drive our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className={`scroll-animate ${valuesVisible ? `visible animate-scale-in stagger-${index + 1}` : ''}`}
              >
                <Card hover className="h-full bg-gold-50 border-gold-200">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-normal text-navy-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-navy-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Our Team */}
      <Section className="bg-navy-50">
        <div
          ref={teamRef}
          className={`text-center mb-16 scroll-animate ${teamVisible ? 'visible animate-fade-in-up' : ''}`}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
            Our Expert Team
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto font-light">
            Seasoned professionals dedicated to delivering exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`scroll-animate ${teamVisible ? `visible animate-fade-in-up stagger-${index + 1}` : ''}`}
            >
              <Card hover className="h-full bg-gold-50 border-gold-200 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-navy-100 shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-serif font-normal text-navy-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gold-700 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-navy-600 leading-relaxed mb-4">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-gold-50">
        <div
          ref={whyUsRef}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
              Why Partner With Us
            </h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto font-light">
              Experience the difference of working with a team that puts your success first
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: 'Specialized Expertise',
                description: 'Deep knowledge in complex insurance placements and hard-to-place risks across 50+ industries with proven success in challenging markets.',
              },
              {
                icon: Shield,
                title: 'Strong Market Relationships',
                description: 'Established connections with carriers and wholesalers that provide access to solutions not available through standard channels.',
              },
              {
                icon: Lightbulb,
                title: 'Innovative Solutions',
                description: 'Creative problem-solving combined with modern technology to structure coverage that meets your unique business needs.',
              },
              {
                icon: Heart,
                title: 'Client-Centered Advocacy',
                description: 'Your success is our priority. We advocate tirelessly on your behalf to secure the protection your business deserves.',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={`bg-gold-50 rounded-xl p-8 border border-gold-200 hover:shadow-xl hover:border-gold-400 transition-all duration-300 scroll-animate ${whyUsVisible ? `visible animate-fade-in-up stagger-${index + 1}` : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-navy-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>
    </div>
  )
}
