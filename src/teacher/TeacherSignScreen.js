import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TeacherSignScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Giriş</Text>
      <Button
        title="Kayıt ol"
        onPress={() => navigation.navigate('TeacherRegister')}
      />
      <Button 
        title="Giriş Yap"
        onPress={() => navigation.navigate('TeacherLogin')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TeacherSignScreen;
