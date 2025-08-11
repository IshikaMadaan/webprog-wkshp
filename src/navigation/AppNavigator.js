import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ActivityCatalogScreen from '../screens/ActivityCatalogScreen';
import ItineraryCartScreen from '../screens/ItineraryCartScreen';
import AIItineraryScreen from '../screens/AIItineraryScreen';
import BudgetScreen from '../screens/BudgetScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700', letterSpacing: 0.5 },
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Plan Itinerary' }} />
      <Stack.Screen name="Catalog" component={ActivityCatalogScreen} options={{ title: 'Activity Catalog' }} />
      <Stack.Screen name="Cart" component={ItineraryCartScreen} options={{ title: 'Itinerary Cart' }} />
      <Stack.Screen name="AIItinerary" component={AIItineraryScreen} options={{ title: 'AI Itinerary' }} />
      <Stack.Screen name="Budget" component={BudgetScreen} options={{ title: 'Budget Breakdown' }} />
    </Stack.Navigator>
  );
}