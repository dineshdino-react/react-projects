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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { useEffect } from 'react';


const Login = ({navigate}) => {
  const [UserName, SetUserName] = useState('');
  const [Password, SetPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
   const checkLoginStatus = async()=>{
    try{
        const token = await AsyncStorage.getItem("authtoken")
        if(token ){
          navigation.replace("Homepage");
        }
    }catch(err){
      console.log("error message",err)
    }
   }
   checkLoginStatus();
  }, [])
  
  const HandleLogin = () => {
    const user = {
      UserName : UserName,
      Password: Password,
    }

    // send a post req to backend API
    axios.post("http://192.168.29.185:8000/login",user).then(response => {
      console.log(response);
      const token = response.data.token;
      if(response && response.data && response.data.token){
        AsyncStorage.setItem("authtoken",token);
        
      }
      navigation.replace("Homepage");
      Alert.alert('login successful', 'you have logged in successfully');
      
    }).catch((error)=>{
      Alert.alert("Login failed");
      console.log("login Failed",error)
    })
  };
  return (
    <View style={styles.logintop}>
      <SVGImg style={styles.img2} />
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

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor={'#2f2f2f'}
            style={styles.secondinput}
            value={Password}
            onChangeText={actualData => SetPassword(actualData)}></TextInput>
          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate('Forgot')}>
            Forgot password ?
          </Text>
          <TouchableOpacity style={styles.loginbtn} onPress={HandleLogin}>
            <Text style={styles.start} >
              Login
            </Text>
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
