import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { set, ref } from 'firebase/database'; 
import { data } from './firebase';
import { setUserEmail } from '../reducers/userReducer';

const genderOptions = ["Nam", "Nữ"];

const UpdateInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const emailFromRedux = useSelector((state) => state.user.userEmail);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const sanitizeEmailForPath = (email) => {
    return email.replace(/[.#$[\]]/g, "_");
  };

  const create = () => {
    const sanitizedEmail = sanitizeEmailForPath(emailFromRedux);
    const sanitizedPartnerEmail = sanitizeEmailForPath(partnerEmail);

    if (!sanitizedEmail) {
      Alert.alert('Vui lòng nhập email của bạn.');
      return;
    }

    if (!name) {
      Alert.alert('Vui lòng nhập tên của bạn.');
      return;
    }

    if (!birthMonth) {
      Alert.alert('Vui lòng nhập tháng sinh của bạn.');
      return;
    }

    if (!selectedGender) {
      Alert.alert('Vui lòng chọn giới tính của bạn.');
      return;
    }

    const userData = {
      email: sanitizedEmail,
      name: name,
      age: age,
      birthYear: birthYear,
      birthMonth: birthMonth,
      birthDate: birthDate,
      height: height,
      weight: weight,
      partnerEmail: sanitizedPartnerEmail,
      gender: selectedGender,
    };

    set(ref(data, 'user/' + sanitizedEmail), userData)
      .then(() => {
        Alert.alert('Dữ liệu đã được cập nhật');
        setName('');
        setAge('');
        setBirthYear('');
        setBirthMonth('');
        setBirthDate('');
        setHeight('');
        setWeight('');
        setPartnerEmail('');
        setSelectedGender('');

        if (selectedGender === "Nam") {
          navigation.navigate("BoyTabs");
        } else if (selectedGender === "Nữ") {
          navigation.navigate("GirlTabs");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cập nhật thông tin cá nhân</Text>
      <Text style={styles.emailText}>Email: {emailFromRedux}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tuổi"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Năm sinh"
        value={birthYear}
        onChangeText={(text) => setBirthYear(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tháng sinh"
        value={birthMonth}
        onChangeText={(text) => setBirthMonth(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày sinh"
        value={birthDate}
        onChangeText={(text) => setBirthDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Chiều cao (cm)"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cân nặng (kg)"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email người yêu"
        value={partnerEmail}
        onChangeText={(text) => setPartnerEmail(text)}
      />
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Giới tính:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            Alert.alert(
              'Chọn giới tính',
              'Chọn giới tính của bạn',
              genderOptions.map((option) => ({
                text: option,
                onPress: () => setSelectedGender(option),
              }))
            );
          }}
        >
          <Text>{selectedGender || "Chọn giới tính"}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Cập nhật" onPress={create} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});

export default UpdateInfoScreen;
