# Medienverzeichnis

Alle Dateien liegen in `public/media/`. Status „Platzhalter“ bedeutet: vor Veröffentlichung durch freigegebene Originalmedien ersetzen.

| Datei | Einsatzort | Herkunft | Status |
|---|---|---|---|
| arventas-logo.png, arventas-logo-marine.png | Header, Footer | Original-Logo, vom Auftraggeber geliefert | Freigegeben |
| buero-abend-1.webp, buero-abend-2.webp | Seitenköpfe (Startseite, Leistungen, Kontakt, Über uns u. a.) | Fotos vom Auftraggeber (Ordner „Hero“) | Vom Auftraggeber geliefert, Nutzungsrechte bestätigen |
| cta-abend-1.webp, cta-abend-2.webp | Abschlussband „Bereit für …“, einzelne Seitenköpfe | Fotos vom Auftraggeber (Ordner „Bereit für eine …“) | Vom Auftraggeber geliefert, Nutzungsrechte bestätigen |
| gebaeude-sanierung.webp, planunterlagen.webp, besprechung.webp | Leistungskarten (Immobilienbewertung, Strategische Analyse, Strategische Vermarktung) | Unsplash, farbkorrigiert (Autoren siehe Git-Historie dieses Dokuments) | Unsplash-Lizenz; Platzhalter, durch Originalfotos ersetzen |
| Schriften Playfair Display, Inter | gesamte Seite | WOFF/WOFF2 via @fontsource, Open Font License | Frei nutzbar |

Entfernt: alle KI-generierten Bilder (Hero-Haus/Himmel/Wolken, Objektreport-Bausteine, Kontakt-Haus) und die Deutschlandkarte.
Es werden keine erfundenen Zahlen, Kundenzitate, Namen oder Kontaktdaten angezeigt.
- haus-film-md.mp4, haus-film-md.webm, haus-film-sm.mp4, haus-film-poster.webp (die 1080p-Originale wurden entfernt, um Ladezeit zu sparen): Startseiten-Scroll-Film. KI-Videogenerierung (Higgsfield/Kling) aus dem Kundenfoto buero-abend-1; vor Livegang prüfen oder kennzeichnen.

## Ablauf-Bilder (generiert)
Die elf Bilder `ablauf-*.webp` in `public/media/p/` wurden mit Nano Banana 2 (Higgsfield) erzeugt: Architektur und Innenräume, ohne Personen, Text oder Logos. Im Bildnachweis als generierte Bilder angeben; kein Hinweis auf dem Bild selbst.
Die Bilder `zugang-eigentuemer.webp` (Stadtvilla) und `zugang-investor.webp` (Mehrfamilienhaus) für die Karten „Wie können wir Ihnen helfen?" entstanden ebenfalls mit Nano Banana 2 (4K, ohne Personen, Text oder Logos).
Der Hero-Film `hero/montage.mp4` und `.webm` (Schwarzweiß-Montage mit Navy-Ton aus vier Kling-3.0-Clips: Hände auf Grundriss, Frankfurt, Hände mit Report, Luftbild) und `hero/poster.webp` entstanden mit Higgsfield (Nano Banana 2 für die Startbilder). Ohne erkennbare Gesichter, Text oder Logos. Im Bildnachweis als generiert angeben.
Das Bild `h-analyse.webp` (Schreibtisch mit Grundrissen, ohne Text und Zahlen) basiert auf einem vom Auftraggeber gelieferten KI-Bild; Überschrift und erfundene Kennzahlen wurden entfernt.
Die Personenbilder `h-p-*.webp` (Erstgespräch, Besprechung, Vertragsunterzeichnung, Investorengespräch, Objektprüfung, Entscheidung, Begleitung) sind ebenfalls mit Nano Banana 2 erzeugte, frei erfundene Personen. Sie zeigen keine realen Kunden oder Mitarbeitenden und müssen als generierte Bilder gekennzeichnet bleiben; vor Livegang mit dem Auftraggeber abstimmen.
Die Bundesländer-Karte (`src/content/germany.js`) nutzt vereinfachte Umrisse nach Natural Earth (gemeinfrei), übernommen aus der Landingpage.

