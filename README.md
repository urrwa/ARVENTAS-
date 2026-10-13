# ARVENTAS

Editorial website for the ARVENTAS Go-to-Market- & Wachstumsstrategie (React + Vite + GSAP ScrollTrigger).

- `/` — **homepage placeholder** (to be recreated separately from a supplied design via the Scroll Site Generator; replace `src/pages/Home.jsx`).
- `/strategie` — the 16-section document page.

## Content
All 16 section titles, the cover text and the diagram labels (engine stages, systems) come from the brief.
Section bodies live in `src/content/sections.js` (`body: []`) and render as soon as the German strategy
document is added there (blocks: `p`, `h3`, `list`, `note`, `kpis`, `table`). Nothing is invented.

## Images
Architecture plates are procedural SVG stand-ins (`src/components/ArchPlate.jsx`). Pass `src="/images/…"`
to use licensed photography of Bavarian / Baden-Württemberg buildings; mask reveal and parallax carry over.

## Run
`npm i && npm run dev` · `npm run build`
