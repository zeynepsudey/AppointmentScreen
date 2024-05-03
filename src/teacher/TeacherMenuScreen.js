import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const TeacherMenuScreen = ({ navigation, route }) => {
  const { teacherId } = route.params;

  return (
    <View style={styles.container}>
      <Button
        title="Randevularım"
        onPress={() => navigation.navigate('TeacherList', { teacherId })}
      />
      <Button 
        title="Randevu Belirle"
        onPress={() => navigation.navigate('TeacherScreen', { teacherId })}
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

export default TeacherMenuScreen;
