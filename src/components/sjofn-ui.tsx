import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const colors = {
  cream: '#FFF9F5',
  white: '#FFFFFF',
  ink: '#19212C',
  rose: '#DD365B',
  roseDark: '#BD244A',
  roseSoft: '#FFF0F3',
  gold: '#C88A32',
  line: '#EADFD8',
  muted: '#82746D',
  mutedDark: '#675B55',
};

type ShellProps = {
  step: number;
  total?: number;
  title: string;
  accent?: string;
  subtitle: string;
  onBack?: () => void;
  children: ReactNode;
};

export function OnboardingShell({
  step,
  total = 6,
  title,
  accent,
  subtitle,
  onBack,
  children,
}: ShellProps) {
  return (
    <SafeAreaView style={ui.safeArea} edges={['top', 'left', 'right']}>
      <View style={ui.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zurück"
          disabled={!onBack}
          onPress={onBack}
          style={ui.headerSide}
        >
          <Text style={[ui.backIcon, !onBack && ui.invisible]}>‹</Text>
        </Pressable>
        <View style={ui.brandWrap}>
          <Text style={ui.brandMark}>♡</Text>
          <Text style={ui.brand}>SJÖFN</Text>
        </View>
        <View style={ui.stepPill}>
          <Text style={ui.stepPillText}>{step} / {total}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
        style={ui.keyboardArea}
      >
        <ScrollView
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          contentContainerStyle={ui.scrollContent}
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        <View style={ui.progressTrack}>
          <View style={[ui.progressFill, { width: `${(step / total) * 100}%` }]} />
        </View>
        <Text style={ui.eyebrow}>SCHRITT {step}</Text>
        <Text style={ui.title}>
          {title}{accent ? <Text style={ui.titleAccent}> {accent}</Text> : null}
        </Text>
        <Text style={ui.subtitle}>{subtitle}</Text>
        {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function KeyboardDoneBar({ nativeID }: { nativeID: string }) {
  if (Platform.OS !== 'ios') return null;

  return (
    <InputAccessoryView nativeID={nativeID}>
      <View style={ui.keyboardBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tastatur schließen"
          hitSlop={10}
          onPress={Keyboard.dismiss}
        >
          <Text style={ui.keyboardDone}>Fertig</Text>
        </Pressable>
      </View>
    </InputAccessoryView>
  );
}

type PrimaryButtonProps = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export function PrimaryButton({ label, loading, disabled, onPress }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        ui.primaryButton,
        (disabled || loading) && ui.disabled,
        pressed && ui.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={ui.primaryButtonText}>{label}  ›</Text>
      )}
    </Pressable>
  );
}

export const ui = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  keyboardArea: { flex: 1 },
  header: {
    minHeight: 72,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    backgroundColor: colors.cream,
  },
  headerSide: { width: 54, minHeight: 48, justifyContent: 'center' },
  backIcon: { color: colors.ink, fontSize: 38, lineHeight: 42 },
  invisible: { opacity: 0 },
  brandWrap: { alignItems: 'center' },
  brandMark: { color: colors.rose, fontSize: 20, lineHeight: 18 },
  brand: { color: colors.ink, fontSize: 13, fontWeight: '800', letterSpacing: 4 },
  stepPill: {
    minWidth: 54,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F2CED7',
    backgroundColor: colors.roseSoft,
    alignItems: 'center',
  },
  stepPillText: { color: colors.rose, fontSize: 12, fontWeight: '800' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 72 },
  progressTrack: { height: 5, borderRadius: 999, backgroundColor: '#EFE5DF', marginBottom: 28, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999, backgroundColor: colors.rose },
  eyebrow: { color: colors.rose, fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 10 },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 40, lineHeight: 43, fontWeight: '700' },
  titleAccent: { color: colors.rose, fontStyle: 'italic' },
  subtitle: { color: colors.mutedDark, fontSize: 16, lineHeight: 24, marginTop: 14, marginBottom: 28 },
  field: { gap: 8, marginBottom: 18 },
  label: { color: '#352D2A', fontSize: 15, fontWeight: '700' },
  helper: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  input: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 18,
    backgroundColor: colors.white,
    color: colors.ink,
    fontSize: 16,
    paddingHorizontal: 18,
  },
  options: { gap: 11 },
  option: {
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionSelected: { backgroundColor: colors.roseSoft, borderColor: '#E8A9B6' },
  optionText: { color: '#5B4F49', fontSize: 16, fontWeight: '600', flexShrink: 1 },
  optionTextSelected: { color: colors.roseDark, fontWeight: '800' },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    textAlign: 'center',
    lineHeight: 26,
    color: 'transparent',
    backgroundColor: colors.white,
    fontWeight: '900',
  },
  checkSelected: { color: colors.white, borderColor: colors.rose, backgroundColor: colors.rose },
  primaryButton: {
    minHeight: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.rose,
    marginTop: 28,
    shadowColor: colors.roseDark,
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  primaryButtonText: { color: colors.white, fontSize: 17, fontWeight: '800' },
  disabled: { opacity: 0.42 },
  pressed: { opacity: 0.78 },
  privacy: { color: colors.muted, textAlign: 'center', fontSize: 12, lineHeight: 18, marginTop: 18 },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 22,
    padding: 18,
    shadowColor: '#492718',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  keyboardBar: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 11,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    backgroundColor: colors.cream,
  },
  keyboardDone: { color: colors.rose, fontSize: 17, fontWeight: '800' },
});
