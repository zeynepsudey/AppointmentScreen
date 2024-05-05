import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { fetchTeacherAppointments, saveStudentSelection } from '../database';

const StudentSelectScreen = ({ route }) => {
  const { teacherId } = route.params;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const fetchedAppointments = await fetchTeacherAppointments(teacherId);
      setAppointments(fetchedAppointments);
    };

    loadAppointments();
  }, []);

  const handleSelectAppointment = async (appointmentId) => {
    await saveStudentSelection(appointmentId, "YourStudentIdHere");
    alert('Randevu seçildi');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Button title="Seç" onPress={() => handleSelectAppointment(item.id)} />
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
});

export default StudentSelectScreen;
