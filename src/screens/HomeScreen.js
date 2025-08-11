import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useItinerary } from '../context/ItineraryContext';

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useItinerary();
  const [destination, setDestination] = useState(state.destination);
  const [startDate, setStartDate] = useState(state.startDate ? new Date(state.startDate) : new Date());
  const [endDate, setEndDate] = useState(state.endDate ? new Date(state.endDate) : new Date(Date.now() + 24*60*60*1000));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onSaveAndProceed = () => {
    dispatch({ type: 'SET_TRIP_INFO', payload: { destination, startDate: startDate.toISOString(), endDate: endDate.toISOString() } });
    navigation.navigate('Catalog');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Your Trip</Text>
      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Bali, Indonesia"
        value={destination}
        onChangeText={setDestination}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Travel Dates</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {(showStartPicker || showEndPicker) && (
        <DateTimePicker
          value={showStartPicker ? startDate : endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            if (showStartPicker) {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            } else {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity
        style={[styles.primaryButton, !(destination && startDate && endDate) && styles.disabled]}
        onPress={onSaveAndProceed}
        disabled={!(destination && startDate && endDate)}
      >
        <Text style={styles.primaryButtonText}>Start Planning</Text>
      </TouchableOpacity>
    </View>
  );
}

const ACCENT = '#FF3B30';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 24,
    color: '#000',
  },
  label: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  dateButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    padding: 14,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: ACCENT,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  disabled: {
    opacity: 0.4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});