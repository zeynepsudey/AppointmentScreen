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
    loadAppointments();  // loadAppointments fonksiyonu burada çağrılıyor
  }, [teacherId]);

  const loadAppointments = async () => {  // loadAppointments fonksiyonunun tanımı
    try {
      const loadedAppointments = await fetchAppointments(teacherId);
      setAppointments(loadedAppointments);
    } catch (error) {
      Alert.alert("Error", "Failed to load appointments: " + error.message);
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) setSelectedTime(time);
  };

  const handleSaveAppointment = async () => {
    const formattedDate = selectedDate.toISOString().substring(0, 10);
    const formattedTime = selectedTime.toISOString().substring(11, 19);
    try {
      await addAppointment(formattedDate, formattedTime, teacherId);
      await loadAppointments();  // Randevuları yeniden yükleyin
      Alert.alert(" ", "Randevu başarıyla kaydedildi.");
    } catch (error) {
      Alert.alert("Hata", "Randevu kaydedilirken bir hata oluştu.: " + error.message);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      await loadAppointments();  // Randevuları yeniden yükleyin
      Alert.alert("Success", "Randevu başarıyla silindi.");
    } catch (error) {
      Alert.alert("Hata", "Randevu kaydedilirken bir hata oluştu.: " + error.message);
    }
  };

  const renderAppointmentItem = ({ item }) => {
    const fullDateTime = new Date(item.date + 'T' + item.time);
    return (
      <View style={styles.appointmentItem}>
        <Text>{fullDateTime.toLocaleDateString('en-CA')}</Text>
        <Text>{fullDateTime.toLocaleTimeString('it-IT')}</Text>
        <View style={styles.button}><Button title="Sil" onPress={() => handleDeleteAppointment(item.id)} />
      </View></View>
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

<View style={styles.button2}><Button title="Saat Seç" onPress={() => setShowTimePicker(true)} /></View>
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


<View style={styles.button2}><Button title="Randevuyu Kaydet" onPress={handleSaveAppointment} /></View>
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
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center',     
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,  
    marginTop: 20,
    marginBottom: 0,

  },
  text: {
    fontSize: 16,  
    color: 'black',  
    marginBottom: 5,  
    width: '100%',  
    textAlign: 'center',  
    numberOfLines: 1,  
  },
  button: {
    marginTop: 5,
  },
  button2: {
    marginTop: 15,
  }
});

export default TeacherAppScreen;