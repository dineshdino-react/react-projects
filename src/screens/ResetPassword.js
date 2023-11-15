import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_SERVER_URL } from './config';
import Resetjson from './Resetjson';

const ResetPassword = ({ visible, onClose, userdata }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordlength, setPasswordLength] = useState(false);

  const newPasswordRef = useRef(null);

  useEffect(() => {
    if (visible) {
      newPasswordRef.current.focus();
    }
  }, [visible]);

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setPasswordsMatch(false);
        return;
      }
      if (newPassword.length < 6) {
        setPasswordLength(true);
        return;
      } else {
        setPasswordLength(false);
      }
      // Make an API request to update the user's password
      const token = await AsyncStorage.getItem('authtoken');
      console.log(token);
      const doctorID = userdata.doctorID;
      const response = await axios.post(
        `${API_SERVER_URL}/reset-password/${doctorID}`,
        {
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handle the response from the server
      if (response.data.success) {
        // Password reset successfully
        onClose();
        Alert.alert(
          'Password Reset',
          'Your password has been reset successfully.',
        );
      } else {
        // Handle errors from the server
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      // Handle other errors, e.g., network error
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'An error occurred while resetting your password.');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modal}>
                <Text
                  style={{
                    color: '#ff7373',
                    fontSize: 18,
                    fontWeight: '500',
                    left: 260,
                    bottom: 10,
                  }}
                  onPress={onClose}>
                  Cancel
                </Text>
                <Resetjson />
                <View style={{ flexDirection: 'row', paddingTop: 40 }}>
                  <Text style={styles.title}>Reset Password</Text>
                </View>
                <Text style={{ fontWeight: 'bold' }}>Name : {userdata.name}</Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  Doctor ID :{' '}
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    {userdata.doctorID}
                  </Text>{' '}
                </Text>
                <TextInput
                  ref={newPasswordRef}
                  style={styles.input}
                  placeholder="New Password"
                  placeholderTextColor={'#d9d9d9'}
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm New Password"
                  placeholderTextColor={'#d9d9d9'}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setPasswordsMatch(newPassword === text);
                  }}
                  secureTextEntry={true}
                />
                {!passwordsMatch && newPassword !== '' && confirmPassword !== '' && (
                  <Text style={styles.errorText}>Passwords do not match</Text>
                )}
                {passwordlength && newPassword !== '' && confirmPassword !== '' && (
                  <Text style={styles.errorText}>Passwords should be at least 6 characters</Text>
                )}
                <Pressable
                  onPress={handleResetPassword}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    top: 30,
                    borderRadius: 20,
                    backgroundColor: passwordsMatch && newPassword !== '' ? '#ff7373' : '#d9d9d9',
                  }}
                  disabled={!(passwordsMatch && newPassword !== '')}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>
                    Reset password
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 50,
    borderRadius: 10,
    elevation: 5,
    width: 400,
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 0.5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ResetPassword;
