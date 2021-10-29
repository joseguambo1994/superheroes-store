import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import ProductReceiptComponent from '../components/ProductReceiptComponent';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { db } from '../firebase';
import { RootTabScreenProps } from '../types';


interface ProductReceipt {
  name:string,
  numberOfOrderedProducts: number,
  unitPrice: number,
  severalProductsPrice: number,
}

interface Product {
  name: string,
  type: string,
  publisher: string,
  unitPrice:string,
  stock: string,
  image: string,
}

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Done.')
}

const arraryOfProductsReceipts: ProductReceipt[]= []

export default function TabThreeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  const [productsKeys,setProductsKeys] = useState([''])
  const [productsReceipts,setProductsReceipts ] = useState(arraryOfProductsReceipts);
  
  const getAllKeys = async () => {
    let keys:string[] = []
    try {
      keys = await AsyncStorage.getAllKeys()
      const regexp = new RegExp('^[a-zA-Z0-9]{20}$')
      const arrayOfOnlyProductsKeys = keys.filter(key => regexp.test(key) )
      setProductsKeys(()=>arrayOfOnlyProductsKeys)
      console.log(arrayOfOnlyProductsKeys)
    } catch(e) {
      alert('No se registraron productos para el cliente')
    }
    
  }

  useEffect(()=>{
    console.log("useEffect productsKeys")  

  },[productsKeys])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>getAllKeys()}>
        <Text style={styles.text}> Get Data from local storage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>clearAll()}>
        <Text style={styles.text}> Clear</Text>
      </TouchableOpacity>
      <View style={styles.productsListContainer}>
        {
          productsKeys.flatMap(productKey=>
            <ProductReceiptComponent key={productKey} productId={productKey}/>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  productsListContainer:{
    flex:1,
    backgroundColor: Colors.dark.pinkLight
  },
  button:{
    flex:0.2,
    margin:30,
    borderRadius:20,
    backgroundColor: Colors.dark.white,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    fontSize:22,
  }
});
