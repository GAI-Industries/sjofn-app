import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SJÖFN</Text>
      <Text style={styles.title}>Willkommen.</Text>
      <Text style={styles.subtitle}>
        Die eigentliche App beginnt hier.
      </Text>
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
  logo: {
    color: '#666',
    fontSize: 14,
    letterSpacing: 4,
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
    marginTop: 12,
  },
});