import React from 'react';
import {SafeAreaView} from 'react-native';

import {AuthProvider} from './Context/AuthContext';
import AppNav from './Navigation/AppNav';

const App = () => {
  return (
    // <SafeAreaView>
      <AppNav />
    // </SafeAreaView>
  );
};

export default App;
