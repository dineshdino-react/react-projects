import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();
import axios from 'axios';
import {API_SERVER_URL} from '../src/screens/config';
import {Alert} from 'react-native';

const AuthProvider = ({children}) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [usertoken, setusertoken] = useState(null);
  const [UserName, SetUserName] = useState('');
  const [Password, SetPassword] = useState('');

  const isLoggedin = async () => {
    let usertoken = await AsyncStorage.getItem('authtoken');
    setusertoken(usertoken);
    setIsLoading(false);
  };
  useEffect(() => {
    isLoggedin();
  }, []);

  const login = async () => {
    setIsLoading(true);
    const user = {
      UserName: UserName,
      Password: Password,
    };
    // send a post req to backend API
    try {
      // Send a POST request to the backend API
      const response = await axios.post(`${API_SERVER_URL}/login`, user);
      if (response.data && response.data.token) {
        // Save the authentication token in AsyncStorage
        await AsyncStorage.setItem('authtoken', response.data.token);
        setusertoken(response.data.token);
        Alert.alert('Login successful', 'You have logged in successfully');
      } else {
        Alert.alert('Login failed', 'Invalid credentials. Please try again.');
      } 
    } catch (error) {
      console.log('Login Failed', error);
      Alert.alert('Login failed', 'An error occurred while logging in.');
    }finally{
        setIsLoading(false);
    }
   
  };
  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('authtoken');
    setusertoken(null);
    setIsLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        IsLoading,
        usertoken,
        UserName,
        Password,
        SetUserName,
        SetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
