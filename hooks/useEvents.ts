import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_KEY = 'EVENTS_KEY';

// Custom hook to manage friends data
export function useEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load friends from AsyncStorage on mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const savedEvents = await AsyncStorage.getItem(EVENTS_KEY);
        setEvents(savedEvents ? JSON.parse(savedEvents) : []); // put here the default
      } catch (error) {
        console.error("Error loading friends list", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);


  const addEvents = async (name) => {
    try {
      const newEvents = [...events, name];
      await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error("Error adding friend", error);
    }
  };


  const removeEvents = async (name) => {
    try {
      const newEvents = events.filter(events => events !== name);
      await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error("Error removing friend", error);
    }
  };

  return { events, isLoading, addEvents, removeEvents };
}