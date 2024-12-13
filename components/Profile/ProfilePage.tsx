import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Platform, Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronRight,
  HeadphonesIcon,
  Bell,
  Fingerprint,
  Lock,
  LogOut,
  Heart,
  WebhookIcon,
  LogIn,
  Mail,
} from "lucide-react-native";
import Switch from "./Switch";
import { useUser } from "@/context/GlobalProvider";
import { Share } from "react-native";
import { Link, router } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useColorScheme } from "react-native";

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const colorScheme = useColorScheme();
  const [scheme, setScheme] = useState(colorScheme);

  const toggleColorScheme = () => {
      if(Platform.OS !== "web"){
        const nextScheme = scheme === "light" ? "dark" : "light";
        Appearance.setColorScheme(nextScheme);
        setScheme(nextScheme);
      }
  }


  const handleLogout = () => {
    if (user) {
      setUser(null);
    }
    router.push("/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800  ">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingTop: 16,
        }}
      >
        <View className="items-center  pb-4">
          <TouchableOpacity onPress={() => {}} className="mt-3">
            <Image
              source={{ uri: "https://github.com/shadcn.png" }}
              className="w-24 h-24 rounded-full mt-3"
            />
          </TouchableOpacity>

          <View className="items-center mt-3">
            <Text className="text-xl text-white mt-6 font-semibold">
              {user ? user.name : "Test User"}
            </Text>

            <TouchableOpacity
              className="bg-black px-6 py-2 rounded-full mt-4"
              style={{ elevation: 2 }}
            >
              <Text className="text-white font-medium">Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 mt-6">
          <Text className="text-gray-500 text-sm mb-3 px-2 dark:text-white">Inventories</Text>
          <View className="bg-white rounded-2xl p-3 dark:bg-gray-700" style={{ elevation: 2 }}>
            <TouchableOpacity className="flex-row items-center p-3 gap-2">
              <Heart size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
              <Text className="flex-1 ml-3 font-medium dark:text-white">Favourites</Text>
              <View className="bg-green-500 rounded-full px-2 py-0.5 mr-2">
                <Text className="text-white text-xs">
                  {user && user?.favourites ? user.favourites.length : 0}
                </Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View className="flex-row items-center p-3 gap-2">
              <WebhookIcon size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
              <Text className="flex-1 ml-3 font-medium dark:text-white">Dark Mode</Text>
              <Switch
                value={scheme === "dark"}
                onValueChange={toggleColorScheme}
              />
            </View>

            {user && user.email && (
              <TouchableOpacity className="flex-row items-center p-3">
                <Mail size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />


                <Text className="flex-1 ml-3 font-medium dark:text-white">Email</Text>
                <Text className="flex-1 ml-3 font-sm text-sm dark:text-white">
                  {user && user.email}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="px-4 mt-6">
          <Text className="text-gray-500 text-sm mb-3 px-3 dark:text-white">Other</Text>

          <View className="bg-white rounded-2xl p-3 dark:bg-gray-700">
            <Link href="/">
            <View className="flex-row items-center p-3 gap-2">
              <Octicons name="organization" size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
              <Text className="flex-1 ml-3 font-medium dark:text-white">About</Text>
            </View>
            </Link>
            <View className="flex-row items-center p-3 gap-2">
              <FontAwesome6 name="ranking-star" size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
              <Text className="flex-1 ml-3 font-medium dark:text-white">Rate us</Text>
            </View>

            <TouchableOpacity
              className="flex-row items-center p-3 gap-2"
              onPress={() => {
                Share.share({
                  message: "Check out this link!",
                  url: "https://venkatalokesh.vl08.pro", // Replace with your actual link
                });
              }}
            >
              <Heart size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
              <Text className="flex-1 ml-3 font-medium dark:text-white">Share App</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 mt-6 bg-gray-50 dark:bg-gray-800">
          <Text className="text-gray-500 text-sm mb-3 px-2 dark:text-white">Preferences</Text>
          <View
            className="rounded-2xl p-3 bg-white dark:bg-gray-700"
            style={{ elevation: 2 }}
          >
            <View className="flex-row items-center p-3 gap-2">
              <Bell size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} className="dark:text-white" />
              <Text className="flex-1 ml-3 font-medium dark:text-white">
                Push notifications
              </Text>

            </View>

            <View className="flex-row items-center p-3 gap-2">
              <Fingerprint size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
              <Text className="flex-1 ml-3 font-medium dark:text-white">Face ID</Text>

            </View>

            <TouchableOpacity className="flex-row items-center p-3 gap-2">
              <Lock size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
              <Text className="flex-1 ml-3 font-medium dark:text-white">PIN Code</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center p-3 gap-2"
              onPress={handleLogout}
            >
              {user ? (
                <>
                  <LogOut size={20} color={colorScheme === "dark" ? "#fff" : "#374151"} />
                  <Text className="flex-1 ml-3 font-medium text-red-500 dark:text-white">
                    Logout
                  </Text>
                </>
              ) : (
                <>
                  <LogIn size={20} color="#EF4444" />
                  <Text className="flex-1 ml-3 font-medium text-red-500 dark:text-white">
                    Login
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
