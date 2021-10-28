import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';

interface Product {
  name : string;
  type : string;
  publisher: string;
  unitPrice : string;
  stock : string;
  image : string;
}

export default function ProductComponent(props:Product) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: props.image,
          }}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textDescription}
        numberOfLines={1}
        >{props.name}</Text>
        <Text style={styles.textDescription}>{props.type}</Text>
        <Text style={styles.textDescription}>{props.publisher}</Text>
        <Text style={styles.textDescription}>{props.stock}</Text>
        <Text style={styles.textDescription}>{props.unitPrice}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name='edit' size={40}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name='trash-o' size={40}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: Colors.dark.white,
    borderWidth:1,
    borderColor: Colors.dark.purpleDark,
    margin:10,
    borderRadius: 20
  },
  imageContainer:{
    flex:2,
    borderRadius:20,
    margin:10,
    borderColor: Colors.dark.purpleDark,
    borderWidth:1
  },
  textContainer:{
    flex:2,
    margin:10,
    flexDirection:'column',
  },
  textDescription:{
    fontSize: 16,
  },
  buttonsContainer:{
    flex:1,
    justifyContent:'center',
    borderRadius:20
    
  },
  button:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  image:{
    width:'100%',
    height:'100%',
    borderRadius:20,
  }
});
