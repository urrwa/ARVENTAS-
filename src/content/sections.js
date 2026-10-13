/* Source of truth for the 16 sections.
   Titles/numbers are supplied by the brief. `body` is EMPTY until the German
   strategy document is provided — then fill in blocks and everything renders.

   Block types:
   { type: 'p', text }  { type: 'h3', text }  { type: 'list', items: [] }
   { type: 'note', text }  { type: 'kpis', items: [{ value, label }] }
   { type: 'table', head: [], rows: [[]] }
*/
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
export const sections = [
  { n: 1, id: 'these', title: 'Die strategische These', layout: 'thesis', visual: 'altbau', body: [] },
  { n: 2, id: 'marktfenster', title: 'Warum jetzt — das Marktfenster', layout: 'compare', visual: 'mixed', body: [],
    table: { head: ['', 'Bayern', 'Baden-Württemberg'], rows: [] } },
  { n: 3, id: 'bestand', title: 'Was ARVENTAS bereits besitzt', layout: 'split', visual: 'detail', body: [] },
  { n: 4, id: 'engine', title: 'Die Engine — wie sie sich verstärkt', layout: 'engine', visual: 'multi', body: [] },
  { n: 5, id: 'positionierung', title: 'Positionierung & Botschaften', layout: 'editorial', visual: 'altbau', body: [] },
  { n: 6, id: 'zielgruppen', title: 'Zielgruppen', layout: 'split', visual: 'multi', flip: true, body: [] },
  { n: 7, id: 'angebot', title: 'Das Angebotsportfolio', layout: 'table', visual: 'mixed', body: [] },
  { n: 8, id: 'kanaele', title: 'Go-to-Market-Kanäle', layout: 'editorial', visual: 'detail', body: [] },
  { n: 9, id: 'launchplan', title: 'Der 100-Tage-Launchplan', layout: 'launch', visual: 'multi', body: [] },
  { n: 10, id: 'funnel', title: 'Funnel-Modell & Ziele', layout: 'funnel', visual: 'mixed', body: [] },
  { n: 11, id: 'vertrieb', title: 'Vertriebsprozess & Standards', layout: 'split', visual: 'altbau', flip: true, body: [] },
  { n: 12, id: 'technologie', title: 'Technologie & Daten', layout: 'tech', visual: 'detail', body: [] },
  { n: 13, id: 'marke', title: 'Gründergetriebene Markenstrategie', layout: 'editorial', visual: 'multi', body: [] },
  { n: 14, id: 'roadmap', title: '12-Monats-Wachstums-Roadmap', layout: 'roadmap', visual: 'mixed', body: [] },
  { n: 15, id: 'kpis', title: 'KPIs, Risiken & Leitplanken', layout: 'table', visual: 'detail', body: [] },
  { n: 16, id: 'naechste-schritte', title: 'Unmittelbare nächste Schritte', layout: 'closing', visual: 'altbau', body: [] },
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
