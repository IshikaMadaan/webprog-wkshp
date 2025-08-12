import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useItinerary } from '../context/ItineraryContext';

const ACCENT = '#FF3B30';

function distributeActivities(activities, startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr || activities.length === 0) return [];
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  // Simple heuristic: sort by duration (short to long) then place round-robin avoiding same-category back-to-back
  const parseHours = (duration) => {
    const match = /([0-9]+(\.[0-9]+)?)\s*hour/.exec(duration || '');
    return match ? parseFloat(match[1]) : 2;
  };
  const sorted = [...activities].sort((a, b) => parseHours(a.duration) - parseHours(b.duration));

  const schedule = Array.from({ length: days }, (_, i) => ({
    date: new Date(start.getTime() + i * 24 * 60 * 60 * 1000),
    items: [],
  }));

  for (const act of sorted) {
    // find a day where last category is different
    let placed = false;
    for (let i = 0; i < schedule.length; i++) {
      const day = schedule[i];
      const last = day.items[day.items.length - 1];
      if (!last || last.category !== act.category) {
        day.items.push(act);
        placed = true;
        break;
      }
    }
    if (!placed) {
      // fallback: put in the shortest list
      schedule.sort((a, b) => a.items.length - b.items.length);
      schedule[0].items.push(act);
    }
  }

  return schedule;
}

export default function AIItineraryScreen() {
  const { state } = useItinerary();

  const schedule = useMemo(() => distributeActivities(state.selectedActivities, state.startDate, state.endDate), [state.selectedActivities, state.startDate, state.endDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Itinerary</Text>
      {schedule.length === 0 ? (
        <Text style={styles.empty}>Add activities and set dates to generate a schedule.</Text>
      ) : (
        <FlatList
          data={schedule}
          keyExtractor={(item) => item.date.toISOString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.dayCard}>
              <Text style={styles.dayTitle}>Day {index + 1} • {item.date.toDateString()}</Text>
              {item.items.length === 0 ? (
                <Text style={styles.dayEmpty}>Free/Travel/Explore</Text>
              ) : (
                item.items.map((act) => (
                  <View key={act.id} style={styles.itemRow}>
                    <Text style={styles.itemTitle}>{act.name}</Text>
                    <Text style={styles.itemMeta}>{act.category} • {act.duration}</Text>
                  </View>
                ))
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '800', color: '#000', padding: 16, paddingBottom: 8 },
  listContent: { padding: 16, paddingTop: 8 },
  dayCard: { borderWidth: 2, borderColor: '#000', borderRadius: 12, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  dayTitle: { fontSize: 16, fontWeight: '800', color: '#000', marginBottom: 6 },
  dayEmpty: { color: '#000', opacity: 0.7, fontWeight: '700' },
  itemRow: { paddingVertical: 8, borderTopWidth: 1, borderColor: '#000', borderStyle: 'dashed' },
  itemTitle: { fontWeight: '800', color: '#000' },
  itemMeta: { color: '#000', opacity: 0.7, fontWeight: '700', fontSize: 12 },
});