import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DemoNotice } from './ui.jsx'
import { REGIONS, PROPERTY_TYPES } from '../content/data.js'

// Alle Formulare laufen im Demo-Modus: Es gibt kein Backend, daher wird nichts versendet.
// Test des Fehlerzustands: Adresse mit ?demo=fehler aufrufen. Personenbezogene Eingaben werden weder in URLs,
// Analyseereignisse noch im Browser-Speicher abgelegt.
const submitDemo = () => new Promise((res, rej) => setTimeout(() => (/demo=fehler/.test(window.location.search) ? rej(new Error('demo')) : res()), 900))

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const phoneOk = (v) => /^[+()\d\s/-]{6,}$/.test(v)

function validateField(f, v, all) {
  const val = (v ?? '').toString().trim()
  const req = typeof f.required === 'function' ? f.required(all) : f.required
  if (req && !val) return f.errorEmpty || 'Bitte füllen Sie dieses Feld aus.'
  if (val && f.type === 'email' && !emailOk(val)) return 'Bitte geben Sie eine gültige E-Mail-Adresse an, zum Beispiel name@beispiel.de.'
  if (val && f.type === 'tel' && !phoneOk(val)) return 'Bitte geben Sie eine gültige Telefonnummer an.'
  if (val && f.type === 'number' && (isNaN(+val) || +val < 1)) return 'Bitte geben Sie eine ganze Zahl ab 1 an.'
  return ''
}

export function Field({ f, value, error, onChange, id }) {
  const eid = id + '-err', hid = id + '-help'
  const common = { id, name: f.name, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': [error && eid, f.help && hid].filter(Boolean).join(' ') || undefined, autoComplete: f.auto, maxLength: f.type === 'textarea' ? 2000 : 200 }
  return (
    <div className="f">
      <label htmlFor={id}>{f.label}{!f.required && <i> (optional)</i>}</label>
      {f.type === 'select' ? (
        <select {...common} value={value} onChange={(e) => onChange(f.name, e.target.value)}>
          <option value="">Bitte wählen</option>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : f.type === 'textarea' ? (
        <textarea {...common} value={value} onChange={(e) => onChange(f.name, e.target.value)} />
      ) : (
        <input {...common} type={f.type || 'text'} inputMode={f.type === 'number' ? 'numeric' : undefined} value={value} onChange={(e) => onChange(f.name, e.target.value)} />
      )}
      {f.help && <div className="help" id={hid}>{f.help}</div>}
      {error && <div className="err" id={eid} role="alert">⚠ {error}</div>}
    </div>
  )
}

function Done({ title, text, onReset }) {
  return (
    <div className="state" role="status">
      <h3>{title}</h3>
      <p>{text}</p>
      <p className="small">Demo-Bestätigung: Es wurde nichts versendet und nichts gespeichert.</p>
      <button type="button" className="btn btn-line" style={{ color: 'var(--marine)' }} onClick={onReset}>Neue Eingabe</button>
    </div>
  )
}

export function LeadForm({ id, fields, submitLabel, doneTitle, doneText, intro, defaults = {}, marketing = false }) {
  const [vals, setVals] = useState(() => Object.fromEntries(fields.map((f) => [f.name, defaults[f.name] || ''])))
  const [errs, setErrs] = useState({})
  const [consent, setConsent] = useState(false)
  const [mk, setMk] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done | fail
  const busy = useRef(false)
  const set = (k, v) => { setVals((s) => ({ ...s, [k]: v })); if (errs[k]) setErrs((e) => ({ ...e, [k]: '' })) }
  const reset = () => { setVals(Object.fromEntries(fields.map((f) => [f.name, '']))); setConsent(false); setMk(false); setErrs({}); setStatus('idle') }
  const submit = async (e) => {
    e.preventDefault()
    if (busy.current) return // Schutz gegen versehentliche Mehrfachübermittlung
    const ne = {}
    fields.forEach((f) => { const m = validateField(f, vals[f.name], vals); if (m) ne[f.name] = m })
    if (!consent) ne.__consent = 'Bitte bestätigen Sie, dass Sie den Datenschutzhinweis zur Kenntnis genommen haben.'
    setErrs(ne)
    if (Object.keys(ne).length) {
      const first = Object.keys(ne)[0]
      const el = document.getElementById(first === '__consent' ? id + '-consent' : id + '-' + first)
      el && el.focus()
      return
    }
    busy.current = true; setStatus('sending')
    try { await submitDemo(); setStatus('done') } catch (err) { setStatus('fail') } finally { busy.current = false }
  }
  if (status === 'done') return <Done title={doneTitle} text={doneText} onReset={reset} />
  return (
    <form className="form" onSubmit={submit} noValidate aria-describedby={id + '-demo'}>
      <div id={id + '-demo'}><DemoNotice /></div>
      {intro && <p className="small">{intro}</p>}
      {status === 'fail' && (
        <div className="state error" role="alert"><h3>Das hat leider nicht geklappt.</h3><p>Ihre Eingaben sind noch vorhanden. Bitte versuchen Sie es erneut.</p></div>
      )}
      <fieldset disabled={status === 'sending'}>
        {fields.map((f) => <Field key={f.name} f={f} id={id + '-' + f.name} value={vals[f.name]} error={errs[f.name]} onChange={set} />)}
        <div className="f">
          <label className="check" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 14, fontWeight: 400, color: 'var(--ink)' }}>
            <input id={id + '-consent'} type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrs((x) => ({ ...x, __consent: '' })) }} aria-invalid={errs.__consent ? 'true' : undefined} />
            <span>Ich habe den <Link to="/datenschutz">Datenschutzhinweis</Link> zur Kenntnis genommen.</span>
          </label>
          {errs.__consent && <div className="err" role="alert">⚠ {errs.__consent}</div>}
        </div>
        {marketing && (
          <label className="check" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 14, fontWeight: 400, color: 'var(--ink)' }}>
            <input type="checkbox" checked={mk} onChange={(e) => setMk(e.target.checked)} />
            <span>Optional und getrennt von Ihrer Anfrage: Ich möchte Marketingkommunikation von ARVENTAS erhalten. Die Einwilligung ist freiwillig und jederzeit widerrufbar.</span>
          </label>
        )}
        <button type="submit" className="btn btn-marine" disabled={status === 'sending'}>
          {status === 'sending' ? <><span className="spin" aria-hidden="true" /> Wird verarbeitet …</> : <>{submitLabel} <span className="arr" aria-hidden="true">→</span></>}
        </button>
      </fieldset>
    </form>
  )
}

