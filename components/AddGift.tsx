import { Modal, View,Pressable, StyleSheet, Button, TextInput, Image } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions } from 'expo-image-picker';
import { useGiftsContext } from '@/provider/GiftsProvider';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function AddForm ({ isVisible, onClose}: Props) {
  const { addGift } = useGiftsContext();
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const onAdd= async () => {
    if (name.trim()) {
      const gift = {
        image: {
          uri: image
        }, 
        name: name
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

          <Button title={`Add gift`} onPress={onAdd} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '50%',
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

});