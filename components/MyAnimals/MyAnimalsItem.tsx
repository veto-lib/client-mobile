import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Text, View } from '../Themed';
import { Animal } from '../../models/animal';
import { RootStackParamList } from '../../types';

const animalClicked = (_: Animal, navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate('AnimalRecord');
};

type ItemProps = { animal: Animal } & JSX.IntrinsicAttributes;

const MyAnimalsItem = ({ animal }: ItemProps) => {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => animalClicked(animal, navigation)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={require('../../assets/images/shiba.jpg')}
        />
        <View style={styles.textColumn}>
          <Text style={styles.title}>{animal.name}</Text>
          <Text style={styles.subtitle}>{animal.type} - {animal.gender}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default MyAnimalsItem;
