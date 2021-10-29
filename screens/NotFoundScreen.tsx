import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackScreenProps } from '../types';
import { db } from '../firebase';

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [numberOfOrderedProducts, setNumberOfOrderedProducts] = useState(0);
  const [numberOfAvailableProducts, setNumberOfAvailableProducts] = useState(0);

  const [productId, setProductId] = useState("");
  const route = useRoute();

  useEffect(() => {
    if (route.params != undefined) {
      const arrayOfParameters: string[] = Object.values(route.params);
      setProductId(() => arrayOfParameters[0]);
    }
  });

  useEffect(() => {
    if (productId != "") {
      var docRef = db.collection("products").doc(productId);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            console.log("type", typeof doc.data());
            setName(() => doc.data()?.name);
            setNumberOfAvailableProducts(() => doc.data()?.stock);
            setStock(() => doc.data()?.stock);
          } else {
            alert("No such document!");
          }
        })
        .catch((error) => {
          alert("Error getting document:" + error);
        });
    }
  }, [productId]);

  const handleSell = () => {
    if (numberOfOrderedProducts < stock) {
      setNumberOfOrderedProducts(() => numberOfOrderedProducts + 1);
      setNumberOfAvailableProducts(() => numberOfAvailableProducts - 1);
    }
  };

  const handleReturn = () => {
    if (numberOfOrderedProducts > 0) {
      setNumberOfOrderedProducts(() => numberOfOrderedProducts - 1);
      setNumberOfAvailableProducts(() => numberOfAvailableProducts + 1);
    }
  };

  const handleConfirm = () => {
    var sale = { 
      numberOfOrderedProducts: numberOfOrderedProducts.toString(), 
      stock: stock.toString(),
      numberOfCurrentAvilableProducts : (stock-numberOfOrderedProducts).toString()
   }; 
   storeData(sale);

    navigation.navigate('Root')
  }

  const storeData = async (value:Object) => {

    if ( numberOfOrderedProducts > 0 ) {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(productId, jsonValue)
      } catch (e) {
        alert('Error: '+ e )
      }
    }else{
      try {
        await AsyncStorage.removeItem(productId)
      } catch (e) {
        alert('Error: '+ e )
      }
    }

      
  }

  const handleCancel = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>{name}</Text>
          <Text style={styles.text}>
            Disponibles: {numberOfAvailableProducts}
          </Text>
          <Text style={styles.text}>
            Solicitados: {numberOfOrderedProducts}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleSell()}>
            <FontAwesome
              name="plus-circle"
              size={80}
              color={Colors.dark.white}
            />
          </TouchableOpacity>
          <Text style={styles.numberOfProducts}>{numberOfOrderedProducts}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleReturn()}
          >
            <FontAwesome
              name="minus-circle"
              size={80}
              color={Colors.dark.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonConfirmContainer}>
          <TouchableOpacity style={styles.buttonConfirm} 
          onPress={handleConfirm}
          >
            <Text style={styles.buttonConfirmText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonConfirm, styles.buttonCancel]}
          onPress={handleCancel}
          >
            <Text style={styles.buttonCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
   flex:1,
   justifyContent:'center',
    backgroundColor: 'transparent'
  },
  container: {
    flex:0.6,
    borderRadius:20,
    margin:20,
     backgroundColor:Colors.dark.purpleDark,
     justifyContent:'center',
    
   },
   button:{
     flex:1,
     height:100,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
   },
   buttonText:{
    color: Colors.dark.purpleDark,
    fontSize:36,
   },
   numberOfProducts:{
    flex:1,
     height:100,
    color:Colors.dark.white,
    fontSize:40,
    borderRadius:20,
    textAlign:'center',
    textAlignVertical:'center'
   },
   buttonsContainer:{
    flexDirection:'row',
    backgroundColor: 'transparent'
   },
   textContainer:{
    flexDirection:'column',
    backgroundColor: 'transparent',
    margin:20,
    justifyContent:'center',
    alignItems:'center'
   },
   text:{
     fontSize:24,
     color:Colors.dark.white,
   },
   buttonConfirmContainer:{
     flex:1,
     backgroundColor:'transparent'
   },
   buttonConfirm:{
     flexGrow:1,
     backgroundColor:Colors.dark.pinkDark,
     marginHorizontal:20,
     marginBottom:10,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center'
   },
   buttonCancel:{
    backgroundColor:Colors.dark.pinkLight,
  },
   buttonConfirmText:{
     fontSize:24,
     color:Colors.dark.white,
   },
   buttonCancelText:{
    fontSize:24,
    color:Colors.dark.pinkDark,
  }
  
});
