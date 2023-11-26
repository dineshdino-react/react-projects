import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import SVGImg from '../images/img1.svg';
import {API_SERVER_URL} from './config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import {Ionicons} from '@expo/vector-icons';
const Login = ({navigate}) => {
  {
    /*const [token , setToken] = useState('');*/
  }
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);
  const {UserName, Password, SetUserName, SetPassword} =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  {
    /* // checkloginstatus
 useEffect(() => {
   const checkLoginStatus = async()=>{
    try{
      const storedtoken = await AsyncStorage.getItem("authtoken")
        if(storedtoken){
          setToken(storedtoken);
        }
    }catch(err){
      console.log("error message",err)
    }
   }
   checkLoginStatus();
  }, []);*/
  }

  // handlelogin
  {
    /*const HandleLogin = async () => {
    const user = {
      UserName : UserName,
      Password: Password,
    }
    // send a post req to backend API
    try {
      // Send a POST request to the backend API
      const response = await axios.post(`${API_SERVER_URL}/login`, user);
      if (response.data && response.data.token) {
        // Save the authentication token in AsyncStorage
        await AsyncStorage.setItem('authtoken', response.data.token);
        Alert.alert('Login successful', 'You have logged in successfully');
        navigation.reset({
          index: 0,
          routes: [{ name: 'navi' }],
        });
      } else {
        Alert.alert('Login failed', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.log('Login Failed', error);
      Alert.alert('Login failed', 'An error occurred while logging in.');
    } 
  };*/
  }
  return (
    <View style={styles.logintop}>
      {/*  <SVGImg style={styles.img2} /> */}
      <Text style={styles.below}>Welcome !</Text>
      <Text style={styles.btext}>Please login to continue</Text>
      <View style={styles.box}>
        <View style={styles.inputbox}>
          <TextInput
            placeholder="Doctor id"
            placeholderTextColor={'#2f2f2f'}
            style={styles.input}
            value={UserName}
            onChangeText={actualData => SetUserName(actualData)}></TextInput>

          <View style={{position: 'relative'}}>
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor={'#2f2f2f'}
              style={styles.secondinput}
              value={Password}
              onChangeText={actualData => SetPassword(actualData)}></TextInput>
            <TouchableOpacity
              style={{position: 'absolute', top: 56, right: 20}}
              onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color="#2f2f2f"
              />
            </TouchableOpacity>
          </View>
          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate('Forgot')}>
            Forgot password ?
          </Text>
          <TouchableOpacity style={styles.loginbtn} onPress={login}>
            <Text style={styles.start}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  img2: {
    left: 25,
    top: -50,
  },
  loginbtn: {
    width: '100%',
    paddingLeft: '30%',
    paddingRight: '30%',
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ff7373',
    alignItems: 'center',
    justifyContent: 'center',
    top: 120,
  },
  start: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 18,
  },
  forgot: {
    color: '#2f2f2f',
    fontSize: 15,
    fontWeight: '500',
    top: 70,
    left: 10,
  },
  inputbox: {
    alignContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: '100%',
    top: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
  },
  secondinput: {
    height: 50,
    width: '100%',
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
  },
  btext: {
    color: '#2f2f2f',
    fontSize: 15,
    fontWeight: '500',
  },
  box: {
    backgroundColor: '#d9d9d9',
    height: 350,
    width: '100%',
    borderRadius: 30,
    top: 20,
  },
  below: {
    color: '#2f2f2f',
    fontWeight: 'bold',
    fontSize: 29,
  },
  logintop: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    top: -50,
  },
});
