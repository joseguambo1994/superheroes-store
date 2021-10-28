import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';

interface Product {
  id : string;
  name : string;
  type : string;
  publisher: string;
  unitPrice : string;
  stock : string;
  image : string;
  handleClickBuy : (text:string) => void;
  handleClickEdit : (text:string) => void;
  handleClickDelete : (text:string) => void;
}




export default function ProductComponent(props:Product) {

  const handleClickBuy = () => {
    props.handleClickBuy( props.id );
  }

  const handleClickEdit = () => {
    props.handleClickEdit( props.id );
  }

  const handleClickDelete = () => {
    props.handleClickDelete( props.id );
  }

  return (
    <TouchableOpacity style={[styles.container, props.stock == '0' ? styles.containerDisabled :null ]} onPress={()=>console.log("Item :"+ props.id)}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: props.image,
          }}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textDescription} numberOfLines={1}>
          {props.name}
        </Text>
        <Text style={styles.textDescription}>{props.type}</Text>
        <Text style={styles.textDescription}>{props.publisher}</Text>
        <Text style={styles.textDescription}>{props.stock}</Text>
        <Text style={styles.textDescription}>{props.unitPrice}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} 
        disabled={ props.stock == '0' }
        onPress={() => handleClickBuy()}>
          <FontAwesome name="cart-plus" size={32} 
          color={ props.stock == '0' ? 'red' : Colors.dark.black }/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleClickEdit()}>
          <FontAwesome name="edit" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleClickDelete()}>
          <FontAwesome name="trash-o" size={32} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: Colors.dark.white,
    borderWidth:1,
    borderColor: Colors.dark.purpleDark,
    margin:10,
    borderRadius: 20
  },
  containerDisabled: {
    backgroundColor: Colors.dark.purpleLight,
    borderWidth:0,
  },
  imageContainer:{
    flex:2,
    borderRadius:20,
    margin:10,
    borderColor: Colors.dark.purpleDark,
    borderWidth:1
  },
  textContainer:{
    flex:2,
    margin:10,
    flexDirection:'column',
    backgroundColor:'transparent'
  },
  textDescription:{
    fontSize: 16,
  },
  buttonsContainer:{
    flex:1,
    justifyContent:'center',
    borderRadius:20,
    backgroundColor:'transparent'
    
  },
  button:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  image:{
    width:'100%',
    height:'100%',
    borderRadius:20,
  }
});
