import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const ParallaxLayer = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const autoplayRef = useRef(null);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.8,
    height: PAGE_HEIGHT * 0.6,
  };
  const emptyData = Array.from({ length: 4 }).fill({});

  useEffect(() => {
    if (isAutoplaying && autoplayRef.current) {
      // Trigger spring animation when autoplaying
      autoplayRef.current();
    }
  }, [isAutoplaying]);

  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        style={styles.carousel}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={1000}
        onProgressChange={(index, absoluteProgress) => {
          setProgressValue(absoluteProgress);
        }}
        onAutoplayStart={() => {
          setIsAutoplaying(true);
        }}
        onAutoplayEnd={() => {
          setIsAutoplaying(false);
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={emptyData}
        renderItem={({ index }) => (
          <ParallaxSlide
            index={index}
            progressValue={progressValue}
            autoplayRef={autoplayRef}
          />
        )}
      />
    </View>
  );
};

const ParallaxSlide = ({ index, progressValue, autoplayRef }) => {
  const animatedOpacity = useSharedValue(0);
  const animatedScale = useSharedValue(1); // Set initial scale to 1

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      animatedOpacity.value = withSpring(1, {}, () => {
        if (autoplayRef.current) {
          autoplayRef.current();
        }
      });
      animatedScale.value = withSpring(1);
    }, 500); // Introduce a delay of 500 milliseconds

    return () => clearTimeout(animationTimeout);
  }, [index, autoplayRef, animatedOpacity, animatedScale]);

  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progressValue,
      [index - 1, index, index + 1],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );
    return {
      opacity: animatedOpacity.value,
      transform: [{ scale: animatedScale.value * scale }],
    };
  });

  return (
    <Animated.View style={[styles.slide, animStyle]}>
      <Text style={styles.heading}>Heading {index + 1}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../images/img.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.description}>
        <Text style={styles.boldText}>Bold Text:</Text> Normal Text Description
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    width: PAGE_WIDTH * 0.8,
    height: PAGE_HEIGHT * 0.6,
  },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  heading: {
    fontSize: 20,
    color: "#ff7373",
    fontWeight: "bold",
  },
  imageContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "black",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default ParallaxLayer;
