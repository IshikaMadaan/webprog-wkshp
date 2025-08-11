import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ItineraryProvider } from './src/context/ItineraryContext';

export default function App() {
  return (
    <ItineraryProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AppNavigator />
          <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
    </ItineraryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
