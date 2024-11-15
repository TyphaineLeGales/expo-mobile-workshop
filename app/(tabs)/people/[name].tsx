import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ProfileSection from "@/components/ProfileSection";
import { useGiftsContext } from '@/provider/GiftsProvider';
import { usePeopleContext } from '@/provider/PeopleProvider';
import { useState, useEffect } from "react";  

export default function PersonScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { gifts} = useGiftsContext();
  const { friends} = usePeopleContext();
  const [filteredGifts, setFilteredGifts] = useState(null)


  useEffect(() => {
    if(gifts.length === 0 || friends.length  === 0 ) return
    const currProfile = friends.filter(e => e.name === name)[0]
    const filtered = gifts.filter(e => e?.person?.id === currProfile.id) 
    setFilteredGifts(filtered)
  }, [gifts, friends])

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
          <FlatList
          data={filteredGifts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text> {item.name}</Text>
              <Image source={item.image} style={styles.image} />
            </View>
          )}>
          </FlatList>
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
  image: {
    width: 100, 
    height: 100,
    borderRadius: 10,
    marginTop: 12, 
    borderWidth: 1,
    borderColor:"#dbdbdb"
  }, 

});