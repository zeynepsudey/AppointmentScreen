import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addAppointment, fetchAppointments, deleteAppointment } from '../database';

const TeacherAppScreen = ({ route }) => {
  const { teacherId } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments(teacherId).then(setAppointments);
  }, []);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) setSelectedTime(time);
  };

  const handleSaveAppointment = async () => {
    const formattedDate = selectedDate.toISOString().substring(0, 10); // "YYYY-MM-DD"
    const formattedTime = selectedTime.toISOString().substring(11, 19); // "HH:MM:SS"
    await addAppointment(formattedDate, formattedTime, teacherId);
    const updatedAppointments = await fetchAppointments(teacherId);
    setAppointments(updatedAppointments);
  };

  const handleDeleteAppointment = async (id) => {
    await deleteAppointment(id);
    const updatedAppointments = await fetchAppointments(teacherId);
    setAppointments(updatedAppointments);
  };

  const renderAppointmentItem = ({ item }) => {
    const fullDateTime = new Date(item.date + 'T' + item.time);
    return (
      <View style={styles.appointmentItem}>
        <Text>{fullDateTime.toLocaleDateString('en-CA')}</Text>
        <Text>{fullDateTime.toLocaleTimeString('it-IT')}</Text>
        <Button title="Sil" onPress={() => handleDeleteAppointment(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Tarih Seç" onPress={() => setShowDatePicker(true)} />
      <Text>Seçilen Tarih: {selectedDate.toLocaleDateString()}</Text>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={handleDateChange}
        />
      )}
      <Button title="Saat Seç" onPress={() => setShowTimePicker(true)} />
      <Text>Seçilen Saat: {selectedTime.toLocaleTimeString()}</Text>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={handleTimeChange}
        />
      )}
      <Button title="Randevuyu Kaydet" onPress={handleSaveAppointment} />
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    width: '80%',
  },
});

export default TeacherAppScreen;
