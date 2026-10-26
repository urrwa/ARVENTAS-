// Sprachumschalter DE/EN (Lesehilfe für die Abnahme). Deutsch bleibt die Originalsprache.
// Technik: Ein DOM-Übersetzer ersetzt deutsche Texte anhand des Wörterbuchs in content/en.js und stellt sie bei Rückwechsel wieder her.
let EN = {}
let loaded = false
const loadEN = () => (loaded ? Promise.resolve() : import('./content/en.js').then((m) => { EN = m.default; loaded = true }))

let lang = 'de'
try { if (localStorage.getItem('arventas-lang') === 'en') lang = 'en' } catch (e) { /* Speicher nicht verfügbar */ }
const subs = new Set()
export const getLang = () => lang
export const subscribe = (f) => { subs.add(f); return () => subs.delete(f) }

const norm = (s) => s.replace(/\u00AD/g, '').replace(/\s+/g, ' ').trim()
const PHONE = { 'E-Mail': 'Email', Telefon: 'Phone', Rückruf: 'Callback' }
const RULES = [
  [/^Prinzipdarstellung: Ihr Suchprofil mit Region (.+), Budgetband (.+) und Immobilientyp (.+) wird mit Immobilieninformationen abgeglichen\.$/,
    (m) => `Schematic illustration: your search profile with region ${EN[m[1]] || m[1]}, budget range ${EN[m[2]] || m[2]} and property type ${EN[m[3]] || m[3]} is matched against property information.`],
  [/^(E-Mail|Telefon|Rückruf)( \(.*\))?$/, (m) => PHONE[m[1]] + (m[2] || '')],
  [/^Abschnitt (\d+) von (\d+)$/, (m) => `Section ${m[1]} of ${m[2]}`],
  [/^Ihre Anfrage wird mit dem Bezug (.+) vorbereitet – für Eigentümer und Investoren\.$/, (m) => `Your request is prepared with reference to ${EN[m[1]] || m[1]} – for owners and investors.`],
]

function translate(s) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s)
  const core = norm(m[2])
  if (!core) return s
  let t = EN[core]
  if (t == null) for (const [re, fn] of RULES) { const r = re.exec(core); if (r) { t = fn(r); break } }
  if (t == null) return s
  if (t[0] === '^') return t.slice(1) + m[3]   // ohne führendes Leerzeichen
  if (t[0] === '~') return ' ' + t.slice(1) + m[3] // mit führendem Leerzeichen
  return m[1] + t + m[3]
}
export const tr = (s) => (lang === 'en' && s ? translate(s) : s)

const ATTRS = ['alt', 'placeholder', 'aria-label', 'title']
const textOrig = new WeakMap()
const attrOrig = new WeakMap()
let observer = null

function doText(n) {
  if (n.parentNode && n.parentNode.closest && n.parentNode.closest('[data-notr]')) return
  const cur = n.nodeValue
  const t = translate(cur)
  if (t !== cur) { textOrig.set(n, cur); n.nodeValue = t }
}
function doAttr(el, a) {
  const v = el.getAttribute(a)
  if (!v) return
  const t = translate(v)
  if (t !== v) { const o = attrOrig.get(el) || {}; o[a] = v; attrOrig.set(el, o); el.setAttribute(a, t) }
}
function walk(root) {
  if (root.nodeType === 3) { doText(root); return }
  if (root.nodeType !== 1) return
  if (root.tagName === 'SCRIPT' || root.tagName === 'STYLE') return
  ATTRS.forEach((a) => doAttr(root, a))
  for (let c = root.firstChild; c; c = c.nextSibling) walk(c)
}
function restore(root) {
  if (root.nodeType === 3) { if (textOrig.has(root)) { root.nodeValue = textOrig.get(root); textOrig.delete(root) } return }
  if (root.nodeType !== 1) return
  const o = attrOrig.get(root)
  if (o) { Object.keys(o).forEach((a) => root.setAttribute(a, o[a])); attrOrig.delete(root) }
  for (let c = root.firstChild; c; c = c.nextSibling) restore(c)
}
function onMutations(recs) {
  if (lang !== 'en') return
  recs.forEach((r) => {
    if (r.type === 'characterData') { textOrig.delete(r.target); doText(r.target) }
    else if (r.type === 'attributes') { const o = attrOrig.get(r.target); if (o) delete o[r.attributeName]; doAttr(r.target, r.attributeName) }
    else r.addedNodes.forEach((n) => walk(n))
  })
  observer.takeRecords() // eigene Änderungen verwerfen
}

export async function setLang(l) {
  lang = l === 'en' ? 'en' : 'de'
  if (lang === 'en') await loadEN()
  try { localStorage.setItem('arventas-lang', lang) } catch (e) { /* ignorieren */ }
  document.documentElement.lang = lang
  if (lang === 'en') walk(document.body); else restore(document.body)
  observer && observer.takeRecords()
  subs.forEach((f) => f())
}

export function initI18n() {
  observer = new MutationObserver(onMutations)
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS })
  document.documentElement.lang = lang
  if (lang === 'en') loadEN().then(() => { walk(document.body); observer.takeRecords(); subs.forEach((f) => f()) })
}