## Startseiten-Kamerafahrt (generiert)
`fahrt/d2/*.webp` und `fahrt/m2/*.webp` (Bildfolge der Kamerafahrt aus einem Kling-3.0-Film) und `fahrt-innen*.webp` (Startbild, Nano Banana 2, 4K) wurden mit Higgsfield erzeugt. Ohne Personen, Text oder Logos. Das Video ist keyframe-dicht kodiert und wird per Scrollen abgespielt. Im Bildnachweis als generiert angeben.
Das Bild `hero-card-mfh.webp` (Mehrfamilienhaus, deutsche Wohnstraße, ohne Personen/Text) wurde mit Nano Banana 2 (Higgsfield) erzeugt; als generiertes Bild kennzeichnen. Ersetzt das Architekturmodell im Hero-Kartenbild der Startseite.
Die Bilder `zugang-eigentuemer`, `zugang-investor`, `h-zugang`, `ablauf-wohnhaus`, `ablauf-luftbild` und `h-entwicklung` wurden durch realistische, mit Nano Banana 2 (Higgsfield) erzeugte Aufnahmen deutscher Wohnhäuser und Straßen ersetzt (ohne Personen, Text, Logos). Als generierte Bilder kennzeichnen.

- partner-hero / partner-fachleute / partner-ergaenzung / partner-besprechung: KI-generiert (Beispielbilder, Partner-Seite)
- home-zugang-tor / home-analyse-hand / home-unterlagen: KI-generiert (Beispielbilder, Startseite)
- owner-beratung: KI-generiert (Beispielbild, Beratung Eigentuemer; Startseite + Eigentuemer-Seite)
- kontakt-buero: KI-generiert (Beispielbild, Buero-Empfang; Startseite Kontakt + Kontakt-Seite)
- wissen-fassade / investor-matching / abschluss-beratung: KI-generiert (Beispielbilder)
- owner-situation / owner-einfamilienhaus: KI-generiert (Beispielbilder, Eigentuemer-Seite)
- hero-card-analyse: KI-generiert (Beispielbild, Startseite Hero-Karte)
- mfh-balkone: KI-generiert; altstadt-luftbild-de, villa-nacht: vom Nutzer bereitgestellt, Lizenz/Quelle pruefen (niedrige Aufloesung 600px)
- owner-analyse-bericht / owner-analyse-karte / owner-entscheidung / owner-unterlagen / owner-besprechung: KI-generiert (Beispielbilder, Eigentuemer- und Investorenseite)
- zugang-eigentuemer-haus: vom Nutzer bereitgestellt (Foto, Quelle/Lizenz pruefen)
- investor-begleitung: KI-generiert; fachwerk-hof: vom Nutzer bereitgestellt, Lizenz pruefen (600px)
- zugang-investor-altbau: vom Nutzer bereitgestellt (Foto, Berliner Altbau-Fassaden), Quelle/Lizenz pruefen
- standort-muenchen: vom Nutzer bereitgestellt (Foto Muenchen Marienplatz, 500px), Lizenz pruefen. NICHT genutzt: Cesky Krumlov und Prag (nicht Deutschland)
- potenzial-umbau: vom Nutzer bereitgestellt (Foto Buerogebaeude mit Kran/Geruest, 600px), Lizenz pruefen
- wirtschaft-euro: vom Nutzer bereitgestellt (Foto Euro-Muenzen und Scheine), Lizenz pruefen
- wissen-kapitalanlage / wissen-offmarket / wissen-bewertung / wissen-markt: vom Nutzer bereitgestellt (Unsplash-Fotos), Lizenz/Ort pruefen; wissen-markt wirkt niederlaendisch (Luftbild Wohnviertel)
- besichtigung: vom Nutzer bereitgestellt (Stockfoto Klemmbrett Inspektion; enthaelt englisches Logo Real Estate und FOR-SALE-Schild), Lizenz pruefen
- offmarket-strasse / offmarket-gartentor / offmarket-gespraech: KI-generiert (Beispielbilder, Investoren Off-Market-Titel)
- hero-card-daten: vom Nutzer bereitgestellt (Foto Hand/Rechner/Geldscheine, 600px; Waehrung der Scheine wirkt nicht Euro), Lizenz pruefen

