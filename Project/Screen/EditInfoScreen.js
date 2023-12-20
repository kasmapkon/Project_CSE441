// EditInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { get, ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { data } from './firebase';

const EditInfoScreen = ({ route }) => {
  const userData = route.params.userData;
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [birthDate, setBirthDate] = useState(userData.birthDate);
  const [birthMonth, setBirthMonth] = useState(userData.birthMonth);
  const [birthYear, setBirthYear] = useState(userData.birthYear);
  const [gender, setGender] = useState(userData.gender);
  const [height, setHeight] = useState(userData.height);
  const [weight, setWeight] = useState(userData.weight);
  const [partnerEmail, setPartnerEmail] = useState(userData.partnerEmail);

  const navigation = useNavigation();

  const handleSave = async () => {
    const sanitizedEmail = userData.email.replace(/[.#$[\]]/g, '_');
    const updatedUserData = {
      ...userData,
      name,
      age,
      birthDate,
      birthMonth,
      birthYear,
      gender,
      height,
      weight,
      partnerEmail,
    };

    try {
      await set(ref(data, `user/${sanitizedEmail}`), updatedUserData);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email: {userData.email}</Text>
      <Text>Tên:</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <Text>Tuổi:</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        style={styles.input}
      />
      <Text>Ngày sinh:</Text>
      <TextInput
        value={birthDate}
        onChangeText={(text) => setBirthDate(text)}
        style={styles.input}
      />
      <Text>Tháng sinh:</Text>
      <TextInput
        value={birthMonth}
        onChangeText={(text) => setBirthMonth(text)}
        style={styles.input}
      />
      <Text>Năm sinh:</Text>
      <TextInput
        value={birthYear}
        onChangeText={(text) => setBirthYear(text)}
        style={styles.input}
      />
      <Text>Giới tính:</Text>
      <TextInput
        value={gender}
        onChangeText={(text) => setGender(text)}
        style={styles.input}
      />
      <Text>Chiều cao (cm):</Text>
      <TextInput
        value={height}
        onChangeText={(text) => setHeight(text)}
        style={styles.input}
      />
      <Text>Cân nặng (kg):</Text>
      <TextInput
        value={weight}
        onChangeText={(text) => setWeight(text)}
        style={styles.input}
      />
      <Text>Email người yêu:</Text>
      <TextInput
        value={partnerEmail}
        onChangeText={(text) => setPartnerEmail(text)}
        style={styles.input}
      />
      <Button title="Lưu" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default EditInfoScreen;
