import React from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
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

const Item = ({ animal }: { animal: Animal }) => (
  <View style={styles.item}>
      <Image
        style={styles.image}
        source={require('../assets/images/shiba.jpg')}
      />
      <View style= {styles.textColumn}>
        <Text style={styles.title}>{animal.name}</Text>
        <Text style={styles.subtitle}>{animal.type} - {animal.gender}</Text>
      </View>
  </View>
);

const MyAnimalsScreen = () => {
  const renderItem = ({ item }: { item: Animal }) => (
    <Item animal={item} />
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
  },
  item: {
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
  },
  image: {
    marginRight: 20,
    height: 45,
    width: 45,
    borderRadius: 100
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.4
  },
  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  }
});

export default MyAnimalsScreen;