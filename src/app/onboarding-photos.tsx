import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { supabase } from '../lib/supabase';

export default function OnboardingPhotosScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [loading, setLoading] = useState(false);

  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Zugriff erforderlich',
        'SJÖFN benötigt Zugriff auf deine Fotos, damit du ein Profilbild auswählen kannst.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];

    setImageUri(asset.uri);
    setMimeType(asset.mimeType ?? 'image/jpeg');
  }

  async function uploadPhoto() {
    if (!imageUri) {
      Alert.alert(
        'SJÖFN',
        'Bitte wähle zuerst ein Profilbild aus.'
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

    try {
      const response = await fetch(imageUri);
      const arrayBuffer = await response.arrayBuffer();

      const extension =
        mimeType === 'image/png' ? 'png' : 'jpg';

      const fileName = `${Date.now()}.${extension}`;
      const storagePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(storagePath, arrayBuffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { error: databaseError } = await supabase
        .from('profile_photos')
        .insert({
          user_id: user.id,
          storage_path: storagePath,
          position: 0,
        });

      if (databaseError) {
        throw databaseError;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          onboarding_step: 7,
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      router.push('/onboarding-complete');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unbekannter Fehler';

      Alert.alert(
        'Upload nicht möglich',
        message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.step}>SCHRITT 6</Text>

      <Text style={styles.title}>
        Zeig dich.
      </Text>

      <Text style={styles.subtitle}>
        Dein erstes Bild ist der Anfang deines Profils.
        Weitere Bilder kannst du später hinzufügen.
      </Text>

      <Pressable
        style={styles.photoBox}
        onPress={pickImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.placeholderText}>
              Profilbild auswählen
            </Text>
          </View>
        )}
      </Pressable>

      {imageUri && (
        <Pressable onPress={pickImage}>
          <Text style={styles.changePhoto}>
            Anderes Bild wählen
          </Text>
        </Pressable>
      )}

      <Pressable
        style={[
          styles.primaryButton,
          !imageUri && styles.primaryButtonDisabled,
        ]}
        onPress={uploadPhoto}
        disabled={!imageUri || loading}
      >
        <Text style={styles.primaryButtonText}>
          {loading
            ? 'Bild wird hochgeladen ...'
            : 'Weiter'}
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
    fontSize: 38,
    fontWeight: '700',
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 30,
  },
  photoBox: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 360,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#151515',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: '#fff',
    fontSize: 52,
    fontWeight: '200',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    marginTop: 10,
  },
  changePhoto: {
    color: '#999',
    textAlign: 'center',
    paddingVertical: 14,
  },
  primaryButton: {
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 22,
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