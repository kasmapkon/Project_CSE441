import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { data } from './firebase';
import { setUserEmail } from '../reducers/userReducer';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const sanitizeEmailForPath = (email) => {
    return email.replace(/[.#$[\]]/g, "_");
  };

  const handleLogin = () => {
    const sanitizedEmail = sanitizeEmailForPath(email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setUserEmail(sanitizedEmail));

        const emailPath = 'user/' + sanitizedEmail;

        get(ref(data, emailPath))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const gender = userData.gender;
              if (gender === "Nam") {
                navigation.navigate('BoyTabs');
              } else if (gender === "Nữ") {
                navigation.navigate('GirlTabs');
              }
            } else {
              navigation.navigate('UpdateUsername');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Đăng nhập" onPress={handleLogin} />
        <Button title="Đăng ký" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#007AFF',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default LoginScreen;
