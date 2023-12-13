import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Login, Welcome, Forgot} from '../src/screens';


import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} /> 
       
      </Stack.Navigator>
    
  )
}

export default AuthStack

const styles = StyleSheet.create({})