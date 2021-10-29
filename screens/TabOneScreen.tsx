import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { auth, db } from '../firebase';
import { RootTabScreenProps } from '../types';


const image = { uri: "https://c4.wallpaperflare.com/wallpaper/344/1011/606/thanos-marvel-comics-villains-digital-art-wallpaper-preview.jpg" };

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [ email, setEmail ] = useState('') 
  const [ password, setPassword ] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
       clearAllAsyncStorage()
    });

    return unsubscribe;
  }, [navigation]);

  const signUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      alert('Success: '+ user?.email)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error '+ 'code: ' + errorCode+ 'message: '+ errorMessage)
    });
  }

  const signIn = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      navigation.navigate('TabTwo')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error '+ 'code: ' + errorCode+ 'message: '+ errorMessage)
    });
  }

  const clearAllAsyncStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
  

  return (
    <View style={styles.bigContainer}>
     <ImageBackground style={styles.imageBackground}  source={image} resizeMode="cover">
     <View style={styles.container}>
      <Text style={styles.labelText}>Email</Text>
      <TextInput style={styles.inputText} placeholder={'jlguambo@gmail.com'}
      onChangeText={(text)=>setEmail(text)}></TextInput>
      <Text style={styles.labelText}>Password</Text>
      <TextInput style={styles.inputText} placeholder={'********'}
      onChangeText={(text)=>setPassword(text)} secureTextEntry></TextInput>
     <View style={styles.buttonContainer} >
     <TouchableOpacity style={[styles.button, styles.buttonSignUp]}
     onPress={signUp}>
       <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSignIn]}
      onPress={signIn}>
       <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
     </View>
    </View>
     </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer:{
    flex:1,
    justifyContent:'center',
  },
  container: {
    flex: 0.6,
    justifyContent: 'center',
    backgroundColor:'transparent',
  },
  imageBackground:{
    flex: 1,
    justifyContent: "center",
    
  },
  labelText:{
    flex:0.5,
    fontSize:20,
    textAlignVertical:'center',
    margin:10,
    color:Colors.dark.white
  },
  inputText:{
    flex:0.5,
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
    backgroundColor:'transparent'
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
