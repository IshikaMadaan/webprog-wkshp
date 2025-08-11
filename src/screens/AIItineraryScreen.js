import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AIItineraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AI Itinerary (coming soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, fontWeight: '700', color: '#000' },
});