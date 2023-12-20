import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { get, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { data } from './firebase';

const InfoScreen = () => {
  const userEmail = useSelector((state) => state.user.userEmail);
  const [userData, setUserData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const sanitizedEmail = userEmail.replace(/[.#$[\]]/g, '_');

    const readUserData = async () => {
      try {
        const snapshot = await get(ref(data, 'user/' + sanitizedEmail));
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserData(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    readUserData();
  }, [userEmail]);

  const handleEditPress = () => {
    navigation.navigate('EditInfo', { userData });
  };

  return (
    <View style={styles.container}>
      <Button title="Chỉnh sửa thông tin" onPress={handleEditPress} />
      <Text style={styles.heading}>Thông tin người dùng:</Text>
      {userData && (
        <>
          <Text style={styles.text}>Email: {userData.email}</Text>
          <Text style={styles.text}>Tên: {userData.name}</Text>
          <Text style={styles.text}>Tuổi: {userData.age}</Text>
          <Text style={styles.text}>Ngày sinh: {userData.birthDate}</Text>
          <Text style={styles.text}>Tháng sinh: {userData.birthMonth}</Text>
          <Text style={styles.text}>Năm sinh: {userData.birthYear}</Text>
          <Text style={styles.text}>Giới tính: {userData.gender}</Text>
          <Text style={styles.text}>Chiều cao (cm): {userData.height}</Text>
          <Text style={styles.text}>Cân nặng (kg): {userData.weight}</Text>
          <Text style={styles.text}>Email người yêu: {userData.partnerEmail}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF', // Màu chữ đậm
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    color: '#333', // Màu chữ thường
  },
});

export default InfoScreen;
