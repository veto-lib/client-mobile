import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { List, Card, Button } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list';
import moment from 'moment';

import { Text, View } from '../components/Themed';

const MeetingScreen = () => {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState('');

  const data = [
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '1', value: 'Jammu & Kashmir' }
  ];

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
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Demander un rendez-vous" subtitle="Sélectionner une date et un vétérinaire" />
        <Card.Content>
          <SelectList
            setSelected={setSelected}
            data={data} onSelect={() => console.log(selected)}
            placeholder="Choisir un vétérinaire"
            search={false}
          />
          <Text style={styles.text}>Le {moment(date).locale('fr').format('LL')} à {moment(date).locale('fr').format('LT')}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={showDatepicker}>Changer date</Button>
          <Button onPress={showTimepicker}>Changer heure</Button>
          <Button>Créer</Button>
        </Card.Actions>
      </Card>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  card: {
    margin: 10
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    margin: 5
  }
});

export default MeetingScreen;
