import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WavyBackground({ children }) {
  return (
    <View style={styles.container}>
      {/* SVG Wavy Background */}
      <View style={styles.svgContainer}>
        <Svg
          height="300"
          width="100%"
          viewBox="0 0 1440 320"
          style={styles.svg}
        >
          <Path
            fill="#fde9f0"
            d="M0,160L48,149.3C96,139,192,117,288,138.7C384,160,480,224,576,234.7C672,245,768,203,864,176C960,149,1056,139,1152,160C1248,181,1344,235,1392,261.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
      {/* Children represent the screen content */}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE9F0', // Fallback background color
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1, // Ensure the wave stays behind the content
  },
  svg: {
    position: 'absolute',
    top: 0,
  },
  contentContainer: {
    flex: 1,
  },
});
