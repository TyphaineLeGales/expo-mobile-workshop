import { Text, View, StyleSheet, Button, FlatList,ActivityIndicator, Pressable } from 'react-native';
// import { useFriends } from '../../hooks/useFriends';
import { usePeopleContext } from '@/app/provider/PeopleProvider'
import AddBtn from '@/components/AddBtn';
import AddPeopleForm from '@/components/AddPeopleForm'
import {useState} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function PeopleListScreen() {
  const { friends, isLoading,removeFriend } = usePeopleContext();
  const [isAddFormVisible, setIsAddFormVisible] = useState<boolean>(false);

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
      <View style={styles.topContainer}>
        <Text style={styles.title}>Friends List</Text>
        <AddBtn onPress={() => setIsAddFormVisible(true)}></AddBtn>
      </View>
     <View style={styles.main}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text>{item}</Text>
            {/* <Pressable onPress={() => editFriend(item)}>
              <MaterialIcons name="edit" color="#000" size={22} />
            </Pressable> */}
            <Pressable onPress={() => removeFriend(item)}>
              <MaterialIcons name="delete-forever" color="#000" size={22} />
            </Pressable>
          </View>
        )}
      />
     </View>
      <AddPeopleForm isVisible={isAddFormVisible} onClose={() => setIsAddFormVisible(false)} />
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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});