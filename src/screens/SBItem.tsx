import React, { useRef, useEffect } from 'react';
import {
  StyleProp,
  ViewStyle,
  ViewProps,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
  index?: number;
  slideText?: string[];
  slideImages?: ImageSourcePropType[]; // Array of image sources
  onSlideChange?: () => void; // Callback for carousel slide change
}

export const SBItem: React.FC<Props> = props => {
  const {
    style,
    index,
    slideText,
    slideImages,
    testID,
    onSlideChange,
    ...animatedViewProps
  } = props;
  const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;

  const translateY = useSharedValue(0);
  const imageScale = useSharedValue(1);

  // Calculate the previous index
  const prevIndex = useRef<number | undefined>(index);

  // Update values when the index changes
  useEffect(() => {
    if (index !== undefined) {
      translateY.value = index * 100; // Adjust the values as needed
      imageScale.value = 1; // Reset the scale when the index changes
    }
  }, [index]);

  // Reset animation values when the carousel slide changes
  useEffect(() => {
    if (prevIndex.current !== undefined && prevIndex.current !== index) {
      if (onSlideChange) {
        onSlideChange();
      }
    }
    prevIndex.current = index;
  }, [index, onSlideChange]);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: imageScale.value }],
    };
  });

  const handleImageSpring = () => {
    imageScale.value = withSpring(1.2, undefined, finished => {
      if (finished) {
        // Reset scale after the spring animation is complete
        imageScale.value = withSpring(1);
      }
    });
  };

  return (
    <View
      testID={testID}
      style={[styles.container, style]}
      {...animatedViewProps}>
      {index !== undefined && index > 0 && slideText && slideImages && (
        <>
          <Text style={{ fontSize: 30, color: '#ff7373' }}>
            {slideText[index - 1]}
          </Text>
          <Animated.Image
            onLoad={runOnJS(handleImageSpring)}
            style={[
              styles.image,
              styles.imageWithShadow,
              animatedStyle,
              imageAnimatedStyle,
            ]}
            source={slideImages[index - 1]}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 8, // Add border radius as needed
  },
  imageWithShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
