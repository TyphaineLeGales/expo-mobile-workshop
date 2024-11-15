import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface Gift {
  id?: string
  name: string
  image: { uri: string } | number;
}

const GIFTS_KEY = 'GIFTS_KEY';

export function useGifts() {
  const [gifts, setGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load friends from AsyncStorage on mount
  useEffect(() => {
    const loadGifts = async () => {
      try {
        const savedGifts = await AsyncStorage.getItem(GIFTS_KEY);
        setGifts(savedGifts ? JSON.parse(savedGifts) : []);
      } catch (error) {
        console.error("Error loading friends list", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGifts();
  }, []);

  // Add a friend
  const addGift = async (gift: Gift) => {
    const newGift = {...gift, id: uuid.v4()}
    try {
      const newGifts = [...gifts, newGift];
      await AsyncStorage.setItem(GIFTS_KEY, JSON.stringify(newGifts));
      setGifts(newGifts);
    } catch (error) {
      console.error("Error adding friend", error);
    }
  };

  const removeGift = async (gift: Gift) => {
    try {
      const newGifts = gifts.filter(f => f.id !== gift.id);
      await AsyncStorage.setItem(GIFTS_KEY, JSON.stringify(newGifts));
      setGifts(newGifts);
    } catch (error) {
      console.error("Error removing friend", error);
    }
  };

  return { gifts, isLoading, addGift, removeGift};
}