export const OWNER_FIELDS = [
  { name: 'name', label: 'Name', required: true, auto: 'name' },
  { name: 'email', label: 'E-Mail', type: 'email', required: true, auto: 'email' },
  { name: 'phone', label: 'Telefon', type: 'tel', auto: 'tel', help: 'Nur nötig, wenn Sie telefonisch kontaktiert werden möchten.' },
  { name: 'ort', label: 'Objektort', required: true, help: 'Ort oder Region genügt. Bitte keine vertrauliche Adresse angeben.' },
  { name: 'typ', label: 'Immobilientyp', type: 'select', options: PROPERTY_TYPES, required: true },
  { name: 'einheiten', label: 'Einheitenzahl', type: 'number' },
  { name: 'anliegen', label: 'Anliegen', type: 'textarea', required: true, help: 'Beschreiben Sie kurz, was Sie klären möchten.' },
]
export const PARTNER_FIELDS = [
  { name: 'name', label: 'Name', required: true, auto: 'name' },
  { name: 'firma', label: 'Unternehmen', required: true, auto: 'organization' },
  { name: 'bereich', label: 'Tätigkeitsbereich', required: true },
  { name: 'kontakt', label: 'Kontakt (E-Mail)', type: 'email', required: true, auto: 'email' },
  { name: 'art', label: 'Art der gewünschten Zusammenarbeit', type: 'textarea', required: true },
]

