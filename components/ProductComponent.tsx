import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';

interface Product {
  name : string;
  type : string;
  publisher: string;
  unitPrice : string;
  stock : string;
  image : string;
}

export default function ProductComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://m.media-amazon.com/images/I/81D7MC4Bf7L._AC_SL1500_.jpg",
          }}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textDescription} >Spiderman</Text>
        <Text style={styles.textDescription}>glass</Text>
        <Text style={styles.textDescription}>Marvel</Text>
        <Text style={styles.textDescription}>20</Text>
        <Text style={styles.textDescription}>15.20</Text>
      </View>
      <View style={styles.buttonsContainer}></View>
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
    flex:1,
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
    fontSize: 18,
  },
  buttonsContainer:{
    flex:1,
    backgroundColor:'green'
  },
  image:{
    width:'100%',
    height:'100%',
    borderRadius:20,
  }
});
