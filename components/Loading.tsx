import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const LoadingScreen: React.FC = () => {
  const animationValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animateCards = () => {
      Animated.sequence([
        Animated.timing(animationValues[0], {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(animationValues[0], {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(animationValues[1], {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(animationValues[1], {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(animationValues[2], {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(animationValues[2], {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(() => animateCards());
    };

    animateCards();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {animationValues.map((value, index) => (
          <Animated.View
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: value.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#e0e0e0', '#3498db'],
                }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 400,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default LoadingScreen;

