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

    // const getProductFromDatabase = () => {
    //     var docRef = db.collection("products").doc(prop.productId);

    //     docRef
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           console.log("Document data:", doc.data());
  
    //           setName(()=>doc.data()?.name);
    //           getData(prop.productId)
    //           setUniPrice(()=>doc.data()?.unitPrice);
    //         } else {
    //           // doc.data() will be undefined in this case
    //           console.log("No such document!");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log("Error getting document:", error);
    //       });
    // }

    useEffect(()=>{
        console.log("product prop.productId",prop.productId)
    })

    const getData = async (productId:string) => {
        try {
          const jsonValue = await AsyncStorage.getItem(productId)
          console.log("GETDATA()",jsonValue != null ? JSON.parse(jsonValue) : null)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
      }


  return (
    <View style={styles.container}>
        <View style={styles.nameContainer}>
        <Text>
            {name}
        </Text>
        </View>
        <View style={styles.textContainer}>
        <Text>
            Quantity
        </Text>
        </View>
        <View style={styles.textContainer}>
        <Text>
            {unitPrice}
        </Text>
        </View>
        <View style={styles.textContainer}>
        <Text>
            Subtotal
        </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.dark.grayLight,
    margin:20,
    flexDirection:'row'
  },
  nameContainer:{
    flex:2,
    backgroundColor: Colors.dark.pinkLight,
    marginHorizontal:10,
  },
  textContainer:{
    flex:1,
    backgroundColor: Colors.dark.pinkLight,
    marginHorizontal:10,
  },
  text:{
      
      fontSize: 18
  }
});
