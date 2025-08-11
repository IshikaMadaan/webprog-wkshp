import React, { createContext, useContext, useMemo, useReducer } from 'react';

const initialState = {
  destination: '',
  startDate: null,
  endDate: null,
  selectedActivities: [],
  expenses: {
    flight: 0,
    accommodation: 0,
    misc: 0,
  },
};

function itineraryReducer(state, action) {
  switch (action.type) {
    case 'SET_TRIP_INFO': {
      const { destination, startDate, endDate } = action.payload;
      return { ...state, destination, startDate, endDate };
    }
    case 'ADD_ACTIVITY': {
      const exists = state.selectedActivities.some(a => a.id === action.payload.id);
      if (exists) return state;
      return { ...state, selectedActivities: [...state.selectedActivities, action.payload] };
    }
    case 'REMOVE_ACTIVITY': {
      return {
        ...state,
        selectedActivities: state.selectedActivities.filter(a => a.id !== action.payload),
      };
    }
    case 'SET_EXPENSE': {
      const { key, value } = action.payload;
      return { ...state, expenses: { ...state.expenses, [key]: value } };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const ItineraryContext = createContext({});

export function ItineraryProvider({ children }) {
  const [state, dispatch] = useReducer(itineraryReducer, initialState);

  const totals = useMemo(() => {
    const activitiesTotal = state.selectedActivities.reduce((sum, a) => sum + (a.price || 0), 0);
    const travel = Number(state.expenses.flight) || 0;
    const accommodation = Number(state.expenses.accommodation) || 0;
    const misc = Number(state.expenses.misc) || 0;
    const grandTotal = activitiesTotal + travel + accommodation + misc;
    return { activitiesTotal, travel, accommodation, misc, grandTotal };
  }, [state.selectedActivities, state.expenses]);

  const value = useMemo(() => ({ state, dispatch, totals }), [state, totals]);

  return (
    <ItineraryContext.Provider value={value}>{children}</ItineraryContext.Provider>
  );
}

export function useItinerary() {
  return useContext(ItineraryContext);
}