import React, { useState } from 'react';
import { View, Text,   StyleSheet,  } from 'react-native';

export default function FriendsScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home is where the heart is</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  container: { flex: 1, padding: 20 },
});