# ARVENTAS – Übergabe an den Webdesigner

Stand: Prototyp mit Demo-Inhalten. **Nicht zur Veröffentlichung freigegeben.** Die Seite trägt `noindex` (siehe `index.html`). Vor dem Livegang entfernen.

## 1. Start und Build
- Entwicklung: `npm install`, dann `npm run dev`
- Produktions-Build: `npm run build` (Ausgabe in `dist/`), Vorschau: `npm run preview`
- Hosting: Vercel. `vercel.json` leitet alle Pfade auf `index.html` (Single-Page-App); statische Dateien haben Vorrang.
- Rahmen: Vite, React, React Router (bestehendes Projekt, daher weiter JavaScript statt TypeScript).

## 2. Seiten (alle 12 Routen umgesetzt)
| Route | Datei | Inhalt |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Scroll-Film-Hero plus 10 weitere Sektionen und Footer |
| `/immobilie-verkaufen` | `Owners.jsx` | Eigentümer: Tabs, Ablauf, FAQ, Anfrageformular |
| `/kapitalanlage-immobilien` | `Investors.jsx` | Investoren: Prüfmatrix, FAQ |
| `/investorenkreis` | `InvestorCircle.jsx` | 4-stufige Registrierung (Suchprofil) |
| `/objektreport` | `ReportPage.jsx` | Bausteine, interaktive Musteransicht, FAQ |
| `/ueber-uns` | `About.jsx` | Modell, Werte, Struktur-Platzhalter |
| `/partner` | `Partners.jsx` | Prozess, Partnerformular |
| `/wissen`, `/wissen/:slug` | `Knowledge.jsx`, `Article.jsx` | Editorial, Beitragsvorlage (3 Entwürfe) |
| `/kontakt` | `Contact.jsx` | Drei getrennte Zugänge, Region-Vorbelegung (`?region=`) |
| `/impressum`, `/datenschutz` | `Legal.jsx` | Vorbereitete Rechtsseiten mit Platzhaltern |
| `*` | `NotFound.jsx` | 404 |

## 3. Komponenten (`src/components`)
Logo/Header (`Header.jsx`), Footer (`Footer.jsx`), Buttons, Section Header, Tabs, FAQ, Platzhalter (`ui.jsx`), Scroll-Film (`ScrollFilm.jsx`), Report Viewer (`ReportViewer.jsx`), Timeline (`ProcessTimeline.jsx`), Matching Illustration (`MatchingIllustration.jsx`), Germany Region Selector (`GermanyRegionSelector.jsx`), Lead Forms und Investoren-Wizard (`forms.jsx`), Consent Controls (`Consent.jsx`), Markenschreibweise (`Brand.jsx`), SEO (`Seo.jsx`), Seiten-Hero (`PageHero.jsx`).
Design-Tokens: `src/styles/global.css` (`:root`). Inhalte und Auswahllisten: `src/content/data.js`.

## 4. Designgrundlage
- Farben: Gold #B09E80, Marineblau #192537, Elfenbein #F5F3EF, Schwarz #0B0B0B. Weiß nur für die Wortmarke und Lesbarkeit.
- Schriften: Playfair Display (Headlines), Inter (Fließtext, Navigation, Formulare). Griechisches Lambda kommt aus Inter (Greek-Subset).
- Keine dekorativen Verläufe, Gold-Glows, Drop-Shadows, Neonfarben oder Glas-Effekte.
- Motion: UI 200 ms, Reveals 600 ms, kein Custom Cursor, kein Autoplay-Ton, kein Scroll-Snapping. Bei reduzierter Bewegung statische Alternativen.
- Logo: Originaldatei unverändert (`public/media/arventas-logo.png`, nur leerer Rand beschnitten), eine zentrale Komponente im Header und Footer.
- **Markenschreibweise:** Sichtbar „ΛRVENTΛS“ (Komponente `Brand.jsx`, Brandbook). Technische Lesefassung „ARVENTAS“ für Alt-Texte, Titel, Meta, URLs und Screenreader.

