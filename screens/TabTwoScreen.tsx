import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ProductComponent from '../components/ProductComponent';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { db } from '../firebase';
import { RootTabScreenProps } from '../types';

let arrayOfDocs:any[] = [];

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {

  const [ products, setProducts ] = useState(arrayOfDocs)


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
      db.collection("products").get().then((querySnapshot) => {
        setProducts(()=> querySnapshot.docs)
    });

    getData()
    getAllKeys()

    });

    return unsubscribe;
  }, [navigation]);


  const getAllKeys = async () => {
    let keys:any[] = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
  
    console.log("GETALLKEYS", keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      console.log("GETDATA()",jsonValue != null ? JSON.parse(jsonValue) : null)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const handleClickBuy = (text:string) => {
      console.log('handleClickBuy: ' +text)
      navigation.navigate('NotFound', { productId: text })
  };


  const handleClickEdit = (text:string) => {
      console.log('handleClickEdit: '+text)
      navigation.navigate('Modal',{ productId: text }  )
  };

  const handleClickDelete = (text: string) => {
    console.log("handleClickDelete" + text);
    db.collection("products")
      .doc(text)
      .delete()
      .then(() => {
        db.collection("products")
          .get()
          .then((querySnapshot) => {
            setProducts(() => querySnapshot.docs);
          });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const navigateToModal = () => {
    navigation.navigate('Modal')
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToModal}>
          <Text style={styles.buttonText}>Agregar nuevo producto</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.productsContainer}>
        {
          products.flatMap((doc) => 
            <ProductComponent
            key={doc.id}
            id={doc.id}
            name={doc.data().name}
            type={doc.data().type}
            publisher={doc.data().publisher}
            unitPrice={doc.data().unitPrice}
            stock={doc.data().stock}
            image={doc.data().image}

            handleClickBuy={handleClickBuy}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}

          />
          )
         
        }
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.pinkLight
  },
  productsContainer:{
    flex: 1,
  },
  buttonContainer:{
    flex: 0.1,
  },
  button:{
    flexGrow:1,
    backgroundColor: Colors.dark.purpleDark,
    margin:10,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
    color: Colors.dark.white,
    fontSize: 22
  }
});
