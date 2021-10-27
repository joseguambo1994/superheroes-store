import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Email</Text>
      <TextInput style={styles.inputText} placeholder={'jlguambo@gmail.com'}></TextInput>
      <Text style={styles.labelText}>Password</Text>
      <TextInput style={styles.inputText} placeholder={'********'}></TextInput>
     <View style={styles.buttonContainer} >
     <TouchableOpacity style={[styles.button, styles.buttonSignUp]}>
       <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSignIn]}>
       <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  labelText:{
    flex:0.5,
    fontSize:20,
    textAlignVertical:'center',
    margin:10
  },
  inputText:{
    flex:1,
    fontSize:20,
    backgroundColor: Colors.dark.white,
    borderColor: Colors.dark.purpleDark,
    borderWidth: 1,
    borderRadius: 20,
    margin:10,
    padding: 10,
  },
  buttonContainer:{
    flex:1,
    flexDirection:'row',
  },
  button:{
    flex:1,
    borderRadius: 20,
    margin: 10,
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonSignUp:{
    backgroundColor: Colors.dark.purpleDark
  },
  buttonSignIn:{
    backgroundColor: Colors.dark.pinkDark
  },
  buttonText:{
    color: Colors.dark.white,
    fontSize: 20
  }
});
