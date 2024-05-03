import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StudentMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Button
        title="Randevularım"
        onPress={() => navigation.navigate('StudentList')}
      />
      <Button 
        title="Randevu Al"
        onPress={() => navigation.navigate('StudentScreen')}
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

export default StudentMenuScreen;
