import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { List, Card, Button } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list';
import moment from 'moment';

import { Text, View } from '../components/Themed';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getNextEvents, getVeterinaries, createEvent, getAnimals } from '../services/http-service';
import { Event } from '../models/event';

const MeetingScreen = () => {

  const [date, setDate] = useState(new Date());
  const [veterinary, setVeterinary] = useState('');
  const [reason, setReason] = useState<Event['reason']>('Vaccination');
  const [animal, setAnimal] = useState<string>('');

  const reasons: Event['reason'][] = [
    'Vaccination',
    'Consultation',
    'Identification',
    'Visite de contrôle'
  ];

  const { data: veterinaries } = useAsyncEffect(getVeterinaries);
  const { data: meetings } = useAsyncEffect(getNextEvents);
  const { data: animals } = useAsyncEffect(getAnimals);

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
          <View style={styles.select}>
          <SelectList
              setSelected={setVeterinary}
              data={veterinaries?.map((v, i) => ({ value: v.email })) ?? []}
              placeholder="Choisir un vétérinaire"
              search={false}
            />
          </View>
          <View style={styles.select}>
            <SelectList
              setSelected={setReason}
              data={reasons?.map((r, i) => ({ value: r })) ?? []}
              placeholder="Choisir un motif"
              search={false}
            />
          </View>
          <View style={styles.select}>
            <SelectList
              setSelected={setAnimal}
              data={animals?.map((a, i) => ({ value: a.name }))}
              placeholder="Choisir un animal"
              search={false}
            />
          </View>
          <Text style={styles.text}>Le {moment(date).locale('fr').format('LL')} à {moment(date).locale('fr').format('LT')}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={showDatepicker}>Changer date</Button>
          <Button onPress={showTimepicker}>Changer heure</Button>
          <Button onPress={() => createEvent({
            title: moment(date).locale('fr').format('LL'),
            start: date,
            end: moment(date).add(1, 'h').toDate(),
            notes: '',
            reason: reason,
            animal: animals?.find(a => a.name === animal)?.id ?? '',
            customer: '1',
            veterinary: veterinary
          })}>Créer</Button>
        </Card.Actions>
      </Card>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <List.Section>
        <List.Subheader>Mes prochains rendez-vous</List.Subheader>
        {
          (meetings ?? []).map(m => <List.Item
            title={m.title + ' - ' + m.reason}
            description={m.veterinary + ' - ' + moment(m.start).locale('fr').format('LL')}
            left={() => <List.Icon icon="calendar" />}
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
    minHeight: '100%'
  },
  select: {
    margin: 10,
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
