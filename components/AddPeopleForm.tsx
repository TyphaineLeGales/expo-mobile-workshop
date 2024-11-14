import { Modal, View, Text, Pressable, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usePeopleContext } from '@/app/provider/PeopleProvider';
import { useState} from 'react'

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function AddPeopleForm ({ isVisible, children, onClose }: Props) {
  const { addFriend } = usePeopleContext();
  const [newFriend, setNewFriend] = useState('');
  const handleAddFriend = async () => {
    if (newFriend.trim()) {
      await addFriend(newFriend.trim());
      setNewFriend('');
      onClose()
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
            placeholder="Enter name"
            value={newFriend}
            onChangeText={setNewFriend}
          />
          <Button title="Add Friend" onPress={handleAddFriend} />
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

});