// Mehrstufige, fokussierte Registrierung für den Investorenkreis (Briefing 9.3).
const STEPS = ['Suchprofil', 'Ziele', 'Kontakt', 'Prüfung']
export function InvestorWizard() {
  const [step, setStep] = useState(0)
  const [v, setV] = useState({ region: '', typ: '', budget: '', erfahrung: '', horizont: '', name: '', email: '', weg: 'E-Mail', phone: '' })
  const [errs, setErrs] = useState({})
  const [ack, setAck] = useState(false)
  const [mk, setMk] = useState(false)
  const [status, setStatus] = useState('idle')
  const busy = useRef(false)
  const head = useRef(null)
  const set = (k, val) => { setV((s) => ({ ...s, [k]: val })); setErrs((e) => ({ ...e, [k]: '' })) }
  const F = {
    0: [
      { name: 'region', label: 'Region', type: 'select', options: ['Bundesweit', ...REGIONS.map((r) => r.name)], required: true },
      { name: 'typ', label: 'Immobilientyp', type: 'select', options: PROPERTY_TYPES, required: true },
      { name: 'budget', label: 'Budgetband', type: 'select', options: ['bis 500.000 €', '500.000 – 2 Mio. €', '2 – 5 Mio. €', 'ab 5 Mio. €', 'Im Gespräch klären'], required: true, help: 'Nur ein Band, keine Nachweise. Bonitätsunterlagen werden nicht abgefragt.' },
    ],
    1: [
      { name: 'erfahrung', label: 'Erfahrung mit Immobilieninvestments', type: 'select', options: ['Erste Erfahrungen', 'Erfahren', 'Professionell'], required: true },
      { name: 'horizont', label: 'Gewünschter Zeithorizont', type: 'select', options: ['Kurzfristig (bis 3 Jahre)', 'Mittelfristig (3 bis 10 Jahre)', 'Langfristig (über 10 Jahre)', 'Noch offen'], required: true },
    ],
    2: [
      { name: 'name', label: 'Name', required: true, auto: 'name' },
      { name: 'email', label: 'E-Mail', type: 'email', required: true, auto: 'email' },
      { name: 'phone', label: 'Telefon', type: 'tel', auto: 'tel', required: (all) => all.weg !== 'E-Mail', errorEmpty: 'Für Telefon oder Rückruf benötigen wir eine Telefonnummer.' },
    ],
  }
  const check = () => {
    const ne = {}
    ;(F[step] || []).forEach((f) => { const m = validateField(f, v[f.name], v); if (m) ne[f.name] = m })
    if (step === 3 && !ack) ne.ack = 'Bitte bestätigen Sie, dass Sie den Datenschutzhinweis zur Kenntnis genommen haben.'
    setErrs(ne)
    if (Object.keys(ne).length) { const k = Object.keys(ne)[0]; const el = document.getElementById('iw-' + k); el && el.focus(); return false }
    return true
  }
  const go = (n) => { setStep(n); setTimeout(() => head.current && head.current.focus(), 0) }
  const next = () => { if (check()) go(step + 1) }
  const submit = async () => {
    if (busy.current || !check()) return
    busy.current = true; setStatus('sending')
    try { await submitDemo(); setStatus('done') } catch (e) { setStatus('fail') } finally { busy.current = false }
  }
  if (status === 'done') return <Done title="Ihr Suchprofil ist angelegt (Demo)." text="In der Live-Version würden wir Ihre Angaben prüfen und uns über Ihren gewählten Kontaktweg melden." onReset={() => { setStatus('idle'); setStep(0); setAck(false); setMk(false) }} />
  const rows = [['Region', v.region], ['Immobilientyp', v.typ], ['Budgetband', v.budget], ['Erfahrung', v.erfahrung], ['Zeithorizont', v.horizont], ['Name', v.name], ['E-Mail', v.email], ['Kontaktweg', v.weg + (v.phone ? ' (' + v.phone + ')' : '')]]
  return (
    <div className="form">
      <DemoNotice />
      <p className="prog-l" ref={head} tabIndex={-1} style={{ outline: 'none' }}>Schritt {step + 1} von 4 · {STEPS[step]}</p>
      <div className="prog" aria-hidden="true">{STEPS.map((s, i) => <i key={s} className={i <= step ? 'on' : ''} />)}</div>
      {status === 'fail' && <div className="state error" role="alert"><h3>Das hat leider nicht geklappt.</h3><p>Ihre Eingaben sind noch vorhanden. Bitte versuchen Sie es erneut.</p></div>}
      <fieldset disabled={status === 'sending'}>
        {step < 3 && F[step].map((f) => <Field key={f.name} f={f} id={'iw-' + f.name} value={v[f.name]} error={errs[f.name]} onChange={set} />)}
        {step === 2 && (
          <div className="f" role="radiogroup" aria-labelledby="weg-l">
            <span className="lbl" id="weg-l">Bevorzugter Kontaktweg</span>
            {['E-Mail', 'Telefon', 'Rückruf'].map((w) => (
              <label key={w} className="check" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 15, fontWeight: 400, color: 'var(--ink)', marginBottom: 8 }}>
                <input type="radio" name="weg" checked={v.weg === w} onChange={() => set('weg', w)} /><span>{w}</span>
              </label>
            ))}
          </div>
        )}
        {step === 3 && (
          <>
            <p className="small">Bitte prüfen Sie Ihre Angaben.</p>
            <dl className="sum">{rows.map(([k, val]) => <div key={k}><dt>{k}</dt><dd>{val || '–'}</dd></div>)}</dl>
            <div className="f">
              <label className="check" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 14, fontWeight: 400, color: 'var(--ink)' }}>
                <input id="iw-ack" type="checkbox" checked={ack} onChange={(e) => { setAck(e.target.checked); setErrs({}) }} aria-invalid={errs.ack ? 'true' : undefined} />
                <span>Ich habe den <Link to="/datenschutz">Datenschutzhinweis</Link> zur Kenntnis genommen.</span>
              </label>
              {errs.ack && <div className="err" role="alert">⚠ {errs.ack}</div>}
            </div>
            <label className="check" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 14, fontWeight: 400, color: 'var(--ink)' }}>
              <input type="checkbox" checked={mk} onChange={(e) => setMk(e.target.checked)} />
              <span>Optional und getrennt von Ihrem Suchprofil: Ich möchte Marketingkommunikation von ARVENTAS erhalten. Die Einwilligung ist freiwillig und jederzeit widerrufbar.</span>
            </label>
          </>
        )}
        <div className="btn-row" style={{ marginTop: 12 }}>
          {step > 0 && <button type="button" className="btn btn-line" style={{ color: 'var(--marine)' }} onClick={() => go(step - 1)}>← Zurück</button>}
          {step < 3 && <button type="button" className="btn btn-marine" onClick={next}>Weiter <span className="arr" aria-hidden="true">→</span></button>}
          {step === 3 && <button type="button" className="btn btn-marine" onClick={submit} disabled={status === 'sending'}>{status === 'sending' ? <><span className="spin" aria-hidden="true" /> Wird verarbeitet …</> : <>Suchprofil anlegen <span className="arr" aria-hidden="true">→</span></>}</button>}
        </div>
      </fieldset>
    </div>
  )
}