## Teamaufnahmen – 28.10.2026

Sieben vom Auftraggeber als Aufnahmen seines Teams bereitgestellte Bilder. Bildinhalt beibehalten; ausschließlich proportional verkleinert und als WebP optimiert. Jeweils 800 und 1800 Pixel breit, gemeinsam rund 1,24 MB. Responsive Zuordnung und beschreibende Alt-Texte: `src/content/team.js`.

| Datei unter `public/media/team/` (jeweils `-800.webp` / `-1800.webp`) | Passender Text / Einsatz |
|---|---|
| `team-strategie` | Über uns: Menschen hinter den Entscheidungen; gemeinsamer Blick auf Immobilienprojekte |
| `team-unterlagen` | Eigentümer: Immobilie analysieren; strukturierte Prüfung der Unterlagen |
| `team-objektanalyse` | Start: Analyse; Über uns: Analyse; Objektreport: Datenbasiert analysiert, persönlich geprüft |
| `team-projektplanung` | Über uns: Daten prüfen, Menschen entscheiden; Eigentümer: Verkaufsweg entscheiden |
| `team-marktabgleich` | Investoren: Objektanalyse; Über uns: Matching |
| `team-erstgespraech` | Kontakt; Start: nächster Schritt; Eigentümer: Situation verstehen; Über uns: Begleitung |
| `team-begleitung` | Start: Abwicklung; Über uns: persönliche Erfahrung; Investoren: persönliche Begleitung |

Die bisherigen Team-Platzhalter auf Über uns werden durch eine Gruppenaufnahme mit passendem Text ersetzt. Es werden keine Namen, Rollen oder Qualifikationen ergänzt. Die neu hinzugefügten Texte und Alt-Texte sind auch im englischen Wörterbuch enthalten. Demo-Formulare und `noindex` bleiben unverändert.

## Einzelporträts – 28.10.2026

Sechs zusätzliche, vom Auftraggeber gelieferte quadratische Team-Porträts in unveränderter Reihenfolge. Dateien: `public/media/team/team-portrait-01` bis `team-portrait-06`, jeweils `-480.webp` und `-1000.webp`. Einsatz: Über uns, direkt unter der gemeinsamen Teamaufnahme. Bildinhalt beibehalten; proportional verkleinert und in WebP umgewandelt. Keine Namen oder Rollen: Der Auftraggeber hat ausdrücklich gebeten, diese wegzulassen. Alt-Texte und Beschriftung der Galerie sind auch auf Englisch verfügbar.

## Startseite / Ablauf – Teamaufnahmen in beiden Zugängen

Alle zwölf Bildzuordnungen im Ablauf für Eigentümer und Investoren verwenden jetzt ausschließlich die sieben vom Auftraggeber gelieferten Teamaufnahmen aus `public/media/team/`. Erstkontakt und Qualifizierung: Gespräch; Unterlagen und Objektprüfung: Dokumentenprüfung; Analyse und Matching: Bildschirmarbeit; Besprechung und Entscheidung: Planungstisch; Käuferauswahl und Suchprofil: Projektbesprechung; Transaktionsbegleitung: persönliche Begleitung. Zentrale Zuordnung: `TEAM_PROCESS_PHOTOS` in `src/content/team.js`. Die bisherigen Beispielbilder sind in dieser Komponente nicht mehr referenziert. Die bestehende Würfel-Animation und ihre Bildflächen bleiben erhalten.

## Wissen / Kategorien – 28.10.2026

Auf ausdrücklichen Wunsch des Auftraggebers zeigt „Alle“ auf `/wissen` das gelieferte Backsteinhaus-Foto (`public/media/knowledge/wissen-alle.webp`) und „Off-Market“ den gelieferten Blick über Wohnhäuser und grüne Hügel (`wissen-off-market.webp`). Jeweils mit kleiner WebP-Variante, ohne Hochskalierung. Zuordnung: `src/content/knowledgePhotos.js`. Diese Auswahl gilt für die Wissen-Seite; die übrigen Kategorien und die Wissensvorschau auf der Startseite behalten ihre Bilder.

