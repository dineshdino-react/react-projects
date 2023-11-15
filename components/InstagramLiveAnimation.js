import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image ,Text } from 'react-native';

const InstagramLiveAnimation = () => {
  const [items, setItems] = useState([]);
  const animationValue = useRef(new Animated.Value(0)).current;
  const [currentItemType, setCurrentItemType] = useState('injection');

  const generateItem = () => {

    const type = currentItemType === 'injection' ? 'stethoscope' : 'injection';
    const size = Math.random() * (30 - 15) + 15; // Random size between 15 and 30
    const startX = Math.random() * (200 - 50) + 50; // Random start X position between 50 and 300
    const endX = Math.random() * (200 - 0) + 0; // Random end X position between 0 and 320
    const duration = Math.random() * (3000 - 2000) + 2000; // Random duration between 2000 and 3000

    const itemStyle = {
      width: size,
      height: size,
      position: 'absolute',
      bottom: 0,
      left: startX,
    };

    setItems((prevItems) => [
      ...prevItems,
      {
        type,
        style: itemStyle,
        startX,
        endX,
        duration,
      },
    ]);

    setCurrentItemType(type);

    Animated.timing(animationValue, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start(() => {
      setItems((prevItems) => prevItems.slice(1));
      animationValue.setValue(0);
    });
  };

  const itemComponents = items.map((item, index) => {
    const translateY = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -500],
    });

    return (
      <Animated.View key={index} style={[item.style, { transform: [{ translateY }, { translateX: item.endX - item.startX }] }]}>
        {item.type === 'injection' && (
          <Image source={require('../src/images/injection.png')} style={{ width: item.style.width, height: item.style.height }} />
        )}
        {item.type === 'stethoscope' && (
          <Image source={require('../src/images/heart.png')} style={{ width: item.style.width, height: item.style.height }} />
        )}
      </Animated.View>
    );
  });

  return (
    <View style={styles.container}>
      {itemComponents}
      <TouchableOpacity onPress={generateItem}>
        <Text>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default InstagramLiveAnimation;
