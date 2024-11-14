import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FRIENDS_KEY = 'FRIENDS_KEY';

// Custom hook to manage friends data
export function useFriends() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load friends from AsyncStorage on mount
  useEffect(() => {
    const loadFriends = async () => {
      try {
        const savedFriends = await AsyncStorage.getItem(FRIENDS_KEY);
        setFriends(savedFriends ? JSON.parse(savedFriends) : []);
      } catch (error) {
        console.error("Error loading friends list", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFriends();
  }, []);

  // Add a friend
  const addFriend = async (name) => {
    try {
      const newFriends = [...friends, name];
      await AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(newFriends));
      setFriends(newFriends);
    } catch (error) {
      console.error("Error adding friend", error);
    }
  };

  // Remove a friend
  const removeFriend = async (name) => {
    try {
      const newFriends = friends.filter(friend => friend !== name);
      await AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(newFriends));
      setFriends(newFriends);
    } catch (error) {
      console.error("Error removing friend", error);
    }
  };

  return { friends, isLoading, addFriend, removeFriend };
}