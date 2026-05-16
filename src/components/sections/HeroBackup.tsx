'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const trustedLogos = [
  { src: '/cheskey_logo.png', alt: 'Chesky Partners', width: 102, height: 31 },
  { src: '/CSP_logo.png', alt: 'CSP', width: 79, height: 44 },
  { src: '/GCP_logo.png', alt: 'Genesis Credit Partners', width: 99, height: 36 },
  { src: '/Founders_Logo.png', alt: 'Founders Exit Group', width: 77, height: 51 },
  { src: '/white-oak.png', alt: 'White Oak Global Advisors', width: 109, height: 57 },
]

export const HeroBackup: React.FC = () => {

  return (
    <section
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(291deg, #1C3E57 0%, #24445C 100%)',
        overflow: 'hidden',
        fontFamily: 'Montserrat, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Image
          src="/hero_bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(4deg, #1C3E57 0%, rgba(28,62,87,0) 60%)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '110px 24px 60px',
          gap: 40,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, maxWidth: 678, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  width: 'clamp(28px, 8vw, 50px)',
                  height: 1.25,
                  background: 'linear-gradient(90deg, rgba(201,169,110,0) 0%, #C9A96E 100%)',
                }}
              />
              <div
                style={{
                  color: '#C9A96E',
                  fontSize: 'clamp(11px, 3vw, 16px)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 'clamp(1.6px, 0.6vw, 3.2px)',
                  textAlign: 'center',
                }}
              >
                Boutique Insurance Brokerage
              </div>
              <div
                style={{
                  width: 'clamp(28px, 8vw, 50px)',
                  height: 1.25,
                  background: 'linear-gradient(90deg, #C9A96E 0%, rgba(201,169,110,0) 100%)',
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h1
                style={{
                  margin: 0,
                  color: 'transparent',
                  fontSize: 'clamp(52px, 8vw, 91.67px)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  lineHeight: 1.4,
                  textShadow: '-3.619px 2.413px 3.619px rgba(8,28,43,0.30)',
                  letterSpacing: '-1px',
                  background: 'linear-gradient(294deg, #FFFFFF 13.345%, #CCE8FD 54.692%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Complex risk
              </h1>
              <h2
                style={{
                  margin: 0,
                  color: 'transparent',
                  fontSize: 'clamp(32px, 5vw, 53.62px)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  lineHeight: 1.4,
                  textShadow: '-3.619px 2.413px 3.619px rgba(8,28,43,0.30)',
                  letterSpacing: '-0.5px',
                  background: 'linear-gradient(294deg, #FFFFFF 13.345%, #CCE8FD 54.692%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                handled with Intention
              </h2>
            </div>

            <p
              style={{
                maxWidth: 656,
                margin: 0,
                textAlign: 'center',
                color: '#B8D2E5',
                fontSize: 15,
                fontWeight: 400,
                lineHeight: '21px',
                letterSpacing: '1.2px',
              }}
            >
              Advising and placing risk solutions for executives, investors, and deal teams across transactions, leadership
              exposure, and hard-to-place risks.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="#contact">
              <Button variant="primary">Start a Conversation</Button>
            </Link>
            <Link href="#services">
              <Button variant="secondary">Explore our Approach</Button>
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div
              style={{
                color: 'rgba(184,210,229,0.80)',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: '30px',
              }}
            >
              Trusted by Industry Leaders
            </div>
            <div
              style={{
                color: '#C9A96E',
                fontSize: 10,
                fontWeight: 500,
                lineHeight: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              By referral only
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16.53, flexWrap: 'wrap', justifyContent: 'center' }}>
            {trustedLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.75 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
