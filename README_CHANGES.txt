SJÖFN APP – VERBESSERUNGEN
Stand: 30.08.2026

INHALT DES PAKETS
- src/ (vollständiger aktualisierter Quellordner)
- assets/ (bestehende Projekt-Assets zur vollständigen Übernahme)
- README_CHANGES.txt

WICHTIG ZUR QUELLE
Die bereitgestellte app.zip enthielt nur den Ordner app/ und keine package.json,
tsconfig.json, gemeinsamen Components, Supabase-Datei oder Assets. Die fehlende
src-Struktur wurde aus der zuvor in derselben Unterhaltung bereitgestellten src.zip
ergänzt. Supabase-, Auth-, Routing-, Storage- und Session-Aufrufe wurden nicht
inhaltlich verändert.

GEÄNDERTE DATEIEN
- src/components/sjofn-ui.tsx
  - OnboardingShell um KeyboardAvoidingView erweitert.
  - ScrollView nutzt automaticallyAdjustKeyboardInsets auf iOS.
  - keyboardShouldPersistTaps="handled" und interaktives Schließen ergänzt.
  - Wiederverwendbare KeyboardDoneBar mit sichtbarem „Fertig“ ergänzt.
  - Zusätzlicher Scroll-Abstand für kleine Geräte und geöffnete Tastaturen.

- src/app/index.tsx
  - Login/Registrierung in den hellen SJÖFN-Masterlook überführt.
  - KeyboardAvoidingView und automatisch angepasste Keyboard-Insets ergänzt.
  - Interaktives Schließen per Scrollen und Keyboard.dismiss() ergänzt.
  - Sichtbare „Fertig“-Leiste für E-Mail und Passwort ergänzt.
  - Fokuswechsel von E-Mail zu Passwort ergänzt.
  - Fehlerhafte Abhängigkeit von assets/images/sjofn-hero.jpg entfernt und durch
    eine integrierte helle SJÖFN-Hero-Komposition ersetzt.
  - Bestehende Supabase-Anmeldung, Registrierung, Session-Prüfung und Weiterleitung
    unverändert beibehalten.

- src/app/onboarding.tsx
  - Zentrale KeyboardDoneBar für Anzeigename und Geburtsdatum verwendet.
  - Automatische Datumsformatierung TT.MM.JJJJ und ISO-Speicherung beibehalten.
  - Bestehendes Profile-Upsert, Routing und Abmelden beibehalten.

- src/app/onboarding-bio.tsx
  - Zentrale KeyboardDoneBar für das mehrzeilige Bio-Feld verwendet.
  - Bestehende Validierung und Profilspeicherung beibehalten.

GEPRÜFTE DATEIEN
- src/app/_layout.tsx
- src/app/onboarding-gender.tsx
- src/app/onboarding-preferences.tsx
- src/app/onboarding-distance.tsx
- src/app/onboarding-photos.tsx
- src/app/onboarding-complete.tsx
- src/app/home.tsx
- src/lib/supabase.ts
- src/components/sjofn-ui.tsx
- assets/

INSTALLATION
1. Vor dem Ersetzen eine Sicherung des bestehenden Projekts anlegen.
2. Den enthaltenen Ordner src/ über den vorhandenen Projektordner src/ kopieren.
3. Den Ordner assets/ nur ergänzend kopieren; eigene neuere Assets nicht löschen.
4. Es sind keine neuen npm-Pakete erforderlich.
5. Die vorhandenen EXPO_PUBLIC_SUPABASE_URL- und
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY-Werte unverändert lassen.
6. Danach im Projektordner ausführen:
   npm install
   npx expo start -c

TYPESCRIPT-PRÜFUNG
- Ausgeführt: npx tsc --noEmit (mit derselben TypeScript-CLI über die gebündelte
  Node-Laufzeit, da npx in der Prüf-Shell nicht im PATH lag)
- Ergebnis: fehlerfrei, keine TypeScript-Diagnosen.

TESTHINWEISE
- iPhone: E-Mail, Passwort, Anzeigename, Geburtsdatum und Bio einzeln fokussieren.
- Prüfen, dass oberhalb jeder iOS-Tastatur „Fertig“ sichtbar ist.
- Prüfen, dass das aktive Feld beim Öffnen der Tastatur sichtbar bleibt.
- Interaktiv nach unten ziehen und außerhalb der Eingaben tippen, um die Tastatur
  zu schließen.
- Geburtsdatum als Ziffern eingeben; erwartet wird automatisch TT.MM.JJJJ.
- Login, Neuregistrierung, Session-Wiederherstellung und alle sechs
  Onboarding-Schritte mit einem Testkonto vollständig durchlaufen.
- Fotoauswahl, Upload in profile-photos und Abschlussweiterleitung nach /home testen.
- Auf einem kleinen iPhone und einem größeren iPhone im Hochformat testen.

HINWEIS ZU „PASSWORT VERGESSEN?“
Der vorhandene Button besitzt weiterhin keine Reset-Logik, da im gelieferten Stand
keine entsprechende Supabase-Funktion implementiert war. Er wurde bewusst nicht
mit neuer Backend- oder Deep-Link-Logik versehen.
