import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ProfileSection from "@/components/ProfileSection";

export default function PersonScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <View style={styles.container}>
        <ProfileSection title="info">
            <MaterialIcons name="account-circle" color="#000" size={128} />
            <Text style={styles.title}>{name}</Text>
        </ProfileSection>
        <ProfileSection title="Events">
            <Text> Events list attached to this user should go there</Text>
        </ProfileSection>
        <ProfileSection title="Gifts ideas">
            <Text> Gifts list attached to this user should go there</Text>
        </ProfileSection>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

});