import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useItinerary } from '../context/ItineraryContext';

const ACCENT = '#FF3B30';

export default function ItineraryCartScreen({ navigation }) {
  const { state, dispatch, totals } = useItinerary();

  const activities = state.selectedActivities;

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ACTIVITY', payload: id });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.activityRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.activityTitle} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.activityMeta}>${item.price} • {item.category}</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onChangeExpense = (key, text) => {
    const numeric = text.replace(/[^0-9.]/g, '');
    dispatch({ type: 'SET_EXPENSE', payload: { key, value: numeric } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itinerary Cart</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No activities added yet.</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      <View style={styles.expensesBox}>
        <Text style={styles.sectionTitle}>Custom Expenses</Text>
        <View style={styles.row}>
          <View style={styles.inputCol}>
            <Text style={styles.label}>Flight</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(state.expenses.flight || '')}
              onChangeText={(t) => onChangeExpense('flight', t)}
              placeholder="$0"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputCol}>
            <Text style={styles.label}>Accommodation</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(state.expenses.accommodation || '')}
              onChangeText={(t) => onChangeExpense('accommodation', t)}
              placeholder="$0"
              placeholderTextColor="#888"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.inputColFull}>
            <Text style={styles.label}>Misc</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(state.expenses.misc || '')}
              onChangeText={(t) => onChangeExpense('misc', t)}
              placeholder="$0"
              placeholderTextColor="#888"
            />
          </View>
        </View>
      </View>

      <View style={styles.totalBox}>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Activities</Text><Text style={styles.totalValue}>${totals.activitiesTotal.toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Travel</Text><Text style={styles.totalValue}>${totals.travel.toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Accommodation</Text><Text style={styles.totalValue}>${totals.accommodation.toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Misc</Text><Text style={styles.totalValue}>${totals.misc.toFixed(2)}</Text></View>
        <View style={[styles.totalRow, styles.grandRow]}><Text style={styles.grandLabel}>Total</Text><Text style={styles.grandValue}>${totals.grandTotal.toFixed(2)}</Text></View>
      </View>

      <View style={styles.footerButtons}>
        <TouchableOpacity style={[styles.ctaButton, styles.secondary]} onPress={() => navigation.navigate('Budget')}>
          <Text style={[styles.ctaText, styles.secondaryText]}>View Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('AIItinerary')}>
          <Text style={styles.ctaText}>Generate AI Itinerary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '800', color: '#000', padding: 16, paddingBottom: 8 },
  listContent: { paddingHorizontal: 16, paddingBottom: 12 },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  activityTitle: { fontSize: 16, fontWeight: '800', color: '#000' },
  activityMeta: { fontSize: 12, fontWeight: '700', color: '#000', opacity: 0.7 },
  removeBtn: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 2, borderColor: '#000', borderRadius: 8 },
  removeBtnText: { fontWeight: '800', color: '#000' },
  expensesBox: { paddingHorizontal: 16, paddingTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 12 },
  inputCol: { flex: 1 },
  inputColFull: { flex: 1 },
  label: { fontSize: 12, color: '#000', fontWeight: '800', marginBottom: 6 },
  input: { borderWidth: 2, borderColor: '#000', borderRadius: 10, padding: 12, color: '#000' },
  totalBox: { padding: 16, gap: 6 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { color: '#000', fontWeight: '700' },
  totalValue: { color: '#000', fontWeight: '700' },
  grandRow: { borderTopWidth: 2, borderColor: '#000', paddingTop: 8, marginTop: 4 },
  grandLabel: { fontSize: 18, fontWeight: '800', color: '#000' },
  grandValue: { fontSize: 18, fontWeight: '800', color: ACCENT },
  footerButtons: { flexDirection: 'row', gap: 12, padding: 16 },
  ctaButton: { flex: 1, backgroundColor: ACCENT, borderRadius: 10, paddingVertical: 14, alignItems: 'center', borderWidth: 2, borderColor: '#000' },
  ctaText: { color: '#fff', fontWeight: '800' },
  secondary: { backgroundColor: '#fff' },
  secondaryText: { color: '#000' },
});