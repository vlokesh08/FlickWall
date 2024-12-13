import { Link } from "expo-router";
import { ChevronRight, CircleChevronRight } from "lucide-react-native";
import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
// Logo component
const Logo = () => (
  <View className="flex-row items-center">
    <View className="w-6 h-6 rounded-full bg-green-500 mr-2" />
    <Text className="text-lg font-semibold dark:text-white">FlickWall</Text>
  </View>
);

export default function WelcomeScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-gray-900" : "bg-white"} p-3`}
    >
      {/* Header */}
      <View className="flex-row justify-between align-middle px-4 py-2">
        <Logo />
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Globe Illustration */}
        <View className="mb-8">
          {/* <GlobeSvg color={isDark ? '#22c55e' : '#16a34a'} /> */}
          <Image
            source={require("../assets/images/getStarted.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <Text className="text-3xl font-bold text-center mb-4 dark:text-white">
          Download variety of Wallpapers for free!
        </Text>
        <Text className="text-center text-gray-600 dark:text-gray-400 mb-8 px-12">
          Unlock your phone's full potential with our diverse collection of
          wallpapers!
        </Text>

        {/* CTA Button */}
        <Link
          href="/sign-in"
          className="w-full bg-green-500 dark:bg-green-600 rounded-xl py-4 mb-4 flex flex-row items-center justify-center"
        >
          <Text className="text-center text-white text-xl font-semibold mr-2">
            Get Started
          </Text>
          <AntDesign name="right" size={18} color="white" className="ml-2" />
        </Link> 

        {/* Login Link */}
        {/* <Link href="/sign-in">
          <Text className="text-green-600 dark:text-green-400 underline">
            Already have an account?
          </Text>
        </Link> */}
      </View>
    </SafeAreaView>
  );
}
