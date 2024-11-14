import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useFriends } from '../../hooks/useFriends';

export default function FriendsScreen() {
  const { friends, isLoading, addFriend, removeFriend } = useFriends();
  const [newFriend, setNewFriend] = useState('');

  const handleAddFriend = async () => {
    if (newFriend.trim()) {
      await addFriend(newFriend.trim());
      setNewFriend('');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading friends...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends List</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text>{item}</Text>
            <Button title="Remove" onPress={() => removeFriend(item)} />
          </View>
        )}
      />
        <TextInput
          style={styles.input}
          placeholder="Enter friend's name"
          value={newFriend}
          onChangeText={setNewFriend}
        />
        <Button title="Add Friend" onPress={handleAddFriend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 },
  friendItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});