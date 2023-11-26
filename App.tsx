import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNav from './Navigation/AppNav';
import AuthProvider from './Context/AuthContext';
import { loadFonts } from './src/screens/fontLoader';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
const App = () => {
  useEffect(() => {
    const loadApp = async () => {
      await loadFonts();
    };

    loadApp();
  }, []);
  
  return (

    <AuthProvider>
      <StatusBar/>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
