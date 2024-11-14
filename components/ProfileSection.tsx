import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  title: string
};

export default function ProfileSection({ title, children }: PropsWithChildren<Props>) {
    
    return(
        <View style={styles.container}>
            
            <Text style={styles.sectionTitle}>{title} <MaterialIcons name="edit" color="#000" size={22} /></Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 24, 
    margin: 24
  }
});