import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
      console.log("Screen Two got focused")

      db.collection("products").get().then((querySnapshot) => {
        let arrayOfDocs: string[] = []
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            arrayOfDocs.push(doc.get('name'))
        });
        console.log(" size" , querySnapshot.docs.length)
        setProducts(()=> querySnapshot.docs)
    });

    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agregar nuevo producto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productsContainer}>
        {
          products.map((product)=>
            <ProductComponent
              key={product.get('name')}
              name={product.get('name')}
              type={product.get('type')}
              publisher={product.get('publisher')}
              unitPrice={product.get('unitPrice')}
              stock={product.get('stock')}
              image={product.get('image')}
            />
          )
        }
      </View>
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
