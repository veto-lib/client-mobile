import { StyleSheet, Image, Pressable } from 'react-native';
import { Card, Paragraph, List } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import { View } from '../components/Themed';

export default function MedicalRecordScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Pépito" subtitle="Chien"
          left={() =>
            <Image
              style={styles.image}
              source={require('../assets/images/shiba.jpg')}
            />}
        />
        <Card.Content>
          <Paragraph>Mâle</Paragraph>
          <Paragraph>01/01/1990</Paragraph>
        </Card.Content>
      </Card>
      <List.Section>
        <List.Subheader>Derniers rendez-vous</List.Subheader>
        <List.Item
          title="Vaccin contre xxx - Vaccination"
          description="Quentin Caritey - 14 août 2022 18:58"
          left={() => <List.Icon icon="calendar" />}
        />
        <List.Item
          title="Mensuel - Consultation"
          description="Quentin Caritey - 15 août 2022 14:22"
          left={() => <List.Icon icon="calendar" />}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Documents</List.Subheader>
        <List.Item
          title="Ordonnance"
          description="14 août 2022 22:51"
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
        />
      </List.Section>
    </View>
  );
}

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
