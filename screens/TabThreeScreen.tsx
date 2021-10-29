import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import ProductReceiptComponent from '../components/ProductReceiptComponent';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';
import { Dimensions } from 'react-native';


  const viewportWidth = Dimensions.get('window').width;
  const viewportHeight = Dimensions.get('window').height;


interface ProductReceipt {
  name:string,
  numberOfOrderedProducts: number,
  unitPrice: number,
  severalProductsPrice: number,
}

export interface SubtotalPerProduct {
  id: string,
  subtotal: string,
}

const arraryOfProductsReceipts: ProductReceipt[]= []
//let emptyArrayOfSubtotals: SubtotalPerProduct[]= []
let mapOfSubtotals = new Map<string,string>();

export default function TabThreeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  const [ productsKeys,setProductsKeys] = useState([''])
  const [ arrayOfSubtotals,setArrayOfSubtotals ] = useState(mapOfSubtotals);
  const [ totalPrice, setTotalPrice ] = useState(0.00)
  const [ hasSubtotalChange, setHasSubtotalChange ] = useState(false)
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
      getAllKeys()
    });

    return unsubscribe;
  }, [navigation]);


  useEffect(()=>{
    setArrayOfSubtotals(()=>mapOfSubtotals)
  },[ productsKeys ])

  const getAllKeys = async () => {
    let keys:string[] = []
    try {
      keys = await AsyncStorage.getAllKeys()
      const regexp = new RegExp('^[a-zA-Z0-9]{20}$')
      const arrayOfOnlyProductsKeys = keys.filter(key => regexp.test(key) )
      setProductsKeys(()=>arrayOfOnlyProductsKeys)
    } catch(e) {
      alert('No se registraron productos para el cliente')
    }
  }

  const getSubtotalPrice = (subtotalPerProduct : SubtotalPerProduct ) => {
    if (parseFloat(subtotalPerProduct.subtotal) > 0){
      const productIdTemporal = subtotalPerProduct.id
      const subtotalTemporal = subtotalPerProduct.subtotal
      setArrayOfSubtotals( (prevState) => ( prevState.set(productIdTemporal,subtotalTemporal) ));
      setHasSubtotalChange(()=>!hasSubtotalChange)
    }
  }

  useEffect(()=>{    
    console.log("arrayOfSubtotals",arrayOfSubtotals)
    let sum = 0.00;
    arrayOfSubtotals.forEach(item=>
      sum += parseFloat(item)
      )
      setTotalPrice(()=>sum)
  }, [hasSubtotalChange])

  const clearAllAsyncStorage = async () => {
    try {
      await AsyncStorage.clear()
      setTotalPrice(()=>0.00)
    } catch(e) {
      // clear error
    }
  }
  

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.productsListContainer}>
        {
          productsKeys.flatMap(productKey=>
            <ProductReceiptComponent key={productKey} productId={productKey}
            getSubtotalPriceCallback={getSubtotalPrice}
            />
          )
        }
      </ScrollView>
      <View style={styles.totalPriceContainer}>
        
      <Text style={styles.totalPriceText}> $ {totalPrice}</Text>
        <Text style={styles.totalPriceLabel}>TOTAL: {''}</Text>
      </View>
      <View style={styles.payContainer}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payText} onPress={()=>clearAllAsyncStorage()}> Pagar </Text>
        </TouchableOpacity>
      </View>
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
