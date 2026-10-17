/* Source of truth for the 16 sections.
   Titles/numbers are supplied by the brief. `body` is EMPTY until the German
   strategy document is provided — then fill in blocks and everything renders.

   Block types:
   { type: 'p', text }  { type: 'h3', text }  { type: 'list', items: [] }
   { type: 'note', text }  { type: 'kpis', items: [{ value, label }] }
   { type: 'table', head: [], rows: [[]] }
*/
import doc from './doc.json'

export const meta = {
  brand: 'ARVENTAS',
  descriptor: 'OFF-MARKET IMMOBILIEN-INTELLIGENZ · BAYERN & BADEN-WÜRTTEMBERG',
  title: 'Go-to-Market- & Wachstumsstrategie',
  lede:
    'Wie ARVENTAS Off-Market-Zugang, vier Jahrzehnte Transaktionserfahrung und eine KI-gestützte Analyse-Engine in ein sich selbst verstärkendes zweiseitiges Transaktionsgeschäft überführt.',
  facts: [
    ['ERSTELLT VON', 'Branded Genius'],
    ['ERSTELLT FÜR', 'ARVENTAS Gründungspartner'],
    ['DATUM', 'August 2026'],
    ['STATUS', 'Zur Freigabe'],
  ],
}

// layout = visual composition; visual = which procedural architecture plate to use
const raw = [
  { n: 1, id: 'these', title: 'Die strategische These', layout: 'thesis', visual: 'altbau' },
  { n: 2, id: 'marktfenster', title: 'Warum jetzt — das Marktfenster', layout: 'compare', visual: 'mixed' },
  { n: 3, id: 'bestand', title: 'Was ARVENTAS bereits besitzt', layout: 'split', visual: 'detail' },
  { n: 4, id: 'engine', title: 'Die Engine — wie sie sich verstärkt', layout: 'engine', visual: 'multi' },
  { n: 5, id: 'positionierung', title: 'Positionierung & Botschaften', layout: 'editorial', visual: 'altbau' },
  { n: 6, id: 'zielgruppen', title: 'Zielgruppen', layout: 'split', visual: 'multi', flip: true },
  { n: 7, id: 'angebot', title: 'Das Angebotsportfolio', layout: 'table', visual: 'mixed' },
  { n: 8, id: 'kanaele', title: 'Go-to-Market-Kanäle', layout: 'editorial', visual: 'detail' },
  { n: 9, id: 'launchplan', title: 'Der 100-Tage-Launchplan', layout: 'launch', visual: 'multi' },
  { n: 10, id: 'funnel', title: 'Funnel-Modell & Ziele', layout: 'funnel', visual: 'mixed' },
  { n: 11, id: 'vertrieb', title: 'Vertriebsprozess & Standards', layout: 'split', visual: 'altbau', flip: true },
  { n: 12, id: 'technologie', title: 'Technologie & Daten', layout: 'tech', visual: 'detail' },
  { n: 13, id: 'marke', title: 'Gründergetriebene Markenstrategie', layout: 'editorial', visual: 'multi' },
  { n: 14, id: 'roadmap', title: '12-Monats-Wachstums-Roadmap', layout: 'roadmap', visual: 'mixed' },
  { n: 15, id: 'kpis', title: 'KPIs, Risiken & Leitplanken', layout: 'table', visual: 'detail' },
  { n: 16, id: 'naechste-schritte', title: 'Unmittelbare nächste Schritte', layout: 'closing', visual: 'altbau' },
]

// Named in the brief; no data invented.
export const engineStages = ['Sourcing', 'Analyse', 'Anziehung', 'Matching', 'Abwicklung', 'Lernen']

export const techSystems = [
  { id: 'onoffice', name: 'onOffice' },
  { id: 'deepimmo', name: 'DeepImmo' },
  { id: 'pricehubble', name: 'PriceHubble' },
  { id: 'n8n', name: 'n8n' },
  { id: 'supabase', name: 'Supabase' },
  { id: 'llm', name: 'LLM-Schicht' },
  { id: 'ga4', name: 'GA4' },
]

// Merge supplied document content (src/content/doc.json, extracted verbatim from the German strategy document).
export const sections = raw.map((r) => {
  const d = doc.sections['s' + String(r.n).padStart(2, '0')]
  return { ...r, subtitle: d.subtitle, body: d.blocks }
})
export const kpis = doc.kpis
export const tocDesc = doc.tocDesc
export const finalRec = doc.final
export const disclaimer = doc.footer
