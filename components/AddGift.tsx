import { Modal, View,Pressable, StyleSheet, Button, TextInput, Image, TouchableOpacity, FlatList, Text  } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions } from 'expo-image-picker';
import { useGiftsContext } from '@/provider/GiftsProvider';
import { usePeopleContext } from '@/provider/PeopleProvider';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function AddForm ({ isVisible, onClose}: Props) {
  const { addGift } = useGiftsContext();
  const { friends } = usePeopleContext();
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedFriend, setSelectedFriend] = useState()
  const onAdd= async () => {
    if (name.trim()) {
      const gift = {
        image: {
          uri: image
        }, 
        name: name, 
        person: selectedFriend
      }
      await addGift(gift);
      setName('');
      setImage(null)
      onClose()
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All, // Choose All, Images, or Videos
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (text) => {
    setInputValue(text);
    if (text === '') {
      setFilteredFriends([]);
    } else {
      const suggestions = friends.filter(friend =>
        friend.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFriends(suggestions);
    }
  };

  // Select a friend
  const handleSelectFriend = (friend) => {
    setInputValue(friend.name);
    setSelectedFriend(friend)
    setFilteredFriends([]); // Hide suggestions
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder={`Enter Gift name`}
            value={name}
            onChangeText={setName}
          />
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Add it to someone's gift list"
          />
          <View style={styles.suggestions}>
            {filteredFriends.length > 0 && (
              <FlatList
                data={filteredFriends}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectFriend(item)}>
                    <Text style={styles.suggestion}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionsList}
              />
            )}
          </View>
          <Button title={`Add gift`} onPress={onAdd} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '75%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    flex: 1, 
    padding: 20
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { 
    borderColor: '#ccc', 
    backgroundColor:'#ccc', 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10,
    marginTop: 24
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  friendItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 5 },
  image: {
    width: 200,
    height: 200,
  },
  suggestions: {
    borderColor: '#ccc', 
    backgroundColor:'#ccc', 
    padding: 10, 
  }

});