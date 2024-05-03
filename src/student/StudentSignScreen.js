/*import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const StudentLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Burada email ve şifre doğrulaması yapabilirsiniz
    navigation.navigate('StudentMenu');
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
      <Button
        title="Giriş Yap"
        onPress={handleLogin}
      />
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

export default StudentLoginScreen;*/

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StudentSignScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Giriş</Text>
      <Button
        title="Kayıt ol"
        onPress={() => navigation.navigate('StudentRegister')}
      />
      <Button 
        title="Giriş Yap"
        onPress={() => navigation.navigate('StudentLogin')} // Öğrenci giriş ekranına yönlendirme
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

export default StudentSignScreen;
