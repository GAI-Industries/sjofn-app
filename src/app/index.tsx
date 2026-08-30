import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace('/onboarding');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/onboarding');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signIn() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      Alert.alert('SJÖFN', 'Bitte E-Mail-Adresse und Passwort eingeben.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        Alert.alert('Anmeldung nicht möglich', error.message);
        return;
      }

      router.replace('/onboarding');
    } finally {
      setLoading(false);
    }
  }

  async function signUp() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      Alert.alert('SJÖFN', 'Bitte E-Mail-Adresse und Passwort eingeben.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Passwort zu kurz',
        'Das Passwort sollte mindestens 8 Zeichen enthalten.'
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: 'sjofn://',
        },
      });

      if (error) {
        Alert.alert('Registrierung nicht möglich', error.message);
        return;
      }

      Alert.alert(
        'Registrierung erfolgreich',
        'Dein SJÖFN-Konto wurde angelegt. Prüfe gegebenenfalls dein E-Mail-Postfach zur Bestätigung.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>SJÖFN</Text>
        <Text style={styles.claim}>Begegnungen statt endlosem Swipen.</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-Mail-Adresse"
            placeholderTextColor="#777"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Passwort"
            placeholderTextColor="#777"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={styles.primaryButton}
            onPress={signIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.primaryButtonText}>Anmelden</Text>
            )}
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={signUp}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>
              Neues Konto erstellen
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>GAI Industries</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 4,
  },
  claim: {
    color: '#999999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 48,
  },
  form: {
    gap: 14,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 16,
    paddingHorizontal: 18,
    color: '#ffffff',
    backgroundColor: '#151515',
    fontSize: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#090909',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444444',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    color: '#555555',
    textAlign: 'center',
    marginTop: 48,
    fontSize: 12,
    letterSpacing: 1,
  },
});
