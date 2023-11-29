import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import LottieView from 'lottie-react-native';

const Heartbeat = () => {
  const lottieRef = useRef();

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      console.log('Next AppState:', nextAppState);

      if (lottieRef.current && nextAppState === 'active') {
        console.log('Playing Lottie Animation');
        lottieRef.current.play();
      }
    },
    [lottieRef]
  );

  useEffect(() => {
    console.log('Adding AppState Change Listener');

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      console.log('Removing AppState Change Listener');
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        style={{ height: 30, width: 30, top: 3 }}
        source={require('../images/activity.json')}
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
});

export default Heartbeat;
