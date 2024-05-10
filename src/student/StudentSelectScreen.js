
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { fetchTeacherAppointments, saveStudentSelection, loadAppointments } from '../database';

const StudentSelectScreen = ({ route }) => {
  const { teacherId } = route.params;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const fetchedAppointments = await fetchTeacherAppointments(teacherId);
      setAppointments(fetchedAppointments.filter(app => !app.studentId));
    };

    loadAppointments();
  }, [teacherId]);

  const handleSelectAppointment = async (appointmentId) => {
    const studentId = "YourStudentIdHere";
    await saveStudentSelection(appointmentId, studentId);
    alert('Randevu seçildi. Uyarı: Son 1 saate kadar iptal edebilirsiniz.');
    loadAppointments();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
        
            <View style={styles.appointmentItem}>
            <Text>Tarih: {item.date}</Text>
            <Text>Saat: {item.time}</Text>
            <View style={styles.button}><Button style={styles.button1} title="Seç" onPress={() => handleSelectAppointment(item.id)} />
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




export default StudentSelectScreen;
