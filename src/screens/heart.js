import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SingleIconFadeoutAnimation = () => {
  const translateYAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const animateIcon = () => {
    translateYAnimation.setValue(0);
    opacityAnimation.setValue(1);

    Animated.parallel([
        Animated.timing(scaleAnimation,{
        toValue: 10, // Adjust the value to make it larger
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
        }),
      Animated.timing(translateYAnimation, {
        toValue: -100,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Reset the icon position and opacity
      translateYAnimation.setValue(0);
      opacityAnimation.setValue(1);
      animateIcon(); // Repeat the animation
    });
  };

  useEffect(() => {
    animateIcon(); // Start the animation initially
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={{
          transform: [{ translateY: translateYAnimation }],
          opacity: opacityAnimation,
        }}
      >
        <Text>
        <Icon name="rocket" size={24} color="blue" />
        </Text>
      </Animated.View>
    </View>
  );
};

export default SingleIconFadeoutAnimation;
