import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface Friend {
  id: string
  name: string
  events?: number[]
  gift_ideas?: number[]
}

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
  const addFriend = async (name: string) => {
    const newFriend = {name, id: uuid.v4()}
    try {
      const newFriends = [...friends, newFriend];
      await AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(newFriends));
      setFriends(newFriends);
    } catch (error) {
      console.error("Error adding friend", error);
    }
  };

  // Remove a friend
  const removeFriend = async (friend: Friend) => {
    try {
      const newFriends = friends.filter(f => f.id !== friend.id);
      await AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(newFriends));
      setFriends(newFriends);
    } catch (error) {
      console.error("Error removing friend", error);
    }
  };

  return { friends, isLoading, addFriend, removeFriend };
}