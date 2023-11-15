import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground  } from 'react-native'
import React from 'react'
import SVGImg from "../images/img1.svg";

const Welcome = ({navigation}) => {
  return (
    <View style={styles.frame}>
        
      <Text style={styles.fullform}>Saveetha Medical College and Hospitals</Text>
      <View style = {styles.logos}>
    <SVGImg style={styles.img2} /> 
      <Image
        style={styles.tinyLogo}
        source={require('../images/img.png')}
      />
      
      <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.loginbtn}>
          <Text  style  ={styles.start}>Get Started</Text>
      </TouchableOpacity>
 
      </View> 
    
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  frame:{
    flex:1,
    alignItems:'center'
  },
  logos:{
    flex:1,
    alignItems:'center',
    position:'relative',
    flexDirection:'column',
    top:150
  },
  tinyLogo:{
    height:265,
    width:305
  },
  img2:{
    position:'relative',
    top:-120,
  },
  fullform:{
    fontSize:15,
    top:180,
    color:'#2f2f2f',
    fontWeight:'bold'
    
  },
  loginbtn:{
    width:'100%',
    paddingLeft:'30%',
    paddingRight:'30%',
    height:50,
    borderRadius:50,
    backgroundColor:'#ff7373',
    marginTop:130,
    alignItems:'center',
    justifyContent:'center'
    
  },
  start:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:15,
    
  }
})