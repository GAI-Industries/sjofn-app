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

export default function OnboardingScreen() {
  const [displayName, setDisplayName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  async function continueOnboarding() {
    if (!displayName.trim() || !birthDate.trim()) {
      Alert.alert(
        'SJÖFN',
        'Bitte gib deinen Anzeigenamen und dein Geburtsdatum ein.'
      );
      return;
    }

    // Noch keine Profildatenbank schreiben.
    // Das bauen wir im nächsten Schritt sauber auf.
   async function continueOnboarding() {
  if (!displayName.trim() || !birthDate.trim()) {
    Alert.alert(
      'SJÖFN',
      'Bitte gib deinen Anzeigenamen und dein Geburtsdatum ein.'
    );
    return;
  }

  const parts = birthDate.split('.');

  if (parts.length !== 3) {
    Alert.alert(
      'Ungültiges Geburtsdatum',
      'Bitte verwende das Format TT.MM.JJJJ.'
    );
    return;
  }

  const [day, month, year] = parts;

  const isoBirthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0'
  )}`;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    Alert.alert('SJÖFN', 'Keine aktive Sitzung gefunden.');
    return;
  }

  const { error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        display_name: displayName.trim(),
        birth_date: isoBirthDate,
        onboarding_step: 2,
      },
      {
        onConflict: 'id',
      }
    );

  if (error) {
    Alert.alert('Speichern nicht möglich', error.message);
    return;
  }

  router.push('/onboarding-gender');
}
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.step}>DEIN PROFIL</Text>

      <Text style={styles.title}>
        Wer bist du?
      </Text>

      <Text style={styles.subtitle}>
        Ein paar Angaben genügen für den Anfang.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Anzeigename"
          placeholderTextColor="#777"
          value={displayName}
          onChangeText={setDisplayName}
        />

        <TextInput
          style={styles.input}
          placeholder="Geburtsdatum – TT.MM.JJJJ"
          placeholderTextColor="#777"
          keyboardType="numbers-and-punctuation"
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <Pressable
          style={styles.primaryButton}
          onPress={continueOnboarding}
        >
          <Text style={styles.primaryButtonText}>Weiter</Text>
        </Pressable>

        <Pressable onPress={signOut}>
          <Text style={styles.signOut}>Abmelden</Text>
        </Pressable>
      </View>
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
    fontSize: 38,
    fontWeight: '700',
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 40,
  },
  form: {
    gap: 14,
  },
  input: {
    height: 58,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 16,
    backgroundColor: '#151515',
    color: '#fff',
    paddingHorizontal: 18,
    fontSize: 16,
  },
  primaryButton: {
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#090909',
    fontSize: 17,
    fontWeight: '700',
  },
  signOut: {
    color: '#777',
    textAlign: 'center',
    paddingVertical: 18,
  },
});