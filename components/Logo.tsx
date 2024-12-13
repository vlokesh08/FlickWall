import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GradientLogoProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
}

const Logo: React.FC<GradientLogoProps> = ({
  size = 100,
  primaryColor = '#1CAC78',
  secondaryColor = '#018749',
  textColor = '#ffffff'
}) => {
  return (
    <View style={[styles.logoContainer, { width: size, height: size, borderRadius: size / 2 }]}>
      <View style={[styles.gradientBackground, { backgroundColor: primaryColor, borderRadius: size / 2 }]} />
      <View style={[styles.gradientOverlay, { backgroundColor: secondaryColor, borderRadius: size / 2 }]} />
      <Text
        style={[styles.logoText, { fontSize: size * 0.4, color: textColor }]}
      >
        FW
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7, // Adjust opacity for a gradient-like effect
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3, // Adjust opacity for a gradient-like effect
  },
  logoText: {
    fontWeight: 'bold',
    zIndex: 1, // Ensure text is above the background
  },
});

export default Logo;