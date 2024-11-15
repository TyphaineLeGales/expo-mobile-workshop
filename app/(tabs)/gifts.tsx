import { Text, View, StyleSheet, Button, FlatList,ActivityIndicator, Pressable, Image } from 'react-native';
import { useGiftsContext } from '@/provider/GiftsProvider';
import AddBtn from '@/components/AddBtn';
import AddGift from '@/components/AddGift'
import {useState, useEffect} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
export default function EventsScreen() {
  const { gifts, isLoading, removeGift } = useGiftsContext();
  const [isAddFormVisible, setIsAddFormVisible] = useState<boolean>(false);
  const router = useRouter()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}> Your gifts list</Text>
        <AddBtn onPress={() => setIsAddFormVisible(true)}></AddBtn>
      </View>
     <View style={styles.main}>
      <FlatList
        data={gifts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <View style={styles.contentContainer}>
              <Pressable style={styles.userBtn}>
                  <MaterialIcons name="redeem" color="#000" size={22} />
                  <Text style={styles.friendName}>{item.name}</Text>
              </Pressable>
              <View style={{flexDirection: "row"}}>  
                <Image source={item.image} style={styles.image} />
                {
                  item.person && (
                    <Pressable onPress={() => router.push(`/people/${item.person.name}`)} style={styles.person}>
                      <Text style={styles.friendName}>{item.person.name}</Text>
                    </Pressable>
                  )
                }
              </View>
            </View>
            <Pressable onPress={() => removeGift(item)}>
              <MaterialIcons name="delete-forever" color="#000" size={22} />
            </Pressable>
          </View>
        )}
      />
     </View>
     <AddGift isVisible={isAddFormVisible} onClose={() => setIsAddFormVisible(false)}/>
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
  }, 
  contentContainer: {
    flex: 1
  }, 
  image: {
    width: 150, 
    height: 150,
    borderRadius: 10,
    marginTop: 12, 
    borderWidth: 1,
    borderColor:"#dbdbdb"
  }, 
  person: {
    backgroundColor:"#ffec9e",
    alignSelf: "flex-end", 
    borderRadius: 25, 
    padding:6,
  }
});