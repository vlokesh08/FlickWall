import { Tabs } from "expo-router";
import React from "react";
import { Platform, Dimensions, StyleSheet, View } from "react-native";
import { House, Star, UserRound } from "lucide-react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import TabBar from "@/components/Navbar/Tabbar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get("window"); // Responsive width with max size
  const TAB_BAR_HEIGHT = Platform.select({
    ios: 70,
    android: 65,
    default: 70,
  });

  const COLORS = {
    activeTint: Platform.OS === "ios" ? "#007AFF" : "#FFA001",
    inactiveTint: colorScheme === "dark" ? "#8E8E93" : "#CDCDE0",
    background:
      Platform.OS === "ios"
        ? colorScheme === "dark"
          ? "#1C1C1E"
          : "#F2F2F7"
        : "#161622",
    border:
      Platform.OS === "ios"
        ? colorScheme === "dark"
          ? "#38383A"
          : "#C7C7CC"
        : "#232533",
  };

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarStyle: [styles.tabBar, 
          {
            backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' // gray-800 for dark mode
          }
        ],
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Star color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <UserRound
              color={color}
              size={24}
              strokeWidth={focused ? 2.5 : 1.5}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: "hidden",
    marginHorizontal: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  tabBarBackground: {
    flex: 1,

    borderRadius: 20,
  },
});
