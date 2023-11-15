import React, { useState } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

// Import SBItem and window from actual paths
import { SBItem } from "./SBItem";
// Import other necessary components/constants as needed
import { window } from "./window";
const PAGE_WIDTH = window.width;
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

function ParallaxCarousel() {
  const [progressValue, setProgressValue] = useState(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.86,
    height: PAGE_WIDTH * 0.6,
  };

  

  const emptyData = Array.from({ length: colors.length }).fill({});

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Carousel
        {...baseOptions}
        style={{
          width: PAGE_WIDTH * 0.86,
        }}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={2500}
        onProgressChange={(index, absoluteProgress) =>
          setProgressValue(absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={emptyData}
        renderItem={({ index }) => <SBItem index={index} />}
      />
      {!!progressValue && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 100,
            top:230,
          }}
        >
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                length={colors.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const CustomSlide = ({ index, backgroundColor }) => (
  <View
    style={{
      backgroundColor,
      width: PAGE_WIDTH * 0.86,
      height: PAGE_WIDTH * 0.6,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Customize the content of each slide here */}
    <Text style={{ color: "white", fontSize: 20 }}>Slide {index + 1}</Text>
  </View>
);


const PaginationItem = (props) => {
  const { animValue, index, length, backgroundColor } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default ParallaxCarousel;
