import { router } from 'expo-router';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { supabase } from '../lib/supabase';

export default function OnboardingCompleteScreen() {
  async function finishOnboarding() {
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
      .update({
        onboarding_step: 8,
        onboarding_completed: true,
      })
      .eq('id', user.id);

    if (error) {
      Alert.alert('Abschluss nicht möglich', error.message);
      return;
    }

    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>GESCHAFFT</Text>

      <Text style={styles.title}>
        Dein Profil ist bereit.
      </Text>

      <Text style={styles.subtitle}>
        Ab jetzt geht es nicht ums endlose Swipen,
        sondern um echte Begegnungen.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Willkommen bei SJÖFN</Text>

        <Text style={styles.cardText}>
          Dein Profil ist eingerichtet. Du kannst deine Angaben später
          jederzeit ergänzen oder ändern.
        </Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={finishOnboarding}
      >
        <Text style={styles.primaryButtonText}>
          SJÖFN entdecken
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
  eyebrow: {
    color: '#666',
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 18,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  subtitle: {
    color: '#999',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 14,
    marginBottom: 34,
  },
  card: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 22,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  cardText: {
    color: '#999',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  primaryButton: {
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
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