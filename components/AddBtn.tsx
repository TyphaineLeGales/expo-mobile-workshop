import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
};

export default function AddButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable onPress={onPress}>
        <MaterialIcons name="add-circle-outline" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    padding: 6,
    width:46
  },
});