## Wissen / Entwicklungspotenziale und Immobilienbewertung – 28.10.2026

„Entwicklungspotenziale“ auf `/wissen` nutzt das vom Auftraggeber gelieferte Baustellenfoto mit Baukränen (`public/media/knowledge/wissen-entwicklungspotenziale.webp`). „Immobilienbewertung“ nutzt die gelieferte gemeinsame Objektprüfung am Bildschirm (`wissen-immobilienbewertung.webp`). Beide mit kleiner WebP-Variante und ohne Hochskalierung; die Auswahl ist in `src/content/knowledgePhotos.js` hinterlegt.

## Über uns / Modellplanung und Planprüfung – 28.10.2026

Zwei weitere vom Auftraggeber gelieferte Motive: `public/media/team/team-modellplanung-*` illustriert „Werte schaffen. Zukunft bauen.“; `team-planpruefung-*` steht bei „Daten prüfen. Menschen entscheiden.“. Beide proportional als WebP optimiert, jeweils mit 800-Pixel-Variante. Bildinhalt beibehalten. Zentrale Zuordnung: `TEAM_PHOTOS.development` und `TEAM_PHOTOS.review`. Mobil wird das Modellfoto vollständig zwischen den beiden Aussagen angezeigt; am Desktop bleibt die bestehende Zoom-Darstellung erhalten.

## Wissen / Bildqualität – 28.10.2026

Die kleinen Originale für Alle (953 px), Off-Market (600 px) und Entwicklungspotenziale (612 px) wurden mit dem integrierten ImageGen bildgestützt restauriert. Die restaurierten PNG-Master liegen in `source/knowledge-restored/`; Detailrekonstruktionen sind keine verifizierten Objektdaten. Personenbilder wurden nicht generativ verändert. Für alle sechs Kategorien und das Abschlussbild gibt es WebP-Ausgaben mit 640, 1280, 1920, 2560 und 3840 Pixeln Breite (`public/media/knowledge/hq/`, Qualität 94). Diese sind Ausgabegrößen, nicht die ursprüngliche Sensorauflösung. Das Abschlussbild verwendet die vorhandene höher aufgelöste Original-JPEG-Datei. Neue Kategorien werden auf der Wissen-Seite erst beim ersten Anwählen geladen; die bereits geladenen Bilder bleiben für den Wechsel erhalten. Der zusätzliche Foto-Zoom wurde hier entfernt. Herkunft, Abmessungen und Verarbeitung: `docs/knowledge-image-quality.json`.

## Wissen / Immobilienbewertung – Bildausrichtung
Auf Wunsch des Auftraggebers wird das Bewertungsfoto im Browser horizontal gespiegelt und links fokussiert, damit der Computer im sichtbaren rechten Bereich liegt. Die Bilddateien und ihre Auflösung bleiben unverändert; die Regel gilt nur für diese Kategorie auf der Wissen-Seite.

## Eigentümer / Situationen und Ablauf – 29.10.2026

Die vom Auftraggeber zusätzlich gelieferte Aufnahme beim Kaffee (`team-austausch`) begleitet „Typische Eigentümersituationen“: persönliche Ausgangslage verstehen und Möglichkeiten besprechen. Proportional optimierte WebP-Varianten mit 800 und 1352 Pixeln Breite; Bildinhalt beibehalten.

Der Ablauf auf `/immobilie-verkaufen` verwendet gelieferte Teamfotos: persönliches Gespräch beim Erstkontakt, gemeinsame Dokumentenprüfung bei Unterlagen, Bildschirm und Standortdaten bei Analyse, Architekturmodell und Planung bei Besprechung, Projektpräsentation bei Käuferauswahl sowie persönlicher Austausch bei Transaktionsbegleitung. Für die erneut gelieferten Motive werden die vorhandenen höher aufgelösten Dateien verwendet. Breite Bildflächen erhalten die Gruppe und die zum Text passenden Arbeitsmittel. Alt-Texte sind auch auf Englisch verfügbar; keine Namen oder Rollen ergänzt.
