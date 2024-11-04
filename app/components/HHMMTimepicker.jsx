import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';

const HHMMTimepicker = ({selectedTime, onTimeChange}) => {
  const [hours, setHours] = useState('09'); // Default to 09
  const [minutes, setMinutes] = useState('00');

  // Effect to set initial time from props
  useEffect(() => {
    if (selectedTime) {
      const date = new Date(selectedTime);
      setHours(date.getHours().toString().padStart(2, '0'));
      setMinutes(date.getMinutes().toString().padStart(2, '0'));
    }
  }, [selectedTime]);

  // Validate and notify if the time is invalid
  const isValidTime = (hour, minute) => {
    const now = new Date();
    const selectedDate = new Date();
    selectedDate.setHours(hour, minute, 0);

    const nineAM = new Date();
    nineAM.setHours(9, 0, 0);

    const sevenPM = new Date();
    sevenPM.setHours(19, 0, 0);

    return (
      selectedDate >= nineAM && selectedDate <= sevenPM && selectedDate >= now
    );
  };

  const handleTimeChange = () => {
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);

    if (isValidTime(hour, minute)) {
      const newDate = new Date();
      newDate.setHours(hour, minute, 0);
      onTimeChange(newDate);
    } else {
      Alert.alert(
        'Invalid time',
        'Please select a time between 9 AM and 7 PM that is not in the past.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select a Time:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={hours}
          onChangeText={text => {
            // Limit input to 2 digits and between 9 and 19 (for 9 AM to 7 PM)
            if (
              text.length <= 2 &&
              /^[0-9]*$/.test(text) &&
              (text === '' || (parseInt(text) >= 9 && parseInt(text) <= 19))
            ) {
              setHours(text);
              handleTimeChange();
            }
          }}
          placeholder="HH"
          maxLength={2}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={minutes}
          onChangeText={text => {
            // Limit input to 2 digits (0-59)
            if (
              text.length <= 2 &&
              /^[0-9]*$/.test(text) &&
              (text === '' || parseInt(text) < 60)
            ) {
              setMinutes(text);
              handleTimeChange();
            }
          }}
          placeholder="MM"
          maxLength={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    width: '45%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});

export default HHMMTimepicker;
