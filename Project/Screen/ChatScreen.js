import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { ref, push, onValue, query, orderByChild, get } from 'firebase/database';
import { data } from './firebase';

const ChatScreen = () => {
  const userEmail = useSelector((state) => state.user.userEmail);
  const [message, setMessage] = useState('');
  const [messagesWithTimestamp, setMessagesWithTimestamp] = useState([]);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const convertEmailToValidPath = (email) => {
    return email.replace(/[^a-zA-Z0-9]/g, '_');
  };

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

  useEffect(() => {
    const sanitizedEmail = convertEmailToValidPath(userEmail);
    const userRef = ref(data, 'user/' + sanitizedEmail);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setPartnerEmail(userData.partnerEmail);
      }
    }).catch((error) => {
      console.error(error);
      setError(error);
    });
  }, [userEmail]);

  useEffect(() => {
    const messagesRef = ref(data, 'messages');
    const combinedQuery = query(
      messagesRef,
      orderByChild('timestamp')
    );

    onValue(combinedQuery, (snapshot) => {
      setIsLoading(false);
      if (snapshot.exists()) {
        const messageData = snapshot.val();
        const messageList = Object.values(messageData);

        const filteredMessages = messageList.filter((message) => {
          return message.sender === userEmail || message.receiver === userEmail;
        });

        const messagesWithTime = filteredMessages.map((message) => ({
          ...message,
          timestampFormatted: new Date(message.timestamp).toLocaleTimeString(),
        }));

        setMessagesWithTimestamp(messagesWithTime);
      } else {
        setError('Không có tin nhắn nào.');
      }
    });
  }, [userEmail]);

  const isMessageFromCurrentUser = (message) => {
    return message.sender === userEmail;
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = isMessageFromCurrentUser(item);
    return (
      <View style={[
        styles.message, 
        isCurrentUser ? styles.currentUserMessage : styles.partnerMessage
      ]}>
        <Text style={[styles.text, isCurrentUser ? styles.currentUserText : styles.partnerText]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestampFormatted}</Text>
      </View>
    );
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = {
      sender: userEmail,
      receiver: userData.partnerEmail,
      text: message,
      timestamp: new Date().toISOString(),
    };
    await push(ref(data, 'messages'), newMessage);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={messagesWithTimestamp}
          keyExtractor={(item) => item.timestamp}
          renderItem={renderMessage}
          ListEmptyComponent={<Text>Không có tin nhắn.</Text>}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nhập tin nhắn" value={message} onChangeText={(text) => setMessage(text)} />
        <Button title="Gửi" onPress={sendMessage} />
      </View>
      {error && <Text style={styles.errorText}>Lỗi: {error}</Text>}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  partnerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ccc',
  },
  text: {
    color: 'white',
  },
  currentUserText: {
    color: 'white',
  },
  partnerText: {
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ChatScreen;
