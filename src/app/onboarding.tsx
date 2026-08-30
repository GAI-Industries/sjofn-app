import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, KeyboardDoneBar, OnboardingShell, PrimaryButton, ui } from '../components/sjofn-ui';
import { supabase } from '../lib/supabase';
const NAME_ACCESSORY_ID = 'nameAccessory'; const BIRTH_DATE_ACCESSORY_ID = 'birthDateAccessory';
function formatBirthDate(value: string) { const d = value.replace(/\D/g, '').slice(0, 8); if (d.length <= 2) return d; if (d.length <= 4) return `${d.slice(0, 2)}.${d.slice(2)}`; return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4)}`; }
function parseBirthDate(value: string) { const m = value.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); if (!m) return null; const day = Number(m[1]), month = Number(m[2]), year = Number(m[3]); const date = new Date(Date.UTC(year, month - 1, day)); if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null; return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }
export default function OnboardingScreen() {
  const [displayName, setDisplayName] = useState(''); const [birthDate, setBirthDate] = useState(''); const [saving, setSaving] = useState(false); const [signingOut, setSigningOut] = useState(false); const busy = saving || signingOut;
  async function continueOnboarding() {
    const name = displayName.trim(); if (!name || !birthDate.trim()) { Alert.alert('SJÖFN', 'Bitte gib deinen Anzeigenamen und dein Geburtsdatum ein.'); return; }
    const iso = parseBirthDate(birthDate); if (!iso) { Alert.alert('Ungültiges Geburtsdatum', 'Bitte gib ein gültiges Datum im Format TT.MM.JJJJ ein.'); return; }
    setSaving(true); try { const { data: { session }, error: sessionError } = await supabase.auth.getSession(); if (sessionError || !session?.user) { Alert.alert('SJÖFN', 'Keine aktive Sitzung gefunden.'); return; }
      const { error } = await supabase.from('profiles').upsert({ id: session.user.id, display_name: name, birth_date: iso, onboarding_step: 2 }, { onConflict: 'id' }); if (error) { Alert.alert('Speichern nicht möglich', error.message); return; } router.push('/onboarding-gender');
    } finally { setSaving(false); }
  }
  async function signOut() { setSigningOut(true); try { const { error } = await supabase.auth.signOut(); if (error) { Alert.alert('Abmelden nicht möglich', error.message); return; } router.replace('/'); } finally { setSigningOut(false); } }
  return (
    <>
      <OnboardingShell step={1} title="Erzähl uns ein wenig" accent="von dir." subtitle="Nur die Angaben, die wir für dein Profil und passende Begegnungen wirklich brauchen.">
        <View style={ui.field}><Text style={ui.label}>Wie möchtest du genannt werden?</Text><TextInput style={ui.input} placeholder="Vorname oder Profilname" placeholderTextColor={colors.muted} value={displayName} onChangeText={setDisplayName} editable={!busy} maxLength={50} inputAccessoryViewID={NAME_ACCESSORY_ID} returnKeyType="done" onSubmitEditing={Keyboard.dismiss} /><Text style={ui.helper}>Dieser Name wird anderen Mitgliedern angezeigt.</Text></View>
        <View style={ui.field}><Text style={ui.label}>Geburtsdatum</Text><TextInput style={ui.input} placeholder="TT.MM.JJJJ" placeholderTextColor={colors.muted} value={birthDate} onChangeText={(v) => setBirthDate(formatBirthDate(v))} editable={!busy} maxLength={10} keyboardType="number-pad" inputMode="numeric" inputAccessoryViewID={BIRTH_DATE_ACCESSORY_ID} /><Text style={ui.helper}>SJÖFN ist ausschließlich für Personen ab 18 Jahren.</Text></View>
        <PrimaryButton label="Weiter" loading={saving} disabled={busy} onPress={continueOnboarding} />
        <Pressable onPress={signOut} disabled={busy} style={styles.signOut}><Text style={styles.signOutText}>{signingOut ? 'Wird abgemeldet ...' : 'Abmelden'}</Text></Pressable>
        <Text style={ui.privacy}>🔒 Deine Angaben werden vertraulich behandelt.</Text>
      </OnboardingShell>
      <KeyboardDoneBar nativeID={NAME_ACCESSORY_ID} />
      <KeyboardDoneBar nativeID={BIRTH_DATE_ACCESSORY_ID} />
    </>
  );
}
const styles = StyleSheet.create({ signOut: { minHeight: 46, alignItems: 'center', justifyContent: 'center' }, signOutText: { color: colors.muted, fontWeight: '600' } });
