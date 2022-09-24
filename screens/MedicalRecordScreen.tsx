import { StyleSheet, Image, Pressable } from 'react-native';
import { Card, List } from 'react-native-paper';
import { useCallback } from 'react';
import moment from 'moment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import { View } from '../components/Themed';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getAnimal, getAnimalDocuments, getAnimalEvents } from '../services/http-service';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AnimalRecord'>;

const MedicalRecordScreen = ({ route }: Props) => {

  const { animalId } = route.params;

  const { data: animal } = useAsyncEffect(useCallback(() => getAnimal(animalId), []));
  const { data: meetings } = useAsyncEffect(useCallback(() => getAnimalEvents(animalId), []));
  const { data: documents } = useAsyncEffect(useCallback(() => getAnimalDocuments(animalId), []));

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={animal?.name} subtitle={animal?.type}
          left={() =>
            <Image
              style={styles.image}
              source={require('../assets/images/shiba.jpg')}
            />}
        />
      </Card>
      <List.Section>
        <List.Subheader>Derniers rendez-vous</List.Subheader>
        {
          (meetings ?? []).map(m => <List.Item
            title={m.title + ' - ' + m.reason}
            description={m.veterinary + ' - ' + moment(m.start).locale('fr').format('LL')}
            left={() => <List.Icon icon="calendar" />}
          />)
        }
      </List.Section>
      <List.Section>
        <List.Subheader>Documents</List.Subheader>
        {
          (documents ?? []).map(d => <List.Item
            title={d.name}
            description={moment(d.uploaded).locale('fr').format('LL')}
            left={() => <List.Icon icon="file-document" />}
            right={() => <Pressable onPress={async () => {
              const { uri } = await FileSystem
                .downloadAsync('http://www.africau.edu/images/default/sample.pdf', FileSystem.documentDirectory + 'sample.pdf');
              FileSystem.getContentUriAsync(uri).then(uri => {
                IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                  data: uri,
                  flags: 1,
                  type: 'application/pdf'
                });
              });
            }}>
              <List.Icon icon="arrow-collapse-down" />
            </Pressable>}
          />)
        }
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  card: {
    margin: 10
  },
  image: {
    marginRight: 20,
    height: 45,
    width: 45,
    borderRadius: 100
  },
});

export default MedicalRecordScreen;
