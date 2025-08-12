import React, { useMemo, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import activitiesData from '../../data/activities.json';
import { useItinerary } from '../context/ItineraryContext';

const CATEGORIES = ['All', 'Adventure', 'Culture', 'Food', 'Wellness', 'Romantic', 'Nature'];
const ACCENT = '#FF3B30';

export default function ActivityCatalogScreen({ navigation }) {
  const { state, dispatch } = useItinerary();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>Cart ({state.selectedActivities.length})</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, state.selectedActivities.length]);

  const maxPrice = useMemo(() => {
    return activitiesData.reduce((max, a) => Math.max(max, a.price || 0), 0);
  }, []);
  const [budget, setBudget] = useState(maxPrice);

  const filteredActivities = useMemo(() => {
    return activitiesData.filter(a => {
      const categoryMatch = selectedCategory === 'All' || a.category === selectedCategory;
      const budgetMatch = (a.price || 0) <= budget;
      return categoryMatch && budgetMatch;
    });
  }, [selectedCategory, budget]);

  const handleAdd = (activity) => {
    dispatch({ type: 'ADD_ACTIVITY', payload: activity });
    if (Platform.OS === 'android') {
      ToastAndroid.show('Added to itinerary', ToastAndroid.SHORT);
    } else {
      import('react-native').then(({ Alert }) => {
        Alert.alert('Added to itinerary');
      });
    }
  };

  const renderItem = ({ item }) => {
    const alreadyAdded = state.selectedActivities.some(a => a.id === item.id);
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageURL }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.cardPrice}>${item.price}</Text>
          </View>
          <Text style={styles.cardMeta}>{item.category} • {item.duration}</Text>
          <TouchableOpacity
            onPress={() => handleAdd(item)}
            disabled={alreadyAdded}
            style={[styles.addButton, alreadyAdded && styles.addButtonDisabled]}
          >
            <Text style={styles.addButtonText}>{alreadyAdded ? 'Added' : 'Add to Itinerary'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities</Text>

      <View style={styles.filterBar}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            {CATEGORIES.map(cat => (
              <Picker.Item label={cat} value={cat} key={cat} color="#000" />
            ))}
          </Picker>
        </View>
        <View style={styles.sliderWrapper}>
          <Text style={styles.sliderLabel}>Max ${Math.round(budget)}</Text>
          <Slider
            minimumValue={0}
            maximumValue={maxPrice}
            step={5}
            value={budget}
            onValueChange={setBudget}
            minimumTrackTintColor={ACCENT}
            maximumTrackTintColor="#000"
            thumbTintColor={ACCENT}
          />
        </View>
      </View>

      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterBar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 10,
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    color: '#000',
  },
  sliderWrapper: {
    paddingVertical: 8,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#eee',
  },
  cardBody: {
    padding: 14,
    gap: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    flex: 1,
    paddingRight: 8,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: ACCENT,
  },
  cardMeta: {
    color: '#000',
    opacity: 0.7,
    fontSize: 12,
    fontWeight: '700',
  },
  addButton: {
    marginTop: 8,
    backgroundColor: ACCENT,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});