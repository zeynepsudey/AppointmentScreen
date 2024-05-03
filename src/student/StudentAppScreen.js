import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { fetchAppointments, saveStudentSelection } from '../database';

const StudentAppScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    const loadAppointments = async () => {
      const fetchedAppointments = await fetchAppointments();
      setAppointments(fetchedAppointments);
    };

    loadAppointments();
  }, []);

  const handleSaveSelection = async (appointmentId) => {
    if (selectedStudentId) {
      await saveStudentSelection(appointmentId, selectedStudentId);
      alert("Seçim kaydedildi");
      // Randevular listesini yeniden yüklemek yerine yalnızca seçilen randevuyu güncelleyin
      setAppointments(appointments.map(app => {
        if (app.id === appointmentId) {
          return {...app, studentId: selectedStudentId};
        }
        return app;
      }));
    } else {
      alert("Lütfen bir öğrenci ID'si giriniz.");
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSelectedStudentId}
        value={selectedStudentId}
        placeholder="Öğrenci ID giriniz"
        keyboardType="numeric"
      />
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Button title="Seç" onPress={() => handleSaveSelection(item.id)} />
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
});

export default StudentAppScreen;
