import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import MyAnimalsItem from '../components/MyAnimals/MyAnimalsItem';
import { Animal } from '../models/animal';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getAnimals } from '../services/http-service';

const MyAnimalsScreen = () => {

  const { data } = useAsyncEffect(getAnimals);

  const renderItem = ({ item }: { item: Animal }) => (
    <MyAnimalsItem animal={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data ?? []}
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
