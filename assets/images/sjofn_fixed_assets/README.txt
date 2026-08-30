SJÖFN – Sofort-Fix für den Login-Hero

1. Kopiere den Ordner `assets` in das Wurzelverzeichnis deines Projekts:
   C:\Users\axelj\Documents\sjofn-app\assets\images\sjofn-hero.jpg

2. Ersetze deine aktuelle `src/app/index.tsx` durch die beigelegte Datei
   `index-sjofn-fixed.tsx` und benenne sie dort in `index.tsx` um.

WICHTIGER PFAD:
Von `src/app/index.tsx` zum Projektordner `assets` sind es ZWEI Ebenen nach oben:
`../../assets/images/sjofn-hero.jpg`
Nicht: `../../../assets/...`

Die korrigierte Datei benötigt kein separates `sjofn-logo.png`, weil das Logo bereits
im authentischen SJÖFN-Hero enthalten ist.
