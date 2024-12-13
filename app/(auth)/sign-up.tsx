import Logo from '@/components/Logo';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://flick-wall-backend.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        // Redirect to home (you may need to use your navigation method here)
        // For example: navigation.navigate('Home');
        router.replace('/home');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-gray-900" : "bg-white"} p-3`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
            {/* Illustration Container */}
            <View className="items-center mb-8 w-full">
              <Logo />
            </View>
          <View className="flex-1 px-6 pt-8">

            {/* Form Container */}
            <View className="space-y-4">
              {/* Full Name Input */}
              <View>
                <Text className="text-white mb-3 text-base">Full Name</Text>
                <TextInput
                  className="bg-white/10 py-4 rounded-lg px-4 text-white mb-3"
                  placeholder="Enter your full name"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              {/* Email Input */}
              <View>
                <Text className="text-white mb-3 text-base">Email Address</Text>
                <TextInput
                  className="bg-white/10 rounded-lg px-4 py-4 text-white mb-3"
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-white mb-3 text-base">Password</Text>
                <View className="relative">
                  <TextInput
                    className="bg-white/10 py-4 rounded-lg px-4 pr-12 text-white mb-3"
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {/* {showPassword ? (
                      <EyeOff size={24} color="white" />
                    ) : (
                      <Eye size={24} color="white" />
                    )} */}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className="self-end mt-2">
                  <Text className="text-white/80 text-sm">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity onPress={() => handleSignUp()} className="bg-green-500 dark:bg-green-600 py-4 rounded-lg items-center justify-center mt-6 w-full">
                <Text className="text-white font-semibold text-lg">
                  Sign up
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-white">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.replace('/sign-in')}>
                  <Text className="text-green-600 dark:text-green-400 font-semibold">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

