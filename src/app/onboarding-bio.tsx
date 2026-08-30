import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput } from 'react-native';
import { colors, KeyboardDoneBar, OnboardingShell, PrimaryButton, ui } from '../components/sjofn-ui';
import { supabase } from '../lib/supabase';
const ACCESSORY = 'bioAccessory', MIN = 10, MAX = 500;
export default function OnboardingBioScreen() {
  const [bio, setBio] = useState(''); const [loading, setLoading] = useState(false); const clean = bio.trim();
  async function continueOnboarding() { if (clean.length < MIN) { Alert.alert('SJÖFN', 'Erzähl ein kleines bisschen mehr über dich. Mindestens 10 Zeichen.'); return; } Keyboard.dismiss(); setLoading(true); try { const { data: { user }, error: userError } = await supabase.auth.getUser(); if (userError || !user) { Alert.alert('SJÖFN', 'Keine aktive Sitzung gefunden.'); return; } const { error } = await supabase.from('profiles').update({ bio: clean, onboarding_step: 6 }).eq('id', user.id); if (error) { Alert.alert('Speichern nicht möglich', error.message); return; } router.push('/onboarding-photos'); } finally { setLoading(false); } }
  return <><OnboardingShell step={5} title="Zeig ein bisschen" accent="von dir." subtitle="Weniger Lebenslauf, mehr Persönlichkeit. Ein paar echte Worte reichen." onBack={() => router.back()}>
    <Text style={ui.label}>Ein paar Worte über dich</Text><TextInput style={styles.bio} placeholder="Was sollte jemand über dich wissen?" placeholderTextColor={colors.muted} multiline maxLength={MAX} value={bio} onChangeText={setBio} editable={!loading} textAlignVertical="top" inputAccessoryViewID={ACCESSORY} />
    <Text style={styles.counter}>{bio.length} / {MAX}</Text><PrimaryButton label="Weiter" loading={loading} disabled={clean.length < MIN} onPress={continueOnboarding} /><Text style={ui.privacy}>Deinen Profiltext kannst du später jederzeit ändern.</Text>
  </OnboardingShell><KeyboardDoneBar nativeID={ACCESSORY} /></>;
}
const styles = StyleSheet.create({ bio: { ...ui.input, minHeight: 170, marginTop: 9, paddingTop: 16, paddingBottom: 16 }, counter: { color: colors.muted, textAlign: 'right', fontSize: 12, marginTop: 7 } });
