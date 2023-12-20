// GirlScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const GirlScreen = () => {
  const navigation = useNavigation();

  const goToInfoScreen = () => {
    navigation.navigate('Info');
  };

  const goToChatScreen = () => {
    navigation.navigate('Chat');
  };

  const goToAddFoodScreen = () => {
    navigation.navigate('AddFood');
  };

  const goToFoodWheelScreen = () => {
    navigation.navigate('FoodWheel');
  };

  return (
    <View style={styles.container}>
      <Header
        barStyle="default"
        centerComponent={{
          text: 'Girl',
          style: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
        }}
        containerStyle={styles.headerContainer}
      />
      <TouchableOpacity style={styles.infoButton} onPress={goToInfoScreen}>
        <Text style={styles.buttonText}>Thông tin cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={goToChatScreen}>
        <Text style={styles.buttonText}>Chat với 🐶</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={goToAddFoodScreen}>
        <Text style={styles.buttonText}>Thêm đồ ăn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.foodWheelButton} onPress={goToFoodWheelScreen}>
        <Text style={styles.buttonText}>Món gì cũng được</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF69B4',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  infoButton: {
    backgroundColor: '#ff69b4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  chatButton: {
    backgroundColor: '#87ceeb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  foodWheelButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GirlScreen;
