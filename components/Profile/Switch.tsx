import React, {useState} from 'react';
import {Switch, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  trackColor?: { false: string; true: string };
  thumbColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SwitchIcon({
  value,
  onValueChange,
  trackColor = { false: '#D1D5DB', true: '#008230' },
  thumbColor = '#ffffff',
  size = 'md',
}: SwitchProps) {
  const toggleSwitch = () => onValueChange(!value);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#ffffff'}}
          thumbColor={value ? '#32CD32' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={value}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
