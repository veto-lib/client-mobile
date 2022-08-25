import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import MyAnimalsItem from '../components/MyAnimals/MyAnimalsItem';
import { Animal } from '../models/animal';

const DATA: Animal[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Pépito',
    gender: 'Mâle',
    type: 'Chien'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Loubna',
    gender: 'Femelle',
    type: 'Chat'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Nina',
    gender: 'Femelle',
    type: 'Chien'
  },
];


const MyAnimalsScreen = () => {
  const renderItem = ({ item }: { item: Animal }) => (
    <MyAnimalsItem animal={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  }
});

export default MyAnimalsScreen;
