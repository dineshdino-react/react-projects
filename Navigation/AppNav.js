
import React from 'react'
import { Login, Welcome, Forgot, Homepage  } from '../src/screens'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();
const AppNav = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Forgot' component={Forgot} />
      <Stack.Screen name='Homepage' component={Homepage} />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNav