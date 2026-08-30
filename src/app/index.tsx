import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const [status, setStatus] = useState('Prüfe Supabase-Verbindung...');

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase.auth.getSession();

      if (error) {
        setStatus(`Supabase-Fehler: ${error.message}`);
      } else {
        setStatus('Supabase-Verbindung erfolgreich ✅');
      }
    }

    testConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SJÖFN</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 24,
    color: '#fff',
  },
  status: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});