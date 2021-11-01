import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ProductReceiptComponent from '../components/ProductReceiptComponent';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';
import { Dimensions } from 'react-native';
import { db } from '../firebase';

  const viewportWidth = Dimensions.get('window').width;
  const viewportHeight = Dimensions.get('window').height;

export interface SubtotalPerProduct {
  id: string,
  numberOfOrderedProducts: string,
  subtotal: string,
}

let mapOfSubtotals = new Map<string,string>();

export default function TabThreeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  const [ productsKeys,setProductsKeys] = useState([''])
  const [ arrayOfSubtotals,setArrayOfSubtotals ] = useState(mapOfSubtotals);
  const [ totalPrice, setTotalPrice ] = useState(0.00)
  const [ hasSubtotalChange, setHasSubtotalChange ] = useState(false)
  const [ numberOfProductsInDatabase, setNumberOfProductsInDatabase ] = useState('')
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllKeys()
    });

    return unsubscribe;
  }, [navigation]);


  useEffect(()=>{
    setArrayOfSubtotals(()=>mapOfSubtotals)
  })

  const getAllKeys = async () => {
    let keys:string[] = []
    try {
      keys = await AsyncStorage.getAllKeys()
      const regexp = new RegExp('^[a-zA-Z0-9]{20}$')
      const arrayOfOnlyProductsKeys = keys.filter(key => regexp.test(key) )
      setProductsKeys(() => arrayOfOnlyProductsKeys)
    } catch(e) {
      alert('No se registraron productos para el cliente')
    }
  }

  useEffect(()=>{    
    calculateTotalPrice()
  }, [hasSubtotalChange])
  
  const calculateTotalPrice = () => {
    let sum = 0.00;
    arrayOfSubtotals.forEach(item=>
      sum += parseFloat(item)
      )
      setTotalPrice( () => parseFloat(sum.toFixed(2)))
  }
  
  const handlePay = ()=> {
   productsKeys.map(async item=>{
    const temporal = getStockFromLocalStorage(item)
    if (temporal != null && temporal != undefined){
      updateProductInDatabase(item, numberOfProductsInDatabase.toString())
    }
   })
    alert("Pagado")
  }


  const updateProductInDatabase = async (documentId:string, numberOfProducts:string) => {  
    db.collection("products")
      .doc(documentId)
      .update({
        stock: numberOfProducts
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const getStockFromLocalStorage = async (productId:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(productId)
      if(jsonValue != null){
        console.log("thaos",JSON.parse(jsonValue).numberOfCurrentAvilableProducts)
        setNumberOfProductsInDatabase(()=>JSON.parse(jsonValue).numberOfCurrentAvilableProducts)
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
    }
    console.log('Done.')
  }

  const getSubtotalPrice = (subtotalPerProduct : SubtotalPerProduct ) => {
    if (parseFloat(subtotalPerProduct.subtotal) >= 0.00){
      const productIdTemporal = subtotalPerProduct.id
      const subtotalTemporal = subtotalPerProduct.subtotal
      setArrayOfSubtotals( (prevState) => {
        let mapCopy = prevState;
        mapCopy.set(productIdTemporal,subtotalTemporal)
        return mapCopy ;
      }
      );
      setHasSubtotalChange(()=> !hasSubtotalChange )
    }
  }

  const handleDelete = (productId: string) => {
      removeKeyFromLocalStorage(productId)
      getAllKeys()
  }

  const removeKeyFromLocalStorage = async (productId:string) => {
    try {
      await AsyncStorage.removeItem(productId)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.productsListContainer}>
        {
          productsKeys.flatMap(productKey=>
            <ProductReceiptComponent key={productKey} productId={productKey}
            getSubtotalPriceCallback={getSubtotalPrice} handleDelete={handleDelete}
            />
          )
        }
      </ScrollView>
      {
        productsKeys.length != 0 ? <View style={styles.totalPriceContainer}>
        
        <Text style={styles.totalPriceText}> $ {totalPrice.toFixed(2)}</Text>
          <Text style={styles.totalPriceLabel}>TOTAL: {''}</Text>
        </View>
         : null
      }
     {
        productsKeys.length != 0 ?
        <View style={styles.payContainer} >
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payText} onPress={()=> handlePay()}> Pagar </Text>
        </TouchableOpacity>
      </View>:null
     }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  totalPriceContainer: {
    backgroundColor:Colors.dark.pinkLight,
    width: viewportWidth,
    height: viewportHeight/10,
    flexDirection: 'row-reverse'
  },
  totalPriceLabel:{
    backgroundColor: Colors.dark.purpleDark,
    color: Colors.dark.white,
    flexGrow:0.2,
    marginStart: 10 ,
    marginVertical: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius:20, 
    fontSize:26,
    textAlign:'right',
    textAlignVertical: 'center'
  },
  totalPriceText:{
    backgroundColor: Colors.dark.purpleDark,
    color: Colors.dark.white,
    flexGrow:0.4,
    marginVertical: 10,
    fontSize:26,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical: 'center'
  },
  payContainer:{
    width: viewportWidth,
    height: viewportHeight/10,
    backgroundColor: Colors.dark.pinkLight,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  payButton:{
    borderRadius:20,
    backgroundColor: Colors.dark.white,
    flexGrow:1,
    width:viewportWidth/2,
    justifyContent:'center',
    alignItems:'center'
  },
  payText:{
    fontSize: 22,
    color: Colors.dark.purpleDark
  }
});
