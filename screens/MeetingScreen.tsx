import { useState } from 'react';
import { StyleSheet } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { Text, View } from '../components/Themed';

const MeetingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <RNDateTimePicker
        onChange={(_, date) => setSelectedDate(date ?? new Date())}
        value={selectedDate}
        style={styles.datepicker}
      />
      <Text>{moment(selectedDate).locale('fr').format('LLLL')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  datepicker: {
    height: 150,
    width: 300
  }
});

export default MeetingScreen;
