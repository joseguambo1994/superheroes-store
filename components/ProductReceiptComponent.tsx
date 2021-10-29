import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import { db } from '../firebase';
import { Text, View } from './Themed';

interface ProductReceipt {
    productId: string
  }

export default function ProductReceiptComponent(prop: ProductReceipt) {

    const [name, setName] = useState('');
    const [numberOfOrderedProducts, setNumberOfOrderedProducts] = useState('');
    const [unitPrice, setUniPrice] = useState('');
    const [subtotal, setSubtotal] = useState('');

    const getProductFromDatabase = () => {
        var docRef = db.collection("products").doc(prop.productId);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
  
              setName(()=>doc.data()?.name);
              console.log("getData(prop.productId)",getData(prop.productId))
              setUniPrice(()=>doc.data()?.unitPrice);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
    }

    useEffect(()=>{
        console.log("product prop.productId",prop.productId)
        getProductFromDatabase()
    })

    const getData = async (productId:string) => {
        try {
          const jsonValue = await AsyncStorage.getItem(productId)
          console.log("GETDATA()",jsonValue != null ? JSON.parse(jsonValue) : null)
          if (jsonValue != null){
            const numbOfOrderedProducts = JSON.parse(jsonValue).numberOfOrderedProducts  
            console.log("NUMB of items", numbOfOrderedProducts)
              setNumberOfOrderedProducts(()=>numbOfOrderedProducts)
          }
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
      }


  return (
    <View style={styles.container}>
        <View style={styles.nameContainer}>
        <Text style={[styles.text]} numberOfLines={2} >
            {name}
        </Text>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.text}>
            {numberOfOrderedProducts}
        </Text>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.text}>
            {unitPrice}
        </Text>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.text}>
            Subtotal
        </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'transparent',
    marginStart:10,
    marginVertical:10,
    flexDirection:'row'
  },
  nameContainer:{
    flex:2,
    justifyContent:'center',
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    padding:10,
  },
  textContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
      fontSize: 16,
  }
});
