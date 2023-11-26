import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
const Profile = () => {
  return (
    <View style={styles.container}>
     <LottieView style={{height:200,width:200,top:16}}
        source={require('../images/animate.json')} 
        autoPlay
        loop
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ff7373',
  },
});

export default Profile;