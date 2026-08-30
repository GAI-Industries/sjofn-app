import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../lib/supabase';

export default function OnboardingBioScreen() {
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  async function continueOnboarding() {
    if (bio.trim().length < 10) {
      Alert.alert(
        'SJÖFN',
        'Erzähl ein kleines bisschen mehr über dich.'
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
        bio: bio.trim(),
        onboarding_step: 6,
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      Alert.alert('Speichern nicht möglich', error.message);
      return;
    }

    router.push('/onboarding-photos');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.step}>SCHRITT 5</Text>

      <Text style={styles.title}>Erzähl etwas über dich.</Text>

      <Text style={styles.subtitle}>
        Ein paar echte Worte sagen mehr als ein perfekter Steckbrief.
      </Text>

      <TextInput
        style={styles.bioInput}
        placeholder="Was sollte jemand über dich wissen?"
        placeholderTextColor="#777"
        multiline
        maxLength={500}
        value={bio}
        onChangeText={setBio}
        textAlignVertical="top"
      />

      <Text style={styles.counter}>
        {bio.length}/500
      </Text>

      <Pressable
        style={[
          styles.primaryButton,
          bio.trim().length < 10 && styles.primaryButtonDisabled,
        ]}
        onPress={continueOnboarding}
        disabled={bio.trim().length < 10 || loading}
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
    marginBottom: 30,
  },
  bioInput: {
    minHeight: 180,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 18,
    backgroundColor: '#151515',
    color: '#fff',
    padding: 18,
    fontSize: 16,
    lineHeight: 23,
  },
  counter: {
    color: '#666',
    textAlign: 'right',
    marginTop: 8,
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