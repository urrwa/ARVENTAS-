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
