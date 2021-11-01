import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import { db } from '../firebase';
import { Text, View } from './Themed';
import { Dimensions } from 'react-native';
import { SubtotalPerProduct } from '../screens/TabThreeScreen';
import { FontAwesome } from '@expo/vector-icons';
import { MotiView, AnimatePresence  } from 'moti'

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
    const [visible, setVisible] = useState(true)

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
      if (subtotal != null && subtotal != '' && !isNaN(parseFloat(subtotal))) {
        prop.getSubtotalPriceCallback(subtotalPerProduct)
      }   
    }, [subtotal])

    const handleDeleteOnChildren = () => {
      const zeroedSubtotalPerProduct = {
        id: prop.productId,
        subtotal: '0.00',
        numberOfOrderedProducts: numberOfOrderedProducts,
      }
      setVisible((s)=>!s)
      prop.getSubtotalPriceCallback(zeroedSubtotalPerProduct)
      prop.handleDelete(prop.productId)

    }

    

  return (
 
    <AnimatePresence>
       {visible && (
    <MotiView 
        from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
         opacity: 0, scale: 0.5 
      }}
    
    style={styles.container}>
       <View style={styles.removeContainer}>
        <TouchableOpacity onPress={handleDeleteOnChildren}>
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
    </MotiView>
     )}
    </AnimatePresence>
  
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
