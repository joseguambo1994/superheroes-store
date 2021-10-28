import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { db } from '../firebase';
import { RootTabScreenProps } from '../types';


export default function ModalScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {

  const [ name, setName ] = useState('');
  const [ type, setType ] = useState('');
  const [ publisher, setPublisher ] = useState('');
  const [ unitPrice, setUnitPrice ] = useState('');
  const [ stock, setStock ] = useState('');
  const [ image, setImage ] = useState('');
  

  const saveChanges = () => {
      if (isInputDataValid()){
        db.collection("products")
        .add({
          name: name.toString(),
          type: type.toString(),
          publisher: publisher.toString(),
          unitPrice: unitPrice.toString(),
          stock: stock.toString(),
          image: image.toString()
        })
        .then((docRef) => {
          alert("Success" + docRef.id);
          navigation.goBack();
        })
        .catch((error) => {
          alert("Error: " + error);
        });
      }else {
        alert('Los campos no pueden estar vacios o con errores')
      }
  };

  const isInputDataValid = () => {
    const regexPatternIsNumber = /^[0-9\b]+$/;

    return name.trim() != '' &&
    type.trim() != '' &&
    publisher.trim() != '' &&
    unitPrice.trim() != '' && IsValidDecimal(unitPrice.trim()) &&
    stock.trim() != '' && regexPatternIsNumber.test(stock.trim()) &&
    image.trim() != ''
  }

  function IsValidDecimal(value:string) {
    var split = value.split('.');
    const regexPatternIsNumber = /^[0-9\b]+$/;

    if (split.length != 2) {
        return false;
    }
    else if ( !regexPatternIsNumber.test(split[0]) ) {
        return false;
    }
    else if ( !regexPatternIsNumber.test(split[1]) ){
      return false;
    }

    return true;
}

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Nombre</Text>
      <TextInput onChangeText={(text)=>setName(text)} 
      numberOfLines={1} style={styles.textInput} placeholder={'Gorrar Iron-Man adulto color azul'}></TextInput>
      <Text style={styles.label}>Tipo</Text>
      <TextInput onChangeText={(text)=>setType(text)} 
      style={styles.textInput} placeholder={'Gorra'}></TextInput>
      <Text style={styles.label}>Publisher</Text>
      <TextInput onChangeText={(text)=>setPublisher(text)} 
      style={styles.textInput} placeholder={'Marvel'}></TextInput>
      <Text style={styles.label}>Stock</Text>
      <TextInput onChangeText={(text)=>setStock(text)} keyboardType='numeric' 
      style={styles.textInput} placeholder={'20'}></TextInput>
      <Text style={styles.label}>Precio Unitario</Text>
      <TextInput onChangeText={(text)=>setUnitPrice(text)} keyboardType='numeric'
      style={styles.textInput} placeholder={'12.40'}></TextInput>
      <Text style={styles.label}>Imagen</Text>
      <TextInput onChangeText={(text)=>setImage(text)} 
      numberOfLines={1} style={styles.textInput} placeholder={'https://i.pinimg.com/ironman.jpg'}></TextInput>

      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <FontAwesome name='check-circle-o' size={80} color={Colors.dark.white}></FontAwesome>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label:{
    flex:1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textInput:{
    flex:2,
    borderRadius:20,
    borderColor: Colors.dark.purpleDark,
    borderWidth:1,
    marginHorizontal:10,
    marginVertical:5,
    paddingHorizontal:10,
  },
  button:{
    flexGrow:1,
    backgroundColor: Colors.dark.purpleDark,
    borderRadius:20,
    margin:10,
    justifyContent:'center',
    alignItems:'center'
  },
});
