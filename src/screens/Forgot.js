import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const Forgot = ({navigation}) => {
  const [UserName, SetUserName]=useState("");
  const [Password, SetPassword]=useState("");

  return (
    <View style = {styles.logintop}>
      <Image style = {styles.img2} source={require('../images/img2.png' )} />
      <Text style={styles.below}>Forgot password</Text>
      <View style={styles.box}>
        <View style={styles.inputbox}>
        <TextInput placeholder="Name"
         placeholderTextColor={'#2f2f2f'}
          style={styles.input}
          value={UserName}
           onChangeText={(actualData)=>SetUserName(actualData)}>
        </TextInput>
        <TextInput 
        secureTextEntry={true}
         placeholder="Password"
          placeholderTextColor={'#2f2f2f'} 
          style={styles.secondinput} value={Password}
          onChangeText={(actualData)=>SetPassword(actualData)}></TextInput>
        <TouchableOpacity style={styles.loginbtn} >
          <Text  style={styles.start} onPress={()=>navigation.goBack()}>proceed</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}
export default Forgot
const styles = StyleSheet.create({
  img2:{
   left:25,
   top:-50,
  },
  loginbtn:{
    width:'100%',
    paddingLeft:'30%',
    paddingRight:'30%',
    height:50,
    borderRadius:50,
    backgroundColor:'#ff7373',
    alignItems:'center',
    justifyContent:'center',
    top:120

    
  },
  start:{
    color:'#fff',
    fontWeight:'normal',
    fontSize:18,
  },
  forgot:{
    color:'#2f2f2f',
    fontSize:15,
    fontWeight:'500',
    top:70,
    left:10,
  },
  inputbox:{
  alignContent:'center',
  padding:20
  },
  input:{
    height:50,
    width:'100%',
    top:20,
    backgroundColor:'#fff',
    borderRadius:50,
    paddingLeft:20,
  },
  secondinput:{
    height:50,
    width:'100%',
    top:40,
    backgroundColor:'#fff',
    borderRadius:50,
    paddingLeft:20,
  },
  btext:{
  color:'#2f2f2f',
  fontSize:15,
  fontWeight:'500'
  },
  box:{
  backgroundColor:'#d9d9d9',
  height:350,
  width:'100%',
  borderRadius:30,
  top:20,
  },
  below:{
  color:'#2f2f2f',
  fontWeight:'bold',
  fontSize:25,
  left:10
  },
  logintop:{
    flex:1,
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
    paddingLeft:20,
    paddingRight:20,
    top:-50,   
  },
})