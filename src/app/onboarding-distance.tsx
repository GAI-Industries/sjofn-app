import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, OnboardingShell, PrimaryButton, ui } from '../components/sjofn-ui';
import { supabase } from '../lib/supabase';
const distanceOptions = [10, 25, 50, 75, 100];
export default function OnboardingDistanceScreen() {
  const [selectedDistance, setSelectedDistance] = useState(50); const [loading, setLoading] = useState(false);
  async function continueOnboarding() {
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { Alert.alert('SJÖFN', 'Keine aktive Sitzung gefunden.'); return; }
      const { error } = await supabase.from('profiles').update({ max_distance_km: selectedDistance, onboarding_step: 5 }).eq('id', user.id);
      if (error) { Alert.alert('Speichern nicht möglich', error.message); return; }
      router.push('/onboarding-bio');
    } finally { setLoading(false); }
  }
  return (
    <OnboardingShell step={4} title="Wie weit darf eine" accent="Begegnung sein?" subtitle="Wähle deinen Suchradius. Du kannst diese Einstellung später jederzeit ändern." onBack={() => router.back()}>
      <View style={[ui.card, styles.display]}><Text style={styles.number}>{selectedDistance}</Text><Text style={styles.unit}>km</Text></View>
      <View style={styles.grid}>{distanceOptions.map((distance) => { const active = distance === selectedDistance; return (
        <Pressable key={distance} onPress={() => setSelectedDistance(distance)} style={[styles.chip, active && styles.chipActive]} disabled={loading}>
          <Text style={[styles.chipText, active && styles.chipTextActive]}>{distance} km</Text>
        </Pressable>
      ); })}</View>
      <PrimaryButton label="Weiter" loading={loading} onPress={continueOnboarding} />
      <Text style={ui.privacy}>Dein genauer Standort wird anderen Mitgliedern nicht angezeigt.</Text>
    </OnboardingShell>
  );
}
const styles = StyleSheet.create({
  display: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginBottom: 18, backgroundColor: '#FFF4F5' },
  number: { color: colors.rose, fontFamily: 'Georgia', fontSize: 64, fontWeight: '700' }, unit: { color: colors.muted, fontSize: 20, marginLeft: 7 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, chip: { minWidth: 92, minHeight: 50, paddingHorizontal: 15, borderRadius: 999, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  chipActive: { backgroundColor: colors.rose, borderColor: colors.rose }, chipText: { color: colors.mutedDark, fontWeight: '700' }, chipTextActive: { color: colors.white },
});
