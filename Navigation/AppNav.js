import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React ,{useContext, useEffect, useState}from 'react'
import AuthStack from './AuthStack'
import Drawernav from './DrawerNav'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../Context/AuthContext'

const AppNav= () => {
    const {usertoken,IsLoading} = useContext(AuthContext);
    if (IsLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#ff7373" />
          </View>
        );
      }  
  return (
    <NavigationContainer>
        { usertoken !== null ? <Drawernav/> : <AuthStack/>} 
    </NavigationContainer>
  )
}

export default AppNav

const styles = StyleSheet.create({})