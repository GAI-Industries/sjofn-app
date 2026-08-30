import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, KeyboardDoneBar } from '../components/sjofn-ui';
import { supabase } from '../lib/supabase';

const EMAIL_ACCESSORY = 'loginEmailAccessory';
const PASSWORD_ACCESSORY = 'loginPasswordAccessory';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const routeAuthenticatedUser = useCallback(async (userId: string) => {
    const { data: profile, error } = await supabase.from('profiles').select('onboarding_completed, onboarding_step').eq('id', userId).maybeSingle();
    if (error) throw error;
    router.replace(profile?.onboarding_completed ? '/home' : '/onboarding');
  }, []);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(async ({ data, error }) => {
      if (error) { console.error('Session check failed:', error.message); return; }
      if (active && data.session?.user) {
        try { await routeAuthenticatedUser(data.session.user.id); }
        catch (caught) { console.error('Profile check failed:', caught instanceof Error ? caught.message : caught); }
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) void routeAuthenticatedUser(session.user.id).catch((caught) => console.error('Profile check failed:', caught));
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [routeAuthenticatedUser]);

  async function signIn() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) { Alert.alert('SJÖFN', 'Bitte E-Mail-Adresse und Passwort eingeben.'); return; }
    Keyboard.dismiss(); setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (error) { Alert.alert('Anmeldung nicht möglich', error.message); return; }
      if (!data.user) { Alert.alert('SJÖFN', 'Anmeldung konnte nicht abgeschlossen werden.'); return; }
      await routeAuthenticatedUser(data.user.id);
    } catch (caught) {
      Alert.alert('Anmeldung nicht möglich', caught instanceof Error ? caught.message : 'Ein unbekannter Fehler ist aufgetreten.');
    } finally { setLoading(false); }
  }

  async function signUp() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) { Alert.alert('SJÖFN', 'Bitte E-Mail-Adresse und Passwort eingeben.'); return; }
    if (password.length < 8) { Alert.alert('Passwort zu kurz', 'Das Passwort sollte mindestens 8 Zeichen enthalten.'); return; }
    Keyboard.dismiss(); setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email: normalizedEmail, password, options: { emailRedirectTo: 'sjofn://' } });
      if (error) { Alert.alert('Registrierung nicht möglich', error.message); return; }
      Alert.alert('Registrierung erfolgreich', 'Dein SJÖFN-Konto wurde angelegt. Prüfe gegebenenfalls dein E-Mail-Postfach zur Bestätigung.');
    } finally { setLoading(false); }
  }

  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'} contentContainerStyle={styles.scroll} keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Pressable onPress={Keyboard.dismiss} style={styles.content}>
          <View style={styles.brandWrap}><Text style={styles.brandHeart}>♡</Text><Text style={styles.brand}>SJÖFN</Text></View>
          <View style={styles.heroCard}><View style={styles.heroGlow} /><Text style={styles.heroHeart}>♡</Text><Text style={styles.heroCopy}>Echte Nähe beginnt mit einem ehrlichen Hallo.</Text></View>
          <Text style={styles.eyebrow}>WILLKOMMEN</Text>
          <Text style={styles.title}>Finde Verbindung.{`\n`}<Text style={styles.accent}>Auf deine Art.</Text></Text>
          <Text style={styles.claim}>Ein ruhiger Ort für Begegnungen, die sich wirklich gut anfühlen.</Text>
          <View style={styles.form}>
            <View style={styles.field}><Text style={styles.label}>E-Mail-Adresse</Text><TextInput style={styles.input} placeholder="name@beispiel.de" placeholderTextColor={colors.muted} autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoComplete="email" autoCorrect={false} value={email} onChangeText={setEmail} editable={!loading} inputAccessoryViewID={EMAIL_ACCESSORY} returnKeyType="next" onSubmitEditing={() => passwordRef.current?.focus()} /></View>
            <View style={styles.field}><Text style={styles.label}>Passwort</Text><TextInput ref={passwordRef} style={styles.input} placeholder="Mindestens 8 Zeichen" placeholderTextColor={colors.muted} secureTextEntry textContentType="password" autoComplete="password" value={password} onChangeText={setPassword} editable={!loading} inputAccessoryViewID={PASSWORD_ACCESSORY} onSubmitEditing={() => void signIn()} returnKeyType="done" /></View>
            <Pressable style={styles.forgot} accessibilityRole="button"><Text style={styles.forgotText}>Passwort vergessen?</Text></Pressable>
            <Pressable style={[styles.primary, loading && styles.disabled]} onPress={signIn} disabled={loading}>{loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryText}>Anmelden  ›</Text>}</Pressable>
            <Pressable style={styles.secondary} onPress={signUp} disabled={loading}><Text style={styles.secondaryText}>Registrieren  ›</Text></Pressable>
          </View>
          <Text style={styles.trust}>♡  Sicher. Vertrauensvoll. Für echte Begegnungen.</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
    <KeyboardDoneBar nativeID={EMAIL_ACCESSORY} /><KeyboardDoneBar nativeID={PASSWORD_ACCESSORY} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, scroll: { flexGrow: 1 },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 14, paddingBottom: 44, maxWidth: 620, width: '100%', alignSelf: 'center' },
  brandWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }, brandHeart: { color: colors.rose, fontSize: 25 }, brand: { color: colors.ink, fontSize: 13, fontWeight: '800', letterSpacing: 4 },
  heroCard: { height: 154, overflow: 'hidden', borderRadius: 28, backgroundColor: '#F9DDE2', padding: 24, justifyContent: 'flex-end', marginBottom: 28 }, heroGlow: { position: 'absolute', width: 210, height: 210, borderRadius: 105, right: -35, top: -75, backgroundColor: '#F5A9B8', opacity: 0.55 }, heroHeart: { position: 'absolute', right: 30, top: 8, color: colors.white, fontSize: 92, opacity: 0.9 }, heroCopy: { color: colors.ink, fontFamily: 'Georgia', fontSize: 19, lineHeight: 25, width: '68%', fontWeight: '700' },
  eyebrow: { color: colors.rose, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 9 }, title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 42, lineHeight: 45, fontWeight: '700' }, accent: { color: colors.rose, fontStyle: 'italic' }, claim: { color: colors.mutedDark, fontSize: 16, lineHeight: 23, marginTop: 13, marginBottom: 24 },
  form: { gap: 12 }, field: { gap: 7 }, label: { color: colors.ink, fontSize: 14, fontWeight: '700' }, input: { minHeight: 60, borderWidth: 1, borderColor: colors.line, borderRadius: 18, backgroundColor: colors.white, paddingHorizontal: 18, color: colors.ink, fontSize: 16 },
  forgot: { alignSelf: 'flex-end', paddingVertical: 3 }, forgotText: { color: colors.rose, fontSize: 13, fontWeight: '600' }, primary: { minHeight: 58, borderRadius: 18, backgroundColor: colors.rose, alignItems: 'center', justifyContent: 'center', shadowColor: colors.roseDark, shadowOpacity: 0.22, shadowRadius: 12, shadowOffset: { width: 0, height: 7 }, elevation: 4 }, primaryText: { color: colors.white, fontSize: 16, fontWeight: '800' }, secondary: { minHeight: 58, borderRadius: 18, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.rose, alignItems: 'center', justifyContent: 'center' }, secondaryText: { color: colors.rose, fontSize: 16, fontWeight: '800' }, trust: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 20 }, disabled: { opacity: 0.5 },
});
