import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const TeacherMenuScreen = ({ navigation, route }) => {
  const { teacherId } = route.params;

  return (
    <View style={styles.container}>

      <View style={styles.button}>
      <Button
        title="Randevularım"
        onPress={() => navigation.navigate('TeacherList', { teacherId })}
      /></View>

    <View style={styles.button}>
      <Button 
        title="Randevu Belirle"
        onPress={() => navigation.navigate('TeacherScreen', { teacherId })}
      /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginTop: 10,
  }
});

export default TeacherMenuScreen;