## 5. Abweichungen und Entscheidungen
1. **Startseiten-Hero:** Auf ausdrücklichen Wunsch bleibt der scroll-gesteuerte Film (Bildsequenz) mit kurzem Lade-Intro erhalten. Das Briefing nennt „kein vorgeschaltetes Logo-Intro“ und keine sehr langen fixierten Scroll-Szenen. Der Film ist 1250vh lang (mobil 900vh) und kann bei Bedarf gekürzt werden. Der Header liegt dabei transparent über dem Film und wird danach zur flachen Marine-Leiste.
2. **Gradienten:** Die frühere Verlaufs-Abdunklung des Films wurde durch ein gleichmäßiges Overlay ersetzt.
3. **Brandbook:** Es liegen bisher nur einzelne Screenshots vor (Seiten zu Markenname, Verwendung, Markenessenz, Zielgruppe, Logo-System). Erkennbar übernommen: Schreibweise mit Lambda. Alle übrigen Brandbook-Vorgaben stammen aus dem Briefing (Farben S. 14, Typografie S. 12, Bildsprache S. 22).
4. **Interne Strategie:** Die frühere Seite `/strategie` (internes Go-to-Market-Dokument) ist nicht mehr öffentlich. Sie liegt unverändert unter `internal/strategie-old/` und wird nicht gebaut.
5. **Deutsch und Leseversion:** Alle Originaltexte sind Deutsch in Sie-Ansprache. Zusätzlich gibt es einen DE/EN-Umschalter im Header als Lesehilfe für die Abnahme (`src/i18n.js`, Wörterbuch `src/content/en.js`). Die englischen Texte sind eine einfache Übersetzung ohne redaktionelle Prüfung. Vor Veröffentlichung entscheiden, ob der Umschalter bleibt (Briefing: alle sichtbaren Texte Deutsch).

## 6. Integrationspunkte (nicht angebunden, nichts vorgetäuscht)
- Formulare (Eigentümer, Partner, Investorenkreis): laufen im Demo-Modus, `submitDemo()` in `src/components/forms.jsx` ersetzen durch einen serverseitigen Endpunkt. Fehlerzustand testbar mit `?demo=fehler`.
- onOffice (operatives CRM), n8n (Workflow), DeepImmo und PriceHubble (interne Datenquellen), Supabase (mögliche Analyse-Datenebene): nur serverseitig anbinden, der Browser erhält keine Schlüssel. Benötigte Freigaben: Datenschutz, Auftragsverarbeitung, Zugangsdaten.
- Einwilligung: `Consent.jsx` speichert nur die Auswahl. Statistik- oder Marketing-Dienste sind nicht eingebunden; vor Aktivierung technische Einwilligungsumsetzung ergänzen.
- Kalender: keine Integration, daher „Termin anfragen“ statt Buchung.

## 7. Fehlende Originaldaten und Freigaben (offene Produktionsaufgaben)
- Brandbook vollständig (nur Screenshots erhalten)
- Transparente/horizontale Logo-Variante für den Header (aktuell die quadratische Datei, siehe Medienverzeichnis)
- Echte Fotografie, Architekturclip, Porträts und Team-Profile (Name, Rolle, Fachgebiet)
- Verifizierte Kontaktdaten, Impressum-Pflichtangaben, Unternehmensstruktur
- Partnerlogos nur nach bestätigter Beziehung und Nutzungsfreigabe (Baumann Immobilien und ROUD-HAUS erscheinen bewusst nicht)
- Konditionen und Bearbeitungszeit (FAQ-Antworten mit Kennzeichnung „Redaktionelle Freigabe offen“)
- Echte anonymisierte Objektreport-Daten; bis dahin nur das gekennzeichnete Muster
- Redaktionelle Freigabe der Wissensbeiträge (derzeit Entwürfe)
- Rechtliche Prüfung von Datenschutz, Impressum und Cookie-Texten

## 8. Teststatus (tatsächlich durchgeführt)
- Build: `npm run build` erfolgreich.
- Alle 12 Routen plus 404 im Browser (Chromium, Playwright) geladen: keine Konsolenfehler.
- Prüfbreiten 360, 390, 768, 1024, 1440, 1920 px: keine horizontale Überbreite auf allen Seiten.
- Interaktionen geprüft: Formularvalidierung, Ladezustand, Demo-Bestätigung, Fehlerzustand, mehrstufige Registrierung (Pflichtfelder, Zurück, Zusammenfassung), Report-Tabs per Tastatur, Karte und Liste synchron, Region-Vorbelegung, Matching-Auswahl, Cookie-Dialog (Öffnen, Escape), mobiles Menü (Öffnen, Escape).
- Nicht getestet: Screenreader, Kontrastprüfung mit Werkzeug, Safari und Firefox, Lighthouse-Werte, echte Mobilgeräte. Es werden keine Performance- oder Ladezeitwerte behauptet.
- Status je Funktion: visuell umgesetzt und im Prototyp funktionsfähig; **nicht** mit echtem Backend verbunden; **nicht** für die Veröffentlichung freigegeben.
