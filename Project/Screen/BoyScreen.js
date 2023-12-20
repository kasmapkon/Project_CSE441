import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const BoyScreen = ({ navigation }) => {
  const userEmail = useSelector((state) => state.user.userEmail);

  const goToInfoScreen = () => {
    navigation.navigate('Info');
  };

  const goToChatScreen = () => {
    navigation.navigate('Chat'); 
  };
  const goToAddFoodScreen = () => {
    navigation.navigate('AddFood');
  };
  return (
    <View style={styles.container}>
      <Header
        barStyle="default"
        centerComponent={{
          text: 'Boy',
          style: { color: '#fff', fontSize: 20 }
        }}
        containerStyle={styles.headerContainer}
        leftComponent={
          <TouchableOpacity onPress={() => console.log('Menu icon clicked')}>
          <Text style={styles.emoji}>🌳</Text>
        </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => console.log('Menu icon clicked')}>
          <Text style={styles.emoji}>🌳</Text>
        </TouchableOpacity>
        }
      />
      <TouchableOpacity style={styles.infoButton} onPress={goToInfoScreen}>
        <Text style={styles.buttonText}>Xem thông tin cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={goToChatScreen}>
        <Text style={styles.buttonText}>Chat với 🐯</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={goToAddFoodScreen}>
        <Text style={styles.buttonText}>Thêm đồ ăn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#007AFF',
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#000', // Đổi màu chữ thành đen
  },
  infoButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  chatButton: {
    backgroundColor: '#007AFF', 
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

export default BoyScreen;
