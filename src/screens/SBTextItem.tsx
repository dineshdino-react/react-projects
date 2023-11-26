import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>
  index?: number
}

export const SBTextItem: React.FC<Props> = ({ style, index }) => {
  return (
    <View style={[styles.container, style]}>
      {typeof index === "number" && <Text style={{ fontSize: 30, color: "#ff7373" }}>{index}</Text>}
      {typeof index === "number" && <Text style={{ fontSize: 16, color: "#2f2f2f" }}>{index}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
  },
});