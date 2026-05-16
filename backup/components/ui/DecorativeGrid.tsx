import React from 'react'

const GRID_LINES = Array.from({ length: 17 }, (_, i) => i + 1)

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-50">
      <div className="absolute inset-0 flex gap-12">
        {GRID_LINES.map((line) => (
          <div
            key={`v-${line}`}
            className="h-full flex-[0_0_0px] border-l-[0.6px] border-l-cyan-500/40"
          />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col gap-12">
        {GRID_LINES.map((line) => (
          <div
            key={`h-${line}`}
            className="w-full flex-[0_0_0px] border-t-[0.6px] border-t-cyan-500/40"
          />
        ))}
      </div>
    </div>
  )
}

type Pos = Readonly<{ left: number; top: number }>

function Cross({ left, top }: Pos) {
  return (
    <div
      className="absolute h-6 w-6"
      style={{ left, top }}
    >
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-cyan-500/55" />
      <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-cyan-500/55" />
    </div>
  )
}

function Dot({ left, top }: Pos) {
  return (
    <div
      className="absolute h-1 w-1 rounded-full bg-cyan-500/40"
      style={{ left, top }}
    />
  )
}

function GlowBlock({ left, top }: Pos) {
  return (
    <div
      className="absolute h-12 w-[49px] bg-cyan-500/20"
      style={{ left, top }}
    />
  )
}

type GridClusterProps = Readonly<{
  className?: string
  rotated?: boolean
  opacityClass?: string
}>

/**
 * Canonical 768x672 decorative cluster (matches the Figma source pattern used
 * across the Hero/Team/Solutions sections). Position the cluster via `className`
 * (e.g. `left-1/2 top-[-321px] -translate-x-1/2`).
 */
export function GridCluster({
  className = '',
  rotated = false,
  opacityClass = 'opacity-80',
}: GridClusterProps) {
  return (
    <div
      className={[
        'absolute h-[672px] w-[768px]',
        opacityClass,
        rotated ? 'origin-top-left rotate-180' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_100%)]" />
      <GridLines />
      {/* Crosshair markers (canonical Figma positions) */}
      <Cross left={372} top={276} />
      <Cross left={565} top={228} />
      <Cross left={468} top={323} />
      <Cross left={613} top={515} />
      <Cross left={564} top={372} />
      <Cross left={181} top={468} />
      <Cross left={228} top={376} />
      {/* Dot markers */}
      <Dot left={286} top={334} />
      <Dot left={478} top={238} />
      <Dot left={527} top={430} />
      <Dot left={142} top={382} />
      {/* Glow blocks */}
      <GlowBlock left={528} top={288} />
      <GlowBlock left={96} top={432} />
      <GlowBlock left={625} top={432} />
    </div>
  )
}

type LightShaftProps = Readonly<{ className?: string }>

/**
 * Diagonal light shaft used as a soft accent across dark sections.
 * Position via `className` (e.g. `left-[46%] top-[-50%]`).
 */
export function LightShaft({ className = '' }: LightShaftProps) {
  return (
    <div
      className={[
        'absolute w-[597px] h-[140%] origin-top-left rotate-[23deg] blur-[60px]',
        'bg-[linear-gradient(221deg,rgba(129,192,237,0.18)_0%,rgba(22,48,68,0)_100%)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

/**
 * Soft-light radial overlay used to subtly tint the section.
 */
export function SoftLightOverlay({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <div
      className={[
        'absolute inset-0 mix-blend-soft-light',
        'bg-[radial-gradient(ellipse_84%_180%_at_18%_75%,#153147_0%,rgba(28,62,87,0.5)_49%,#153147_100%)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
