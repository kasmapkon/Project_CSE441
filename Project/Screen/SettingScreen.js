import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const SettingsScreen = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
        dispatch(logoutUser());
        navigation.navigate('Login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={userSignOut}>
        <Text style={styles.signOutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
