import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { fetchTeachers } from '../database';

const StudentAppScreen = ({ navigation }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const loadTeachers = async () => {
      const fetchedTeachers = await fetchTeachers();
      setTeachers(fetchedTeachers);
    };

    loadTeachers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={teachers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('StudentSelect', { teacherId: item.id })}>
            <View style={styles.teacherItem}>
              <Text>{item.firstName} {item.lastName}</Text>
            </View>
          </TouchableOpacity>
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
  teacherItem: {
    flex: 1,  // Genişliği esnek hale getir
    justifyContent: 'center', 
    alignItems: 'center',     
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,  // Dikey boşluk
  },
  text: {
    fontSize: 16,  // Yazı boyutu
    color: 'black',  // Yazı rengi
    marginBottom: 5,  // Altına boşluk
    width: '100%',  // Genişlik maksimum
    textAlign: 'center',  // Metni ortala
    numberOfLines: 1,  // Sadece bir satır göster, gerekiyorsa "..." kullan
  }
});


export default StudentAppScreen;
