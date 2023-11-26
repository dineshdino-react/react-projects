import React from "react";
import { View, StyleSheet } from "react-native";
import { SBItem } from "./SBItem";

const slideTexts = ["Text for Slide 1", "Text for Slide 2", "Text for Slide 3"];
const slideImages = [
  require("./path/to/image1.jpg"),
  require("./path/to/image2.jpg"),
  require("./path/to/image3.jpg"),
];

const ParentComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <SBItem index={1} slideText={slideTexts} slideImages={slideImages} />
      <SBItem index={2} slideText={slideTexts} slideImages={slideImages} />
      <SBItem index={3} slideText={slideTexts} slideImages={slideImages} />
      {/* Add more SBItem components for additional slides */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
});

export default ParentComponent;