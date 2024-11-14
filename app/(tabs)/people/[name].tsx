// app/(tabs)/people/[name].tsx

import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PersonScreen() {
  // Get the name from route parameters
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for {name}</Text>
      {/* Additional details about the friend can be added here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});