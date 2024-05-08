import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Button } from 'react-native';
import { fetchStudentAppointments, deleteStudentAppointment } from '../database';

const TeacherAppList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const studentId = "YourStudentIdHere"; // Dinamik olarak ayarlanmalı
    try {
      const fetchedAppointments = await fetchStudentAppointments(studentId);
      setAppointments(fetchedAppointments);
    } catch (error) {
      Alert.alert('Hata', 'Randevular yüklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await deleteStudentAppointment(appointmentId);
      loadAppointments();  // Listeyi yeniden yükle
      Alert.alert('Başarılı', 'Randevu başarıyla iptal edildi.');
    } catch (error) {
      Alert.alert('Hata', 'Randevu iptal edilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text>Tarih: {item.date}</Text>
            <Text>Zaman: {item.time}</Text>
            <Text>Öğrenci: {item.studentFirstName} {item.studentLastName}</Text>
            <View style={styles.button}>
              <Button title="İptal Et" onPress={() => handleDelete(item.id)} />
          </View></View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
  }
});

export default TeacherAppList;
