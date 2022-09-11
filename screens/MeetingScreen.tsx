import { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { List, Card, Avatar, Button as PButton } from 'react-native-paper';
import moment from 'moment';

import { Text, View } from '../components/Themed';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

const MeetingScreen = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate ?? new Date());
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
    showMode('time');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Mes prochains rendez-vous</List.Subheader>
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
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Demander un rendez-vous</Text>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>{moment(date).locale('fr').format('LLLL')}</Text>
      <Card style={styles.card}>
        <Card.Title title="Demander un rendez-vous" subtitle="Sélectionner une date et un vétérinaire" left={LeftContent} />
        <Card.Content>
        </Card.Content>
        <Card.Actions>
          <PButton>Cancel</PButton>
          <PButton>Ok</PButton>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    minHeight: '100%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    margin: 10
  }
});

export default MeetingScreen;
