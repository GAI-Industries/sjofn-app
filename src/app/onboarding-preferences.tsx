import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { OnboardingShell, PrimaryButton, ui } from '../components/sjofn-ui';
import { supabase } from '../lib/supabase';

const options = [{ label: 'Frauen', value: 'women' }, { label: 'Männer', value: 'men' }, { label: 'Nicht-binäre Personen', value: 'non_binary' }];
export default function OnboardingPreferencesScreen() {
  const [selected, setSelected] = useState<string[]>([]); const [loading, setLoading] = useState(false);
  function toggleOption(value: string) { setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); }
  async function continueOnboarding() {
    if (!selected.length) { Alert.alert('SJÖFN', 'Bitte wähle mindestens eine Option aus.'); return; }
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { Alert.alert('SJÖFN', 'Keine aktive Sitzung gefunden.'); return; }
      const { error } = await supabase.from('profiles').update({ interested_in: selected, onboarding_step: 4 }).eq('id', user.id);
      if (error) { Alert.alert('Speichern nicht möglich', error.message); return; }
      router.push('/onboarding-distance');
    } finally { setLoading(false); }
  }
  return (
    <OnboardingShell step={3} title="Wen möchtest du" accent="kennenlernen?" subtitle="Wähle alle Optionen, die für dich passen. Mehrfachauswahl ist möglich." onBack={() => router.back()}>
      <View style={ui.options}>{options.map((option) => { const active = selected.includes(option.value); return (
        <Pressable key={option.value} style={[ui.option, active && ui.optionSelected]} onPress={() => toggleOption(option.value)} disabled={loading}>
          <Text style={[ui.optionText, active && ui.optionTextSelected]}>{option.label}</Text><Text style={[ui.check, active && ui.checkSelected]}>{active ? '✓' : ''}</Text>
        </Pressable>
      ); })}</View>
      <PrimaryButton label="Weiter" loading={loading} disabled={!selected.length} onPress={continueOnboarding} />
      <Text style={ui.privacy}>SJÖFN berücksichtigt später beide Seiten, damit nur gegenseitig passende Profile entstehen.</Text>
    </OnboardingShell>
  );
}
