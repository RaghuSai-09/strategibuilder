# Strategi Builder LLC - Landing Page

A professional, high-performance landing page built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Next.js 14** with App Router for optimal performance
- 🎨 **Tailwind CSS** with custom gradients and animations
- 📱 **Fully Responsive** design for all devices
- ♿ **Accessible** components following best practices
- 🚀 **Optimized** for Core Web Vitals
- 🎭 **Professional Design** with modern UI/UX
- 🌈 **Beautiful Gradients** throughout the design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Section.tsx
│   │   └── Container.tsx
│   └── sections/          # Page sections
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── ValueProposition.tsx
│       ├── Services.tsx
│       ├── Process.tsx
│       ├── TargetMarket.tsx
│       ├── SocialProof.tsx
│       ├── FAQ.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
└── lib/
    └── utils.ts           # Utility functions
```

## Customization

### Colors

Edit the color palette in `tailwind.config.ts`:
- Primary: Blue tones (trust, professionalism)
- Secondary: Green tones (growth, success)
- Accent: Amber tones (premium, achievement)

### Content

Update content in the component files:
- Hero section: `src/components/sections/Hero.tsx`
- Services: `src/components/sections/Services.tsx`
- Testimonials: `src/components/sections/SocialProof.tsx`

### Metadata

Update SEO metadata in `src/app/layout.tsx`

## Performance Optimizations

- Image optimization with Next.js Image component
- Font optimization with next/font
- Code splitting and lazy loading
- Compressed assets
- Minimal JavaScript bundle

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge

## License

© 2025 Strategi Builder LLC. All rights reserved.
