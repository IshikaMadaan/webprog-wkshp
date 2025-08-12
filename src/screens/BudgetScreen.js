import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useItinerary } from '../context/ItineraryContext';

const ACCENT = '#FF3B30';

export default function BudgetScreen() {
  const { totals } = useItinerary();
  const screenWidth = Dimensions.get('window').width;

  const chartData = [
    {
      name: 'Activities',
      cost: totals.activitiesTotal,
      color: ACCENT,
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Travel',
      cost: totals.travel,
      color: '#222',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Accommodation',
      cost: totals.accommodation,
      color: '#666',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Misc',
      cost: totals.misc,
      color: '#AAA',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
  ].filter(s => s.cost > 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.title}>Budget Breakdown</Text>
      {chartData.length === 0 ? (
        <Text style={styles.empty}>No expenses yet. Add activities and costs in the Cart.</Text>
      ) : (
        <PieChart
          data={chartData.map(d => ({ name: d.name, population: d.cost, color: d.color, legendFontColor: d.legendFontColor, legendFontSize: d.legendFontSize }))}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => '#000',
            labelColor: () => '#000',
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'16'}
          hasLegend={true}
          absolute
        />
      )}

      <View style={styles.totalBox}>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Activities</Text><Text style={styles.totalValue}>${totals.activitiesTotal.toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Travel</Text><Text style={styles.totalValue}>${totals.travel.toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Accommodation</Text><Text style={styles.totalValue}>${totals.accommodation.toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Misc</Text><Text style={styles.totalValue}>${totals.misc.toFixed(2)}</Text></View>
        <View style={[styles.totalRow, styles.grandRow]}><Text style={styles.grandLabel}>Total</Text><Text style={styles.grandValue}>${totals.grandTotal.toFixed(2)}</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '800', color: '#000', padding: 16, paddingBottom: 8 },
  empty: { color: '#000', opacity: 0.7, fontWeight: '700', paddingHorizontal: 16 },
  totalBox: { padding: 16, gap: 6 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { color: '#000', fontWeight: '700' },
  totalValue: { color: '#000', fontWeight: '700' },
  grandRow: { borderTopWidth: 2, borderColor: '#000', paddingTop: 8, marginTop: 4 },
  grandLabel: { fontSize: 18, fontWeight: '800', color: '#000' },
  grandValue: { fontSize: 18, fontWeight: '800', color: ACCENT },
});