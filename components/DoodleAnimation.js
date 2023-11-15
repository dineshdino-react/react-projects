import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

const DoodleAnimation = () => {
  const canvasRef = useRef(null);

  const drawRandomLine = (context, width, height) => {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const endX = Math.random() * width;
    const endY = Math.random() * height;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  };

  const handleCanvas = async (canvas) => {
    if (canvas) {
      const context = canvas.getContext('2d');
      const { width, height } = canvas;

      // Draw a new random line every second
      setInterval(() => {
        context.clearRect(0, 0, width, height);
        drawRandomLine(context, width, height);
      }, 1000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas ref={canvasRef} onCanvasCreate={handleCanvas} />
    </View>
  );
};

export default DoodleAnimation;
