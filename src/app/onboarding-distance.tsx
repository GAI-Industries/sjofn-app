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

const distanceOptions = [10, 25, 50, 75, 100];

export default function OnboardingDistanceScreen() {
  const [selectedDistance, setSelectedDistance] = useState<number>(50);
  const [loading, setLoading] = useState(false);

  async function continueOnboarding() {
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
        max_distance_km: selectedDistance,
        onboarding_step: 5,
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      Alert.alert('Speichern nicht möglich', error.message);
      return;
    }

    router.push('/onboarding-bio');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.step}>SCHRITT 4</Text>

      <Text style={styles.title}>
        Wie weit darf eine Begegnung entfernt sein?
      </Text>

      <Text style={styles.subtitle}>
        Du kannst diese Einstellung später jederzeit ändern.
      </Text>

      <View style={styles.distanceDisplay}>
        <Text style={styles.distanceNumber}>{selectedDistance}</Text>
        <Text style={styles.distanceUnit}>km</Text>
      </View>

      <View style={styles.options}>
        {distanceOptions.map((distance) => {
          const selected = selectedDistance === distance;

          return (
            <Pressable
              key={distance}
              style={[
                styles.option,
                selected && styles.optionSelected,
              ]}
              onPress={() => setSelectedDistance(distance)}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {distance} km
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={continueOnboarding}
        disabled={loading}
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
    fontSize: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 32,
  },
  distanceDisplay: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 26,
  },
  distanceNumber: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '700',
  },
  distanceUnit: {
    color: '#777',
    fontSize: 22,
    marginLeft: 8,
    marginBottom: 9,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    minWidth: 90,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
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
    marginTop: 32,
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