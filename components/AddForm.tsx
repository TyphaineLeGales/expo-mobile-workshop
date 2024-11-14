import { Modal, View,Pressable, StyleSheet, Button, TextInput } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState} from 'react'

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  add: () => void;
  fieldName: string;
}>;

export default function AddForm ({ isVisible, children, onClose, add, fieldName }: Props) {
  const [newState, setNewState] = useState('');
  const onAdd= async () => {
    if (newState.trim()) {
      await add(newState.trim());
      setNewState('');
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
            placeholder={`Enter ${fieldName}`}
            value={newState}
            onChangeText={setNewState}
          />
          <Button title={`Add ${fieldName}`} onPress={onAdd} />
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