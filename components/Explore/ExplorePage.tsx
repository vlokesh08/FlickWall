import React, { useState, useCallback, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import Logo from "../Logo";
import Search from "./Search";
import Favourites from "./Favourites";

const { height } = Dimensions.get("window");

const TabButton = memo(
  ({
    title,
    active,
    onPress,
  }: {
    title: string;
    active: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingVertical: 15 }}
      className="w-1/2 items-center"
    >
      <View
        className={`px-4 py-2 rounded-2xl ${
          active ? "bg-green-500" : "bg-transparent"
        }`}
        style={{
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: active ? "600" : "400",
            color: active ? "#FFFFFF" : "#6B7280",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
);

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const handleScroll = useCallback((event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setIsScrolledUp(scrollY > 100);
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-800">
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 38,
          flexGrow: 1,
        }}
      >
        <View style={{ padding: 16, borderRadius: 50 }}>
          <View
            className="p-4 dark:bg-gray-700 bg-gray-200 flex-row items-center gap-2"
            style={{
              height: 80,
              borderRadius: 25,
            }}
          >
            <Logo size={48} />
            <View>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                Welcome Lokesh 👋
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-300">
                to the FlickWall application
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 80,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            paddingBottom: 10,
          }}
          className="flex-row justify-around"
        >
          <TabButton
            title="Search"
            active={activeTab === "search"}
            onPress={() => handleTabChange("search")}
          />
          <TabButton
            title="Favorites"
            active={activeTab === "favorites"}
            onPress={() => handleTabChange("favorites")}
          />
        </View>

        {activeTab === "search" && (
          <Search onSearchChange={(query: string) => setSearchQuery(query)} />
        )}

        {activeTab === "favorites" && <Favourites />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ExplorePage);
