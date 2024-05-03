import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { validateTeacherLogin } from '../database'; // Öğretmen doğrulama fonksiyonunu import edin

const TeacherLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Kullanıcı giriş bilgilerini girmeden giriş yapmaya çalışırsa hata mesajı göster
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      // Öğretmenin giriş bilgilerini doğrula
      const teacherId = await validateTeacherLogin(email, password);
      if (teacherId) {
        // Giriş başarılıysa, öğretmen ID ile TeacherMenu ekranına yönlendir
        navigation.navigate('TeacherMenu', { teacherId: teacherId });
      } else {
        // Giriş başarısızsa kullanıcıya uyarı ver
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      // Veritabanıyla ilgili bir hata oluşursa, hata mesajı göster
      console.error(error);
      Alert.alert('Database Error', 'An error occurred while trying to log in');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholder="Email adresinizi giriniz"
      />
      <Text>Şifre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Şifrenizi giriniz"
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
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
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TeacherLoginScreen;
