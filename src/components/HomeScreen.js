import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Giriş</Text>
      <Button
        title="Öğretmen"
        onPress={() => navigation.navigate('TeacherSign')}
      />
      <Button 
        title="Öğrenci"
        onPress={() => navigation.navigate('StudentSign')}
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

export default HomeScreen;
