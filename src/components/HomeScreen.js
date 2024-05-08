import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
      <Button
        title="Öğretmen"
        onPress={() => navigation.navigate('TeacherSign')}
      /></View>

    <View style={styles.button}>
      <Button 
        title="Öğrenci"
        onPress={() => navigation.navigate('StudentSign')}
      />
    </View></View>
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

export default HomeScreen;
