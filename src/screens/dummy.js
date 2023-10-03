import { View, Text, Image, StyleSheet, TouchableOpacity  } from 'react-native'
import React from 'react'
const Welcome = ({navigation}) => {
  return (
    <View>
      <Text style={styles.fullform}>Saveetha Medical College and Hospitals</Text>
      <View style = {styles.logos}>
      <Image style = {styles.img2} source={require('../images/img2.png' )} />
      <Image style = {styles.img1} source={require('../images/img.png' )} />
      <TouchableOpacity style={styles.loginbtn}>
          <Text style ={styles.start}>Get Started</Text>
       </TouchableOpacity>
 
      </View>
    
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  logos:{
    flex:1,
    alignItems:'center',
    position:'relative',
    flexDirection:'column',
    top:150
  },
  img1:{
    height:285,
    width:331,
  },
  img2:{
    position:'relative',
    top:-120,
  },
  fullform:{
    fontSize:15,
    top:180,
    left:60,
    color:'#2f2f2f',
    fontWeight:'bold'
    
  },
  loginbtn:{
    position:'relative',
    width:'80%',
    height:50,
    borderRadius:50,
    backgroundColor:'#ff7373',
    marginTop:90,
    alignItems:'center',
    justifyContent:'center'
    
  },
  start:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:15,
  }
})