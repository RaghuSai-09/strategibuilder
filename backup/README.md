# backup/

Holding area for components that are no longer wired into the app but worth keeping for reference. This folder is excluded from `tsconfig.json` so it isn't type-checked or compiled by Next.js / TS, and it lives outside `src/` so Tailwind and the Next route scanner ignore it.

## Why each file is here

| File | Replaced by / reason |
|---|---|
| `components/sections/Hero.tsx` | Superseded by `src/components/sections/HeroBackup.tsx`, which is now the only hero on `src/app/page.tsx`. Old version kept for design reference. |
| `components/sections/TargetMarket.tsx` | Not imported anywhere. Built but never wired into a page. |
| `components/sections/ValueProposition.tsx` | Not imported anywhere. Built but never wired into a page. |
| `components/ui/DecorativeGrid.tsx` | `GridCluster` / `LightShaft` / `SoftLightOverlay` primitives that procedurally drew the deep-blue + grid + star backgrounds. The Hero and Team sections now use static `/hero_bg.png` and `/team_bg.png` instead, and no other section currently consumes these primitives. |

## Restoring something

1. Move the file back into the matching path under `src/`.
2. The `@/...` path alias and Tailwind class-scanning will start working again automatically.
3. If you're restoring `Hero.tsx`, decide what to do with `HeroBackup.tsx` (rename one of them, or restore the `USE_BACKUP_HERO` toggle in `src/app/page.tsx`).
4. If you're restoring `DecorativeGrid.tsx`, re-import the primitives in `Team.tsx` / `HeroBackup.tsx` and remove the static `<Image src="/hero_bg.png" />` / `<Image src="/team_bg.png" />` layers.

Imports inside these files still use the `@/...` alias, which resolves to `src/*`. The files won't compile from inside `backup/`; they are a reference copy only.
