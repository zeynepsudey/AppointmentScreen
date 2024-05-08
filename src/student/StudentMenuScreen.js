import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StudentMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button 
          title="Randevu Al"
          onPress={() => navigation.navigate('StudentScreen')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Randevularım"
          onPress={() => navigation.navigate('StudentList')}
        />
      </View>
      <View style={styles.button}>
        <Button 
          title="Kütüphane"
          //onPress={() => navigation.navigate('')}
        />
      </View>
      <View style={styles.button}>
        <Button 
          title="Adım Sayar"
          //onPress={() => navigation.navigate('')}
        />
      </View>
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


export default StudentMenuScreen;
