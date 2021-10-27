import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.pinkLight
  },
});
