import Logo from "@/components/Logo";
import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useUser } from "@/context/GlobalProvider";
import { Bell, CircleChevronRight } from "lucide-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import LoadingScreen from "@/components/Loading";
import Loader from "@/components/Loader";
import { getApiUrl } from "@/utils/env";
export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { setUser } = useUser();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        getApiUrl("login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        // Redirect to home (you may need to use your navigation method here)
        // For example: navigation.navigate('Home');
        const userData = await response.json(); // Assuming the response contains user data
        setUser(userData.user);
        router.replace("/home");
      } else {
        setLoading(false);
        const errorData = await response.json();
        alert(errorData.message || "Sign up failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <Loader />
    )
  }

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-100"} p-3`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            className="flex-row items-end justify-end px-5 py-2 rounded-lg"
            onPress={() => router.push("/home")}
          >
            <Text className="dark:text-white text-gray-700 font-bold text-lg mr-2">Skip</Text>
            <AntDesign name="rightcircleo" size={22} color={colorScheme === "dark" ? "#fff" : "#374151"} />
          </TouchableOpacity>

          {/* Illustration Container */}
          <View className="items-center mb-8 w-full">
            <Logo />
          </View>
          <View className="flex-1 px-6 pt-8">
            {/* Form Container */}
            <View className="space-y-4">
              {/* Full Name Input */}

              {/* Email Input */}
              <View>
                <Text className="dark:text-white text-gray-700 mb-3 text-base">Email Address</Text>
                <TextInput
                  className="bg-white/10 rounded-lg px-4 py-4 dark:text-white text-gray-700 mb-3 border border-gray-500"
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
                <Text className="dark:text-white text-gray-700 mb-3 text-base">Password</Text>
                <View className="relative">
                  <TextInput
                    className="bg-white/10 py-4 rounded-lg px-4 pr-12 dark:text-white text-gray-700 mb-3  border border-gray-500"
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
                  <Text className="dark:text-white text-gray-700 text-sm">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={() => handleSignUp()}
                className="bg-green-500 dark:bg-green-600 py-4 rounded-lg items-center justify-center mt-6 w-full"
              >
                <Text className="dark:text-white text-gray-700 font-semibold text-lg">Log In</Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row justify-center mt-6">
                <Text className="dark:text-white text-gray-700">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/sign-up")}>
                  <Text className="text-green-600 dark:text-green-400 font-semibold">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
