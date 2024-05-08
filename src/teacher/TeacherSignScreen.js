import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TeacherSignScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
      <Button
        title="Kayıt ol"
        onPress={() => navigation.navigate('TeacherRegister')}
      /></View>

    <View style={styles.button}>
      <Button 
        title="Giriş Yap"
        onPress={() => navigation.navigate('TeacherLogin')}
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

export default TeacherSignScreen;
