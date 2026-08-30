import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { supabase } from '../lib/supabase';

const options = [
  { label: 'Frau', value: 'woman' },
  { label: 'Mann', value: 'man' },
  { label: 'Nicht-binär', value: 'non_binary' },
  { label: 'Andere Identität', value: 'other' },
  { label: 'Möchte ich nicht angeben', value: 'prefer_not_to_say' },
];

export default function OnboardingGenderScreen() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function continueOnboarding() {
    if (!selectedGender) {
      Alert.alert(
        'SJÖFN',
        'Bitte wähle eine Option aus.'
      );
      return;
    }

    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setLoading(false);
      Alert.alert('SJÖFN', 'Keine aktive Sitzung gefunden.');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        gender: selectedGender,
        onboarding_step: 3,
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      Alert.alert('Speichern nicht möglich', error.message);
      return;
    }

    router.push('/onboarding-preferences');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.step}>SCHRITT 2</Text>

      <Text style={styles.title}>Wie identifizierst du dich?</Text>

      <Text style={styles.subtitle}>
        Diese Angabe hilft uns dabei, passende Begegnungen für dich zu finden.
      </Text>

      <View style={styles.options}>
        {options.map((option) => {
          const selected = selectedGender === option.value;

          return (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                selected && styles.optionSelected,
              ]}
              onPress={() => setSelectedGender(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={[
          styles.primaryButton,
          !selectedGender && styles.primaryButtonDisabled,
        ]}
        onPress={continueOnboarding}
        disabled={!selectedGender || loading}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? 'Wird gespeichert ...' : 'Weiter'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>Zurück</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  step: {
    color: '#666',
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 18,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 32,
  },
  options: {
    gap: 12,
  },
  option: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#151515',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  optionSelected: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#090909',
    fontWeight: '700',
  },
  primaryButton: {
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 28,
  },
  primaryButtonDisabled: {
    opacity: 0.35,
  },
  primaryButtonText: {
    color: '#090909',
    fontSize: 17,
    fontWeight: '700',
  },
  back: {
    color: '#777',
    textAlign: 'center',
    paddingVertical: 18,
  },
});