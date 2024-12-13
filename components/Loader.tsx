import { View, Text, Animated, Easing, useColorScheme } from 'react-native'
import { useEffect, useRef } from 'react'

const Loader = () => {
  // Create animated values for position and opacity
  const position1 = useRef(new Animated.Value(0)).current;
  const position2 = useRef(new Animated.Value(200)).current; // Start below screen
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme() ?? 'light';

  const color = theme === 'light' ? '#000' : '#fff';
  useEffect(() => {
    const createAnimation = () => {
      // Reset values
      position1.setValue(0);
      position2.setValue(100);
      opacity1.setValue(1);
      opacity2.setValue(0);

      // Create parallel animation
      Animated.parallel([
        // First view animation
        Animated.timing(position1, {
          toValue: -200,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opacity1, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Second view animation
        Animated.timing(position2, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => createAnimation()); // Restart animation when complete
    };

    createAnimation();
  }, []);

  const CardView = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
      <View style={{ marginLeft: 8, flexDirection: 'column', alignItems: 'flex-start' }}>
        <View style={{ width: 100, height: 120, backgroundColor: color, borderRadius:10, opacity: 0.5 }}></View>
        <View style={{ marginTop: 8, width: 100, height: 70, backgroundColor: color, borderRadius:10, opacity: 0.5 }}></View>
      </View>      
      <View style={{ marginLeft: 8, flexDirection: 'column', alignItems: 'flex-start' }}>
        <View style={{ width: 100, height: 80, backgroundColor: color, borderRadius:10, opacity: 0.5 }}></View>
        <View style={{ marginTop: 8, width: 100, height: 110, backgroundColor: color, borderRadius:10, opacity: 0.5 }}></View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800">
      <Animated.View style={{ 
        transform: [{ translateY: position1 }],
        opacity: opacity1,
      }}>
        <CardView />
      </Animated.View>
      
      <Animated.View style={{ 
        transform: [{ translateY: position2 }],
        opacity: opacity2,
        position: 'absolute',
      }}>
        <CardView />
      </Animated.View>
    </View>
  )
}

export default Loader