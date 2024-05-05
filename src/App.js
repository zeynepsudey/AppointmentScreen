import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { setupDatabaseAsync } from '../src/database';

// Home Screen
import HomeScreen from '../src/components/HomeScreen';

// Teacher Screens
import TeacherLoginScreen from '../src/teacher/TeacherLoginScreen';
import TeacherAppScreen from '../src/teacher/TeacherAppScreen';
import TeacherAppList from '../src/teacher/TeacherAppList';
import TeacherMenuScreen from '../src/teacher/TeacherMenuScreen';
import TeacherRegisterScreen from '../src/teacher/TeacherRegisterScreen';
import TeacherSignScreen from '../src/teacher/TeacherSignScreen';

// Student Screens
import StudentLoginScreen from '../src/student/StudentLoginScreen';
import StudentMenuScreen from '../src/student/StudentMenuScreen';
import StudentAppList from '../src/student/StudentAppList';
import StudentRegisterScreen from '../src/student/StudentRegisterScreen';
import StudentSignScreen from '../src/student/StudentSignScreen';
import StudentAppScreen from '../src/student/StudentAppScreen';
import StudentSelectScreen from '../src/student/StudentSelectScreen';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    // Veritabanı ve tabloların kurulumunu başlat
    setupDatabaseAsync().then(() => {
      console.log('Database setup completed.');
    }).catch(error => {
      console.error('Error setting up the database:', error);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Profil Girişi' }} />

        {/* Teacher Navigation Screens */}
        <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen} options={{ title: 'Öğretmen Giriş' }} />
        <Stack.Screen name="TeacherList" component={TeacherAppList} options={{ title: 'Randevularım' }} />
        <Stack.Screen name="TeacherScreen" component={TeacherAppScreen} options={{ title: 'Randevu Belirle' }} />
        <Stack.Screen name="TeacherMenu" component={TeacherMenuScreen} options={{ title: 'Menü' }} />
        <Stack.Screen name="TeacherRegister" component={TeacherRegisterScreen} options={{ title: 'Öğretmen Kayıt' }} />
        <Stack.Screen name="TeacherSign" component={TeacherSignScreen} options={{ title: '' }} />
        
        {/* Student Navigation Screens */}
        <Stack.Screen name="StudentLogin" component={StudentLoginScreen} options={{ title: 'Öğrenci Giriş' }} />
        <Stack.Screen name="StudentMenu" component={StudentMenuScreen} options={{ title: 'Menü' }} />
        <Stack.Screen name="StudentList" component={StudentAppList} options={{ title: 'Randevularım' }} />
        <Stack.Screen name="StudentRegister" component={StudentRegisterScreen} options={{ title: 'Öğrenci Kayıt' }} />
        <Stack.Screen name="StudentSign" component={StudentSignScreen} options={{ title: '' }} />
        <Stack.Screen name="StudentScreen" component={StudentAppScreen} options={{ title: 'Randevu Al' }} />
        <Stack.Screen name="StudentSelect" component={StudentSelectScreen} options={{ title: 'Randevu Al' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
