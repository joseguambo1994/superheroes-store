import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <Text>
          Hola
        </Text>
        <TouchableOpacity style={{height:100, width:200, backgroundColor:Colors.dark.white}}>
          <Text>Presionar</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
   width:'100%',
   height:'100%',
   justifyContent:'center',
    backgroundColor: 'transparent'
  },
  container: {
    flex:0.6,
    borderRadius:20,
    margin:20,
     backgroundColor:Colors.dark.purpleDark
   },
  
});
