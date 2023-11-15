import React from 'react';
import { View } from 'react-native';
import { Defs, LinearGradient, Stop, G, Path, Svg } from 'react-native-svg';
import * as shape from 'd3-shape';

const BezierLineGraph = ({ data }) => {
  const line = shape
    .line()
    .x((d) => d.x * 50) // Adjust the scaling based on your data
    .y((d) => d.y)
    .curve(shape.curveCardinal);

  const path = line(data);

  return (
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#ff7373" stopOpacity="1" />
          <Stop offset="100%" stopColor="#d9d9d9" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <G>
        <Path d={path} fill="url(#grad)" />
      </G>
    </Svg>
  );
};

export default BezierLineGraph;
