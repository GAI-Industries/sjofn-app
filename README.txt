SJÖFN – visuell überarbeitete Registrierung

Installation:
1. Vor dem Ersetzen eine Sicherung des Projekts anlegen.
2. Die Ordner "src" und "assets" aus diesem Paket in das Stammverzeichnis
   des Projekts kopieren und vorhandene gleichnamige Dateien ersetzen.
3. Die vorhandene Datei src/lib/supabase.ts sowie alle übrigen Projektdateien
   bleiben unverändert.
4. Im Projektordner ausführen: npx tsc --noEmit
5. Danach die App neu starten und den gesamten Registrierungsflow testen.

Enthalten:
- neu gestalteter Login mit Webvorlagen-Foto und Logo
- gemeinsamer SJÖFN-Kopfbereich mit Schrittanzeige und Fortschritt
- überarbeitete Schritte für Profildaten, Geschlecht, Präferenzen, Distanz,
  Bio, Foto und Abschluss
- gemeinsames Designsystem unter src/components/sjofn-ui.tsx
- unveränderte Supabase-Felder und Navigationsziele
