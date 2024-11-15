import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const EVENTS_KEY = 'EVENTS_KEY';
interface Event {
  id: string
  name: string
  date?: Date
  recurring?: string
  people: number[]
  gift_bought: number[]
}

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


  const addEvents = async (name: string) => {
    const newEvent = {name, id: uuid.v4()}
    try {
      const newEvents = [...events, newEvent];
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