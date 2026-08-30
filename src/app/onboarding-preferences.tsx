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
  { label: 'Frauen', value: 'women' },
  { label: 'Männer', value: 'men' },
  { label: 'Nicht-binäre Personen', value: 'non_binary' },
];

export default function OnboardingPreferencesScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function toggleOption(value: string) {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  async function continueOnboarding() {
    if (selected.length === 0) {
      Alert.alert(
        'SJÖFN',
        'Bitte wähle mindestens eine Option aus.'
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
        interested_in: selected,
        onboarding_step: 4,
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      Alert.alert('Speichern nicht möglich', error.message);
      return;
    }

    router.push('/onboarding-distance');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.step}>SCHRITT 3</Text>

      <Text style={styles.title}>
        Wen möchtest du kennenlernen?
      </Text>

      <Text style={styles.subtitle}>
        Du kannst mehrere Optionen auswählen.
      </Text>

      <View style={styles.options}>
        {options.map((option) => {
          const isSelected = selected.includes(option.value);

          return (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
              onPress={() => toggleOption(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>

              <Text
                style={[
                  styles.check,
                  isSelected && styles.checkSelected,
                ]}
              >
                {isSelected ? '✓' : ''}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={[
          styles.primaryButton,
          selected.length === 0 && styles.primaryButtonDisabled,
        ]}
        onPress={continueOnboarding}
        disabled={selected.length === 0 || loading}
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
    minHeight: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#151515',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  check: {
    fontSize: 20,
    color: '#777',
  },
  checkSelected: {
    color: '#090909',
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