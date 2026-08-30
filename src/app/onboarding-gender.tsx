import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { OnboardingShell, PrimaryButton, ui } from '../components/sjofn-ui';
import { supabase } from '../lib/supabase';

const options = [
  { label: 'Frau', value: 'woman' }, { label: 'Mann', value: 'man' },
  { label: 'Nicht-binär', value: 'non_binary' }, { label: 'Andere Identität', value: 'other' },
  { label: 'Möchte ich nicht angeben', value: 'prefer_not_to_say' },
];

export default function OnboardingGenderScreen() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function continueOnboarding() {
    if (!selectedGender) { Alert.alert('SJÖFN', 'Bitte wähle eine Option aus.'); return; }
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { Alert.alert('SJÖFN', 'Keine aktive Sitzung gefunden.'); return; }
      const { error } = await supabase.from('profiles').update({ gender: selectedGender, onboarding_step: 3 }).eq('id', user.id);
      if (error) { Alert.alert('Speichern nicht möglich', error.message); return; }
      router.push('/onboarding-preferences');
    } finally { setLoading(false); }
  }
  return (
    <OnboardingShell step={2} title="Wie identifizierst" accent="du dich?" subtitle="Diese Angabe hilft uns dabei, passende Begegnungen für dich zu finden." onBack={() => router.back()}>
      <View style={ui.options}>{options.map((option) => { const selected = selectedGender === option.value; return (
        <Pressable key={option.value} style={[ui.option, selected && ui.optionSelected]} onPress={() => setSelectedGender(option.value)} disabled={loading}>
          <Text style={[ui.optionText, selected && ui.optionTextSelected]}>{option.label}</Text>
          <Text style={[ui.check, selected && ui.checkSelected]}>{selected ? '✓' : ''}</Text>
        </Pressable>
      ); })}</View>
      <PrimaryButton label="Weiter" loading={loading} disabled={!selectedGender} onPress={continueOnboarding} />
      <Text style={ui.privacy}>Deine Angabe wird vertraulich behandelt und dient ausschließlich passenden Begegnungen.</Text>
    </OnboardingShell>
  );
}
