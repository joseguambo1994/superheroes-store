import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import { db } from '../firebase';
import { Text, View } from './Themed';
import { Dimensions } from 'react-native';
import { SubtotalPerProduct } from '../screens/TabThreeScreen';
import { FontAwesome } from '@expo/vector-icons';

interface ProductReceipt {
    productId: string,
    getSubtotalPriceCallback:  (subtotalPerProduct : SubtotalPerProduct) => void,
    handleDelete : (productId: string) => void
  }

  const viewportWidth = Dimensions.get('window').width;
  const viewportHeight = Dimensions.get('window').height;

export default function ProductReceiptComponent(prop: ProductReceipt) {

    const [name, setName] = useState('');
    const [numberOfOrderedProducts, setNumberOfOrderedProducts] = useState('');
    const [unitPrice, setUniPrice] = useState('');
    const [subtotal, setSubtotal] = useState('');

    const getProductFromDatabase = () => {
        if (prop.productId != null && prop.productId != '' && prop.productId != undefined){
          var docRef = db.collection("products").doc(prop.productId);

          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                getNumberOfOrderedProductsFromAsyncStorage()
                setName(()=>doc.data()?.name);
                setUniPrice(()=>doc.data()?.unitPrice);
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        }
    }

    const getNumberOfOrderedProductsFromAsyncStorage = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(prop.productId)
          if(jsonValue != null){
              const temporalNumberOfOrderedProducts = JSON.parse(jsonValue).numberOfOrderedProducts
              setNumberOfOrderedProducts(()=> temporalNumberOfOrderedProducts )
          }
        } catch(e) {
          // read error
        }
      }

    useEffect(()=>{
        getProductFromDatabase()
    })

      useEffect(() => {
          const subtotalTwoDecimals = (parseFloat(numberOfOrderedProducts) * parseFloat(unitPrice)).toFixed(2)
          setSubtotal(()=> subtotalTwoDecimals)
        }, [numberOfOrderedProducts, unitPrice]);

    useEffect(()=>{
      const subtotalPerProduct = {
        id: prop.productId,
        subtotal: subtotal,
        numberOfOrderedProducts: numberOfOrderedProducts,
      }
        prop.getSubtotalPriceCallback(subtotalPerProduct)
    }, [subtotal])

  return (
    <View style={styles.container}>
       <View style={styles.removeContainer}>
        <TouchableOpacity onPress={()=> prop.handleDelete(prop.productId)}>
        <FontAwesome name={'trash'} size={40} color={Colors.dark.purpleDark}/>
        </TouchableOpacity>
        </View>
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
        <Text style={styles.text} >
            {subtotal}
        </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: viewportWidth,
    height: viewportHeight/10,
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
  removeContainer:{
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'center',
    paddingEnd:5,
  },
  removeButton:{
    flexGrow:1
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
