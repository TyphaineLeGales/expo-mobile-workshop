import { Text, View, StyleSheet, Button, FlatList,ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import { usePeopleContext } from '@/provider/PeopleProvider'
import AddBtn from '@/components/AddBtn';
import AddForm from '@/components/AddForm'
import {useState, useEffect} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function PeopleListScreen() {
  const { friends, isLoading,removeFriend, addFriend } = usePeopleContext();
  const [isAddFormVisible, setIsAddFormVisible] = useState<boolean>(false);
  const router = useRouter()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading friends...</Text>
      </View>
    );
  }
  useEffect(() => {
    console.log("Current friends state:", friends);
  }, [friends]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Friends List</Text>
        <AddBtn onPress={() => setIsAddFormVisible(true)}></AddBtn>
      </View>
     <View style={styles.main}>
      <FlatList
        data={friends}
        keyExtractor={(item) => {
          console.log("in key extractor", item.id)
          return item.id
        }}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Pressable onPress={() => router.push(`/people/${item.name}`)} style={styles.userBtn}>
                <MaterialIcons name="account-circle" color="#000" size={22} />
                <Text style={styles.friendName}>{item.name}</Text>
            </Pressable>
            <Pressable onPress={() => removeFriend(item)}>
              <MaterialIcons name="delete-forever" color="#000" size={22} />
            </Pressable>
          </View>
        )}
      />
     </View>
      <AddForm isVisible={isAddFormVisible} onClose={() => setIsAddFormVisible(false)} fieldName="person" add={addFriend}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  topContainer: { flex: 1,flexDirection: 'row', justifyContent: 'space-between', height:10 },
  main: {flex: 9},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 },
  friendItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 5,  backgroundColor:'#fff',  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  friendName: {
    fontSize: 18,
    marginLeft: 10
  },
  userBtn : {
    flexDirection: 'row',
  }
});